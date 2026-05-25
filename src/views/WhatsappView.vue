<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import AOS from 'aos'
import 'aos/dist/aos.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Global Header & Footer
import ShaHeader from '@/components/sha/ShaHeader.vue'
import PhbFooter from '@/components/phb/PhbFooter.vue'

// WhatsApp Components
import WhatsappHero from '@/components/whatsapp/WhatsappHero.vue'
import WhatsappBenefits from '@/components/whatsapp/WhatsappBenefits.vue'
import WhatsappLeadModal from '@/components/whatsapp/WhatsappLeadModal.vue'

gsap.registerPlugin(ScrollTrigger)

const isLeadModalOpen = ref(false)

const openLeadModal = () => {
  isLeadModalOpen.value = true
}

let lenis: Lenis | null = null
let lenisTicker: ((time: number) => void) | null = null

onMounted(() => {
  // Scroll to top instantly on route entry
  window.scrollTo({ top: 0, behavior: 'instant' })

  // Initialize Lenis for smooth scroll
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  })

  lenisTicker = (time: number) => lenis!.raf(time * 1000)
  gsap.ticker.add(lenisTicker)
  gsap.ticker.lagSmoothing(0)
  lenis.on('scroll', ScrollTrigger.update)

  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease-out-quart',
    once: true,
    offset: 80,
  })

  // Refresh ScrollTrigger after components mount
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 1000)
})

onUnmounted(() => {
  lenis?.destroy()
  if (lenisTicker) gsap.ticker.remove(lenisTicker)
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <div class="whatsapp-view">
    <!-- Global Mesh Background -->
    <div class="whatsapp-view__mesh"></div>
    
    <ShaHeader />
    
    <main>
      <WhatsappHero @click-cta="openLeadModal" />
      <WhatsappBenefits @click-cta="openLeadModal" />
    </main>

    <PhbFooter />

    <WhatsappLeadModal v-if="isLeadModalOpen" @close="isLeadModalOpen = false" />
  </div>
</template>

<style lang="scss">
.whatsapp-view {
  background-color: #090a11;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  position: relative;
  min-height: 100vh;

  &__mesh {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(at 10% 10%, rgba(23, 24, 70, 0.9) 0%, transparent 60%),
                      radial-gradient(at 90% 10%, rgba(37, 211, 102, 0.08) 0%, transparent 50%),
                      radial-gradient(at 90% 90%, rgba(18, 120, 243, 0.08) 0%, transparent 60%),
                      radial-gradient(at 10% 90%, rgba(24, 231, 240, 0.06) 0%, transparent 50%);
    background-attachment: fixed;
    z-index: 0;
    pointer-events: none;
  }

  main {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  /* AOS Customizations */
  [data-aos] {
    transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  }
}
</style>
