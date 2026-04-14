<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useContactStore } from '@/stores/contact'
import { useLocale } from '@/composables/useLocale'
import { useScrollAnimations } from '@/composables/useScrollAnimations'
import SocialProofToast from '@/components/SocialProofToast.vue'
import brandLogo from '@/assets/logos/logo.png'

const router = useRouter()
const contactStore = useContactStore()
const { t, locale, toggleLocale } = useLocale()
useScrollAnimations()

const showModal = ref(false)
const showExitWarning = ref(false)
const submitting = ref(false)
const form = ref({ nombre: '', email: '', telefono: '' })
const errors = ref({ nombre: '', email: '', telefono: '' })

const heroBiomarkers = computed(() => [
  { label: locale.value === 'es' ? 'Inflamación sistémica' : 'Systemic inflammation', pct: 45, status: 'high' },
  { label: locale.value === 'es' ? 'Respuesta regenerativa' : 'Regenerative response', pct: 72, status: 'good' },
  { label: locale.value === 'es' ? 'Función mitocondrial' : 'Mitochondrial function', pct: 61, status: 'mid' },
  { label: locale.value === 'es' ? 'Viabilidad biológica' : 'Biological viability', pct: 84, status: 'optimal' },
])

const testimonialPhotos = [
  'https://randomuser.me/api/portraits/women/45.jpg',
  'https://randomuser.me/api/portraits/men/55.jpg',
  'https://randomuser.me/api/portraits/women/33.jpg',
]

function openModal() {
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

function requestClose() {
  showExitWarning.value = true
}

function confirmClose() {
  showExitWarning.value = false
  showModal.value = false
  document.body.style.overflow = ''
}

function stayInModal() {
  showExitWarning.value = false
}

// kept for programmatic close (e.g. after successful submit)
function closeModal() {
  showExitWarning.value = false
  showModal.value = false
  document.body.style.overflow = ''
}

onUnmounted(() => {
  document.body.style.overflow = ''
})

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
          :src="brandLogo"
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
      <img
        class="hero__bg-photo"
        src="https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=1400&q=80"
        alt=""
        aria-hidden="true"
      />
      <div class="hero__glow hero__glow--purple"></div>
      <div class="hero__glow hero__glow--cyan"></div>
      <div class="container hero__container">

        <!-- Left: content -->
        <div class="hero__content">
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
          <div class="hero__cta-group">
            <button class="btn btn--primary btn--lg" @click="openModal">
              <i class="fa-solid fa-microscope"></i>
              {{ t.hero.cta }}
            </button>
            <p class="hero__disclaimer">
              <i class="fa-solid fa-lock"></i>
              {{ t.hero.disclaimer }}
            </p>
          </div>
        </div>

        <!-- Right: visual panel -->
        <div class="hero__visual" aria-hidden="true">
          <div class="hero__visual-panel">
            <div class="hero__visual-head">
              <div class="hero__visual-avatar">
                <i class="fa-solid fa-dna"></i>
              </div>
              <div class="hero__visual-head-text">
                <div class="hero__visual-title">{{ locale === 'es' ? 'Evaluación de Viabilidad' : 'Viability Assessment' }}</div>
                <div class="hero__visual-sub">{{ locale === 'es' ? 'Biomarcadores en análisis' : 'Biomarkers analyzed' }}</div>
              </div>
              <div class="hero__visual-live">
                <div class="hero__visual-live-dot"></div>
                <span>{{ locale === 'es' ? 'En curso' : 'Live' }}</span>
              </div>
            </div>
            <div class="hero__visual-bars">
              <div v-for="m in heroBiomarkers" :key="m.label" class="hero__visual-bar-row">
                <div class="hero__visual-bar-label">{{ m.label }}</div>
                <div class="hero__visual-bar-track">
                  <div class="hero__visual-bar-fill" :class="`bar-${m.status}`" :style="{ width: m.pct + '%' }"></div>
                </div>
                <div class="hero__visual-bar-pct" :class="`pct-${m.status}`">{{ m.pct }}%</div>
              </div>
            </div>
            <div class="hero__visual-verdict">
              <i class="fa-solid fa-circle-check"></i>
              <div>
                <div class="hero__visual-verdict-label">{{ locale === 'es' ? 'Resultado preliminar' : 'Preliminary result' }}</div>
                <div class="hero__visual-verdict-text">{{ locale === 'es' ? 'Candidato para evaluación completa' : 'Candidate for full assessment' }}</div>
              </div>
            </div>
          </div>

          <!-- Floating badges -->
          <div class="hero__float hero__float--tl">
            <div class="hero__float-icon"><i class="fa-solid fa-award"></i></div>
            <div class="hero__float-text">
              <strong>15+</strong>
              <span>{{ locale === 'es' ? 'años clínicos' : 'clinical years' }}</span>
            </div>
          </div>
          <div class="hero__float hero__float--br">
            <div class="hero__float-icon"><i class="fa-solid fa-users-viewfinder"></i></div>
            <div class="hero__float-text">
              <strong>100K+</strong>
              <span>{{ locale === 'es' ? 'casos analizados' : 'cases analyzed' }}</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- TRUST STRIP -->
    <section class="trust-strip">
      <div class="container trust-strip__inner">
        <div v-for="(s, i) in t.hero.stats" :key="s.value" class="trust-strip__item">
          <span class="trust-strip__value">{{ s.value }}</span>
          <span class="trust-strip__label">{{ s.label }}</span>
          <div v-if="i < t.hero.stats.length - 1" class="trust-strip__sep"></div>
        </div>
      </div>
    </section>

    <!-- CONDITIONS STRIP -->
    <section class="conditions-strip">
      <div class="container conditions-strip__inner">
        <span class="conditions-strip__heading">{{ locale === 'es' ? 'Casos que evaluamos:' : 'Cases we evaluate:' }}</span>
        <div class="conditions-strip__items">
          <div class="conditions-strip__item">
            <i class="fa-solid fa-bolt"></i>
            <span>{{ locale === 'es' ? 'Fatiga Crónica' : 'Chronic Fatigue' }}</span>
          </div>
          <div class="conditions-strip__item">
            <i class="fa-solid fa-bone"></i>
            <span>{{ locale === 'es' ? 'Dolor Articular' : 'Joint Pain' }}</span>
          </div>
          <div class="conditions-strip__item">
            <i class="fa-solid fa-shield-virus"></i>
            <span>{{ locale === 'es' ? 'Autoinmune' : 'Autoimmune' }}</span>
          </div>
          <div class="conditions-strip__item">
            <i class="fa-solid fa-hourglass-half"></i>
            <span>{{ locale === 'es' ? 'Envejecimiento Acelerado' : 'Accelerated Aging' }}</span>
          </div>
          <div class="conditions-strip__item">
            <i class="fa-solid fa-brain"></i>
            <span>{{ locale === 'es' ? 'Niebla Mental' : 'Brain Fog' }}</span>
          </div>
          <div class="conditions-strip__item">
            <i class="fa-solid fa-fire-flame-curved"></i>
            <span>{{ locale === 'es' ? 'Inflamación Sistémica' : 'Systemic Inflammation' }}</span>
          </div>
          <div class="conditions-strip__item">
            <i class="fa-solid fa-heart-pulse"></i>
            <span>{{ locale === 'es' ? 'Recuperación Lenta' : 'Slow Recovery' }}</span>
          </div>
        </div>
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
            <div class="problem__card-num">0{{ i + 1 }}</div>
            <div class="problem__card-icon">
              <i :class="['fa-solid', i === 0 ? 'fa-flask' : i === 1 ? 'fa-pills' : 'fa-heart-pulse']"></i>
            </div>
            <h3 class="problem__card-title">{{ p.title }}</h3>
            <p class="problem__card-desc">{{ p.desc }}</p>
          </div>
        </div>

        <div class="problem__truth">
          <div class="problem__truth-label">
            <i class="fa-solid fa-quote-left"></i>
            {{ t.problem.truthLabel }}
          </div>
          <p class="problem__truth-text">{{ t.problem.truthText }}</p>
          <div class="problem__truth-divider"></div>
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
      <div class="data__photo-bg" aria-hidden="true">
        <img src="https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1400&q=80" alt="" />
      </div>
      <div class="data__overlay" aria-hidden="true"></div>
      <div class="container data__inner">
        <div class="section-label data__label-white">{{ t.data.label }}</div>
        <h2 class="section-title data__title-white">{{ t.data.title }}</h2>
        <div class="data__grid">
          <div v-for="(d, i) in t.data.points" :key="i" class="data__item">
            <div class="data__item-icon"><i class="fa-solid fa-circle-exclamation"></i></div>
            <span>{{ d }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SOLUCIÓN / EVR -->
    <section class="solution">
      <div class="container">
        <div class="solution__inner">
          <div class="solution__left">
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
                <div class="solution__pillar-icon">
                  <i :class="['fa-solid', i === 0 ? 'fa-magnifying-glass-chart' : i === 1 ? 'fa-vial' : 'fa-compass']"></i>
                </div>
                <span>{{ p }}</span>
              </div>
            </div>

            <div class="solution__notice">
              <i class="fa-solid fa-triangle-exclamation"></i>
              <div>
                <strong>{{ locale === 'es' ? 'Importante:' : 'Important:' }}</strong> {{ t.solution.notice }}
              </div>
            </div>
          </div>

          <div class="solution__right">
            <div class="solution__img-wrap">
              <img src="https://images.pexels.com/photos/8376187/pexels-photo-8376187.jpeg?auto=compress&cs=tinysrgb&w=800&q=80" alt="" class="solution__img" />
              <div class="solution__img-badge">
                <i class="fa-solid fa-dna"></i>
                {{ locale === 'es' ? 'Evaluación Regenerativa™' : 'Regenerative Assessment™' }}
              </div>
            </div>
            <div class="solution__discover-card">
              <div class="solution__discover-header">
                <i class="fa-solid fa-magnifying-glass"></i>
                <h3>{{ t.solution.discoverTitle }}</h3>
              </div>
              <ul class="solution__bullets">
                <li v-for="b in t.solution.bullets" :key="b">
                  <div class="solution__bullet-icon"><i class="fa-solid fa-check"></i></div>
                  <span>{{ b }}</span>
                </li>
              </ul>
            </div>
            <div class="solution__cta-wrap">
              <p class="solution__cta-copy">{{ t.solution.ctaCopy }}</p>
              <button class="btn btn--primary btn--lg btn--full" @click="openModal">
                <i class="fa-solid fa-arrow-right"></i>
                {{ t.solution.cta }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIOS -->
    <section class="testimonials">
      <div class="container">
        <div class="section-label">{{ t.testimonials.label }}</div>
        <h2 class="section-title">
          {{ t.testimonials.title }}
          <span class="text-purple">{{ t.testimonials.titleAccent }}</span>
        </h2>
        <div class="testimonials__grid">
          <div v-for="(item, i) in t.testimonials.items" :key="item.name" class="testimonials__card">
            <div class="testimonials__stars">
              <i v-for="n in 5" :key="n" class="fa-solid fa-star"></i>
            </div>
            <blockquote class="testimonials__quote">{{ item.quote }}</blockquote>
            <div class="testimonials__footer">
              <div class="testimonials__avatar">
                <img :src="testimonialPhotos[i]" :alt="item.name" class="testimonials__avatar-img" @error="($event.target as HTMLImageElement).style.display='none'" />
                <span class="testimonials__avatar-fallback">{{ item.initials }}</span>
              </div>
              <div class="testimonials__info">
                <div class="testimonials__name">{{ item.name }}</div>
                <div class="testimonials__meta">
                  <span class="testimonials__condition">{{ item.condition }}</span>
                  <span class="testimonials__dot">·</span>
                  <span>{{ item.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PRUEBA SOCIAL / CASOS -->
    <section class="proof">
      <div class="container">
        <div class="section-label">{{ t.proof.label }}</div>
        <h2 class="section-title">
          {{ t.proof.title }}
          <span class="text-purple">{{ t.proof.titleAccent }}</span>
        </h2>
        <div class="proof__cases">
          <div v-for="(c, i) in t.proof.cases" :key="c.tag" class="proof__case">
            <div class="proof__case-header">
              <div class="proof__case-icon">
                <i :class="['fa-solid', i === 0 ? 'fa-person-running' : i === 1 ? 'fa-bone' : 'fa-clipboard-list']"></i>
              </div>
              <div class="proof__case-tag">{{ c.tag }}</div>
            </div>
            <p class="proof__case-context">{{ c.context }}</p>
            <div class="proof__case-finding">
              <div class="proof__case-finding-label">
                <i class="fa-solid fa-magnifying-glass"></i>
                {{ locale === 'es' ? 'Hallazgo clínico' : 'Clinical finding' }}
              </div>
              <p>{{ c.finding }}</p>
            </div>
            <div class="proof__case-results">
              <div class="proof__case-results-label">{{ locale === 'es' ? 'Resultados' : 'Results' }}</div>
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

    <!-- AUTORIDAD / EXPERTISE -->
    <section class="authority">
      <div class="container authority__container">
        <div class="authority__content">
          <div class="section-label">{{ locale === 'es' ? 'Nuestra experiencia' : 'Our expertise' }}</div>
          <h2 class="authority__title">
            {{ locale === 'es'
              ? 'Más de 15 años tomando las decisiones más difíciles de la Medicina Regenerativa'
              : 'Over 15 years making the most difficult decisions in Regenerative Medicine' }}
          </h2>
          <p class="authority__sub">
            {{ locale === 'es'
              ? 'No somos una clínica más. Somos una plataforma de decisión clínica construida sobre más de 100,000 casos analizados y aprendizajes reales del campo.'
              : "We're not just another clinic. We're a clinical decision platform built on over 100,000 analyzed cases and real field learnings." }}
          </p>
          <div class="authority__stats">
            <div class="authority__stat">
              <span class="authority__stat-value">+15</span>
              <span class="authority__stat-label">{{ locale === 'es' ? 'Años de experiencia clínica' : 'Years of clinical expertise' }}</span>
            </div>
            <div class="authority__stat">
              <span class="authority__stat-value">+100K</span>
              <span class="authority__stat-label">{{ locale === 'es' ? 'Casos analizados en LATAM' : 'Cases analyzed in LATAM' }}</span>
            </div>
            <div class="authority__stat">
              <span class="authority__stat-value">+5M</span>
              <span class="authority__stat-label">{{ locale === 'es' ? 'Personas educadas en salud' : 'People educated in health' }}</span>
            </div>
          </div>
          <div class="authority__credentials">
            <div class="authority__credential">
              <i class="fa-solid fa-shield-halved"></i>
              <span>{{ locale === 'es' ? 'Criterio clínico basado en evidencia' : 'Evidence-based clinical criteria' }}</span>
            </div>
            <div class="authority__credential">
              <i class="fa-solid fa-microscope"></i>
              <span>{{ locale === 'es' ? 'Evaluación de biomarcadores avanzada' : 'Advanced biomarker evaluation' }}</span>
            </div>
            <div class="authority__credential">
              <i class="fa-solid fa-globe-americas"></i>
              <span>{{ locale === 'es' ? 'Presencia en toda Latinoamérica' : 'Presence across Latin America' }}</span>
            </div>
          </div>
        </div>
        <div class="authority__visual">
          <div class="authority__img-wrap">
            <img
              src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=700&q=80"
              alt="PowerHouse Biotech — Evaluación clínica"
              class="authority__img"
            />
            <div class="authority__img-overlay">
              <div class="authority__img-stat">
                <div class="authority__img-stat-num">100K+</div>
                <div class="authority__img-stat-label">{{ locale === 'es' ? 'Casos analizados' : 'Cases analyzed' }}</div>
              </div>
              <div class="authority__img-divider"></div>
              <div class="authority__img-stat">
                <div class="authority__img-stat-num">15+</div>
                <div class="authority__img-stat-label">{{ locale === 'es' ? 'Años de experiencia' : 'Years of expertise' }}</div>
              </div>
              <div class="authority__img-divider"></div>
              <div class="authority__img-stat">
                <div class="authority__img-stat-num">20%</div>
                <div class="authority__img-stat-label">{{ locale === 'es' ? 'Tasa de aceptación' : 'Acceptance rate' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MÉTODO DECIDE -->
    <section class="method">
      <div class="method__bg" aria-hidden="true">
        <img src="https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=1400&q=80" alt="" />
      </div>
      <div class="container">
        <div class="section-label">{{ t.method.label }}</div>
        <h2 class="section-title">
          {{ t.method.title }} <span class="text-purple">{{ t.method.titleAccent }}</span>
        </h2>
        <p class="section-sub">{{ t.method.sub }}</p>
        <div class="method__steps">
          <div v-for="(step, i) in t.method.steps" :key="step.num" class="method__step">
            <div class="method__step-connector" v-if="i < t.method.steps.length - 1"></div>
            <div class="method__step-num">{{ step.num }}</div>
            <div class="method__step-body">
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
      <div class="close-section__bg" aria-hidden="true">
      <img
        class="close-section__bg-photo"
        src="https://images.pexels.com/photos/3952234/pexels-photo-3952234.jpeg?auto=compress&cs=tinysrgb&w=1400&q=80"
        alt=""
      />
    </div>
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
          <div class="close-section__model-icon">
            <i class="fa-solid fa-filter"></i>
          </div>
          <div>
            <h3 class="close-section__model-title">{{ t.close.modelTitle }}</h3>
            <p class="close-section__model-text">{{ t.close.modelText }}</p>
            <p class="close-section__model-sub">{{ t.close.modelSub }}</p>
          </div>
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
      <div v-if="showModal" class="modal-overlay" @click.self="requestClose">
        <div class="modal-box">
          <!-- Exit warning layer -->
          <Transition name="exit-warn">
            <div v-if="showExitWarning" class="modal-exit-warn">
              <div class="modal-exit-warn__icon">
                <i class="fa-solid fa-heart-pulse"></i>
              </div>
              <h3 class="modal-exit-warn__title">{{ t.exitWarning.title }}</h3>
              <p class="modal-exit-warn__sub">{{ t.exitWarning.sub }}</p>
              <p class="modal-exit-warn__body">{{ t.exitWarning.body }}</p>
              <button class="modal-exit-warn__stay" @click="stayInModal">
                <i class="fa-solid fa-arrow-left"></i>
                {{ t.exitWarning.stay }}
              </button>
              <button class="modal-exit-warn__leave" @click="confirmClose">
                {{ t.exitWarning.leave }}
              </button>
            </div>
          </Transition>
          <button class="modal-box__close" @click="requestClose" aria-label="Cerrar">
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
  border: 1px solid rgba(18, 120, 243, 0.25);
  border-radius: 100px;
  padding: 0.3rem 0.9rem;
  margin-bottom: 1.2rem;
  background: rgba(18, 120, 243, 0.05);
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
    box-shadow: 0 4px 20px rgba(18, 120, 243, 0.25);
    &:hover { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(18, 120, 243, 0.35); }
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
  &:hover { background: rgba(18, 120, 243, 0.05); border-color: rgba(18, 120, 243, 0.3); color: c.$PHB-PURPLE; }
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
  background: rgba(23, 24, 70, 0.94);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid c.$PHB-BORDER;
  box-shadow: c.$PHB-SHADOW-SM;
  transition: background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease;

  // Shrink variant when user scrolls past hero
  &--scrolled {
    background: rgba(23, 24, 70, 0.98);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);

    .navbar__inner { padding: 0.55rem 1.5rem; }
    .navbar__logo { height: 36px; }
  }

  &__inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0.85rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: padding 0.3s ease;
  }
  &__logo {
    height: 44px;
    width: auto;
    transition: height 0.3s ease;
  }
  &__actions { display: flex; align-items: center; gap: 0.7rem; }
}

// ── Hero ──────────────────────────────────────────────────────────────────────
.hero {
  position: relative;
  overflow: hidden;
  padding: 5rem 0 4rem;

  &__glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    pointer-events: none;
    &--purple {
      width: 700px; height: 700px;
      background: rgba(18, 120, 243, 0.15);
      top: -250px; left: 30%; transform: translateX(-50%);
    }
    &--cyan {
      width: 400px; height: 400px;
      background: rgba(33, 188, 251, 0.12);
      bottom: 0; right: 5%;
    }
  }

  &__container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center;
    @media (min-width: 1024px) { grid-template-columns: 1fr 1fr; }
  }

  &__content {
    @media (max-width: 1023px) { text-align: center; }
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
    background: rgba(18, 120, 243, 0.06);
    border: 1px solid rgba(18, 120, 243, 0.2);
    border-radius: 100px;
    padding: 0.4rem 1rem;
    margin-bottom: 1.8rem;
  }

  &__title {
    font-family: f.$font-principal;
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 800;
    line-height: 1.15;
    margin: 0 0 1.5rem;
    &--dim  { color: c.$PHB-TEXT-3; }
    &--main { color: c.$PHB-TEXT-1; }
  }

  &__sub {
    font-family: f.$font-secondary;
    font-size: 1.1rem;
    color: c.$PHB-TEXT-2;
    line-height: 1.7;
    margin: 0 0 2rem;
  }

  &__intro {
    font-family: f.$font-secondary;
    font-size: 0.95rem;
    color: c.$PHB-TEXT-2;
    line-height: 1.8;
    margin: 0 0 2.5rem;
    padding: 1.2rem 1.5rem;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 12px;
    background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-SM;
    border-left: 3px solid c.$PHB-PURPLE;
  }

  &__cta-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    @media (max-width: 1023px) { align-items: center; }
  }

  &__disclaimer {
    font-size: 0.8rem;
    color: c.$PHB-TEXT-3;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    i { color: c.$PHB-PURPLE; }
  }

  // Right visual panel
  &__visual {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2.5rem 1rem;
    @media (max-width: 1023px) { display: none; }
  }

  &__visual-panel {
    background: c.$PHB-SURFACE;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 20px;
    padding: 1.8rem;
    width: 100%;
    max-width: 400px;
    box-shadow: c.$PHB-SHADOW-MD;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
  }

  &__visual-head {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid c.$PHB-BORDER;
  }

  &__visual-avatar {
    width: 42px; height: 42px;
    border-radius: 10px;
    background: rgba(18, 120, 243, 0.1);
    border: 1px solid rgba(18, 120, 243, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: c.$PHB-PURPLE;
    font-size: 1rem;
    flex-shrink: 0;
  }

  &__visual-head-text { flex: 1; }
  &__visual-title {
    font-family: f.$font-accent;
    font-size: 0.82rem;
    font-weight: 700;
    color: c.$PHB-TEXT-1;
  }
  &__visual-sub {
    font-family: f.$font-secondary;
    font-size: 0.72rem;
    color: c.$PHB-TEXT-3;
  }

  &__visual-live {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: f.$font-accent;
    font-size: 0.7rem;
    font-weight: 600;
    color: c.$PHB-TEAL;
  }
  &__visual-live-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: c.$PHB-TEAL;
    box-shadow: 0 0 0 3px rgba(24, 231, 240, 0.2);
    animation: pulse 2s infinite;
  }

  &__visual-bars {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  &__visual-bar-row {
    display: grid;
    grid-template-columns: 1fr 2fr auto;
    align-items: center;
    gap: 0.6rem;
  }
  &__visual-bar-label {
    font-family: f.$font-secondary;
    font-size: 0.72rem;
    color: c.$PHB-TEXT-2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__visual-bar-track {
    height: 6px;
    background: c.$PHB-BG-ALT;
    border-radius: 3px;
    overflow: hidden;
  }
  &__visual-bar-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 1s ease;
    &.bar-high    { background: linear-gradient(90deg, #e55, #f77); }
    &.bar-mid     { background: linear-gradient(90deg, #E8A020, #F5BE50); }
    &.bar-good    { background: linear-gradient(90deg, c.$PHB-CYAN, #50D0F0); }
    &.bar-optimal { background: linear-gradient(90deg, c.$PHB-TEAL, #20BDA0); }
  }
  &__visual-bar-pct {
    font-family: f.$font-accent;
    font-size: 0.7rem;
    font-weight: 700;
    &.pct-high    { color: #ff6b6b; }
    &.pct-mid     { color: #ffaa33; }
    &.pct-good    { color: c.$PHB-CYAN; }
    &.pct-optimal { color: c.$PHB-TEAL; }
  }

  &__visual-verdict {
    display: flex;
    gap: 0.8rem;
    align-items: center;
    padding: 1rem 1.2rem;
    background: rgba(24, 231, 240, 0.06);
    border: 1px solid rgba(24, 231, 240, 0.2);
    border-radius: 10px;
    i { color: c.$PHB-TEAL; font-size: 1.3rem; flex-shrink: 0; }
  }
  &__visual-verdict-label {
    font-family: f.$font-accent;
    font-size: 0.68rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: c.$PHB-TEAL;
    margin-bottom: 0.15rem;
  }
  &__visual-verdict-text {
    font-family: f.$font-secondary;
    font-size: 0.82rem;
    font-weight: 600;
    color: c.$PHB-TEXT-1;
  }

  // Floating badges on visual
  &__float {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    background: c.$PHB-SURFACE;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 12px;
    padding: 0.7rem 1rem;
    box-shadow: c.$PHB-SHADOW-MD;
    animation: floatBob 4s ease-in-out infinite;

    &--tl { top: 0; left: -1rem; animation-delay: 0s; }
    &--br { bottom: 0; right: -1rem; animation-delay: 2s; }
  }
  &__float-icon {
    width: 36px; height: 36px;
    border-radius: 8px;
    background: rgba(18, 120, 243, 0.08);
    display: flex; align-items: center; justify-content: center;
    color: c.$PHB-PURPLE;
    font-size: 0.9rem;
  }
  &__float-text {
    display: flex;
    flex-direction: column;
    strong {
      font-family: f.$font-principal;
      font-size: 1rem;
      font-weight: 800;
      color: c.$PHB-TEXT-1;
      line-height: 1;
    }
    span {
      font-family: f.$font-secondary;
      font-size: 0.7rem;
      color: c.$PHB-TEXT-3;
    }
  }
}

// ── Trust strip ───────────────────────────────────────────────────────────────
.trust-strip {
  background: c.$PHB-SURFACE;
  border-top: 1px solid c.$PHB-BORDER;
  border-bottom: 1px solid c.$PHB-BORDER;
  padding: 1.2rem 0;
  box-shadow: c.$PHB-SHADOW-SM;

  &__inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem 0;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0 2rem;
    flex-shrink: 0;
  }

  &__value {
    font-family: f.$font-principal;
    font-size: 1.3rem;
    font-weight: 800;
    color: c.$PHB-PURPLE;
  }

  &__label {
    font-family: f.$font-secondary;
    font-size: 0.82rem;
    color: c.$PHB-TEXT-2;
    line-height: 1.3;
    max-width: 120px;
  }

  &__sep {
    width: 1px;
    height: 32px;
    background: c.$PHB-BORDER;
    flex-shrink: 0;
  }
}

// ── Problem ───────────────────────────────────────────────────────────────────
.problem {
  padding: 7rem 0;
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
    border-radius: 16px;
    background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-SM;
    transition: box-shadow 0.2s, transform 0.2s;
    position: relative;
    overflow: hidden;
    &:hover { box-shadow: c.$PHB-SHADOW-MD; transform: translateY(-3px); }

    &-num {
      position: absolute;
      top: 1.2rem;
      right: 1.4rem;
      font-family: f.$font-principal;
      font-size: 2.5rem;
      font-weight: 800;
      color: rgba(18, 120, 243, 0.07);
      line-height: 1;
    }

    &-icon {
      width: 52px; height: 52px;
      border-radius: 12px;
      background: rgba(18, 120, 243, 0.07);
      border: 1px solid rgba(18, 120, 243, 0.15);
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
    padding: 3rem 2.5rem;
    border: 1px solid rgba(18, 120, 243, 0.12);
    border-radius: 20px;
    background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-MD;

    &-label {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: 0.75rem; font-weight: 700;
      letter-spacing: 0.15em; text-transform: uppercase;
      color: c.$PHB-PURPLE; margin-bottom: 1.5rem;
      i { opacity: 0.4; }
    }
    &-text  { font-family: f.$font-secondary; font-size: 1.1rem; color: c.$PHB-TEXT-2; line-height: 1.7; margin-bottom: 1.5rem; }
    &-divider { height: 1px; background: c.$PHB-BORDER; margin-bottom: 1.5rem; }
    &-key   { font-family: f.$font-principal; font-size: 1.25rem; color: c.$PHB-TEXT-1; line-height: 1.5; margin-bottom: 1.5rem; }
    &-close { font-family: f.$font-secondary; font-size: 0.95rem; color: c.$PHB-TEXT-3; font-style: italic; margin: 0; }
  }
}

// ── Data ──────────────────────────────────────────────────────────────────────
.data {
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
  background: #0f1130;

  &__photo-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    img {
      width: 100%; height: 100%;
      object-fit: cover;
      opacity: 0.18;
      filter: saturate(0.4);
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(160deg, rgba(15, 17, 48, 0.85) 0%, rgba(23, 24, 70, 0.75) 100%);
  }

  &__inner {
    position: relative;
    z-index: 2;
  }

  &__label-white {
    color: rgba(255, 255, 255, 0.5) !important;
    border-color: rgba(255, 255, 255, 0.15) !important;
    background: rgba(255, 255, 255, 0.05) !important;
  }

  &__title-white {
    color: #fff !important;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.8rem;
    margin-top: 2rem;
    @media (min-width: 640px) { grid-template-columns: repeat(2, 1fr); }
  }

  &__item {
    display: flex;
    gap: 0.9rem;
    align-items: flex-start;
    font-family: f.$font-secondary;
    font-size: 0.92rem;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.5;
    padding: 1rem 1.2rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(4px);
    transition: border-color 0.15s, background 0.15s;
    &:hover { border-color: rgba(18, 120, 243, 0.4); background: rgba(18, 120, 243, 0.08); }

    &-icon {
      width: 30px;
      height: 30px;
      border-radius: 6px;
      background: rgba(18, 120, 243, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      i { color: c.$PHB-PURPLE; font-size: 0.75rem; }
    }
  }
}

// ── Solution ──────────────────────────────────────────────────────────────────
.solution {
  padding: 7rem 0;
  background: c.$PHB-BG-ALT;

  &__inner {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    @media (min-width: 1024px) { grid-template-columns: 1fr 1fr; align-items: start; }
  }

  &__badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-family: f.$font-accent; font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: c.$PHB-CYAN; border: 1px solid rgba(33, 188, 251, 0.3);
    border-radius: 100px; padding: 0.3rem 1rem; margin-bottom: 1.5rem;
    background: rgba(33, 188, 251, 0.06);
  }

  &__question { font-family: f.$font-secondary; font-size: 1.1rem; color: c.$PHB-TEXT-2; margin: 0 0 0.5rem; }
  &__big-q {
    font-family: f.$font-principal;
    font-size: clamp(1.5rem, 3.5vw, 2rem);
    font-weight: 800; color: c.$PHB-TEXT-1;
    margin: 0 0 2.5rem; line-height: 1.3;
  }

  &__pillars {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 2.5rem;
  }
  &__pillar {
    display: flex; gap: 1rem; align-items: flex-start;
    padding: 1rem 1.2rem; border: 1px solid c.$PHB-BORDER;
    border-radius: 12px; background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-SM;
    font-family: f.$font-secondary; font-size: 0.92rem;
    color: c.$PHB-TEXT-2; line-height: 1.5;
    transition: border-color 0.15s;
    &:hover { border-color: rgba(33, 188, 251, 0.3); }

    &-icon {
      width: 38px; height: 38px;
      border-radius: 8px;
      background: rgba(33, 188, 251, 0.07);
      border: 1px solid rgba(33, 188, 251, 0.15);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      i { color: c.$PHB-CYAN; font-size: 1rem; }
    }
  }

  &__notice {
    display: flex; gap: 1rem; align-items: flex-start;
    padding: 1.2rem 1.5rem;
    border: 1px solid rgba(33, 188, 251, 0.2);
    border-radius: 12px; background: rgba(33, 188, 251, 0.04);
    font-family: f.$font-secondary; font-size: 0.9rem;
    color: c.$PHB-TEXT-2; line-height: 1.6;
    i { color: #ffaa33; font-size: 1rem; flex-shrink: 0; margin-top: 0.1rem; }
  }

  // Right col
  &__right { display: flex; flex-direction: column; gap: 1.5rem; }

  &__img-wrap {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    height: 220px;
    box-shadow: c.$PHB-SHADOW-MD;
  }
  &__img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center 30%;
    filter: saturate(0.85);
    transition: transform 0.5s ease;
    &:hover { transform: scale(1.03); }
  }
  &__img-badge {
    position: absolute;
    bottom: 1rem; left: 1rem;
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(18, 120, 243, 0.85);
    backdrop-filter: blur(8px);
    color: #fff;
    font-family: f.$font-accent;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 0.4rem 0.9rem;
    border-radius: 100px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    i { font-size: 0.8rem; }
  }

  &__discover-card {
    background: c.$PHB-SURFACE;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: c.$PHB-SHADOW-MD;
  }

  &__discover-header {
    display: flex; align-items: center; gap: 0.7rem;
    margin-bottom: 1.5rem;
    i { color: c.$PHB-PURPLE; font-size: 1.1rem; }
    h3 {
      font-family: f.$font-principal; font-size: 1rem;
      font-weight: 700; color: c.$PHB-TEXT-1; margin: 0;
    }
  }

  &__bullets {
    list-style: none; padding: 0; margin: 0;
    display: flex; flex-direction: column; gap: 0.7rem;
    li {
      display: flex; gap: 0.8rem; align-items: flex-start;
      font-family: f.$font-secondary; font-size: 0.92rem;
      color: c.$PHB-TEXT-2; line-height: 1.5;
    }
  }

  &__bullet-icon {
    width: 22px; height: 22px;
    border-radius: 50%;
    background: rgba(24, 231, 240, 0.1);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    i { color: c.$PHB-TEAL; font-size: 0.65rem; }
  }

  &__cta-wrap {
    text-align: center; padding: 1.5rem;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 14px; background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-SM;
  }
  &__cta-copy {
    font-family: f.$font-secondary; font-size: 0.88rem;
    color: c.$PHB-TEXT-3; margin-bottom: 1.2rem; font-style: italic;
    line-height: 1.6;
  }
}

// ── Testimonials ──────────────────────────────────────────────────────────────
.testimonials {
  padding: 7rem 0;
  background: c.$PHB-BG;

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 0.5rem;
    @media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }
  }

  &__card {
    background: c.$PHB-SURFACE;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 18px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    box-shadow: c.$PHB-SHADOW-SM;
    transition: box-shadow 0.2s, transform 0.2s;
    &:hover { box-shadow: c.$PHB-SHADOW-MD; transform: translateY(-3px); }
  }

  &__stars {
    display: flex;
    gap: 0.2rem;
    i { color: #F59E0B; font-size: 0.85rem; }
  }

  &__quote {
    font-family: f.$font-secondary;
    font-size: 0.95rem;
    color: c.$PHB-TEXT-2;
    line-height: 1.7;
    margin: 0;
    flex: 1;
    font-style: italic;
    &::before { content: '\201C'; color: c.$PHB-PURPLE; font-size: 1.4rem; line-height: 0; vertical-align: -0.4em; margin-right: 0.1rem; }
    &::after  { content: '\201D'; color: c.$PHB-PURPLE; font-size: 1.4rem; line-height: 0; vertical-align: -0.4em; margin-left: 0.1rem; }
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding-top: 1rem;
    border-top: 1px solid c.$PHB-BORDER;
  }

  &__avatar {
    width: 48px; height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, c.$PHB-PURPLE, c.$PHB-CYAN);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(18, 120, 243, 0.3);
    position: relative;
    border: 2px solid rgba(18, 120, 243, 0.25);
  }
  &__avatar-img {
    width: 100%; height: 100%;
    object-fit: cover;
    border-radius: 50%;
    position: absolute;
    inset: 0;
    z-index: 2;
  }
  &__avatar-fallback {
    font-family: f.$font-accent;
    font-size: 0.82rem;
    font-weight: 700;
    color: #fff;
    z-index: 1;
  }

  &__info { flex: 1; }

  &__name {
    font-family: f.$font-accent;
    font-size: 0.88rem;
    font-weight: 700;
    color: c.$PHB-TEXT-1;
  }

  &__meta {
    font-family: f.$font-secondary;
    font-size: 0.78rem;
    color: c.$PHB-TEXT-3;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    flex-wrap: wrap;
  }

  &__condition {
    color: c.$PHB-PURPLE;
    font-weight: 600;
  }

  &__dot { opacity: 0.4; }
}

// ── Proof ─────────────────────────────────────────────────────────────────────
.proof {
  padding: 6rem 0;
  background: c.$PHB-BG-ALT;

  &__cases {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
    @media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }
  }

  &__case {
    padding: 1.8rem; border: 1px solid c.$PHB-BORDER;
    border-radius: 16px; background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-SM;
    display: flex; flex-direction: column; gap: 1rem;
    transition: box-shadow 0.2s, transform 0.2s;
    &:hover { box-shadow: c.$PHB-SHADOW-MD; transform: translateY(-2px); }

    &-header {
      display: flex;
      align-items: flex-start;
      gap: 0.9rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid c.$PHB-BORDER;
    }
    &-icon {
      width: 42px; height: 42px;
      border-radius: 10px;
      background: rgba(18, 120, 243, 0.07);
      border: 1px solid rgba(18, 120, 243, 0.12);
      display: flex; align-items: center; justify-content: center;
      color: c.$PHB-PURPLE;
      font-size: 1rem;
      flex-shrink: 0;
    }
    &-tag {
      font-family: f.$font-accent; font-size: 0.8rem; font-weight: 700;
      color: c.$PHB-TEXT-1; line-height: 1.3;
    }
    &-context {
      font-family: f.$font-secondary; font-size: 0.88rem;
      color: c.$PHB-TEXT-3; line-height: 1.6; margin: 0;
    }
    &-finding {
      background: rgba(33, 188, 251, 0.04);
      border: 1px solid rgba(33, 188, 251, 0.15);
      border-radius: 8px; padding: 0.9rem 1rem;
      &-label {
        display: flex; align-items: center; gap: 0.4rem;
        font-family: f.$font-accent; font-size: 0.68rem; font-weight: 700;
        letter-spacing: 0.1em; text-transform: uppercase;
        color: c.$PHB-CYAN; margin-bottom: 0.4rem;
        i { font-size: 0.7rem; }
      }
      p {
        font-family: f.$font-secondary; font-size: 0.85rem;
        color: c.$PHB-TEXT-2; line-height: 1.5; margin: 0;
      }
    }
    &-results {
      margin-top: auto;
      &-label {
        font-family: f.$font-accent; font-size: 0.68rem; font-weight: 700;
        text-transform: uppercase; letter-spacing: 0.1em;
        color: c.$PHB-TEAL; margin-bottom: 0.5rem;
      }
    }
    &-result {
      display: flex; gap: 0.6rem; align-items: flex-start;
      font-family: f.$font-secondary; font-size: 0.85rem;
      color: c.$PHB-TEXT-2; line-height: 1.4;
      margin-bottom: 0.4rem;
      i { color: c.$PHB-TEAL; flex-shrink: 0; margin-top: 0.15rem; font-size: 0.8rem; }
    }
  }

  &__diff {
    text-align: center;
    font-family: f.$font-secondary; font-size: 1rem;
    color: c.$PHB-TEXT-2; line-height: 1.7;
    max-width: 680px; margin: 0 auto;
    padding: 2rem 2.5rem;
    border: 1px solid rgba(18, 120, 243, 0.15);
    border-radius: 14px;
    background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-SM;
    i { color: c.$PHB-PURPLE; margin-right: 0.5rem; }
  }
}

// ── Authority ─────────────────────────────────────────────────────────────────
.authority {
  padding: 7rem 0;
  background: c.$PHB-BG;

  &__container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center;
    @media (min-width: 1024px) { grid-template-columns: 1fr 1fr; }
  }

  &__title {
    font-family: f.$font-principal;
    font-size: clamp(1.6rem, 3.5vw, 2.4rem);
    font-weight: 800;
    color: c.$PHB-TEXT-1;
    line-height: 1.2;
    margin: 0 0 1rem;
  }

  &__sub {
    font-family: f.$font-secondary;
    font-size: 1rem;
    color: c.$PHB-TEXT-2;
    line-height: 1.7;
    margin-bottom: 2.5rem;
  }

  &__stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2.5rem;
  }

  &__stat {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: 1.2rem;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 12px;
    background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-SM;
    text-align: center;

    &-value {
      font-family: f.$font-principal;
      font-size: 1.7rem;
      font-weight: 800;
      color: c.$PHB-PURPLE;
      line-height: 1;
    }
    &-label {
      font-family: f.$font-secondary;
      font-size: 0.72rem;
      color: c.$PHB-TEXT-3;
      line-height: 1.3;
    }
  }

  &__credentials {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  &__credential {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    font-family: f.$font-secondary;
    font-size: 0.9rem;
    color: c.$PHB-TEXT-2;
    i { color: c.$PHB-PURPLE; width: 16px; text-align: center; }
  }

  // Visual side — image handled by .authority__img-wrap above
  &__visual {
    @media (max-width: 1023px) { display: none; }
  }
}

// ── Method ────────────────────────────────────────────────────────────────────
.method {
  padding: 6rem 0;
  background: c.$PHB-BG-ALT;
  position: relative;
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    img {
      width: 100%; height: 100%;
      object-fit: cover;
      opacity: 0.04;
      filter: saturate(0.3);
    }
  }

  .container { position: relative; z-index: 1; }

  &__steps {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 4rem;
    @media (min-width: 768px)  { grid-template-columns: repeat(2, 1fr); }
    @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
  }

  &__step {
    display: flex; gap: 1.2rem; padding: 1.5rem;
    border: 1px solid c.$PHB-BORDER; border-radius: 14px;
    background: c.$PHB-SURFACE; box-shadow: c.$PHB-SHADOW-SM;
    transition: box-shadow 0.2s, transform 0.2s;
    position: relative;
    &:hover { box-shadow: c.$PHB-SHADOW-MD; transform: translateY(-2px); }

    &-num {
      font-family: f.$font-principal; font-size: 1.8rem;
      font-weight: 800; color: rgba(18, 120, 243, 0.15);
      flex-shrink: 0; line-height: 1;
    }
    &-body { flex: 1; }
    &-name {
      font-family: f.$font-principal; font-size: 1rem;
      font-weight: 700; color: c.$PHB-TEXT-1; margin: 0 0 0.4rem;
    }
    &-desc {
      font-family: f.$font-secondary; font-size: 0.88rem;
      color: c.$PHB-TEXT-2; line-height: 1.5; margin: 0;
    }
    &-connector {
      display: none; // only used for spacing concept
    }
  }

  &__flow {
    display: flex; flex-wrap: wrap; align-items: center;
    justify-content: center; gap: 0.5rem;
  }
  &__flow-wrap { display: flex; align-items: center; gap: 0.5rem; }
  &__flow-item {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.65rem 1.2rem;
    border: 1px solid c.$PHB-BORDER; border-radius: 100px;
    font-family: f.$font-accent; font-size: 0.85rem;
    color: c.$PHB-TEXT-2; background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-SM;
    i { color: c.$PHB-PURPLE; }
    &--last {
      border-color: c.$PHB-PURPLE; color: c.$PHB-PURPLE;
      background: rgba(18, 120, 243, 0.05);
      font-weight: 700;
    }
  }
  &__flow-arrow { color: c.$PHB-TEXT-3; font-size: 0.7rem; }
}

// ── Close ─────────────────────────────────────────────────────────────────────
.close-section {
  padding: 8rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: c.$PHB-BG;

  &__bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 700px 400px at 50% 0%, rgba(18, 120, 243, 0.15) 0%, transparent 70%),
      radial-gradient(ellipse 400px 300px at 80% 100%, rgba(33, 188, 251, 0.10) 0%, transparent 60%);
    pointer-events: none;
  }

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
      padding: 1rem 1.4rem;
      border: 1px solid rgba(200, 50, 50, 0.12);
      border-radius: 10px; background: rgba(200, 50, 50, 0.03);
      box-shadow: c.$PHB-SHADOW-SM;
      i { color: #CC3333; flex-shrink: 0; }
    }
  }

  &__model {
    display: flex;
    gap: 1.2rem;
    align-items: flex-start;
    text-align: left;
    max-width: 620px; margin: 0 auto 4rem;
    padding: 2rem 2.5rem;
    border: 1px solid rgba(18, 120, 243, 0.15);
    border-radius: 18px; background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-MD;

    &-icon {
      width: 52px; height: 52px;
      border-radius: 12px;
      background: rgba(18, 120, 243, 0.08);
      border: 1px solid rgba(18, 120, 243, 0.15);
      display: flex; align-items: center; justify-content: center;
      color: c.$PHB-PURPLE; font-size: 1.2rem;
      flex-shrink: 0;
    }

    &-title {
      font-family: f.$font-principal; font-size: 1.05rem;
      font-weight: 700; color: c.$PHB-TEXT-1; margin-bottom: 0.6rem;
    }
    &-text {
      font-family: f.$font-secondary; font-size: 0.92rem;
      color: c.$PHB-TEXT-2; line-height: 1.7; margin-bottom: 0.8rem;
    }
    &-sub {
      font-family: f.$font-accent; font-size: 0.88rem;
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
  padding: 3rem 0;
  border-top: 1px solid c.$PHB-BORDER;
  text-align: center;
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
      &:focus { border-color: c.$PHB-PURPLE; box-shadow: 0 0 0 3px rgba(18, 120, 243, 0.08); }
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

// ── Exit warning ───────────────────────────────────────────────────────────────
.modal-exit-warn {
  position: absolute;
  inset: 0;
  z-index: 10;
  border-radius: 20px;
  background: c.$PHB-SURFACE;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
  padding: 2.5rem 2rem;

  &__icon {
    font-size: 2.5rem;
    color: c.$PHB-PURPLE;
    animation: pulse-warn 1.4s ease-in-out infinite;
  }

  &__title {
    font-family: f.$font-principal;
    font-size: 1.35rem;
    font-weight: 800;
    color: c.$PHB-TEXT-1;
    margin: 0;
    line-height: 1.25;
  }

  &__sub {
    font-family: f.$font-accent;
    font-size: 0.95rem;
    font-weight: 700;
    color: c.$PHB-PURPLE;
    margin: 0;
  }

  &__body {
    font-family: f.$font-secondary;
    font-size: 0.9rem;
    color: c.$PHB-TEXT-2;
    line-height: 1.7;
    margin: 0;
    max-width: 360px;
  }

  &__stay {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    background: linear-gradient(135deg, c.$PHB-PURPLE, c.$PHB-CYAN);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 1rem;
    font-family: f.$font-accent;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(18, 120, 243, 0.35);
    transition: all 0.2s;
    &:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(18, 120, 243, 0.45); }
  }

  &__leave {
    background: none;
    border: none;
    font-family: f.$font-secondary;
    font-size: 0.8rem;
    color: c.$PHB-TEXT-3;
    cursor: pointer;
    text-decoration: underline;
    padding: 0.2rem;
    &:hover { color: c.$PHB-TEXT-2; }
  }
}

@keyframes pulse-warn {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.75; }
}

.exit-warn-enter-active { transition: opacity 0.18s ease, transform 0.2s ease; }
.exit-warn-leave-active { transition: opacity 0.15s ease; }
.exit-warn-enter-from { opacity: 0; transform: scale(0.97); }
.exit-warn-leave-to { opacity: 0; }

// ── Hero photo bg ─────────────────────────────────────────────────────────────
.hero__bg-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  opacity: 0.055;
  z-index: 0;
  pointer-events: none;
}

// ── Conditions strip ──────────────────────────────────────────────────────────
.conditions-strip {
  background: c.$PHB-SURFACE;
  border-bottom: 1px solid c.$PHB-BORDER;
  padding: 1rem 0;
  overflow: hidden;

  &__inner {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    @media (min-width: 1024px) { flex-wrap: nowrap; justify-content: flex-start; }
  }

  &__heading {
    font-family: f.$font-accent;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: c.$PHB-TEXT-3;
    white-space: nowrap;
    flex-shrink: 0;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.9rem;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 100px;
    font-family: f.$font-secondary;
    font-size: 0.8rem;
    color: c.$PHB-TEXT-2;
    background: c.$PHB-BG;
    white-space: nowrap;
    transition: all 0.15s;
    cursor: default;
    i {
      color: c.$PHB-PURPLE;
      font-size: 0.72rem;
    }
    &:hover {
      border-color: rgba(18, 120, 243, 0.3);
      background: rgba(18, 120, 243, 0.04);
      color: c.$PHB-TEXT-1;
    }
  }
}

// ── Authority image ───────────────────────────────────────────────────────────
.authority__img-wrap {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: c.$PHB-SHADOW-MD;
  @media (max-width: 1023px) { display: none; }
}

.authority__img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  object-position: center;
  display: block;
}

.authority__img-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(23, 24, 70, 0.92) 0%, transparent 100%);
  padding: 2rem 1.5rem 1.5rem;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

.authority__img-stat {
  text-align: center;
  &-num {
    font-family: f.$font-principal;
    font-size: 1.6rem;
    font-weight: 800;
    color: #fff;
    line-height: 1;
    margin-bottom: 0.2rem;
  }
  &-label {
    font-family: f.$font-secondary;
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.3;
  }
}

.authority__img-divider {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
}

// ── Close section background photo ────────────────────────────────────────────
.close-section__bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.close-section__bg-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.05;
}

// ── Animations ────────────────────────────────────────────────────────────────
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(24, 231, 240, 0.2); }
  50%       { box-shadow: 0 0 0 6px rgba(24, 231, 240, 0.06); }
}

@keyframes floatBob {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
}

// ── Sticky Stacking Panels (applied via JS on desktop) ────────────────────────
// Each section gets rounded top corners to feel like "cards stacking"
.problem,
.data,
.solution,
.testimonials,
.proof,
.authority,
.method {
  border-radius: 24px 24px 0 0;
  will-change: transform;

  // On mobile, disable sticky stacking (too narrow for the effect)
  @media (max-width: 767px) {
    position: relative !important;
    top: auto !important;
    z-index: auto !important;
    min-height: auto !important;
    display: block !important;
    border-radius: 0;
    box-shadow: none !important;
  }
}
</style>
