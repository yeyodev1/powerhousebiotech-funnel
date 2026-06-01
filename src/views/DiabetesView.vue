<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import AOS from 'aos'
import 'aos/dist/aos.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Header & Footer
import JuanHeader from '@/components/juan/JuanHeader.vue'
import PhbFooter from '@/components/phb/PhbFooter.vue'

// Diabetes Sections
import DiabetesHero from '@/components/diabetes/DiabetesHero.vue'
import DiabetesTarget from '@/components/diabetes/DiabetesTarget.vue'
import DiabetesTruth from '@/components/diabetes/DiabetesTruth.vue'
import DiabetesSecret from '@/components/diabetes/DiabetesSecret.vue'
import DiabetesPositioning from '@/components/diabetes/DiabetesPositioning.vue'
import DiabetesSystem from '@/components/diabetes/DiabetesSystem.vue'
import PhbAuthority from '@/components/phb/PhbAuthority.vue'
import DiabetesProtocol from '@/components/diabetes/DiabetesProtocol.vue'
import DiabetesCases from '@/components/diabetes/DiabetesCases.vue'
import DiabetesBenefits from '@/components/diabetes/DiabetesBenefits.vue'
import DiabetesDifferentiator from '@/components/diabetes/DiabetesDifferentiator.vue'
import DiabetesCta from '@/components/diabetes/DiabetesCta.vue'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null
let lenisTicker: ((time: number) => void) | null = null

onMounted(() => {
  // Initialize Lenis for smooth scroll
  lenis = new Lenis({
    duration: 1.4,
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
    duration: 1000,
    easing: 'ease-out-quart',
    once: false, // Changed to false to allow repeated animations on scroll
    offset: 100,
  })

  // Refresh ScrollTrigger after components mount
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 1200)
})

onUnmounted(() => {
  lenis?.destroy()
  if (lenisTicker) gsap.ticker.remove(lenisTicker)
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <div class="diabetes-view">
    <!-- Global Mesh Background -->
    <div class="diabetes-view__mesh"></div>
    
    <JuanHeader />
    
    <main>
      <DiabetesHero />
      <DiabetesTarget />
      <DiabetesTruth />
      <DiabetesSecret />
      <DiabetesPositioning />
      <PhbAuthority />
      <DiabetesSystem />
      <DiabetesProtocol />
      <DiabetesCases />
      <DiabetesBenefits />
      <DiabetesDifferentiator />
      <DiabetesCta />
    </main>

    <PhbFooter />
  </div>
</template>

<style lang="scss">
.diabetes-view {
  background-color: #05060f;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  position: relative;

  &__mesh {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(at 10% 10%, rgba(23, 24, 70, 0.9) 0%, transparent 60%),
                      radial-gradient(at 90% 10%, rgba(33, 188, 251, 0.1) 0%, transparent 50%),
                      radial-gradient(at 90% 90%, rgba(18, 120, 243, 0.12) 0%, transparent 60%),
                      radial-gradient(at 10% 90%, rgba(24, 231, 240, 0.1) 0%, transparent 50%);
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

  /* Section Base Styles */
  section {
    position: relative;
    padding: clamp(80px, 12vw, 160px) 0;
    width: 100%;
  }

  .container {
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 60px);
  }

  /* Utility Classes */
  .phb-line-title {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--phb-cyan, #21bcfa);
    margin-bottom: 24px;

    &__line {
      display: block;
      width: 32px;
      height: 1.5px;
      background: var(--phb-cyan, #21bcfa);
    }
  }

  /* AOS Customizations */
  [data-aos] {
    transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  }
}
</style>
