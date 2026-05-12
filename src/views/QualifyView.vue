<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useContactStore } from '@/stores/contact'
import { useLocale } from '@/composables/useLocale'

import PhbPreQualForm from '@/components/phb/PhbPreQualForm.vue'

const router = useRouter()
const contactStore = useContactStore()
const { locale, t, toggleLocale } = useLocale()

const FORTY_EIGHT_HOURS = 48 * 60 * 60 * 1000

function hasValidSubmission(): boolean {
  const raw = localStorage.getItem('phb_submitted')
  if (!raw) return false
  try {
    const data = JSON.parse(raw)
    const elapsed = Date.now() - new Date(data.submittedAt).getTime()
    if (elapsed < FORTY_EIGHT_HOURS) return true
    localStorage.removeItem('phb_submitted')
    localStorage.removeItem('phb_form_started_at')
    localStorage.removeItem('phb_qualified_at')
  } catch {
    localStorage.removeItem('phb_submitted')
  }
  return false
}

const step = ref(hasValidSubmission() ? 3 : 1)

const whatsappUrl = computed(() => {
  const raw = localStorage.getItem('phb_submitted')
  const base = 'https://wa.me/5218261295279'
  if (!raw) return base
  try {
    const d = JSON.parse(raw)
    const name = `${d.nombre || ''} ${d.apellido || ''}`.trim()
    const parts = ['🫀 NUEVO PACIENTE PHB — Resumen']
    parts.push('')
    parts.push(`👤 ${name}`)
    if (d.email) parts.push(`📧 ${d.email}`)
    if (d.telefono) parts.push(`📱 ${d.telefono}`)
    if (d.approach) parts.push(`🎯 ${d.approach}`)
    if (d.diagnosis) parts.push(`🩺 Diagnóstico: ${d.diagnosis}${d.diagnosis_other ? ` (${d.diagnosis_other})` : ''}`)
    if (d.time_with_condition) parts.push(`⏳ Tiempo: ${d.time_with_condition}`)
    if (d.tried_before) parts.push(`🔄 Tratamientos previos: ${d.tried_before}`)
    if (d.investment_readiness) parts.push(`💰 Disposición: ${d.investment_readiness}`)
    return `${base}?text=${encodeURIComponent(parts.join('\n'))}`
  } catch { return base }
})
const submissionData = ref<any>(null)

function onFormComplete(data: any) {
  submissionData.value = data
  evaluate()
}

function evaluate() {
  step.value = 2
  
  // Logic based on answers (if any specific disqualification is needed)
  const disqualified = checkDisqualification(submissionData.value)

  setTimeout(() => {
    if (disqualified) {
      localStorage.setItem('phb_disq_at', String(Date.now()))
      router.push('/no-califica')
    } else {
      localStorage.setItem('phb_qualified_at', String(Date.now()))
      // Instead of redirecting to /agendar, we show the success message
      step.value = 3
    }
  }, 4000) // Increased slightly for a more "analytical" feel
}

function checkDisqualification(data: any) {
  if (!data.approach) return true
  if (!data.diagnosis) return true
  if (data.investment_readiness === 'Aún no estoy seguro' || data.investment_readiness === 'I am not sure yet') return true
  return false
}
</script>

<template>
  <div class="qualify">

    <nav class="qualify__nav">
      <div class="qualify__nav-inner">
        <router-link to="/" class="qualify__nav-logo-link">
          <span class="qualify__logo-mark">PHB</span>
          <span class="qualify__logo-text">Internal<br>System</span>
        </router-link>
        
        <button class="lang-toggle" @click="toggleLocale" :aria-label="locale === 'es' ? 'Switch to English' : 'Cambiar a Español'">
          <i class="fa-solid fa-language"></i>
          <span>{{ locale === 'es' ? 'EN' : 'ES' }}</span>
        </button>
      </div>
    </nav>

    <div class="qualify__wrap">

      <!-- Multi-step Form -->
      <Transition name="slide" mode="out-in">
        <PhbPreQualForm v-if="step === 1" @complete="onFormComplete" />
      </Transition>

      <!-- Step 2: Evaluating -->
      <Transition name="slide" mode="out-in">
        <div v-if="step === 2" key="evaluating" class="qualify__card qualify__card--center">
          <div class="qualify__evaluating">
            <div class="qualify__visual">
              <div class="qualify__dna-strand">
                <div v-for="n in 12" :key="n" class="qualify__dna-dot"></div>
              </div>
              <div class="qualify__pulse"></div>
            </div>
            
            <h2 class="qualify__title">{{ t.qualify.evaluating.title }}</h2>
            <p class="qualify__sub qualify__sub--muted">{{ t.qualify.evaluating.sub }}</p>
            
            <div class="qualify__loader">
              <div class="qualify__loader-bar"></div>
            </div>
            
            <div class="qualify__status-log">
              <div class="qualify__status-item">{{ locale === 'es' ? 'Analizando biomarcadores...' : 'Analyzing biomarkers...' }}</div>
              <div class="qualify__status-item">{{ locale === 'es' ? 'Verificando viabilidad regenerativa...' : 'Verifying regenerative viability...' }}</div>
              <div class="qualify__status-item">{{ locale === 'es' ? 'Cruzando datos clínicos...' : 'Cross-referencing clinical data...' }}</div>
            </div>
          </div>
        </div>

        <!-- Step 3: Success! -->
        <div v-else-if="step === 3" key="success" class="qualify__card qualify__card--center qualify__card--success">
          <div class="qualify__success-header">
            <div class="qualify__success-icon">
              <i class="fa-solid fa-circle-check"></i>
            </div>
          </div>
          
          <h2 class="qualify__title">{{ t.qualify.success.title }}</h2>
          <p class="qualify__success-message">{{ t.qualify.success.message }}</p>
          <p class="qualify__sub">{{ t.qualify.success.sub }}</p>

          <div class="qualify__success-actions">
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn--whatsapp btn--lg"
            >
              <i class="fa-brands fa-whatsapp"></i>
              Hablar con un agente ahora
            </a>

            <router-link to="/" class="btn btn--ghost btn--lg">
              {{ t.qualify.success.cta }}
            </router-link>
          </div>
        </div>
      </Transition>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as c;
@use '@/styles/fonts.modules.scss' as f;

.qualify {
  min-height: 100vh;
  background: c.$PHB-BG;
  color: c.$PHB-TEXT-1;

  &__nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    height: 64px;
    background: rgba(10, 11, 40, 0.7); // Deeper navy
    backdrop-filter: blur(30px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__nav-inner {
    width: 100%;
    max-width: 1400px;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__nav-logo-link {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
  }

  &__logo-mark {
    font-size: 20px;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: var(--phb-cyan, #21bcfa);
  }

  &__logo-text {
    font-size: 9px;
    font-weight: 600;
    line-height: 1.25;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    padding-left: 12px;
  }

  &__wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 73px);
    padding: 2rem 1.5rem;
  }

  &__card {
    background: c.$PHB-SURFACE;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 20px;
    padding: 2.5rem;
    width: 100%;
    max-width: 560px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    box-shadow: c.$PHB-SHADOW-MD;

    &--center { align-items: center; text-align: center; }
  }

  &__icon {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: rgba(18, 120, 243, 0.07);
    border: 1px solid rgba(18, 120, 243, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    color: c.$PHB-PURPLE;
    margin: 0 auto;
  }

  &__title {
    font-family: f.$font-principal;
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: 800;
    color: c.$PHB-TEXT-1;
    margin: 0;
    text-align: center;
  }

  &__sub {
    font-family: f.$font-secondary;
    font-size: 1rem;
    color: c.$PHB-TEXT-2;
    line-height: 1.7;
    margin: 0;
    text-align: center;

    &--muted { color: c.$PHB-TEXT-3; font-size: 0.9rem; }
  }

  &__progress {
    height: 4px;
    background: c.$PHB-BG-ALT;
    border-radius: 4px;
    overflow: hidden;

    &-bar {
      height: 100%;
      background: linear-gradient(90deg, c.$PHB-PURPLE, c.$PHB-CYAN);
      border-radius: 4px;
      transition: width 0.4s ease;
    }
  }

  &__step-label {
    font-family: f.$font-accent;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: c.$PHB-PURPLE;
  }

  &__question {
    font-family: f.$font-principal;
    font-size: 1.15rem;
    font-weight: 700;
    color: c.$PHB-TEXT-1;
    line-height: 1.45;
    margin: 0;
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  &__option {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 1rem 1.2rem;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 10px;
    background: c.$PHB-BG;
    color: c.$PHB-TEXT-2;
    font-family: f.$font-secondary;
    font-size: 0.95rem;
    cursor: pointer;
    text-align: left;
    transition: all 0.15s;

    &:hover {
      border-color: rgba(18, 120, 243, 0.3);
      background: rgba(18, 120, 243, 0.04);
      color: c.$PHB-TEXT-1;
    }

    &.is-selected {
      border-color: c.$PHB-PURPLE;
      background: rgba(18, 120, 243, 0.06);
      color: c.$PHB-TEXT-1;
    }

    &-radio {
      font-size: 1rem;
      color: c.$PHB-PURPLE;
      flex-shrink: 0;
    }
  }

  &__evaluating {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 100%;
  }

  &__visual {
    position: relative;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }

  &__dna-strand {
    display: flex;
    gap: 6px;
    height: 40px;
    align-items: center;
  }

  &__dna-dot {
    width: 4px;
    height: 4px;
    background: var(--phb-cyan, #21bcfa);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--phb-cyan, #21bcfa);
    animation: dna-bounce 1s infinite ease-in-out;

    @for $i from 1 through 12 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.1}s;
      }
    }
  }

  @keyframes dna-bounce {
    0%, 100% { transform: translateY(-10px); opacity: 0.3; }
    50% { transform: translateY(10px); opacity: 1; }
  }

  &__pulse {
    position: absolute;
    inset: -10px;
    border: 2px solid rgba(33, 188, 250, 0.2);
    border-radius: 50%;
    animation: visual-pulse 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes visual-pulse {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  &__status-log {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  &__status-item {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.3);
    text-align: center;
    font-weight: 500;
    letter-spacing: 0.05em;
    animation: fade-in-up 0.5s forwards;
    opacity: 0;

    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.8}s;
      }
    }
  }

  @keyframes fade-in-up {
    from { transform: translateY(10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  &__loader {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 100px;
    overflow: hidden;
    position: relative;

    &-bar {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      background: linear-gradient(90deg, var(--phb-cyan, #21bcfa), #fff);
      box-shadow: 0 0 15px var(--phb-cyan, #21bcfa);
      animation: loader-progress 3s forwards cubic-bezier(0.65, 0, 0.35, 1);
    }
  }

  @keyframes loader-progress {
    0% { width: 0; }
    100% { width: 100%; }
  }

  &__card--success {
    background: rgba(33, 188, 250, 0.02);
    border-color: rgba(33, 188, 250, 0.2);
    padding: 4rem 3rem;
  }

  &__success-header {
    margin-bottom: 2rem;
  }

  &__success-icon {
    width: 80px;
    height: 80px;
    background: rgba(33, 188, 250, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: var(--phb-cyan, #21bcfa);
    box-shadow: 0 0 40px rgba(33, 188, 250, 0.2);
    margin: 0 auto;
  }

  &__success-message {
    font-size: 1.25rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 1rem;
  }

  &__back-btn {
    margin-top: 3rem;
    min-width: 240px;
  }

  &__success-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
    width: 100%;
    max-width: 340px;
  }
}

.lang-toggle {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;

  i {
    font-size: 14px;
    color: var(--phb-cyan, #21bcfa);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(33, 188, 251, 0.3);
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-family: f.$font-accent;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &--primary {
    background: c.$PHB-PURPLE;
    color: #fff;
    padding: 0.9rem 1.8rem;
    font-size: 1rem;
    box-shadow: 0 4px 18px rgba(18, 120, 243, 0.28);

    &:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-1px); }
  }

  &--lg { padding: 1.1rem 2.2rem; font-size: 1.05rem; border-radius: 10px; width: 100%; }

  &--whatsapp {
    background: #25D366;
    color: #fff;
    padding: 0.9rem 1.8rem;
    font-size: 1rem;
    box-shadow: 0 4px 18px rgba(37, 211, 102, 0.3);
    i { font-size: 1.3rem; }
    &:hover { filter: brightness(1.08); transform: translateY(-2px); }
  }

  &--ghost {
    background: transparent;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    &:hover { color: rgba(255, 255, 255, 0.7); border-color: rgba(255, 255, 255, 0.25); }
  }

  &:disabled { opacity: 0.4; cursor: not-allowed; }
}

@keyframes loadProgress {
  0%   { width: 0%; }
  60%  { width: 85%; }
  100% { width: 100%; }
}

.slide-enter-active { transition: all 0.3s ease; }
.slide-leave-active { transition: all 0.2s ease; }
.slide-enter-from   { opacity: 0; transform: translateX(24px); }
.slide-leave-to     { opacity: 0; transform: translateX(-24px); }
</style>
