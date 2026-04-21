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
  z-index: 1000;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 clamp(20px, 5vw, 80px);
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);

  &.scrolled {
    background: rgba(10, 11, 40, 0.75); // Deeper navy
    backdrop-filter: blur(40px) saturate(150%);
    height: 64px;
    border-bottom: 1px solid rgba(33, 188, 251, 0.15); // Subtle cyan glow border
    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
  }
}

.phb-nav__inner {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.phb-nav__logo {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(4px);
  }
}

.phb-nav__logo-mark {
  font-size: 24px;
  font-weight: 900;
  letter-spacing: 0.15em;
  background: linear-gradient(135deg, #fff 0%, var(--phb-cyan, #21bcfb) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 8px rgba(33, 188, 251, 0.3));
}

.phb-nav__logo-text {
  font-size: 10px;
  font-weight: 600;
  line-height: 1.3;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  opacity: 0.8;
  border-left: 1px solid rgba(255, 255, 255, 0.15);
  padding-left: 14px;
}

.phb-nav__links {
  display: flex;
  gap: 48px;
  align-items: center;

  @media (max-width: 960px) { display: none; }
}

.phb-nav__link {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  opacity: 0.5;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    width: 0;
    height: 1px;
    background: var(--phb-cyan, #21bcfb);
    transition: all 0.4s ease;
    transform: translateX(-50%);
    box-shadow: 0 0 10px var(--phb-cyan);
  }

  &:hover {
    opacity: 1;
    color: var(--phb-cyan, #21bcfb);
    letter-spacing: 0.15em;

    &::after {
      width: 100%;
    }
  }
}

.phb-nav__actions {
  display: flex;
  align-items: center;
  gap: 32px;
}

.phb-nav__lang {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: 8px;
  transition: all 0.3s ease;

  i {
    font-size: 14px;
    color: var(--phb-cyan, #21bcfb);
    transition: transform 0.3s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(33, 188, 251, 0.3);
    
    i {
      transform: rotate(15deg);
    }
  }
}

.phb-nav__cta {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(135deg, var(--phb-blue, #1278f3) 0%, #0a4da3 100%);
  padding: 12px 28px;
  text-decoration: none;
  border-radius: 4px; // Sharp professional look
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(18, 120, 243, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  @media (max-width: 600px) {
    font-size: 10px;
    padding: 10px 20px;
  }
}
</style>
