<template>
  <div class="phb-home">
    <PhbNav />
    <PhbHero />
    <PhbAbout />
    <PhbProblem />
    <PhbData />
    <PhbSolution />
    <PhbCases />
    <PhbMethod />
    <PhbCta />
    <PhbFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import AOS from 'aos'
import 'aos/dist/aos.css'

import PhbNav from '@/components/phb/PhbNav.vue'
import PhbHero from '@/components/phb/PhbHero.vue'
import PhbAbout from '@/components/phb/PhbAbout.vue'
import PhbProblem from '@/components/phb/PhbProblem.vue'
import PhbData from '@/components/phb/PhbData.vue'
import PhbSolution from '@/components/phb/PhbSolution.vue'
import PhbCases from '@/components/phb/PhbCases.vue'
import PhbMethod from '@/components/phb/PhbMethod.vue'
import PhbCta from '@/components/phb/PhbCta.vue'
import PhbFooter from '@/components/phb/PhbFooter.vue'

let lenis: Lenis | null = null
let rafId: number | null = null

onMounted(() => {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  function raf(time: number) {
    lenis!.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  AOS.init({
    duration: 700,
    easing: 'ease-out',
    once: true,
    offset: 60,
  })
})

onUnmounted(() => {
  lenis?.destroy()
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<style lang="scss">
.phb-home {
  background: var(--phb-white);
  font-family: var(--phb-font);
  color: var(--phb-text);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;

  * { box-sizing: border-box; }
  a { text-decoration: none; color: inherit; }
  img, video { display: block; max-width: 100%; }
}

/* AOS overrides */
.phb-home [data-aos] {
  transition-duration: 0.7s !important;
}
</style>
