<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useContactStore } from '@/stores/contact'
import { useLocale } from '@/composables/useLocale'

const router = useRouter()
const contactStore = useContactStore()
const { locale, t, toggleLocale } = useLocale()

onMounted(() => {
  if (!localStorage.getItem('phb_contact')) router.replace('/')
})

const contactName = computed(() => contactStore.contact.nombre.split(' ')[0] || '')

const step = ref(0) // 0 = intro, 1–3 = questions, 4 = evaluating
const answers = ref<Record<number, string>>({})

// Disqualification flags per question per option (index-based)
const disqualifyFlags = [
  [true, false, false, false],  // q1: < 3 months disqualifies
  [false, false, true],          // q2: never started disqualifies
  [false, false, false, true],   // q3: refuses labs disqualifies
]

const questions = computed(() =>
  t.value.qualify.questions.map((q, qi) => ({
    text: q.text,
    options: q.options.map((o, oi) => ({
      id: String.fromCharCode(97 + oi),
      label: o.label,
      disqualifies: disqualifyFlags[qi]?.[oi] ?? false,
    })),
  }))
)

const currentQuestion = computed(() => questions.value[step.value - 1])
const progress = computed(() => (step.value / 3) * 100)

function selectAnswer(optionId: string) {
  answers.value[step.value] = optionId
}

function nextStep() {
  if (step.value === 0) { step.value = 1; return }
  if (step.value < 3) { step.value++; return }
  evaluate()
}

const canContinue = computed(() => {
  if (step.value === 0) return true
  return !!answers.value[step.value]
})

function evaluate() {
  step.value = 4
  const disqualified = questions.value.some((q, qi) => {
    const answerId = answers.value[qi + 1]
    const option = q.options.find(o => o.id === answerId)
    return option?.disqualifies === true
  })

  setTimeout(() => {
    if (disqualified) {
      localStorage.setItem('phb_disq_at', String(Date.now()))
      router.push('/no-califica')
    } else {
      localStorage.setItem('phb_qualified_at', String(Date.now()))
      router.push('/agendar')
    }
  }, 2200)
}
</script>

<template>
  <div class="qualify">

    <nav class="qualify__nav">
      <img
        src="https://static.wixstatic.com/media/2361a8_1db8efe7c9d74e49be06a716224efb99~mv2.png"
        alt="PowerHouse Biotech"
        class="qualify__nav-logo"
      />
      <button class="lang-toggle" @click="toggleLocale" :aria-label="locale === 'es' ? 'Switch to English' : 'Cambiar a Español'">
        {{ locale === 'es' ? 'EN' : 'ES' }}
      </button>
    </nav>

    <div class="qualify__wrap">

      <!-- Intro slide -->
      <Transition name="slide" mode="out-in">
        <div v-if="step === 0" key="intro" class="qualify__card">
          <div class="qualify__icon">
            <i class="fa-solid fa-clipboard-list"></i>
          </div>
          <h1 class="qualify__title">
            {{ t.qualify.intro.title }}<span v-if="contactName">, {{ contactName }}</span>
          </h1>
          <p class="qualify__sub">{{ t.qualify.intro.sub }}</p>
          <p class="qualify__sub qualify__sub--muted">{{ t.qualify.intro.sub2 }}</p>
          <button class="btn btn--primary btn--lg" @click="nextStep">
            {{ t.qualify.intro.cta }}
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </Transition>

      <!-- Questions -->
      <Transition name="slide" mode="out-in">
        <div v-if="step >= 1 && step <= 3" :key="`q${step}`" class="qualify__card">
          <div class="qualify__progress">
            <div class="qualify__progress-bar" :style="{ width: `${progress}%` }"></div>
          </div>
          <div class="qualify__step-label">
            {{ t.qualify.stepOf ? `${step} ${t.qualify.stepOf} 3` : `Pregunta ${step} de 3` }}
          </div>

          <h2 class="qualify__question">{{ currentQuestion?.text }}</h2>

          <div class="qualify__options">
            <button
              v-for="opt in currentQuestion?.options"
              :key="opt.id"
              class="qualify__option"
              :class="{ 'is-selected': answers[step] === opt.id }"
              @click="selectAnswer(opt.id)"
            >
              <span class="qualify__option-radio">
                <i v-if="answers[step] === opt.id" class="fa-solid fa-circle-dot"></i>
                <i v-else class="fa-regular fa-circle"></i>
              </span>
              {{ opt.label }}
            </button>
          </div>

          <button
            class="btn btn--primary btn--lg"
            :disabled="!canContinue"
            @click="nextStep"
          >
            {{ step < 3 ? t.qualify.next : t.qualify.result }}
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </Transition>

      <!-- Evaluating -->
      <Transition name="slide" mode="out-in">
        <div v-if="step === 4" key="evaluating" class="qualify__card qualify__card--center">
          <div class="qualify__evaluating">
            <div class="qualify__evaluating-icon">
              <i class="fa-solid fa-dna fa-spin"></i>
            </div>
            <h2 class="qualify__title">{{ t.qualify.evaluating.title }}</h2>
            <p class="qualify__sub qualify__sub--muted">{{ t.qualify.evaluating.sub }}</p>
            <div class="qualify__loader">
              <div class="qualify__loader-bar"></div>
            </div>
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
    padding: 1rem 1.5rem;
    border-bottom: 1px solid c.$PHB-BORDER;
    display: flex;
    align-items: center;
    justify-content: center;
    background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-SM;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  &__nav-logo { height: 42px; width: auto; }

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
    background: rgba(107, 31, 191, 0.07);
    border: 1px solid rgba(107, 31, 191, 0.15);
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
      border-color: rgba(107, 31, 191, 0.3);
      background: rgba(107, 31, 191, 0.04);
      color: c.$PHB-TEXT-1;
    }

    &.is-selected {
      border-color: c.$PHB-PURPLE;
      background: rgba(107, 31, 191, 0.06);
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
    gap: 1.5rem;
    width: 100%;

    &-icon {
      font-size: 3rem;
      color: c.$PHB-PURPLE;
    }
  }

  &__loader {
    width: 100%;
    height: 4px;
    background: c.$PHB-BG-ALT;
    border-radius: 4px;
    overflow: hidden;

    &-bar {
      height: 100%;
      background: linear-gradient(90deg, c.$PHB-PURPLE, c.$PHB-CYAN);
      border-radius: 4px;
      animation: loadProgress 2s ease-in-out forwards;
    }
  }
}

.lang-toggle {
  position: absolute;
  right: 1.5rem;
  background: rgba(107, 31, 191, 0.07);
  color: c.$PHB-PURPLE;
  border: 1px solid rgba(107, 31, 191, 0.2);
  border-radius: 6px;
  padding: 0.3rem 0.7rem;
  font-family: f.$font-accent;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.06em;
  transition: all 0.2s;
  &:hover { background: rgba(107, 31, 191, 0.12); }
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
    box-shadow: 0 4px 18px rgba(107, 31, 191, 0.28);

    &:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-1px); }
  }

  &--lg { padding: 1.1rem 2.2rem; font-size: 1.05rem; border-radius: 10px; }

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
