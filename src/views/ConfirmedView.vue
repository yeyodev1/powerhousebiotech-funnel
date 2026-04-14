<script setup lang="ts">
import { computed } from 'vue'
import { useContactStore } from '@/stores/contact'
import { useLocale } from '@/composables/useLocale'

const contactStore = useContactStore()
const { locale, t, toggleLocale } = useLocale()

const firstName = computed(() => contactStore.contact.nombre.split(' ')[0] || '')
</script>

<template>
  <div class="confirmed">
    <nav class="confirmed__nav">
      <img
        src="https://static.wixstatic.com/media/2361a8_1db8efe7c9d74e49be06a716224efb99~mv2.png"
        alt="PowerHouse Biotech"
        class="confirmed__nav-logo"
      />
      <button class="lang-toggle" @click="toggleLocale" :aria-label="locale === 'es' ? 'Switch to English' : 'Cambiar a Español'">
        {{ locale === 'es' ? 'EN' : 'ES' }}
      </button>
    </nav>

    <div class="confirmed__wrap">
      <div class="confirmed__hero">
        <div class="confirmed__icon">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <div class="confirmed__badge">
          <i class="fa-solid fa-dna"></i>
          {{ t.confirmed.badge }}
        </div>
        <h1 class="confirmed__title">
          <span v-if="firstName">{{ firstName }}{{ t.confirmed.titlePrefix }}</span>{{ t.confirmed.title }}
        </h1>
        <p class="confirmed__sub">{{ t.confirmed.sub }}</p>
      </div>

      <div class="confirmed__steps">
        <h2 class="confirmed__steps-title">
          <i class="fa-solid fa-list-check"></i>
          {{ t.confirmed.stepsTitle }}
        </h2>
        <div class="confirmed__steps-grid">
          <div v-for="(s, i) in t.confirmed.steps" :key="i" class="confirmed__step">
            <div class="confirmed__step-icon">
              <i :class="i === 0 ? 'fa-solid fa-envelope' : i === 1 ? 'fa-solid fa-folder-open' : 'fa-solid fa-notes-medical'"></i>
            </div>
            <div>
              <h3 class="confirmed__step-title">{{ s.title }}</h3>
              <p class="confirmed__step-desc">{{ s.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="confirmed__reminder">
        <i class="fa-solid fa-clock"></i>
        <p>
          {{ t.confirmed.reminder }}
          <strong>{{ t.confirmed.reminderStrong }}</strong>
        </p>
      </div>
    </div>

    <footer class="confirmed__footer">
      <img
        src="https://static.wixstatic.com/media/2361a8_1db8efe7c9d74e49be06a716224efb99~mv2.png"
        alt="PowerHouse Biotech"
        class="confirmed__footer-logo"
      />
      <p>© {{ new Date().getFullYear() }} PowerHouse Biotech. {{ t.confirmed.footer.rights }}</p>
      <div class="confirmed__footer-links">
        <RouterLink to="/politicas-privacidad">{{ t.confirmed.footer.privacy }}</RouterLink>
        <span>·</span>
        <RouterLink to="/aviso-legal">{{ t.confirmed.footer.legal }}</RouterLink>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as c;
@use '@/styles/fonts.modules.scss' as f;

.confirmed {
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
    max-width: 720px;
    margin: 0 auto;
    padding: 4rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  &__hero { text-align: center; }

  &__icon {
    font-size: 3.5rem;
    color: c.$PHB-TEAL;
    margin-bottom: 1.5rem;
    display: block;
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
    color: c.$PHB-TEAL;
    border: 1px solid rgba(0, 152, 128, 0.25);
    border-radius: 100px;
    padding: 0.3rem 1rem;
    margin-bottom: 1.5rem;
    background: rgba(0, 152, 128, 0.06);
  }

  &__title {
    font-family: f.$font-principal;
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    font-weight: 800;
    color: c.$PHB-TEXT-1;
    margin: 0 0 1rem;
    line-height: 1.2;
  }

  &__sub {
    font-family: f.$font-secondary;
    font-size: 1.05rem;
    color: c.$PHB-TEXT-2;
    line-height: 1.7;
    max-width: 560px;
    margin: 0 auto;
  }

  &__steps {
    background: c.$PHB-SURFACE;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: c.$PHB-SHADOW-SM;

    &-title {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-family: f.$font-principal;
      font-size: 1.1rem;
      font-weight: 700;
      color: c.$PHB-TEXT-1;
      margin: 0 0 1.5rem;
      i { color: c.$PHB-PURPLE; }
    }

    &-grid {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
  }

  &__step {
    display: flex;
    gap: 1rem;
    align-items: flex-start;

    &-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: rgba(107, 31, 191, 0.07);
      border: 1px solid rgba(107, 31, 191, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      color: c.$PHB-PURPLE;
      flex-shrink: 0;
      font-size: 1rem;
    }

    &-title {
      font-family: f.$font-principal;
      font-size: 0.95rem;
      font-weight: 700;
      color: c.$PHB-TEXT-1;
      margin: 0 0 0.3rem;
    }

    &-desc {
      font-family: f.$font-secondary;
      font-size: 0.88rem;
      color: c.$PHB-TEXT-3;
      line-height: 1.5;
      margin: 0;
    }
  }

  &__reminder {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    padding: 1.5rem 2rem;
    border: 1px solid rgba(107, 31, 191, 0.15);
    border-radius: 12px;
    background: rgba(107, 31, 191, 0.04);

    i { color: c.$PHB-PURPLE; font-size: 1.1rem; flex-shrink: 0; margin-top: 0.1rem; }

    p {
      font-family: f.$font-secondary;
      font-size: 0.92rem;
      color: c.$PHB-TEXT-2;
      line-height: 1.6;
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
      color: c.$PHB-TEXT-3;
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
</style>
