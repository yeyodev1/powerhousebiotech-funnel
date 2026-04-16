<template>
  <header class="phb-nav" :class="{ scrolled: isScrolled }">
    <div class="phb-nav__inner">
      <a href="/" class="phb-nav__logo">
        <span class="phb-nav__logo-mark">PHB</span>
        <span class="phb-nav__logo-text">PowerHouse<br>Biotech</span>
      </a>

      <nav class="phb-nav__links">
        <a href="#solucion" class="phb-nav__link">Evaluación</a>
        <a href="#metodo" class="phb-nav__link">Método</a>
        <a href="#casos" class="phb-nav__link">Casos</a>
      </nav>

      <a href="#cta" class="phb-nav__cta">
        Quiero saber si puedo mejorar
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

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
  transition: background 0.3s, box-shadow 0.3s;

  &.scrolled {
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(12px);
    box-shadow: 0 1px 0 rgba(23, 24, 70, 0.08);
  }
}

.phb-nav__inner {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.phb-nav__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.phb-nav__logo-mark {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--phb-blue);
  font-family: var(--phb-font);
}

.phb-nav__logo-text {
  font-size: 11px;
  font-weight: 400;
  line-height: 1.3;
  color: var(--phb-text);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: var(--phb-font);
}

.phb-nav__links {
  display: flex;
  gap: 32px;
  align-items: center;

  @media (max-width: 768px) { display: none; }
}

.phb-nav__link {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.06em;
  color: var(--phb-text);
  text-decoration: none;
  text-transform: uppercase;
  font-family: var(--phb-font);
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover { opacity: 1; }
}

.phb-nav__cta {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--phb-white);
  background: var(--phb-blue);
  padding: 10px 22px;
  text-decoration: none;
  font-family: var(--phb-font);
  transition: background 0.2s;

  &:hover { background: #0d65d9; }

  @media (max-width: 600px) {
    font-size: 10px;
    padding: 8px 14px;
  }
}
</style>
