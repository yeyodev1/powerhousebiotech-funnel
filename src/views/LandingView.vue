<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useContactStore } from '@/stores/contact'
import { useLocale } from '@/composables/useLocale'
import SocialProofToast from '@/components/SocialProofToast.vue'

const router = useRouter()
const contactStore = useContactStore()
const { t, locale, toggleLocale } = useLocale()

const showModal = ref(false)
const submitting = ref(false)
const form = ref({ nombre: '', email: '', telefono: '' })
const errors = ref({ nombre: '', email: '', telefono: '' })

function openModal() {
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  showModal.value = false
  document.body.style.overflow = ''
}

function validate() {
  errors.value = { nombre: '', email: '', telefono: '' }
  let ok = true
  if (!form.value.nombre.trim()) { errors.value.nombre = t.value.modal.nombre.error; ok = false }
  if (!form.value.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = t.value.modal.email.error; ok = false
  }
  if (!form.value.telefono.trim()) { errors.value.telefono = t.value.modal.telefono.error; ok = false }
  return ok
}

async function submit() {
  if (!validate() || submitting.value) return
  submitting.value = true
  contactStore.save({
    nombre: form.value.nombre.trim(),
    email: form.value.email.trim(),
    telefono: form.value.telefono.trim(),
  })
  await new Promise(r => setTimeout(r, 500))
  router.push('/cualificar')
}
</script>

<template>
  <div class="landing">

    <!-- NAVBAR -->
    <nav class="navbar">
      <div class="navbar__inner">
        <img
          class="navbar__logo"
          src="https://static.wixstatic.com/media/2361a8_1db8efe7c9d74e49be06a716224efb99~mv2.png"
          alt="PowerHouse Biotech"
        />
        <div class="navbar__actions">
          <button class="lang-toggle" @click="toggleLocale" :aria-label="`Switch to ${locale === 'es' ? 'English' : 'Español'}`">
            <i class="fa-solid fa-globe"></i>
            <span>{{ locale === 'es' ? 'EN' : 'ES' }}</span>
          </button>
          <button class="btn btn--primary-sm" @click="openModal">
            {{ t.nav.cta }}
          </button>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero">
      <div class="hero__glow hero__glow--purple"></div>
      <div class="hero__glow hero__glow--cyan"></div>
      <div class="container">
        <div class="hero__badge">
          <i class="fa-solid fa-dna"></i>
          {{ t.hero.badge }}
        </div>
        <h1 class="hero__title">
          <span class="hero__title--dim">{{ t.hero.title1 }}</span>
          <br>
          <span class="hero__title--main">{{ t.hero.title2 }}</span>
        </h1>
        <p class="hero__sub">
          {{ t.hero.sub }}<br>
          <strong>{{ t.hero.sub2 }}</strong>
        </p>
        <p class="hero__intro">
          {{ t.hero.intro }}
          <strong>{{ t.hero.introHighlight }}</strong>
          {{ t.hero.introTruth }}
        </p>
        <div class="hero__stats">
          <div v-for="s in t.hero.stats" :key="s.value" class="hero__stat">
            <span class="hero__stat-value">{{ s.value }}</span>
            <span class="hero__stat-label">{{ s.label }}</span>
          </div>
        </div>
        <button class="btn btn--primary btn--lg" @click="openModal">
          <i class="fa-solid fa-microscope"></i>
          {{ t.hero.cta }}
        </button>
        <p class="hero__disclaimer">
          <i class="fa-solid fa-lock"></i>
          {{ t.hero.disclaimer }}
        </p>
      </div>
    </section>

    <!-- PROBLEMA -->
    <section class="problem">
      <div class="container">
        <div class="section-label">{{ t.problem.label }}</div>
        <h2 class="section-title">
          {{ t.problem.title }}
          <span class="text-purple">{{ t.problem.titleAccent }}</span>
        </h2>
        <p class="section-sub">{{ t.problem.sub }}</p>

        <div class="problem__cards">
          <div v-for="(p, i) in t.problem.cards" :key="i" class="problem__card">
            <div class="problem__card-icon">
              <i :class="['fa-solid', i === 0 ? 'fa-flask' : i === 1 ? 'fa-pills' : 'fa-heart-pulse']"></i>
            </div>
            <h3 class="problem__card-title">{{ p.title }}</h3>
            <p class="problem__card-desc">{{ p.desc }}</p>
          </div>
        </div>

        <div class="problem__truth">
          <div class="problem__truth-label">{{ t.problem.truthLabel }}</div>
          <p class="problem__truth-text">{{ t.problem.truthText }}</p>
          <p class="problem__truth-key">
            {{ t.problem.truthKey }}<br>
            <strong>{{ t.problem.truthKey2 }}</strong>
          </p>
          <p class="problem__truth-close">{{ t.problem.truthClose }}</p>
        </div>
      </div>
    </section>

    <!-- DATOS -->
    <section class="data">
      <div class="container">
        <div class="section-label">{{ t.data.label }}</div>
        <h2 class="section-title">{{ t.data.title }}</h2>
        <div class="data__grid">
          <div v-for="(d, i) in t.data.points" :key="i" class="data__item">
            <i class="fa-solid fa-circle-dot"></i>
            {{ d }}
          </div>
        </div>
      </div>
    </section>

    <!-- SOLUCIÓN / EVR -->
    <section class="solution">
      <div class="container">
        <div class="solution__badge">
          <i class="fa-solid fa-shield-halved"></i>
          {{ t.solution.badge }}
        </div>
        <h2 class="section-title">
          {{ t.solution.title }}
          <span class="text-purple">{{ t.solution.titleAccent }}</span>
        </h2>
        <p class="solution__question">{{ t.solution.question }}</p>
        <p class="solution__big-q">{{ t.solution.bigQ }}</p>

        <div class="solution__pillars">
          <div v-for="(p, i) in t.solution.pillars" :key="i" class="solution__pillar">
            <i :class="['fa-solid', i === 0 ? 'fa-magnifying-glass-chart' : i === 1 ? 'fa-vial' : 'fa-compass']"></i>
            <span>{{ p }}</span>
          </div>
        </div>

        <div class="solution__notice">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <div><strong>{{ locale === 'es' ? 'Importante:' : 'Important:' }}</strong> {{ t.solution.notice }}</div>
        </div>

        <div class="solution__discover">
          <h3 class="solution__discover-title">
            <i class="fa-solid fa-magnifying-glass"></i>
            {{ t.solution.discoverTitle }}
          </h3>
          <ul class="solution__bullets">
            <li v-for="b in t.solution.bullets" :key="b">
              <i class="fa-solid fa-check"></i>{{ b }}
            </li>
          </ul>
        </div>

        <div class="solution__cta-wrap">
          <p class="solution__cta-copy">{{ t.solution.ctaCopy }}</p>
          <button class="btn btn--primary btn--lg" @click="openModal">
            <i class="fa-solid fa-arrow-right"></i>
            {{ t.solution.cta }}
          </button>
        </div>
      </div>
    </section>

    <!-- PRUEBA SOCIAL -->
    <section class="proof">
      <div class="container">
        <div class="section-label">{{ t.proof.label }}</div>
        <h2 class="section-title">
          {{ t.proof.title }}
          <span class="text-purple">{{ t.proof.titleAccent }}</span>
        </h2>
        <div class="proof__cases">
          <div v-for="c in t.proof.cases" :key="c.tag" class="proof__case">
            <div class="proof__case-tag">{{ c.tag }}</div>
            <p class="proof__case-context">{{ c.context }}</p>
            <div class="proof__case-finding">
              <i class="fa-solid fa-arrow-right"></i>
              {{ c.finding }}
            </div>
            <div class="proof__case-results">
              <div v-for="r in c.results" :key="r" class="proof__case-result">
                <i class="fa-solid fa-check"></i>{{ r }}
              </div>
            </div>
          </div>
        </div>
        <div class="proof__diff">
          <i class="fa-solid fa-star"></i>
          {{ t.proof.diff }}
        </div>
      </div>
    </section>

    <!-- MÉTODO DECIDE -->
    <section class="method">
      <div class="container">
        <div class="section-label">{{ t.method.label }}</div>
        <h2 class="section-title">
          {{ t.method.title }} <span class="text-purple">{{ t.method.titleAccent }}</span>
        </h2>
        <p class="section-sub">{{ t.method.sub }}</p>
        <div class="method__steps">
          <div v-for="step in t.method.steps" :key="step.num" class="method__step">
            <div class="method__step-num">{{ step.num }}</div>
            <div>
              <h3 class="method__step-name">{{ step.name }}</h3>
              <p class="method__step-desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>
        <div class="method__flow">
          <div v-for="(f, i) in t.method.flow" :key="i" class="method__flow-wrap">
            <div class="method__flow-item" :class="{ 'method__flow-item--last': i === t.method.flow.length - 1 }">
              <i :class="['fa-solid', i === 0 ? 'fa-brain' : i === 1 ? 'fa-chart-line' : i === 2 ? 'fa-flask' : 'fa-syringe']"></i>
              {{ f }}
            </div>
            <i v-if="i < t.method.flow.length - 1" class="fa-solid fa-chevron-right method__flow-arrow"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- CIERRE -->
    <section class="close-section">
      <div class="container">
        <h2 class="close-section__title">
          {{ t.close.title }}<br>
          <span class="text-purple">{{ t.close.titleAccent }}</span>
        </h2>
        <div class="close-section__waste">
          <div v-for="w in t.close.waste" :key="w" class="close-section__waste-item">
            <i class="fa-solid fa-xmark"></i>{{ w }}
          </div>
        </div>
        <div class="close-section__model">
          <h3 class="close-section__model-title">
            <i class="fa-solid fa-filter"></i>
            {{ t.close.modelTitle }}
          </h3>
          <p class="close-section__model-text">{{ t.close.modelText }}</p>
          <p class="close-section__model-sub">{{ t.close.modelSub }}</p>
        </div>
        <div class="close-section__ctas">
          <button class="btn btn--primary btn--xl" @click="openModal">
            <i class="fa-solid fa-calendar-check"></i>
            {{ t.close.cta }}
          </button>
        </div>
        <p class="close-section__microcopy">{{ t.close.microcopy }}</p>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container">
        <img
          class="footer__logo"
          src="https://static.wixstatic.com/media/2361a8_1db8efe7c9d74e49be06a716224efb99~mv2.png"
          alt="PowerHouse Biotech"
        />
        <p class="footer__copy">© {{ new Date().getFullYear() }} PowerHouse Biotech. {{ t.footer.rights }}</p>
        <div class="footer__links">
          <RouterLink to="/politicas-privacidad">{{ t.footer.privacy }}</RouterLink>
          <span>·</span>
          <RouterLink to="/aviso-legal">{{ t.footer.legal }}</RouterLink>
        </div>
      </div>
    </footer>

    <!-- MODAL CONTACTO -->
    <Transition name="modal">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-box">
          <button class="modal-box__close" @click="closeModal" aria-label="Cerrar">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="modal-box__header">
            <img
              src="https://static.wixstatic.com/media/2361a8_1db8efe7c9d74e49be06a716224efb99~mv2.png"
              alt="PowerHouse Biotech"
              class="modal-box__logo"
            />
            <h2 class="modal-box__title">{{ t.modal.title }}</h2>
            <p class="modal-box__sub">{{ t.modal.sub }}</p>
          </div>
          <form class="modal-form" @submit.prevent="submit" novalidate>
            <div class="modal-form__field" :class="{ 'has-error': errors.nombre }">
              <label for="m-nombre">{{ t.modal.nombre.label }}</label>
              <input id="m-nombre" v-model="form.nombre" type="text" :placeholder="t.modal.nombre.placeholder" autocomplete="name" />
              <span v-if="errors.nombre" class="modal-form__error">{{ errors.nombre }}</span>
            </div>
            <div class="modal-form__field" :class="{ 'has-error': errors.email }">
              <label for="m-email">{{ t.modal.email.label }}</label>
              <input id="m-email" v-model="form.email" type="email" :placeholder="t.modal.email.placeholder" autocomplete="email" />
              <span v-if="errors.email" class="modal-form__error">{{ errors.email }}</span>
            </div>
            <div class="modal-form__field" :class="{ 'has-error': errors.telefono }">
              <label for="m-tel">{{ t.modal.telefono.label }}</label>
              <input id="m-tel" v-model="form.telefono" type="tel" :placeholder="t.modal.telefono.placeholder" autocomplete="tel" />
              <span v-if="errors.telefono" class="modal-form__error">{{ errors.telefono }}</span>
            </div>
            <button type="submit" class="btn btn--primary btn--full" :disabled="submitting">
              <i v-if="!submitting" class="fa-solid fa-arrow-right"></i>
              <i v-else class="fa-solid fa-spinner fa-spin"></i>
              {{ submitting ? t.modal.submitting : t.modal.submit }}
            </button>
            <p class="modal-form__disclaimer">
              <i class="fa-solid fa-lock"></i>
              {{ t.modal.disclaimer }}
            </p>
          </form>
        </div>
      </div>
    </Transition>

    <SocialProofToast />
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as c;
@use '@/styles/fonts.modules.scss' as f;

// ── Helpers ───────────────────────────────────────────────────────────────────
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
}

.section-label {
  display: inline-block;
  font-family: f.$font-accent;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: c.$PHB-PURPLE;
  border: 1px solid rgba(107, 31, 191, 0.25);
  border-radius: 100px;
  padding: 0.3rem 0.9rem;
  margin-bottom: 1.2rem;
  background: rgba(107, 31, 191, 0.05);
}

.section-title {
  font-family: f.$font-principal;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: c.$PHB-TEXT-1;
  line-height: 1.2;
  margin: 0 0 1rem;
  span { display: block; }
}

.section-sub {
  font-family: f.$font-secondary;
  font-size: 1.05rem;
  color: c.$PHB-TEXT-3;
  line-height: 1.7;
  max-width: 700px;
  margin-bottom: 3rem;
}

.text-purple { color: c.$PHB-PURPLE; }

// ── Buttons ───────────────────────────────────────────────────────────────────
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: f.$font-accent;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &--primary {
    background: c.$PHB-PURPLE;
    color: #FFFFFF;
    padding: 0.9rem 1.8rem;
    font-size: 1rem;
    &:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(107, 31, 191, 0.3); }
  }

  &--primary-sm {
    background: c.$PHB-PURPLE;
    color: #FFFFFF;
    padding: 0.55rem 1.2rem;
    font-size: 0.88rem;
    border-radius: 8px;
    &:hover { filter: brightness(1.1); }
  }

  &--lg  { padding: 1.1rem 2.2rem; font-size: 1.05rem; border-radius: 10px; }
  &--xl  { padding: 1.3rem 2.8rem; font-size: 1.1rem;  border-radius: 10px; }
  &--full { width: 100%; justify-content: center; }
  &:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }
}

.lang-toggle {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  background: transparent;
  border: 1px solid c.$PHB-BORDER;
  border-radius: 8px;
  font-family: f.$font-accent;
  font-size: 0.82rem;
  font-weight: 600;
  color: c.$PHB-TEXT-2;
  cursor: pointer;
  transition: all 0.15s;
  i { color: c.$PHB-PURPLE; font-size: 0.85rem; }
  &:hover { background: rgba(107, 31, 191, 0.05); border-color: rgba(107, 31, 191, 0.3); color: c.$PHB-PURPLE; }
}

// ── Landing ───────────────────────────────────────────────────────────────────
.landing {
  background: c.$PHB-BG;
  min-height: 100vh;
  color: c.$PHB-TEXT-1;
}

// ── Navbar ────────────────────────────────────────────────────────────────────
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(245, 248, 255, 0.92);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid c.$PHB-BORDER;
  box-shadow: c.$PHB-SHADOW-XS;

  &__inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0.85rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__logo { height: 44px; width: auto; }
  &__actions { display: flex; align-items: center; gap: 0.7rem; }
}

// ── Hero ──────────────────────────────────────────────────────────────────────
.hero {
  position: relative;
  overflow: hidden;
  padding: 6rem 0 5rem;
  text-align: center;

  &__glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    &--purple {
      width: 600px; height: 600px;
      background: rgba(107, 31, 191, 0.07);
      top: -200px; left: 50%; transform: translateX(-50%);
    }
    &--cyan {
      width: 350px; height: 350px;
      background: rgba(11, 160, 200, 0.06);
      bottom: 0; right: 10%;
    }
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: f.$font-accent;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: c.$PHB-PURPLE;
    background: rgba(107, 31, 191, 0.06);
    border: 1px solid rgba(107, 31, 191, 0.2);
    border-radius: 100px;
    padding: 0.4rem 1rem;
    margin-bottom: 2rem;
  }

  &__title {
    font-family: f.$font-principal;
    font-size: clamp(2rem, 5vw, 3.4rem);
    font-weight: 800;
    line-height: 1.15;
    margin: 0 0 1.5rem;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    &--dim  { color: c.$PHB-TEXT-3; }
    &--main { color: c.$PHB-TEXT-1; }
  }

  &__sub {
    font-family: f.$font-secondary;
    font-size: 1.15rem;
    color: c.$PHB-TEXT-2;
    line-height: 1.7;
    margin: 0 auto 2.5rem;
    max-width: 600px;
  }

  &__intro {
    font-family: f.$font-secondary;
    font-size: 1rem;
    color: c.$PHB-TEXT-2;
    line-height: 1.8;
    max-width: 680px;
    margin: 0 auto 3rem;
    padding: 1.5rem 2rem;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 12px;
    background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-XS;
  }

  &__stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-width: 700px;
    margin: 0 auto 3rem;
    @media (min-width: 640px) { grid-template-columns: repeat(4, 1fr); }
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    padding: 1rem;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 10px;
    background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-XS;
    &-value {
      font-family: f.$font-principal;
      font-size: 1.8rem;
      font-weight: 800;
      color: c.$PHB-PURPLE;
    }
    &-label {
      font-family: f.$font-secondary;
      font-size: 0.75rem;
      color: c.$PHB-TEXT-3;
      text-align: center;
      line-height: 1.4;
    }
  }

  &__disclaimer {
    font-size: 0.8rem;
    color: c.$PHB-TEXT-3;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    i { color: c.$PHB-PURPLE; }
  }
}

// ── Problem ───────────────────────────────────────────────────────────────────
.problem {
  padding: 6rem 0;
  background: c.$PHB-BG-ALT;

  &__cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 4rem;
    @media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }
  }

  &__card {
    padding: 2rem;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 14px;
    background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-SM;
    transition: box-shadow 0.2s, transform 0.2s;
    &:hover { box-shadow: c.$PHB-SHADOW-MD; transform: translateY(-2px); }

    &-icon {
      width: 52px; height: 52px;
      border-radius: 12px;
      background: rgba(107, 31, 191, 0.07);
      border: 1px solid rgba(107, 31, 191, 0.15);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.3rem;
      color: c.$PHB-PURPLE;
      margin-bottom: 1.2rem;
    }
    &-title {
      font-family: f.$font-principal;
      font-size: 1.05rem;
      font-weight: 700;
      color: c.$PHB-TEXT-1;
      margin: 0 0 0.6rem;
    }
    &-desc {
      font-family: f.$font-secondary;
      font-size: 0.92rem;
      color: c.$PHB-TEXT-2;
      line-height: 1.6;
      margin: 0;
    }
  }

  &__truth {
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
    padding: 3rem 2rem;
    border: 1px solid rgba(107, 31, 191, 0.12);
    border-radius: 16px;
    background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-SM;

    &-label {
      font-size: 0.75rem; font-weight: 700;
      letter-spacing: 0.15em; text-transform: uppercase;
      color: c.$PHB-PURPLE; margin-bottom: 1rem;
    }
    &-text  { font-family: f.$font-secondary; font-size: 1.1rem; color: c.$PHB-TEXT-2; line-height: 1.7; margin-bottom: 1.5rem; }
    &-key   { font-family: f.$font-principal; font-size: 1.25rem; color: c.$PHB-TEXT-1; line-height: 1.5; margin-bottom: 1.5rem; }
    &-close { font-family: f.$font-secondary; font-size: 0.95rem; color: c.$PHB-TEXT-3; font-style: italic; }
  }
}

// ── Data ──────────────────────────────────────────────────────────────────────
.data {
  padding: 6rem 0;
  &__grid {
    display: grid; grid-template-columns: 1fr; gap: 1rem; margin-top: 1rem;
    @media (min-width: 640px) { grid-template-columns: repeat(2, 1fr); }
  }
  &__item {
    display: flex; gap: 0.8rem; align-items: flex-start;
    font-family: f.$font-secondary; font-size: 0.92rem;
    color: c.$PHB-TEXT-2; line-height: 1.5;
    padding: 1rem 1.2rem;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 10px;
    background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-XS;
    i { color: c.$PHB-PURPLE; font-size: 0.5rem; margin-top: 0.5rem; flex-shrink: 0; }
  }
}

// ── Solution ──────────────────────────────────────────────────────────────────
.solution {
  padding: 7rem 0;
  background: c.$PHB-BG-ALT;

  &__badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-family: f.$font-accent; font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: c.$PHB-CYAN; border: 1px solid rgba(11, 160, 200, 0.3);
    border-radius: 100px; padding: 0.3rem 1rem; margin-bottom: 1.5rem;
    background: rgba(11, 160, 200, 0.06);
  }

  &__question { font-family: f.$font-secondary; font-size: 1.1rem; color: c.$PHB-TEXT-2; margin: 0 0 0.5rem; }
  &__big-q {
    font-family: f.$font-principal;
    font-size: clamp(1.5rem, 3.5vw, 2.2rem);
    font-weight: 800; color: c.$PHB-TEXT-1;
    margin: 0 0 3.5rem; line-height: 1.3;
  }

  &__pillars {
    display: grid; grid-template-columns: 1fr; gap: 1rem; margin-bottom: 3rem;
    @media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }
  }
  &__pillar {
    display: flex; gap: 1rem; align-items: flex-start;
    padding: 1.5rem; border: 1px solid c.$PHB-BORDER;
    border-radius: 12px; background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-XS;
    font-family: f.$font-secondary; font-size: 0.92rem;
    color: c.$PHB-TEXT-2; line-height: 1.5;
    i { color: c.$PHB-CYAN; font-size: 1.2rem; flex-shrink: 0; margin-top: 0.1rem; }
  }

  &__notice {
    display: flex; gap: 1rem; align-items: flex-start;
    padding: 1.5rem 2rem;
    border: 1px solid rgba(255, 170, 0, 0.2);
    border-radius: 12px; background: rgba(255, 170, 0, 0.04);
    margin-bottom: 3rem;
    font-family: f.$font-secondary; font-size: 0.95rem;
    color: c.$PHB-TEXT-2; line-height: 1.6;
    i { color: #CC8800; font-size: 1.1rem; flex-shrink: 0; margin-top: 0.1rem; }
  }

  &__discover {
    margin-bottom: 3rem;
    &-title {
      display: flex; align-items: center; gap: 0.7rem;
      font-family: f.$font-principal; font-size: 1.2rem;
      font-weight: 700; color: c.$PHB-TEXT-1; margin-bottom: 1.5rem;
      i { color: c.$PHB-PURPLE; }
    }
  }

  &__bullets {
    list-style: none; padding: 0; margin: 0;
    display: grid; grid-template-columns: 1fr; gap: 0.8rem;
    @media (min-width: 640px) { grid-template-columns: repeat(2, 1fr); }
    li {
      display: flex; gap: 0.7rem; align-items: flex-start;
      font-family: f.$font-secondary; font-size: 0.95rem;
      color: c.$PHB-TEXT-2; line-height: 1.5;
      padding: 0.8rem 1rem;
      border: 1px solid c.$PHB-BORDER;
      border-radius: 8px; background: c.$PHB-SURFACE;
      i { color: c.$PHB-TEAL; flex-shrink: 0; margin-top: 0.15rem; }
    }
  }

  &__cta-wrap {
    text-align: center; padding-top: 1.5rem;
    border-top: 1px solid c.$PHB-BORDER;
  }
  &__cta-copy {
    font-family: f.$font-secondary; font-size: 0.95rem;
    color: c.$PHB-TEXT-3; margin-bottom: 2rem; font-style: italic;
  }
}

// ── Proof ─────────────────────────────────────────────────────────────────────
.proof {
  padding: 6rem 0;

  &__cases {
    display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 3rem;
    @media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }
  }

  &__case {
    padding: 2rem; border: 1px solid c.$PHB-BORDER;
    border-radius: 14px; background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-SM;
    display: flex; flex-direction: column; gap: 1rem;

    &-tag {
      font-family: f.$font-accent; font-size: 0.78rem; font-weight: 600;
      letter-spacing: 0.08em; color: c.$PHB-PURPLE;
      padding-bottom: 1rem; border-bottom: 1px solid c.$PHB-BORDER;
    }
    &-context { font-family: f.$font-secondary; font-size: 0.9rem; color: c.$PHB-TEXT-3; line-height: 1.6; margin: 0; }
    &-finding {
      display: flex; gap: 0.6rem; align-items: flex-start;
      font-family: f.$font-secondary; font-size: 0.88rem;
      color: c.$PHB-TEXT-2; line-height: 1.5;
      i { color: c.$PHB-PURPLE-LIGHT; flex-shrink: 0; margin-top: 0.15rem; }
    }
    &-results {
      display: flex; flex-direction: column; gap: 0.5rem;
      margin-top: auto; padding-top: 1rem; border-top: 1px solid c.$PHB-BORDER;
    }
    &-result {
      display: flex; gap: 0.6rem; align-items: flex-start;
      font-family: f.$font-secondary; font-size: 0.88rem;
      color: c.$PHB-TEXT-2; line-height: 1.4;
      i { color: c.$PHB-TEAL; flex-shrink: 0; margin-top: 0.12rem; }
    }
  }

  &__diff {
    text-align: center;
    font-family: f.$font-secondary; font-size: 1rem;
    color: c.$PHB-TEXT-2; line-height: 1.7;
    max-width: 680px; margin: 0 auto;
    padding: 2rem; border: 1px solid rgba(107, 31, 191, 0.15);
    border-radius: 12px; background: rgba(107, 31, 191, 0.03);
    i { color: c.$PHB-PURPLE; margin-right: 0.5rem; }
  }
}

// ── Method ────────────────────────────────────────────────────────────────────
.method {
  padding: 6rem 0;
  background: c.$PHB-BG-ALT;

  &__steps {
    display: grid; grid-template-columns: 1fr; gap: 1rem; margin-bottom: 4rem;
    @media (min-width: 768px)  { grid-template-columns: repeat(2, 1fr); }
    @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
  }

  &__step {
    display: flex; gap: 1.2rem; padding: 1.5rem;
    border: 1px solid c.$PHB-BORDER; border-radius: 12px;
    background: c.$PHB-SURFACE; box-shadow: c.$PHB-SHADOW-XS;
    transition: box-shadow 0.2s, transform 0.2s;
    &:hover { box-shadow: c.$PHB-SHADOW-MD; transform: translateY(-2px); }

    &-num {
      font-family: f.$font-principal; font-size: 1.6rem;
      font-weight: 800; color: rgba(107, 31, 191, 0.18);
      flex-shrink: 0; line-height: 1;
    }
    &-name {
      font-family: f.$font-principal; font-size: 1rem;
      font-weight: 700; color: c.$PHB-TEXT-1; margin: 0 0 0.4rem;
    }
    &-desc {
      font-family: f.$font-secondary; font-size: 0.88rem;
      color: c.$PHB-TEXT-2; line-height: 1.5; margin: 0;
    }
  }

  &__flow {
    display: flex; flex-wrap: wrap; align-items: center;
    justify-content: center; gap: 0.6rem;
  }
  &__flow-wrap { display: flex; align-items: center; gap: 0.6rem; }
  &__flow-item {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.65rem 1.2rem;
    border: 1px solid c.$PHB-BORDER; border-radius: 100px;
    font-family: f.$font-accent; font-size: 0.85rem;
    color: c.$PHB-TEXT-2; background: c.$PHB-SURFACE;
    i { color: c.$PHB-PURPLE; }
    &--last { border-color: c.$PHB-PURPLE; color: c.$PHB-PURPLE; background: rgba(107, 31, 191, 0.05); }
  }
  &__flow-arrow { color: c.$PHB-TEXT-3; font-size: 0.7rem; }
}

// ── Close ─────────────────────────────────────────────────────────────────────
.close-section {
  padding: 8rem 0; text-align: center;
  background: c.$PHB-BG;

  &__title {
    font-family: f.$font-principal;
    font-size: clamp(2rem, 4.5vw, 3rem);
    font-weight: 800; color: c.$PHB-TEXT-1;
    line-height: 1.25; margin-bottom: 3rem;
  }

  &__waste {
    display: flex; flex-direction: column; gap: 0.8rem;
    max-width: 600px; margin: 0 auto 3.5rem;
    &-item {
      display: flex; align-items: center; gap: 0.8rem;
      font-family: f.$font-secondary; font-size: 0.95rem;
      color: c.$PHB-TEXT-2; text-align: left;
      padding: 0.9rem 1.2rem;
      border: 1px solid rgba(220, 50, 50, 0.12);
      border-radius: 8px; background: rgba(220, 50, 50, 0.03);
      i { color: #CC3333; flex-shrink: 0; }
    }
  }

  &__model {
    max-width: 620px; margin: 0 auto 4rem;
    padding: 2.5rem; border: 1px solid c.$PHB-BORDER-MEDIUM;
    border-radius: 16px; background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-SM;

    &-title {
      display: flex; align-items: center; justify-content: center; gap: 0.6rem;
      font-family: f.$font-principal; font-size: 1.1rem;
      font-weight: 700; color: c.$PHB-TEXT-1; margin-bottom: 1rem;
      i { color: c.$PHB-PURPLE; }
    }
    &-text {
      font-family: f.$font-secondary; font-size: 0.95rem;
      color: c.$PHB-TEXT-2; line-height: 1.7; margin-bottom: 1rem;
    }
    &-sub {
      font-family: f.$font-accent; font-size: 0.9rem;
      font-weight: 600; color: c.$PHB-PURPLE; margin: 0;
    }
  }

  &__ctas { margin-bottom: 2rem; }
  &__microcopy {
    font-family: f.$font-secondary; font-size: 0.82rem;
    color: c.$PHB-TEXT-3; max-width: 500px; margin: 0 auto; line-height: 1.6;
  }
}

// ── Footer ────────────────────────────────────────────────────────────────────
.footer {
  padding: 3rem 0; border-top: 1px solid c.$PHB-BORDER; text-align: center;
  background: c.$PHB-BG-ALT;
  .container { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
  &__logo { height: 40px; width: auto; opacity: 0.7; }
  &__copy  { font-family: f.$font-secondary; font-size: 0.82rem; color: c.$PHB-TEXT-3; margin: 0; }
  &__links {
    display: flex; gap: 0.8rem; align-items: center;
    font-family: f.$font-secondary; font-size: 0.82rem; color: c.$PHB-TEXT-3;
    a { color: c.$PHB-TEXT-3; text-decoration: none; &:hover { color: c.$PHB-PURPLE; } }
    span { opacity: 0.4; }
  }
}

// ── Modal ─────────────────────────────────────────────────────────────────────
.modal-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(15, 30, 60, 0.55);
  backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center; padding: 1.5rem;
}

.modal-box {
  position: relative;
  background: c.$PHB-SURFACE;
  border: 1px solid c.$PHB-BORDER;
  border-radius: 20px;
  width: 100%; max-width: 480px;
  padding: 2.5rem;
  box-shadow: c.$PHB-SHADOW-MD;

  &__close {
    position: absolute; top: 1.2rem; right: 1.2rem;
    background: c.$PHB-BG-ALT; border: 1px solid c.$PHB-BORDER;
    border-radius: 8px; width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    color: c.$PHB-TEXT-3; cursor: pointer; transition: all 0.15s;
    &:hover { background: c.$PHB-BG; color: c.$PHB-TEXT-1; }
  }

  &__header { text-align: center; margin-bottom: 2rem; }
  &__logo   { height: 40px; width: auto; margin-bottom: 1.2rem; }
  &__title  { font-family: f.$font-principal; font-size: 1.5rem; font-weight: 800; color: c.$PHB-TEXT-1; margin: 0 0 0.5rem; }
  &__sub    { font-family: f.$font-secondary; font-size: 0.82rem; color: c.$PHB-PURPLE; margin: 0; font-weight: 600; }
}

.modal-form {
  display: flex; flex-direction: column; gap: 1.2rem;

  &__field {
    display: flex; flex-direction: column; gap: 0.4rem;
    label {
      font-family: f.$font-accent; font-size: 0.82rem;
      font-weight: 600; color: c.$PHB-TEXT-2; letter-spacing: 0.02em;
    }
    input {
      background: c.$PHB-BG;
      border: 1.5px solid c.$PHB-BORDER;
      border-radius: 8px; padding: 0.85rem 1rem;
      color: c.$PHB-TEXT-1; font-family: f.$font-secondary;
      font-size: 0.95rem; transition: border-color 0.15s; outline: none;
      &::placeholder { color: c.$PHB-TEXT-3; }
      &:focus { border-color: c.$PHB-PURPLE; box-shadow: 0 0 0 3px rgba(107, 31, 191, 0.08); }
    }
    &.has-error input { border-color: #CC3333; }
  }

  &__error { font-family: f.$font-secondary; font-size: 0.78rem; color: #CC3333; }
  &__disclaimer {
    display: flex; align-items: center; justify-content: center; gap: 0.4rem;
    font-family: f.$font-secondary; font-size: 0.78rem; color: c.$PHB-TEXT-3; margin: 0;
    i { color: c.$PHB-PURPLE; font-size: 0.7rem; }
  }
}

.modal-enter-active { transition: opacity 0.2s ease; }
.modal-leave-active { transition: opacity 0.18s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .modal-box { transition: transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.modal-enter-from .modal-box { transform: translateY(20px) scale(0.97); }
</style>
