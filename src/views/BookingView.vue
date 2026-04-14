<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useContactStore } from '@/stores/contact'
import { useLocale } from '@/composables/useLocale'

const router = useRouter()
const contactStore = useContactStore()
const { locale, t, toggleLocale } = useLocale()

onMounted(() => {
  if (!localStorage.getItem('phb_qualified_at')) router.replace('/cualificar')
})

const firstName = computed(() => contactStore.contact.nombre.split(' ')[0] || '')
const CALENDAR_URL = 'https://phbteam.pipedrive.com/scheduler/zX22ryuq/consulta-informativa-virtual'

function confirmed() {
  router.push('/evaluacion-confirmada')
}
</script>

<template>
  <div class="booking">
    <nav class="booking__nav">
      <img
        src="https://static.wixstatic.com/media/2361a8_1db8efe7c9d74e49be06a716224efb99~mv2.png"
        alt="PowerHouse Biotech"
        class="booking__nav-logo"
      />
      <button class="lang-toggle" @click="toggleLocale" :aria-label="locale === 'es' ? 'Switch to English' : 'Cambiar a Español'">
        {{ locale === 'es' ? 'EN' : 'ES' }}
      </button>
    </nav>

    <div class="booking__wrap">
      <div class="booking__header">
        <div class="booking__badge">
          <i class="fa-solid fa-circle-check"></i>
          {{ t.booking.badge }}
        </div>
        <h1 class="booking__title">
          <span v-if="firstName">{{ firstName }}{{ t.booking.titlePrefix }}</span>{{ t.booking.title }}
        </h1>
        <p class="booking__sub" v-html="t.booking.sub.replace('20%', '<strong>20%</strong>')"></p>
        <div class="booking__pillars">
          <div v-for="p in t.booking.pillars" :key="p.label" class="booking__pillar">
            <i :class="p.label.includes('min') || p.label.includes('minute') ? 'fa-solid fa-clock' : p.label.includes('Virtual') || p.label.includes('Online') ? 'fa-solid fa-video' : 'fa-solid fa-circle-check'"></i>
            <span>{{ p.label }}</span>
          </div>
        </div>
      </div>

      <div class="booking__calendar">
        <iframe :src="CALENDAR_URL" frameborder="0" allowtransparency="true" title="Agenda tu consulta"></iframe>
      </div>

      <div class="booking__confirm">
        <p class="booking__confirm-text">
          <i class="fa-solid fa-info-circle"></i>
          {{ t.booking.confirmText }}
        </p>
        <button class="btn btn--primary btn--lg" @click="confirmed">
          <i class="fa-solid fa-calendar-check"></i>
          {{ t.booking.confirmBtn }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as c;
@use '@/styles/fonts.modules.scss' as f;

.booking {
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
    max-width: 860px;
    margin: 0 auto;
    padding: 3rem 1.5rem 5rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  &__header { text-align: center; }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: f.$font-accent;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: c.$PHB-TEAL;
    border: 1px solid rgba(0, 152, 128, 0.25);
    border-radius: 100px;
    padding: 0.35rem 1rem;
    margin-bottom: 1.2rem;
    background: rgba(0, 152, 128, 0.06);
  }

  &__title {
    font-family: f.$font-principal;
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    font-weight: 800;
    color: c.$PHB-TEXT-1;
    margin: 0 0 1rem;
  }

  &__sub {
    font-family: f.$font-secondary;
    font-size: 1rem;
    color: c.$PHB-TEXT-2;
    line-height: 1.7;
    max-width: 620px;
    margin: 0 auto 2rem;
  }

  &__pillars {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.8rem;
  }

  &__pillar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 100px;
    background: c.$PHB-SURFACE;
    font-family: f.$font-accent;
    font-size: 0.85rem;
    color: c.$PHB-TEXT-2;
    box-shadow: c.$PHB-SHADOW-SM;
    i { color: c.$PHB-PURPLE; }
  }

  &__calendar {
    border: 1px solid c.$PHB-BORDER;
    border-radius: 16px;
    overflow: hidden;
    background: c.$PHB-SURFACE;
    min-height: 560px;
    box-shadow: c.$PHB-SHADOW-MD;
    iframe { width: 100%; min-height: 560px; border: none; display: block; }
  }

  &__confirm {
    text-align: center;
    padding: 2rem;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 14px;
    background: rgba(107, 31, 191, 0.03);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;

    &-text {
      font-family: f.$font-secondary;
      font-size: 0.9rem;
      color: c.$PHB-TEXT-3;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      i { color: c.$PHB-PURPLE; }
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
    &:hover { filter: brightness(1.1); transform: translateY(-1px); }
  }
  &--lg { padding: 1.1rem 2.2rem; font-size: 1.05rem; border-radius: 10px; }
}
</style>
