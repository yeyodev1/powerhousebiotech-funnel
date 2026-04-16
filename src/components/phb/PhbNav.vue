<template>
  <header class="phb-nav" :class="{ scrolled: isScrolled }">
    <div class="phb-nav__inner">
      <a href="/" class="phb-nav__logo">
        <span class="phb-nav__logo-mark">PHB</span>
        <span class="phb-nav__logo-text">PowerHouse<br>Biotech</span>
      </a>

      <nav class="phb-nav__links">
        <a href="#solucion" class="phb-nav__link">{{ t.nav.menu.science }}</a>
        <a href="#metodo" class="phb-nav__link">{{ t.nav.menu.method }}</a>
        <a href="#casos" class="phb-nav__link">{{ t.nav.menu.cases }}</a>
      </nav>

      <div class="phb-nav__actions">
        <!-- Language Switcher -->
        <button @click="toggleLocale" class="phb-nav__lang" :aria-label="locale === 'es' ? 'Change language' : 'Cambiar idioma'">
          <i class="fa-solid fa-language"></i>
          <span>{{ locale === 'es' ? 'ES' : 'EN' }}</span>
        </button>

        <a href="#cta" class="phb-nav__cta">
          {{ t.nav.cta }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'

const isScrolled = ref(false)
const { locale, t, toggleLocale } = useLocale()

function onScroll() {
  isScrolled.value = window.scrollY > 60
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style lang="scss" scoped>
.phb-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 900;
  height: 68px;
  display: flex;
  align-items: center;
  padding: 0 clamp(20px, 5vw, 80px);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  &.scrolled {
    background: rgba(23, 24, 70, 0.85); // Navy transparent
    backdrop-filter: blur(20px) saturate(180%);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    height: 60px;
  }
}

.phb-nav__inner {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.phb-nav__logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.phb-nav__logo-mark {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--phb-cyan, #21bcfb);
}

.phb-nav__logo-text {
  font-size: 11px;
  font-weight: 500;
  line-height: 1.25;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.9;
}

.phb-nav__links {
  display: flex;
  gap: 40px;
  align-items: center;

  @media (max-width: 900px) { display: none; }
}

.phb-nav__link {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  opacity: 0.6;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    color: var(--phb-cyan, #21bcfb);
    transform: translateY(-1px);
  }
}

.phb-nav__actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.phb-nav__lang {
  background: transparent;
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  padding: 8px;
  opacity: 0.7;
  transition: all 0.3s ease;

  i {
    font-size: 16px;
    color: var(--phb-cyan, #21bcfb);
  }

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
}

.phb-nav__cta {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  background: var(--phb-blue, #1278f3); // Blue (30%)
  padding: 10px 24px;
  text-decoration: none;
  border-radius: 100px; // Pill style
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 4px 15px rgba(18, 120, 243, 0.2);

  &:hover {
    background: var(--phb-cyan, #21bcfb); // Cyan (10%) on hover
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(33, 188, 251, 0.3);
  }

  @media (max-width: 600px) {
    font-size: 10px;
    padding: 8px 18px;
  }
}
</style>
