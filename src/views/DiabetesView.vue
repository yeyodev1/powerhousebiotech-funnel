<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import AOS from 'aos'
import 'aos/dist/aos.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Header & Footer
import ShaHeader from '@/components/sha/ShaHeader.vue'
import PhbFooter from '@/components/phb/PhbFooter.vue'

// Diabetes Sections
import DiabetesHero from '@/components/diabetes/DiabetesHero.vue'
import DiabetesTarget from '@/components/diabetes/DiabetesTarget.vue'
import DiabetesTruth from '@/components/diabetes/DiabetesTruth.vue'
import DiabetesSecret from '@/components/diabetes/DiabetesSecret.vue'
import DiabetesPositioning from '@/components/diabetes/DiabetesPositioning.vue'
import DiabetesSystem from '@/components/diabetes/DiabetesSystem.vue'
import DiabetesProtocol from '@/components/diabetes/DiabetesProtocol.vue'
import DiabetesBenefits from '@/components/diabetes/DiabetesBenefits.vue'
import DiabetesDifferentiator from '@/components/diabetes/DiabetesDifferentiator.vue'
import DiabetesCta from '@/components/diabetes/DiabetesCta.vue'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null
let lenisTicker: ((time: number) => void) | null = null

onMounted(() => {
  // Initialize Lenis for smooth scroll
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  lenisTicker = (time: number) => lenis!.raf(time * 1000)
  gsap.ticker.add(lenisTicker)
  gsap.ticker.lagSmoothing(0)
  lenis.on('scroll', ScrollTrigger.update)

  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
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
  <div class="diabetes-view">
    <ShaHeader />
    
    <main>
      <DiabetesHero />
      <DiabetesTarget />
      <DiabetesTruth />
      <DiabetesSecret />
      <DiabetesPositioning />
      <DiabetesSystem />
      <DiabetesProtocol />
      <DiabetesBenefits />
      <DiabetesDifferentiator />
      <DiabetesCta />
    </main>

    <PhbFooter />
  </div>
</template>

<style lang="scss">
.diabetes-view {
  background: var(--phb-bg);
  background-image: var(--phb-mesh);
  background-attachment: fixed;
  color: var(--phb-text);
  font-family: var(--phb-font);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;

  main {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  /* Global section spacing */
  section {
    position: relative;
    padding: clamp(60px, 10vw, 120px) 0;
    width: 100%;
  }

  .container {
    max-width: var(--sha-container);
    margin: 0 auto;
    padding: 0 var(--sha-pad-x);
  }

  /* AOS Customizations */
  [data-aos] {
    transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
}
</style>
