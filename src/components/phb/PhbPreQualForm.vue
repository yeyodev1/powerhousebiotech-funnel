<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import gsap from 'gsap'
import { parsePhoneNumberFromString, getCountries, getCountryCallingCode, AsYouType, type CountryCode } from 'libphonenumber-js'
import { useLocale } from '@/composables/useLocale'
// @ts-ignore
import { useContactStore } from '@/stores/contact'
import { sendContactToGHL, sendQualificationToGHL, sendNoteToGHL } from '@/services/ghl'

// ── Country data for phone selector ───────────────────────────────────────────
interface Country { code: string; name: string; dial: string; flag: string }

const flagEmoji = (code: string) =>
  [...code.toUpperCase()].map(c => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0))).join('')

const PRIORITY = ['EC', 'CO', 'PE', 'MX', 'AR', 'CL', 'VE', 'BO', 'PY', 'UY', 'GT', 'HN', 'SV', 'CR', 'PA', 'DO', 'CU', 'US', 'ES']

const nameMap: Record<string, string> = {
  EC: 'Ecuador', CO: 'Colombia', PE: 'Perú', MX: 'México', AR: 'Argentina',
  CL: 'Chile', VE: 'Venezuela', BO: 'Bolivia', PY: 'Paraguay', UY: 'Uruguay',
  GT: 'Guatemala', HN: 'Honduras', SV: 'El Salvador', CR: 'Costa Rica',
  PA: 'Panamá', DO: 'Rep. Dominicana', CU: 'Cuba', US: 'Estados Unidos',
  ES: 'España', BR: 'Brasil', PT: 'Portugal', FR: 'Francia', DE: 'Alemania',
  IT: 'Italia', GB: 'Reino Unido', CA: 'Canadá', AU: 'Australia', JP: 'Japón',
  CN: 'China', IN: 'India',
}

const allCountries: Country[] = getCountries().map(code => ({
  code,
  name: nameMap[code] ?? code,
  dial: '+' + getCountryCallingCode(code),
  flag: flagEmoji(code),
}))

const priorityList = PRIORITY.map(code => allCountries.find(c => c.code === code)).filter(Boolean) as Country[]
const otherList = allCountries.filter(c => !PRIORITY.includes(c.code)).sort((a, b) => a.name.localeCompare(b.name))
const countries = [...priorityList, { code: '---', name: '─────────', dial: '', flag: '' }, ...otherList]

function detectCountryCode(): CountryCode {
  try {
    const locale = navigator.language || (navigator.languages && navigator.languages[0]) || ''
    if (locale.includes('-')) {
      const region = locale.split('-')[1].toUpperCase()
      if (region.length === 2) return region as CountryCode
    }
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    const tzMap: Record<string, CountryCode> = {
      'Europe/Madrid': 'ES', 'America/Mexico_City': 'MX', 'America/Bogota': 'CO',
      'America/Argentina/Buenos_Aires': 'AR', 'America/Santiago': 'CL', 'America/Lima': 'PE',
      'America/Caracas': 'VE', 'America/Guayaquil': 'EC', 'America/Panama': 'PA',
      'America/Costa_Rica': 'CR', 'America/Guatemala': 'GT', 'America/Asuncion': 'PY',
      'America/Montevideo': 'UY', 'America/La_Paz': 'BO', 'America/Santo_Domingo': 'DO',
      'America/Puerto_Rico': 'PR', 'America/El_Salvador': 'SV', 'America/Tegucigalpa': 'HN',
      'America/Managua': 'NI', 'America/New_York': 'US', 'America/Chicago': 'US',
      'America/Denver': 'US', 'America/Los_Angeles': 'US', 'Europe/Paris': 'FR',
      'Europe/London': 'GB', 'Europe/Rome': 'IT',
    }
    for (const [key, value] of Object.entries(tzMap)) {
      if (tz.includes(key)) return value
    }
  } catch {}
  return 'EC'
}

const LABEL_MAP: Record<string, string> = {
  nombre: '👤 Nombre', apellido: '👤 Apellido', telefono: '📱 Celular', email: '📧 Email',
  approach: '🎯 Relación con el programa',
  seller_experience: '💼 Experiencia en ventas', seller_network: '🔗 Red de contactos',
  seller_time: '⏱️ Tiempo disponible',
  final_confirmation: '✅ Confirmación final',
}

const NOTE_SECTIONS = [
  { emoji: '👤', title: 'Información Básica',                   keys: ['nombre', 'apellido', 'telefono', 'email'] },
  { emoji: '🎯', title: 'Relación con el Programa',             keys: ['approach'] },
  { emoji: '💼', title: 'Perfil de Vendedor',                   keys: ['seller_experience', 'seller_network', 'seller_time'] },
]

function buildNoteContent(data: Record<string, any>, source: string, completed = false): string {
  const now = new Date().toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' })
  const lines = [
    '🏥 PowerHouse Biotech — Formulario PHB',
    `📌 Fuente: ${source}`,
    `🕐 Actualizado: ${now}`,
    '',
  ]
  for (const section of NOTE_SECTIONS) {
    const filled = section.keys.filter(k => data[k])
    if (!filled.length) continue
    lines.push(`${section.emoji} ${section.title}`)
    lines.push('─'.repeat(32))
    for (const key of filled) {
      const label = LABEL_MAP[key] || key
      const extra = data[`${key}_other`]
      lines.push(`  ${label}: ${extra ? `${data[key]} (${extra})` : data[key]}`)
    }
    lines.push('')
  }
  if (completed) lines.push('🎉 FORMULARIO COMPLETADO AL 100%')
  return lines.join('\n')
}

const props = defineProps({
  initialStep: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['complete'])

const contactStore = useContactStore()
const { t } = useLocale()

// ── Phone state ────────────────────────────────────────────────────────────
const selectedCountry = ref<Country>(priorityList.find(c => c.code === detectCountryCode()) || priorityList[0])
const dropdownOpen = ref(false)
const countrySearch = ref('')
const phoneRaw = ref('')

const formattedPhone = computed(() => {
  if (!phoneRaw.value) return ''
  const formatter = new AsYouType(selectedCountry.value.code as CountryCode)
  return formatter.input(phoneRaw.value)
})

const phoneValid = computed(() => {
  const full = selectedCountry.value.dial + phoneRaw.value.replace(/\s/g, '')
  const parsed = parsePhoneNumberFromString(full, selectedCountry.value.code as CountryCode)
  return parsed?.isValid() ?? false
})

const parsedPhoneE164 = computed(() => {
  const full = selectedCountry.value.dial + phoneRaw.value.replace(/\s/g, '')
  const parsed = parsePhoneNumberFromString(full, selectedCountry.value.code as CountryCode)
  return parsed?.format('E.164') ?? ''
})

watch(parsedPhoneE164, (val) => { formData.value.telefono = val })
watch(phoneRaw, () => { if (phoneRaw.value) formData.value.telefono = parsedPhoneE164.value })

const filteredCountries = computed(() => {
  const q = countrySearch.value.toLowerCase()
  if (!q) return countries
  return countries.filter(c =>
    c.code !== '---' && (c.name.toLowerCase().includes(q) || c.dial.includes(q) || c.code.toLowerCase().includes(q))
  )
})

function selectCountry(c: Country) {
  if (c.code === '---') return
  selectedCountry.value = c
  dropdownOpen.value = false
  countrySearch.value = ''
  phoneRaw.value = ''
}

const handleClickOutside = (e: MouseEvent) => {
  const el = document.querySelector('.phb-form__phone-wrap')
  if (el && !el.contains(e.target as Node)) dropdownOpen.value = false
}

const onPhoneInput = (e: Event) => {
  const raw = (e.target as HTMLInputElement).value.replace(/[^\d\s\-\(\)]/g, '')
  phoneRaw.value = raw
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  animateIn(1)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

// ── Form state ─────────────────────────────────────────────────────────────
const currentStep = ref(props.initialStep)
const formData = ref<Record<string, any>>({
  nombre: contactStore.contact.nombre || '',
  apellido: contactStore.contact.apellido || '',
  email: contactStore.contact.email || '',
  telefono: contactStore.contact.telefono || '',
})

const sections = computed(() => t.value.qualify.sections)
const totalSteps = computed(() => sections.value.length + 2) // Intro + Sections + Confirmation

// Animation state
const isAnimating = ref(false)

// Navigation logic
async function nextStep() {
  if (isAnimating.value) return
  
  if (currentStep.value < totalSteps.value - 1) {
    isAnimating.value = true
    await animateOut(1)

    if (currentStep.value === 1) {
      localStorage.setItem('phb_form_started_at', String(Date.now()))
      const source = sessionStorage.getItem('phb_source') || 'PHB Web'
      sessionStorage.removeItem('phb_source')
      sessionStorage.setItem('phb_form_source', source)
      const notaContent = buildNoteContent(formData.value, source)
      const contacto = {
        nombre: `${formData.value.nombre?.trim() || ''} ${formData.value.apellido?.trim() || ''}`.trim(),
        email: formData.value.email?.trim() || '',
        telefono: formData.value.telefono?.trim() || '',
        source,
      }
      await sendContactToGHL({ ...contacto, nota: notaContent, paso: '1-datos-basicos' })
      await sendNoteToGHL({ ...contacto, nota: notaContent, paso: '1-datos-basicos' })
    } else {
      const source = sessionStorage.getItem('phb_form_source') || 'PHB Web'
      const notaContent = buildNoteContent(formData.value, source)
      const contacto = {
        nombre: `${formData.value.nombre?.trim() || ''} ${formData.value.apellido?.trim() || ''}`.trim(),
        email: formData.value.email?.trim() || '',
        telefono: formData.value.telefono?.trim() || '',
        source,
      }
      await sendContactToGHL({ ...contacto, nota: notaContent, paso: `paso-${currentStep.value}` })
      await sendNoteToGHL({ ...contacto, nota: notaContent, paso: `paso-${currentStep.value}` })
    }

    currentStep.value++
    await nextTick()
    await animateIn(1)
    isAnimating.value = false
    
    // Auto-scroll to top of form
    const formEl = document.querySelector('.phb-form')
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    finish()
  }
}

async function prevStep() {
  if (isAnimating.value) return
  
  if (currentStep.value > 0) {
    isAnimating.value = true
    await animateOut(-1)
    currentStep.value--
    await nextTick()
    await animateIn(-1)
    isAnimating.value = false
  }
}

function animateOut(direction: number) {
  return new Promise<void>((resolve) => {
    const tl = gsap.timeline({ onComplete: resolve })
    tl.to('.phb-form__animate-el', {
      x: -20 * direction,
      opacity: 0,
      scale: 0.98,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in'
    })
  })
}

function animateIn(direction: number) {
  return new Promise<void>((resolve) => {
    gsap.set('.phb-form__animate-el', { 
      x: 20 * direction, 
      opacity: 0,
      scale: 1.02 
    })
    
    gsap.to('.phb-form__animate-el', {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
      onComplete: resolve
    })
  })
}

function finish() {
  const source = sessionStorage.getItem('phb_form_source') || 'PHB Web'
  const notaFinal = buildNoteContent(formData.value, source, true)
  const contacto = {
    nombre: `${formData.value.nombre?.trim() || ''} ${formData.value.apellido?.trim() || ''}`.trim(),
    email: formData.value.email?.trim() || '',
    telefono: formData.value.telefono?.trim() || '',
    source,
  }
  sendContactToGHL({ ...contacto, nota: notaFinal, paso: 'completado' })
  sendNoteToGHL({ ...contacto, nota: notaFinal, paso: 'completado' })
  const qualifica = formData.value.seller_experience !== 'No me interesa vender' && formData.value.approach !== ''
  sendQualificationToGHL({
    nombre: `${formData.value.nombre?.trim() || ''} ${formData.value.apellido?.trim() || ''}`.trim(),
    email: formData.value.email?.trim() || '',
    telefono: formData.value.telefono?.trim() || '',
    approach: formData.value.approach || '',
    sellerProfile: [
      formData.value.seller_experience || '',
      formData.value.seller_network || '',
      formData.value.seller_time || '',
    ].filter(Boolean).join(' | '),
    califica: qualifica,
    nota: notaFinal,
    paso: 'calificacion-final',
  })
  localStorage.removeItem('phb_form_started_at')
  sessionStorage.removeItem('phb_form_source')
  localStorage.setItem('phb_submitted', JSON.stringify({
    ...formData.value,
    source,
    submittedAt: new Date().toISOString(),
  }))
  emit('complete', formData.value)
}

function selectOption(qid: string, val: string) {
  formData.value[qid] = val
  // Subtle haptic-like effect on selected button
  gsap.fromTo(`.opt-${qid}-${val.replace(/\s+/g, '-')}`, 
    { scale: 0.98 }, 
    { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
  )
}

// Validation
const canContinue = computed(() => {
  if (currentStep.value === 0) return true // Intro
  
  const sectionIndex = currentStep.value - 1
  if (sectionIndex >= 0 && sectionIndex < sections.value.length) {
    const section = sections.value[sectionIndex]
    
    if (section.fields) {
      return section.fields.every((f: any) => {
        if (f.name === 'telefono') return phoneValid.value
        return !!formData.value[f.name]
      })
    }
    
    if (section.questions) {
      return section.questions.every((q: any) => {
        if (q.type === 'textarea') return true 
        return !!formData.value[q.id]
      })
    }
  }

  if (currentStep.value === totalSteps.value - 1) {
    return !!formData.value.final_confirmation
  }

  return true
})

const progress = computed(() => (currentStep.value / (totalSteps.value - 1)) * 100)
</script>

<template>
  <div class="phb-form">
    <!-- Progress Header -->
    <div class="phb-form__header" v-if="currentStep > 0">
      <div class="phb-form__progress-container">
        <div class="phb-form__progress-bar" :style="{ width: `${progress}%` }">
          <div class="phb-form__progress-glow"></div>
        </div>
      </div>
      <div class="phb-form__step-info phb-form__animate-el">
        <div class="phb-form__step-label">
          <span class="phb-form__step-name">{{ t.qualify.subtitle }}</span>
          <span class="phb-form__step-count">{{ currentStep }} / {{ totalSteps - 1 }}</span>
        </div>
      </div>
    </div>

    <div class="phb-form__container">
      <!-- Step 0: Intro -->
      <div v-if="currentStep === 0" class="phb-form__intro">
        <div class="phb-form__badge phb-form__animate-el">{{ t.qualify.subtitle }}</div>
        <h1 class="phb-form__title phb-form__animate-el">{{ t.qualify.intro.title }}</h1>
        <p class="phb-form__desc phb-form__animate-el">{{ t.qualify.intro.sub }}</p>
        <div class="phb-form__meta phb-form__animate-el">
          <span><i class="fa-regular fa-clock"></i> {{ t.qualify.intro.time }}</span>
        </div>
        <button class="btn-primary phb-form__animate-el" @click="nextStep">
          {{ t.qualify.intro.cta }}
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <!-- Section Steps -->
      <div v-else-if="currentStep > 0 && currentStep <= sections.length" class="phb-form__section">
        <div class="phb-form__section-header phb-form__animate-el">
          <div class="phb-form__section-icon">
            <i :class="sections[currentStep - 1].icon"></i>
          </div>
          <h2 class="phb-form__section-title">{{ sections[currentStep - 1].title }}</h2>
        </div>
        
        <!-- Fields (Grid for Step 1, Single for others) -->
        <div v-if="sections[currentStep - 1].fields" 
             class="phb-form__fields" 
             :class="{ 'phb-form__fields--grid': currentStep === 1 }">
          <div v-for="field in sections[currentStep - 1].fields" :key="field.name" class="phb-form__field-group phb-form__animate-el">
            <label :for="field.name">{{ field.label }}</label>

            <!-- Phone field with country selector -->
            <template v-if="field.name === 'telefono'">
              <div class="phb-form__phone-wrap">
                <button
                  type="button"
                  class="phb-form__country-trigger"
                  :aria-expanded="dropdownOpen"
                  aria-haspopup="listbox"
                  @click="dropdownOpen = !dropdownOpen"
                >
                  <span class="phb-form__flag">{{ selectedCountry.flag }}</span>
                  <span class="phb-form__dial">{{ selectedCountry.dial }}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="phb-form__chevron" :class="{ open: dropdownOpen }">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                <Transition name="dropdown">
                  <div v-if="dropdownOpen" class="phb-form__country-dropdown" role="listbox">
                    <input
                      type="text"
                      class="phb-form__country-search"
                      v-model="countrySearch"
                      placeholder="Buscar país..."
                      aria-label="Buscar país"
                    />
                    <ul>
                      <li
                        v-for="c in filteredCountries"
                        :key="c.code"
                        :class="['phb-form__country-item', { separator: c.code === '---', active: c.code === selectedCountry.code }]"
                        role="option"
                        :aria-selected="c.code === selectedCountry.code"
                        @click="selectCountry(c)"
                      >
                        <template v-if="c.code !== '---'">
                          <span class="phb-form__flag">{{ c.flag }}</span>
                          <span class="phb-form__country-name">{{ c.name }}</span>
                          <span class="phb-form__country-dial">{{ c.dial }}</span>
                        </template>
                        <template v-else>
                          <span class="phb-form__sep-line" aria-hidden="true" />
                        </template>
                      </li>
                    </ul>
                  </div>
                </Transition>

                <input
                  class="phb-form__input phb-form__phone-input"
                  type="tel"
                  :value="phoneRaw"
                  :id="field.name"
                  :placeholder="field.placeholder"
                  autocomplete="tel-national"
                  inputmode="tel"
                  @input="onPhoneInput"
                />

                <span class="phb-form__phone-status" :class="{ valid: phoneValid, invalid: phoneRaw && !phoneValid }" aria-hidden="true">
                  <svg v-if="phoneValid" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <svg v-else-if="phoneRaw && !phoneValid" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </span>
              </div>
              <span v-if="phoneValid && parsedPhoneE164" class="phb-form__phone-preview">
                {{ selectedCountry.flag }} {{ selectedCountry.dial }} {{ formattedPhone }}
              </span>
            </template>

            <!-- Regular fields -->
            <input 
              v-else
              :type="field.type" 
              :id="field.name" 
              v-model="formData[field.name]" 
              :placeholder="field.placeholder"
              class="phb-form__input"
            />
          </div>
        </div>

        <!-- Questions -->
        <div v-if="sections[currentStep - 1].questions" class="phb-form__questions">
          <div v-for="q in sections[currentStep - 1].questions" :key="q.id" class="phb-form__question-group">
            <p class="phb-form__question-text phb-form__animate-el">{{ q.text }}</p>
            
            <div v-if="q.options" class="phb-form__options">
              <button 
                v-for="opt in q.options" 
                :key="opt.label"
                @click="selectOption(q.id, opt.label)"
                :class="[
                  'phb-form__option', 
                  'phb-form__animate-el',
                  `opt-${q.id}-${opt.label.replace(/\s+/g, '-')}`,
                  { 'is-selected': formData[q.id] === opt.label }
                ]"
              >
                <span class="phb-form__radio"></span>
                <span class="phb-form__opt-label">{{ opt.label }}</span>
              </button>
              
              <Transition name="fade">
                <input 
                  v-if="q.options.some((o:any) => o.hasInput) && formData[q.id] && (q.options.find((o:any)=>o.label === formData[q.id]) as any)?.hasInput"
                  type="text"
                  v-model="formData[`${q.id}_other`]"
                  placeholder="Especificar..."
                  class="phb-form__input phb-form__input--small phb-form__animate-el"
                />
              </Transition>
            </div>


          </div>
        </div>
      </div>

      <!-- Final Confirmation -->
      <div v-else-if="currentStep === totalSteps - 1" class="phb-form__confirmation">
        <h1 class="phb-form__title phb-form__animate-el">{{ t.qualify.confirmation.title }}</h1>
        <div class="phb-form__conf-content">
          <p class="phb-form__animate-el">{{ t.qualify.confirmation.body1 }}</p>
          <p class="phb-form__animate-el"><strong>{{ t.qualify.confirmation.body2 }}</strong></p>
          <hr class="phb-form__animate-el"/>
          <p class="phb-form__question-text phb-form__animate-el">{{ t.qualify.confirmation.question }}</p>
          <div class="phb-form__options">
              <button 
                v-for="opt in t.qualify.confirmation.options" 
                :key="opt.label"
                @click="selectOption('final_confirmation', opt.label)"
                :class="[
                  'phb-form__option', 
                  'phb-form__animate-el',
                  { 'is-selected': formData.final_confirmation === opt.label }
                ]"
              >
                <span class="phb-form__radio"></span>
                 <span class="phb-form__opt-label">{{ opt.label }}</span>
              </button>
          </div>
        </div>
      </div>

      <!-- Navigation Footer -->
      <div class="phb-form__footer" v-if="currentStep > 0">
        <button class="btn-secondary phb-form__animate-el" @click="prevStep">
          <i class="fa-solid fa-chevron-left"></i>
          Atrás
        </button>
        <button class="btn-primary phb-form__animate-el" @click="nextStep" :disabled="!canContinue">
          {{ currentStep === totalSteps - 1 ? 'Finalizar' : t.qualify.next }}
          <i class="fa-solid fa-chevron-right" v-if="currentStep < totalSteps - 1"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.phb-form {
  width: 100%;
  max-width: 700px; // Slightly wider for grid
  margin: 0 auto;
  position: relative;
  background: rgba(13, 15, 40, 0.45);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 
    0 30px 100px rgba(0, 0, 0, 0.5),
    inset 0 0 40px rgba(255, 255, 255, 0.02);

  &__header {
    padding: 3rem 3rem 0;
  }

  &__progress-container {
    height: 3px; // Thinner for a more professional look
    background: rgba(255, 255, 255, 0.03);
    border-radius: 100px;
    margin-bottom: 2rem;
    overflow: hidden;
    position: relative;
  }

  &__progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--phb-cyan, #21bcfa), var(--phb-blue, #1278f3));
    transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
  }

  &__progress-glow {
    position: absolute;
    top: 0; right: 0; bottom: 0;
    width: 30px;
    background: linear-gradient(90deg, transparent, var(--phb-cyan, #21bcfa));
    filter: blur(5px);
    opacity: 0.8;
  }

  &__step-info {
    margin-top: 1rem;
  }

  &__step-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__step-name {
    font-size: 0.65rem;
    color: var(--phb-cyan, #21bcfa);
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-weight: 900;
  }

  &__step-count {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.3);
    font-family: var(--font-mono, monospace);
    font-weight: 700;
  }

  &__container {
    padding: 3.5rem 3rem;
  }

  &__intro {
    text-align: center;
  }

  &__badge {
    display: inline-block;
    padding: 0.6rem 1.75rem;
    background: rgba(33, 188, 250, 0.1);
    color: var(--phb-cyan, #21bcfa);
    border: 1px solid rgba(33, 188, 250, 0.2);
    border-radius: 100px;
    font-size: 0.7rem;
    font-weight: 900;
    margin-bottom: 2.5rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  &__title {
    font-size: clamp(2rem, 5vw, 2.75rem);
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    color: #fff;
    
    strong { font-weight: 700; color: var(--phb-cyan, #21bcfa); }
  }

  &__desc {
    font-size: 1.15rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 3rem;
    max-width: 90%;
    margin-inline: auto;
  }

  &__meta {
    margin-bottom: 3.5rem;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.3);
    display: flex;
    justify-content: center;
    gap: 2.5rem;
    
    i { margin-right: 0.7rem; color: var(--phb-cyan, #21bcfa); }
  }

  &__section-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 3.5rem;

    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.08), transparent);
    }
  }

  &__section-icon {
    width: 54px;
    height: 54px;
    background: rgba(33, 188, 250, 0.05);
    border: 1px solid rgba(33, 188, 250, 0.2);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--phb-cyan, #21bcfa);
    font-size: 1.5rem;
    box-shadow: 0 0 20px rgba(33, 188, 250, 0.1);
  }

  &__section-title {
    font-size: 1.75rem;
    font-weight: 300; // Lighter weight for a more professional feel
    color: #fff;
    margin: 0;
    letter-spacing: -0.01em;

    strong {
      font-weight: 700;
      color: var(--phb-cyan, #21bcfa);
    }
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &--grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem 2rem;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }
  }

  &__field-group {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    
    label {
      font-size: 0.85rem;
      font-weight: 800;
      color: rgba(255, 255, 255, 0.25);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding-left: 0.5rem;
    }
  }

  &__input {
    width: 100%;
    padding: 1.4rem 1.75rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    color: #fff;
    font-size: 1.1rem;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

    &:focus {
      outline: none;
      border-color: var(--phb-cyan, #21bcfa);
      background: rgba(255, 255, 255, 0.05);
      box-shadow: 0 0 30px rgba(33, 188, 250, 0.1);
      transform: translateY(-2px);
    }

    &--small {
      margin-top: 1rem;
      padding: 1.1rem 1.5rem;
      font-size: 1rem;
    }
  }

  &__option {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.4rem 1.75rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 20px;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    text-align: left;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    font-size: 1.05rem;
    position: relative;
    overflow: hidden;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateX(10px);
      color: #fff;
    }

    &.is-selected {
      background: rgba(33, 188, 250, 0.08);
      border-color: var(--phb-cyan, #21bcfa);
      color: #fff;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
      
      .phb-form__radio {
        border-color: var(--phb-cyan, #21bcfa);
        background: rgba(33, 188, 250, 0.1);
        &::after {
          content: '';
          position: absolute;
          inset: 4px;
          background: var(--phb-cyan, #21bcfa);
          border-radius: 50%;
          box-shadow: 0 0 12px var(--phb-cyan, #21bcfa);
        }
      }
    }
  }

  &__radio {
    width: 24px;
    height: 24px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    position: relative;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  &__opt-label {
    font-weight: 500;
  }

  &__textarea {
    width: 100%;
    min-height: 180px;
    padding: 1.5rem 1.75rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    color: #fff;
    font-size: 1.1rem;
    resize: vertical;
    transition: all 0.4s;

    &:focus {
      outline: none;
      border-color: var(--phb-cyan, #21bcfa);
      background: rgba(255, 255, 255, 0.05);
    }
  }

  &__footer {
    padding-top: 3rem;
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    margin-top: 2rem;
  }

  &__conf-content {
    color: rgba(255, 255, 255, 0.45);
    font-size: 1.15rem;
    line-height: 1.8;
    
    p { margin-bottom: 2rem; }
    strong { color: #fff; font-weight: 700; }
    
    hr { border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 3rem 0; }
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__question-text {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 2rem;
    line-height: 1.4;
    color: #fff;
  }

  // ── Phone selector ──────────────────────────────────────────────────
  &__phone-wrap {
    position: relative;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    overflow: visible;
    transition: border-color 0.2s;

    &:focus-within {
      border-color: var(--phb-cyan, #21bcfa);
      box-shadow: 0 0 30px rgba(33, 188, 250, 0.1);
    }
  }

  &__country-trigger {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 1.4rem 1rem 1.4rem 1.75rem;
    background: none;
    border: none;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    cursor: pointer;
    color: #fff;
    white-space: nowrap;
    flex-shrink: 0;
    border-radius: 20px 0 0 20px;
    font-size: 1rem;

    &:hover {
      background: rgba(255, 255, 255, 0.04);
    }
  }

  &__flag {
    font-size: 1.3rem;
    line-height: 1;
  }

  &__dial {
    font-family: var(--font-mono, monospace);
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
  }

  &__chevron {
    opacity: 0.4;
    transition: transform 0.2s ease;
    &.open { transform: rotate(180deg); opacity: 0.7; }
  }

  &__country-dropdown {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 200;
    width: 300px;
    max-height: 260px;
    overflow: hidden;
    background: #16111f;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;

    ul {
      list-style: none;
      padding: 4px;
      margin: 0;
      overflow-y: auto;
      max-height: 210px;

      &::-webkit-scrollbar { width: 4px; }
      &::-webkit-scrollbar-track { background: transparent; }
      &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
    }
  }

  &__country-search {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.04);
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    color: #fff;
    font-size: 0.9rem;
    outline: none;
    border-radius: 16px 16px 0 0;

    &::placeholder { color: rgba(255, 255, 255, 0.25); }
  }

  &__country-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.15s;

    &:hover:not(.separator) { background: rgba(33, 188, 250, 0.1); }
    &.active { background: rgba(33, 188, 250, 0.15); }
    &.separator { padding: 4px 12px; cursor: default; }
  }

  &__country-name {
    font-size: 0.88rem;
    color: rgba(255, 255, 255, 0.75);
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__country-dial {
    font-family: var(--font-mono, monospace);
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.35);
    flex-shrink: 0;
  }

  &__sep-line {
    display: block;
    height: 1px;
    width: 100%;
    background: rgba(255, 255, 255, 0.07);
  }

  &__phone-input {
    flex: 1;
    min-width: 0;
    background: transparent !important;
    border: none !important;
    border-radius: 0 !important;
    padding: 1.4rem 44px 1.4rem 14px !important;
    font-size: 1.1rem !important;
    color: #fff;
    outline: none !important;
    box-shadow: none !important;

    &::placeholder { color: rgba(255, 255, 255, 0.22); }
  }

  &__phone-status {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &.valid { background: rgba(59, 183, 126, 0.15); color: #3bb77e; }
    &.invalid { background: rgba(255, 80, 100, 0.1); color: #ff6680; }
  }

  &__phone-preview {
    font-size: 0.78rem;
    color: rgba(59, 183, 126, 0.8);
    padding: 4px 0 0 4px;
  }
}

.btn-primary {
  background: #fff;
  color: #05060f;
  border: none;
  padding: 1.5rem 2.5rem;
  border-radius: 100px;
  font-weight: 900;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(33, 188, 251, 0.4);
    background: var(--phb-cyan, #21bcfa);
    color: #fff;
  }
  
  &:disabled {
    opacity: 0.15;
    cursor: not-allowed;
    filter: grayscale(1);
  }
}

.btn-secondary {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 1.5rem 2.25rem;
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  transition: all 0.4s;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.4);
  }
}

.fade-enter-active, .fade-leave-active { transition: all 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(10px); }

.dropdown-enter-active { transition: opacity 0.18s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
.dropdown-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.dropdown-enter-from { opacity: 0; transform: translateY(-8px) scale(0.97); }
.dropdown-leave-to { opacity: 0; transform: translateY(-4px) scale(0.98); }

@media (max-width: 768px) {
  .phb-form {
    border-radius: 30px;
    
    &__container { padding: 2.5rem 2rem; }
    &__section-title { font-size: 1.5rem; }
    &__footer { flex-direction: column-reverse; padding-bottom: 1rem; }
    .btn-primary, .btn-secondary { width: 100%; }
  }
}
</style>
