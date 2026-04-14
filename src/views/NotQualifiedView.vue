<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useContactStore } from '@/stores/contact'
import { useLocale } from '@/composables/useLocale'

const router = useRouter()
const contactStore = useContactStore()
const { locale, t, toggleLocale } = useLocale()

const firstName = computed(() => contactStore.contact.nombre.split(' ')[0] || '')

function tryAgain() {
  localStorage.removeItem('phb_disq_at')
  router.push('/')
}
</script>

<template>
  <div class="notq">
    <nav class="notq__nav">
      <img
        src="https://static.wixstatic.com/media/2361a8_1db8efe7c9d74e49be06a716224efb99~mv2.png"
        alt="PowerHouse Biotech"
        class="notq__nav-logo"
      />
      <button class="lang-toggle" @click="toggleLocale" :aria-label="locale === 'es' ? 'Switch to English' : 'Cambiar a Español'">
        {{ locale === 'es' ? 'EN' : 'ES' }}
      </button>
    </nav>

    <div class="notq__wrap">
      <div class="notq__icon">
        <i class="fa-solid fa-magnifying-glass-chart"></i>
      </div>

      <div class="notq__badge">
        <i class="fa-solid fa-triangle-exclamation"></i>
        {{ t.notQualified.badge }}
      </div>

      <h1 class="notq__title">
        <span v-if="firstName">{{ firstName }}{{ t.notQualified.titlePrefix }}</span>{{ t.notQualified.title }}
      </h1>

      <p class="notq__sub">{{ t.notQualified.sub }}</p>

      <div class="notq__quote">
        <i class="fa-solid fa-quote-left"></i>
        <p>{{ t.notQualified.quote }}</p>
      </div>

      <div class="notq__steps">
        <h2 class="notq__steps-title">{{ t.notQualified.stepsTitle }}</h2>
        <div
          v-for="(s, i) in t.notQualified.steps"
          :key="i"
          class="notq__step"
        >
          <div class="notq__step-num">{{ String(i + 1).padStart(2, '0') }}</div>
          <div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
          </div>
        </div>
      </div>

      <div class="notq__cta">
        <p class="notq__cta-text">{{ t.notQualified.ctaText }}</p>
        <button class="btn btn--outline btn--lg" @click="tryAgain">
          <i class="fa-solid fa-rotate-left"></i>
          {{ t.notQualified.ctaBtn }}
        </button>
      </div>
    </div>

    <footer class="notq__footer">
      <img
        src="https://static.wixstatic.com/media/2361a8_1db8efe7c9d74e49be06a716224efb99~mv2.png"
        alt="PowerHouse Biotech"
        class="notq__footer-logo"
      />
      <p>© {{ new Date().getFullYear() }} PowerHouse Biotech. {{ t.notQualified.footer.rights }}</p>
      <div class="notq__footer-links">
        <RouterLink to="/politicas-privacidad">{{ t.notQualified.footer.privacy }}</RouterLink>
        <span>·</span>
        <RouterLink to="/aviso-legal">{{ t.notQualified.footer.legal }}</RouterLink>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as c;
@use '@/styles/fonts.modules.scss' as f;

.notq {
  min-height: 100vh;
  background: c.$PHB-BG;
  color: c.$PHB-TEXT-1;
  display: flex;
  flex-direction: column;

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
    flex: 1;
    max-width: 680px;
    margin: 0 auto;
    padding: 4rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    text-align: center;
  }

  &__icon {
    font-size: 3rem;
    color: rgba(107, 31, 191, 0.3);
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: f.$font-accent;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #B45309;
    border: 1px solid rgba(180, 83, 9, 0.2);
    border-radius: 100px;
    padding: 0.3rem 1rem;
    background: rgba(251, 191, 36, 0.08);
  }

  &__title {
    font-family: f.$font-principal;
    font-size: clamp(1.6rem, 4vw, 2.2rem);
    font-weight: 800;
    color: c.$PHB-TEXT-1;
    line-height: 1.3;
    margin: 0;
  }

  &__sub {
    font-family: f.$font-secondary;
    font-size: 1rem;
    color: c.$PHB-TEXT-2;
    line-height: 1.8;
    margin: 0;
    max-width: 560px;
  }

  &__quote {
    padding: 1.5rem 2rem;
    border-left: 3px solid c.$PHB-PURPLE;
    background: rgba(107, 31, 191, 0.04);
    border-radius: 0 10px 10px 0;
    text-align: left;
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    width: 100%;

    i { color: rgba(107, 31, 191, 0.3); font-size: 1.2rem; flex-shrink: 0; margin-top: 0.1rem; }

    p {
      font-family: f.$font-secondary;
      font-size: 0.95rem;
      color: c.$PHB-TEXT-2;
      line-height: 1.7;
      font-style: italic;
      margin: 0;
    }
  }

  &__steps {
    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &-title {
      font-family: f.$font-principal;
      font-size: 1.1rem;
      font-weight: 700;
      color: c.$PHB-TEXT-1;
      margin: 0 0 0.5rem;
      text-align: center;
    }
  }

  &__step {
    display: flex;
    gap: 1.2rem;
    align-items: flex-start;
    padding: 1.3rem 1.5rem;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 12px;
    background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-SM;

    &-num {
      font-family: f.$font-principal;
      font-size: 1.4rem;
      font-weight: 800;
      color: rgba(107, 31, 191, 0.2);
      flex-shrink: 0;
      line-height: 1;
      padding-top: 0.1rem;
    }

    h3 {
      font-family: f.$font-principal;
      font-size: 0.95rem;
      font-weight: 700;
      color: c.$PHB-TEXT-1;
      margin: 0 0 0.3rem;
    }

    p {
      font-family: f.$font-secondary;
      font-size: 0.88rem;
      color: c.$PHB-TEXT-3;
      line-height: 1.5;
      margin: 0;
    }
  }

  &__cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-top: 1rem;

    &-text {
      font-family: f.$font-secondary;
      font-size: 0.88rem;
      color: c.$PHB-TEXT-3;
      margin: 0;
    }
  }

  &__footer {
    padding: 2.5rem 1.5rem;
    border-top: 1px solid c.$PHB-BORDER;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    background: c.$PHB-SURFACE;

    &-logo { height: 36px; width: auto; opacity: 0.7; }

    p {
      font-family: f.$font-secondary;
      font-size: 0.8rem;
      color: c.$PHB-TEXT-3;
      margin: 0;
    }

    &-links {
      display: flex;
      gap: 0.7rem;
      align-items: center;
      font-family: f.$font-secondary;
      font-size: 0.8rem;
      a { color: c.$PHB-TEXT-3; text-decoration: none; &:hover { color: c.$PHB-PURPLE; } }
      span { opacity: 0.4; }
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
  gap: 0.6rem;
  font-family: f.$font-accent;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &--outline {
    background: transparent;
    color: c.$PHB-PURPLE;
    border: 1px solid rgba(107, 31, 191, 0.3);
    padding: 0.9rem 1.8rem;
    font-size: 1rem;
    &:hover { background: rgba(107, 31, 191, 0.06); }
  }
  &--lg { padding: 1.1rem 2.2rem; font-size: 1.05rem; border-radius: 10px; }
}
</style>
