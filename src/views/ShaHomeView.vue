<template>
  <div class="sha-home">
    <ShaHeader />
    <ShaHeroSection />
    <ShaClinicalTeam />
    <ShaHealthPrograms />
    <ShaAdvisoryBoard />
    <ShaJourneys />
    <ShaScrollReveal />
    <ShaDestinations />
    <ShaUnique />
    <ShaMedia />
    <ShaBackedByScience />
    <ShaMethod />
    <ShaFooterCta />
    <ShaFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import AOS from 'aos'
import 'aos/dist/aos.css'

import ShaHeader from '@/components/sha/ShaHeader.vue'
import ShaHeroSection from '@/components/sha/ShaHeroSection.vue'
import ShaClinicalTeam from '@/components/sha/ShaClinicalTeam.vue'
import ShaHealthPrograms from '@/components/sha/ShaHealthPrograms.vue'
import ShaAdvisoryBoard from '@/components/sha/ShaAdvisoryBoard.vue'
import ShaJourneys from '@/components/sha/ShaJourneys.vue'
import ShaScrollReveal from '@/components/sha/ShaScrollReveal.vue'
import ShaDestinations from '@/components/sha/ShaDestinations.vue'
import ShaUnique from '@/components/sha/ShaUnique.vue'
import ShaMedia from '@/components/sha/ShaMedia.vue'
import ShaBackedByScience from '@/components/sha/ShaBackedByScience.vue'
import ShaMethod from '@/components/sha/ShaMethod.vue'
import ShaFooterCta from '@/components/sha/ShaFooterCta.vue'
import ShaFooter from '@/components/sha/ShaFooter.vue'

let lenis: Lenis | null = null
let rafId: number | null = null

onMounted(() => {
  // Lenis smooth scroll
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
  })

  function raf(time: number) {
    lenis!.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  // AOS animate on scroll
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 80,
    delay: 0,
  })

  // Line-title observer (global fallback for any data-line-title elements)
  const lineTitles = document.querySelectorAll('[data-line-title]')
  if (lineTitles.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )
    lineTitles.forEach((el) => obs.observe(el))
  }
})

onUnmounted(() => {
  lenis?.destroy()
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<style lang="scss">
/* Global body styles for SHA home — not scoped intentionally */
.sha-home {
  background: var(--sha-dark);
  font-family: var(--sha-font);
  color: var(--sha-white);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  a { text-decoration: none; color: inherit; }
  button { cursor: pointer; font-family: var(--sha-font); }
  img, video { display: block; max-width: 100%; }
  em { font-style: italic; }
}

/* AOS overrides for SHA home */
.sha-home [data-aos] {
  transition-duration: 0.8s !important;
}

@media (prefers-reduced-motion: reduce) {
  .sha-home [data-aos] {
    transition: none !important;
    animation: none !important;
  }
}
</style>
