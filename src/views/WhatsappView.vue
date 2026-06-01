<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import AOS from 'aos'
import 'aos/dist/aos.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '@/composables/useLocale'

// Global Header & Footer
import JuanHeader from '@/components/juan/JuanHeader.vue'
import PhbFooter from '@/components/phb/PhbFooter.vue'

// WhatsApp Components
import WhatsappHero from '@/components/whatsapp/WhatsappHero.vue'
import WhatsappBenefits from '@/components/whatsapp/WhatsappBenefits.vue'

const { t } = useLocale()

gsap.registerPlugin(ScrollTrigger)

const WHATSAPP_LINK = 'https://chat.whatsapp.com/K43yrnUQbVq2O9hn93X03c?mode=gi_t'

let lenis: Lenis | null = null
let lenisTicker: ((time: number) => void) | null = null

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })

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

  AOS.init({
    duration: 800,
    easing: 'ease-out-quart',
    once: true,
    offset: 80,
  })

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
    
    <JuanHeader />
    
    <main>
      <WhatsappHero :whatsapp-link="WHATSAPP_LINK" />
      <WhatsappBenefits :whatsapp-link="WHATSAPP_LINK" />
    </main>

    <PhbFooter />
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
