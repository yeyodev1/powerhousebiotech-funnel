<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { useLocale } from '@/composables/useLocale'
// @ts-ignore
import { useContactStore } from '@/stores/contact'

const props = defineProps({
  initialStep: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['complete'])

const contactStore = useContactStore()
const { t } = useLocale()

// Form state
const currentStep = ref(props.initialStep)
const formData = ref<Record<string, any>>({
  nombre: contactStore.contact.nombre || '',
  apellido: '',
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

onMounted(() => {
  animateIn(1)
})

function finish() {
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
      return section.fields.every((f: any) => !!formData.value[f.name])
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
            <input 
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

            <textarea 
              v-else-if="q.type === 'textarea'"
              v-model="formData[q.id]"
              :placeholder="q.placeholder"
              class="phb-form__textarea phb-form__animate-el"
            ></textarea>
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
