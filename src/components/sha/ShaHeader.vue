<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'

const isScrolled = ref(false)
const { locale, t, toggleLocale } = useLocale()

function onScroll() {
  isScrolled.value = window.scrollY > 80
}

function scrollToSection(id: string) {
  const target = document.querySelector(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

function handleNavClick(e: Event, id: string) {
  e.preventDefault()
  scrollToSection(id)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="site-header" :class="{ scrolled: isScrolled }">
    <div class="site-header__container">
      <!-- Left: Brand / Logo -->
      <div class="header-left">
        <a href="/" class="site-logo">
          <img src="@/assets/logos/logo.png" alt="PowerHouse Biotech" class="site-logo__img" />
        </a>
      </div>

      <!-- Center: Navigation -->
      <nav class="header-center">
        <ul class="nav-list">
          <li><a href="#ciencia" @click="handleNavClick($event, '#ciencia')">{{ t.nav.menu.science }}</a></li>
          <li><a href="#metodo" @click="handleNavClick($event, '#metodo')">{{ t.nav.menu.method }}</a></li>
          <li><a href="#casos" @click="handleNavClick($event, '#casos')">{{ t.nav.menu.cases }}</a></li>
        </ul>
      </nav>

      <!-- Right: Actions -->
      <div class="header-right">
        <!-- Language Switcher -->
        <button @click="toggleLocale" class="lang-switch" :aria-label="locale === 'es' ? 'Change language' : 'Cambiar idioma'">
          {{ locale === 'es' ? 'ES' : 'EN' }}
        </button>
        
        <a href="#cta" class="cta-book" @click="handleNavClick($event, '#cta')">
          {{ t.nav.cta }}
        </a>

        <!-- Mobile Menu Toggle -->
        <button class="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 80px;
  display: flex;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  
  &.scrolled {
    height: 64px;
    background: $PHB-MESH-GRADIENT;
    backdrop-filter: blur(20px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  &__container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 60px);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.header-left {
  display: flex;
  align-items: center;
}

.site-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.3s;
  
  &:hover { opacity: 0.8; }

  &__img {
    height: 40px; // Standard height for desktop
    width: auto;
    object-fit: contain;
    
    .scrolled & {
      height: 32px; // Slightly smaller when scrolled
    }
  }
}

.header-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 1024px) {
    display: none; // Hiding main nav on mobile for now, placeholder for hamburger menu
  }
}

.nav-list {
  display: flex;
  gap: 40px;
  list-style: none;
  padding: 0;
  margin: 0;

  a {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: var(--phb-cyan, #21bcfa);
      letter-spacing: 0.25em;
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 32px;
}

.lang-switch {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: color 0.3s;
  
  &:hover { color: #fff; }
}

.cta-book {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 10px 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #fff;
    color: #000;
    border-color: #fff;
  }
  
  @media (max-width: 600px) {
    display: none;
  }
}

.hamburger {
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    
    span {
      display: block;
      width: 24px;
      height: 1.5px;
      background: #fff;
    }
  }
}
</style>
