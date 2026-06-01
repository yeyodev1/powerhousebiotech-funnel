<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const menuOverlay = ref<HTMLElement | null>(null)
const navLinks = ref<HTMLElement[]>([])
const router = useRouter()

const links = [
  { label: 'Inicio', href: '#' },
  { label: 'Filosofía', href: '#acerca' },
  { label: 'El Fundador', href: '#fundador' },
  { label: 'El Problema', href: '#problema' },
  { label: 'Casos Clínicos', href: '#casos' },
  { label: 'Solicitar Revisión', href: '/cualificar' },
]

function onScroll() {
  isScrolled.value = window.scrollY > 80
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value

  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
    openMenuAnimation()
  } else {
    document.body.style.overflow = ''
    closeMenuAnimation()
  }
}

function openMenuAnimation() {
  gsap.fromTo(
    menuOverlay.value,
    { clipPath: 'circle(0% at top right)' },
    {
      clipPath: 'circle(150% at top right)',
      duration: 1,
      ease: 'power3.inOut',
    }
  )

  gsap.fromTo(
    navLinks.value,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.4,
    }
  )
}

function closeMenuAnimation() {
  gsap.to(navLinks.value, {
    y: 20,
    opacity: 0,
    duration: 0.3,
    stagger: 0.05,
    ease: 'power3.in',
  })

  gsap.to(menuOverlay.value, {
    clipPath: 'circle(0% at top right)',
    duration: 0.8,
    ease: 'power3.inOut',
    delay: 0.2,
  })
}

function handleLinkClick(e: Event, href: string) {
  e.preventDefault()
  toggleMenu()
  
  setTimeout(() => {
    if (href.startsWith('/')) {
      router.push(href)
    } else if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, 1000) // Wait for menu to close before scrolling
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
  <header class="juan-header" :class="{ scrolled: isScrolled, 'menu-open': isMenuOpen }">
    <div class="juan-header__container">
      <!-- Logo -->
      <a href="/" class="logo-link phb-logo">
        <img src="@/assets/logos/logo.png" alt="PowerHouse Biotech" class="phb-logo__img" />
      </a>

      <!-- Right Actions -->
      <div class="header-right">
        <router-link to="/cualificar" class="cta-primary" v-if="!isMenuOpen">Solicitar Revisión</router-link>
        <button class="menu-btn" @click="toggleMenu" :class="{ active: isMenuOpen }">
          <span class="menu-btn__text">{{ isMenuOpen ? 'CERRAR' : 'MENÚ' }}</span>
          <div class="menu-btn__icon">
            <span class="line line-1"></span>
            <span class="line line-2"></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Fullscreen Menu Overlay -->
    <div class="menu-overlay" ref="menuOverlay" v-show="true" style="clip-path: circle(0% at top right);">
      <div class="menu-overlay__inner">
        <nav class="main-nav">
          <ul class="main-nav__list">
            <li v-for="(link, index) in links" :key="index" class="main-nav__item">
              <a 
                :href="link.href" 
                @click="handleLinkClick($event, link.href)"
                class="main-nav__link"
                :class="{ 'is-cta': link.href === '/cualificar' }"
                :ref="el => { if(el) navLinks[index] = el as HTMLElement }"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>
        
        <div class="menu-footer">
          <div class="menu-footer__col">
            <span class="label">Contacto</span>
            <a href="mailto:info@powerhousebiotech.com">info@powerhousebiotech.com</a>
          </div>
          <div class="menu-footer__col">
            <span class="label">Social</span>
            <div class="social-links">
              <a href="#" target="_blank">LinkedIn</a>
              <a href="#" target="_blank">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.juan-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  padding: 30px 0;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);

  &.scrolled {
    padding: 20px 0;
    background: rgba(6, 7, 19, 0.8);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  &.menu-open {
    background: transparent;
    backdrop-filter: none;
    border-bottom: none;
    
    .logo-text {
      color: #fff;
    }
  }

  &__container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 10001;
    
    @media (max-width: 768px) {
      padding: 0 20px;
    }
  }
}

.phb-logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  overflow: hidden;

  &__img {
    height: 40px;
    width: auto;
    object-fit: contain;
    transition: transform 0.3s ease;
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 32px;
}

.cta-primary {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  padding: 12px 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  transition: all 0.4s ease;

  &:hover {
    background: #fff;
    color: #000;
  }

  @media (max-width: 768px) {
    display: none;
  }
}

.menu-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 8px 0;

  &__text {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  &__icon {
    width: 24px;
    height: 10px;
    position: relative;
    
    .line {
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background: #fff;
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      
      &.line-1 { top: 0; }
      &.line-2 { bottom: 0; }
    }
  }

  &.active {
    .line.line-1 {
      top: 4.5px;
      transform: rotate(45deg);
    }
    .line.line-2 {
      bottom: 4.5px;
      transform: rotate(-45deg);
    }
  }
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #060713;
  z-index: 10000;
  display: flex;
  align-items: center;
  padding: 0 10vw;

  &__inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.main-nav {
  margin-top: auto;
  margin-bottom: auto;

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__item {
    overflow: hidden;
  }

  &__link {
    display: inline-block;
    font-size: clamp(40px, 6vw, 90px);
    font-weight: 400;
    color: #fff;
    text-decoration: none;
    line-height: 1.1;
    letter-spacing: -0.02em;
    transition: color 0.4s ease, transform 0.4s ease;
    
    &:hover {
      color: rgba(255, 255, 255, 0.5);
      transform: translateX(20px);
    }

    &.is-cta {
      display: inline-flex;
      align-items: center;
      margin-top: 10px;
      padding: 10px 40px;
      background: linear-gradient(135deg, #21bcfa 0%, #1278f3 100%);
      color: #fff;
      border-radius: 100px;
      font-size: clamp(24px, 4vw, 40px);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      
      &:hover {
        background: #ffffff;
        color: #060713;
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(33, 188, 250, 0.3);
      }
    }
  }
}

.menu-footer {
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 40px;

  &__col {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: rgba(255, 255, 255, 0.4);
    }

    a {
      color: #fff;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s ease;
      
      &:hover {
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .social-links {
    display: flex;
    gap: 24px;
  }
}
</style>
