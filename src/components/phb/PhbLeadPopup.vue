<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js'

gsap.registerPlugin(ScrollTrigger)

import { useLocale } from '@/composables/useLocale'
import { useContactStore } from '@/stores/contact'
import { sendContactToGHL } from '@/services/ghl'

const { t } = useLocale()
const contactStore = useContactStore()

const isVisible = ref(false)
const hasBeenShown = ref(false)
const isLoading = ref(false)
const formRef = ref<HTMLElement | null>(null)

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  countryCode: 'ES' as CountryCode
})

const errors = ref({
  email: '',
  phone: ''
})

// Detect country based on locale and timezone
const detectCountry = () => {
  try {
    const locale = navigator.language || (navigator.languages && navigator.languages[0])
    if (locale && locale.includes('-')) {
      const region = locale.split('-')[1].toUpperCase()
      if (region.length === 2) {
        formData.value.countryCode = region as CountryCode
        return
      }
    }

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    const tzMap: Record<string, CountryCode> = {
      'Europe/Madrid': 'ES',
      'America/Mexico_City': 'MX',
      'America/Bogota': 'CO',
      'America/Argentina/Buenos_Aires': 'AR',
      'America/Santiago': 'CL',
      'America/Lima': 'PE',
      'America/Caracas': 'VE',
      'America/Guayaquil': 'EC',
      'America/Panama': 'PA',
      'America/Costa_Rica': 'CR',
      'America/Guatemala': 'GT',
      'America/Asuncion': 'PY',
      'America/Montevideo': 'UY',
      'America/La_Paz': 'BO',
      'America/Santo_Dominigo': 'DO',
      'America/Puerto_Rico': 'PR',
      'America/El_Salvador': 'SV',
      'America/Tegucigalpa': 'HN',
      'America/Managua': 'NI',
      'America/New_York': 'US',
      'America/Chicago': 'US',
      'America/Denver': 'US',
      'America/Los_Angeles': 'US',
      'Europe/Paris': 'FR',
      'Europe/London': 'GB',
      'Europe/Rome': 'IT'
    }

    for (const [key, value] of Object.entries(tzMap)) {
      if (tz.includes(key)) {
        formData.value.countryCode = value
        return
      }
    }
  } catch (e) {
    console.error('Country detection failed', e)
  }
}

const validatePhone = () => {
  const phoneNumber = parsePhoneNumberFromString(formData.value.phone, formData.value.countryCode)
  if (!phoneNumber || !phoneNumber.isValid()) {
    errors.value.phone = t.value.popup.errorPhone
    return false
  }
  errors.value.phone = ''
  formData.value.phone = phoneNumber.formatInternational()
  return true
}

const IS_DEV = window.location.hostname === 'localhost'
const FORTY_EIGHT_HOURS = 48 * 60 * 60 * 1000

function isPopupBlocked(): boolean {
  // Si el usuario ya comenzó el formulario de calificación
  if (localStorage.getItem('phb_form_started_at')) return true

  // Si ya envió el formulario — respetar ventana de 48h
  const submitted = localStorage.getItem('phb_submitted')
  if (submitted) {
    try {
      const data = JSON.parse(submitted)
      const elapsed = Date.now() - new Date(data.submittedAt).getTime()
      if (elapsed < FORTY_EIGHT_HOURS) return true
      // Si pasaron 48h, limpiar para permitir nuevo envío
      localStorage.removeItem('phb_submitted')
      localStorage.removeItem('phb_form_started_at')
    } catch {
      localStorage.removeItem('phb_submitted')
    }
    return false
  }

  return false
}

const showPopup = () => {
  if (hasBeenShown.value) return
  if (isPopupBlocked()) return
  // En prod, marcar como mostrado globalmente por 48h (localStorage)
  // para no re-mostrar al recargar. En localhost siempre se reinicia.
  if (!IS_DEV) {
    const popupShown = localStorage.getItem('phb_popup_shown_at')
    if (popupShown && Date.now() - Number(popupShown) < FORTY_EIGHT_HOURS) return
    localStorage.setItem('phb_popup_shown_at', String(Date.now()))
  }

  isVisible.value = true
  hasBeenShown.value = true
  
  setTimeout(() => {
    gsap.fromTo('.phb-popup__card', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
  }, 10)
}

const handleExitIntent = (e: MouseEvent) => {
  if (e.clientY <= 10 && !hasBeenShown.value && !isPopupBlocked()) {
    showPopup()
  }
}

const closePopup = () => {
  gsap.to('.phb-popup__card', {
    y: 50,
    opacity: 0,
    duration: 0.4,
    ease: 'power2.in',
    onComplete: () => {
      isVisible.value = false
    }
  })
}

const handleSubmit = async () => {
  if (!validatePhone()) return
  isLoading.value = true

  const nombre = formData.value.firstName.trim()
  const apellido = formData.value.lastName.trim()
  const nombreCompleto = `${nombre} ${apellido}`

  await sendContactToGHL({
    nombre: nombreCompleto,
    email: formData.value.email.trim(),
    telefono: formData.value.phone.trim(),
    source: 'Home PHB',
    nota: `Lead capturado desde popup Home PHB`,
    paso: 'popup-home',
  })

  contactStore.save({
    nombre,
    apellido,
    email: formData.value.email.trim(),
    telefono: formData.value.phone.trim(),
  })

  isLoading.value = false
  closePopup()
}

onMounted(() => {
  detectCountry()
  
  // Trigger by Scroll Percentage (15%)
  ScrollTrigger.create({
    trigger: 'body',
    start: '15% top',
    onEnter: () => showPopup()
  })

  // Trigger by Exit Intent
  document.addEventListener('mouseleave', handleExitIntent)
})

onUnmounted(() => {
  document.removeEventListener('mouseleave', handleExitIntent)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="phb-popup">
      <div class="phb-popup__overlay"></div>

      <div class="phb-popup__card" ref="formRef">
        <div class="phb-popup__banner">
          <i class="fa-solid fa-lock"></i>
          <span>REGÍSTRATE GRATIS PARA SEGUIR LEYENDO</span>
        </div>

        <button class="phb-popup__close" @click="closePopup">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="phb-popup__header">
          <div class="phb-popup__icon">
            <i class="fa-solid fa-dna"></i>
          </div>
          <h2 class="phb-popup__title">{{ t.popup.title }}</h2>
          <p class="phb-popup__subtitle">{{ t.popup.subtitle }}</p>
        </div>

        <form @submit.prevent="handleSubmit" class="phb-popup__form">
          <div class="phb-popup__row">
            <div class="phb-popup__field">
              <label>{{ t.popup.firstName }}</label>
              <input v-model="formData.firstName" type="text" placeholder="Ej. Juan" required />
            </div>
            <div class="phb-popup__field">
              <label>{{ t.popup.lastName }}</label>
              <input v-model="formData.lastName" type="text" placeholder="Ej. Pérez" required />
            </div>
          </div>

          <div class="phb-popup__field">
            <label>{{ t.popup.email }}</label>
            <input v-model="formData.email" type="email" placeholder="tu@empresa.com" required />
          </div>

          <div class="phb-popup__field">
            <label>{{ t.popup.phone }}</label>
            <div class="phb-popup__phone-input">
              <select v-model="formData.countryCode" class="phb-popup__country-select">
                <option value="AR">🇦🇷 +54</option>
                <option value="BO">🇧🇴 +591</option>
                <option value="CL">🇨🇱 +56</option>
                <option value="CO">🇨🇴 +57</option>
                <option value="CR">🇨🇷 +506</option>
                <option value="DO">🇩🇴 +1</option>
                <option value="EC">🇪🇨 +593</option>
                <option value="ES">🇪🇸 +34</option>
                <option value="GT">🇬🇹 +502</option>
                <option value="HN">🇭🇳 +504</option>
                <option value="MX">🇲🇽 +52</option>
                <option value="NI">🇳🇮 +505</option>
                <option value="PA">🇵🇦 +507</option>
                <option value="PE">🇵🇪 +51</option>
                <option value="PR">🇵🇷 +1</option>
                <option value="PY">🇵🇾 +595</option>
                <option value="SV">🇸🇻 +503</option>
                <option value="US">🇺🇸 +1</option>
                <option value="UY">🇺🇾 +598</option>
                <option value="VE">🇻🇪 +58</option>
              </select>
              <input 
                v-model="formData.phone" 
                type="tel" 
                :placeholder="t.popup.phone" 
                @blur="validatePhone"
                required 
              />
            </div>
          </div>

          <button type="submit" class="phb-popup__submit" :disabled="isLoading">
            <span v-if="!isLoading">{{ t.popup.submit }}</span>
            <span v-else class="phb-popup__loader"></span>
          </button>

          <p class="phb-popup__privacy">
            <i class="fa-solid fa-shield-halved"></i>
            {{ t.popup.privacy }}
          </p>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.phb-popup {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 57, 173, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    cursor: default;
  }

  &__card {
    position: relative;
    width: 100%;
    max-width: 440px;
    max-height: 90vh;
    background: #ffffff;
    border-radius: 28px;
    padding: 2rem;
    box-shadow: 0 50px 100px -20px rgba(0, 57, 173, 0.3);
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #0039ad, #21bcfa);
      z-index: 10;
    }

    // Mesh background for a premium feel
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(at 0% 0%, rgba(33, 188, 250, 0.05) 0%, transparent 50%),
        radial-gradient(at 100% 100%, rgba(0, 57, 173, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }
  }

  &__banner {
    background: linear-gradient(90deg, #004ecc, #21bcfa);
    padding: 1rem;
    margin: -2rem -2rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    box-shadow: 0 4px 12px rgba(0, 57, 173, 0.2);

    i {
      font-size: 0.9rem;
    }
  }

  &__close {
    position: absolute;
    top: 2.75rem;
    right: 1.5rem;
    background: transparent;
    border: none;
    color: #94a3b8;
    font-size: 1.25rem;
    cursor: pointer;
    z-index: 20;
    padding: 0.5rem;
    transition: all 0.2s;

    &:hover {
      color: #0039ad;
      transform: rotate(90deg);
    }
  }

  &__header {
    text-align: center;
    margin-bottom: 1.5rem;
    flex-shrink: 0;
  }

  &__progress {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin: 1rem 0;

    &-dot {
      width: 30px;
      height: 4px;
      background: #e2e8f0;
      border-radius: 2px;
      transition: all 0.3s ease;

      &.is-active {
        background: #0039ad;
        width: 50px;
      }
    }
  }

  &__icon {
    font-size: 2rem;
    color: #0039ad;
    margin-bottom: 0.75rem;
    animation: pulse 2s infinite ease-in-out;
  }

  &__title {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: clamp(1.25rem, 5vw, 1.6rem);
    font-weight: 700;
    color: #0039ad;
    margin-bottom: 0.5rem;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    margin-top: 1rem;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 1.75rem;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    label {
      font-size: 0.8rem;
      font-weight: 800;
      color: #0039ad;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    input {
      padding: 1rem 1.2rem;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.2s;
      width: 100%;
      box-sizing: border-box;

      &:focus {
        outline: none;
        border-color: #0039ad;
        box-shadow: 0 0 0 3px rgba(0, 57, 173, 0.1);
      }
    }
  }

  &__phone-input {
    display: flex;
    gap: 0.75rem;

    input {
      flex: 1;
    }
  }

  &__country-select {
    padding: 1rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    background: #f8fafc;
    font-size: 0.95rem;
    cursor: pointer;
    font-family: inherit;
  }

  &__submit {
    margin-top: 1.5rem;
    padding: 1.2rem;
    background: #0039ad;
    color: #ffffff;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    width: 100%;

    &:hover:not(:disabled) {
      background: #002d8a;
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(0, 57, 173, 0.3);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &__loader {
    width: 22px;
    height: 22px;
    border: 3px solid #ffffff;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__privacy {
    text-align: center;
    font-size: 0.75rem;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    margin-top: 1.5rem;
    font-weight: 500;

    i {
      color: #10b981;
      font-size: 0.9rem;
    }
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
}
</style>
