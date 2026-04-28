
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import AOS from 'aos'
import 'aos/dist/aos.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ShaHeader from '@/components/sha/ShaHeader.vue'
import PhbHero from '@/components/phb/PhbHero.vue'
import PhbAbout from '@/components/phb/PhbAbout.vue'
import ShaKpiSection from '@/components/sha/ShaKpiSection.vue'
import PhbScience from '@/components/phb/PhbScience.vue'
import PhbTeam from '@/components/phb/PhbTeam.vue'
import PhbCases from '@/components/phb/PhbCases.vue'
import PhbCtaTransition from '@/components/phb/PhbCtaTransition.vue'
import PhbExpectations from '@/components/phb/PhbExpectations.vue'
import PhbCta from '@/components/phb/PhbCta.vue'
import PhbFooter from '@/components/phb/PhbFooter.vue'
import PhbProblem from '@/components/phb/PhbProblem.vue'
import ShaDiscover from '@/components/sha/ShaDiscover.vue'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null
let lenisTicker: ((time: number) => void) | null = null

onMounted(() => {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  lenisTicker = (time: number) => lenis!.raf(time * 1000)
  gsap.ticker.add(lenisTicker)
  gsap.ticker.lagSmoothing(0)
  lenis.on('scroll', ScrollTrigger.update)

  AOS.init({
    duration: 700,
    easing: 'ease-out',
    once: true,
    offset: 60,
  })

  // Re-trigger scroll animations after Vue mounts DOM
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 500)
})

onUnmounted(() => {
  lenis?.destroy()
  if (lenisTicker) gsap.ticker.remove(lenisTicker)
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <div class="phb-home">
    <ShaHeader />
    <PhbHero />
    <PhbAbout />
    <PhbProblem /> 
    <PhbExpectations />
    <!-- New SHA-inspired sections -->
    <ShaKpiSection />
    <ShaDiscover />
    <PhbTeam />
    <PhbCases />
    <!-- End new sections -->
    <!-- <PhbCtaTransition /> -->
    <PhbCta />
    <PhbFooter />
  </div>
</template>

<style lang="scss">
.phb-home {
  background: var(--phb-white);
  font-family: var(--phb-font);
  color: var(--phb-text);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img,
  video {
    display: block;
    max-width: 100%;
  }
}

/* AOS overrides */
.phb-home [data-aos] {
  transition-duration: 0.7s !important;
}
</style>
