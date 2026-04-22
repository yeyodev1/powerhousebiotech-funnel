<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const { locale, t, toggleLocale } = useLocale()

function onScroll() {
  isScrolled.value = window.scrollY > 80
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

function scrollToSection(id: string) {
  const target = document.querySelector(id)
  if (target) {
    isMenuOpen.value = false
    document.body.style.overflow = ''
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
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="site-header" :class="{ scrolled: isScrolled, 'menu-open': isMenuOpen }">
    <div class="site-header__container">
      <!-- Left: Brand / Logo -->
      <div class="header-left">
        <a href="/" class="site-logo">
          <img src="@/assets/logos/logo.png" alt="PowerHouse Biotech" class="site-logo__img" />
        </a>
      </div>

      <!-- Center: Navigation (Desktop) -->
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
        
        <router-link to="/cualificar" class="cta-book">
          {{ t.nav.cta }}
        </router-link>

        <!-- Mobile Menu Toggle -->
        <button class="hamburger" @click="toggleMenu" :class="{ active: isMenuOpen }" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Overlay -->
    <Transition name="fade-menu">
      <div v-if="isMenuOpen" class="mobile-nav">
        <div class="mobile-nav__content">
          <ul class="mobile-nav__list">
            <li><a href="#ciencia" @click="handleNavClick($event, '#ciencia')">{{ t.nav.menu.science }}</a></li>
            <li><a href="#metodo" @click="handleNavClick($event, '#metodo')">{{ t.nav.menu.method }}</a></li>
            <li><a href="#casos" @click="handleNavClick($event, '#casos')">{{ t.nav.menu.cases }}</a></li>
          </ul>
          
          <div class="mobile-nav__footer">
            <button @click="toggleLocale" class="mobile-lang-switch">
              {{ locale === 'es' ? 'English Version' : 'Versión en Español' }}
            </button>
            <router-link to="/cualificar" class="mobile-cta">
              {{ t.nav.cta }}
            </router-link>
          </div>
        </div>
      </div>
    </Transition>
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
    background: rgba(9, 10, 17, 0.8);
    backdrop-filter: blur(20px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  &.menu-open {
    background: transparent;
    backdrop-filter: none;
    border-bottom-color: transparent;
  }

  &__container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 60px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 1001;
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
    height: 40px;
    width: auto;
    object-fit: contain;
    
    .scrolled & {
      height: 32px;
    }
  }
}

.header-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 1024px) {
    display: none;
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

  @media (max-width: 1024px) {
    display: none;
  }
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
  position: relative;
  width: 24px;
  height: 20px;
  flex-direction: column;
  justify-content: space-between;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  
  @media (max-width: 1024px) {
    display: flex;
  }

  span {
    display: block;
    width: 100%;
    height: 1.5px;
    background: #fff;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  &.active {
    span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: translateY(-9.5px) rotate(-45deg); }
  }
}

/* Mobile Nav Overlay */
.mobile-nav {
  position: fixed;
  inset: 0;
  background: rgba(9, 10, 17, 0.98);
  backdrop-filter: blur(20px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;

  &__content {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 60px;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 32px;
    
    a {
      font-size: 24px;
      font-weight: 300;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      transition: color 0.3s;
      
      &:hover { color: var(--phb-cyan); }
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 40px;
  }
}

.mobile-lang-switch {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  text-align: left;
  padding: 0;
  cursor: pointer;
}

.mobile-cta {
  background: #fff;
  color: #000;
  padding: 16px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Transitions */
.fade-menu-enter-active,
.fade-menu-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-menu-enter-from,
.fade-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
