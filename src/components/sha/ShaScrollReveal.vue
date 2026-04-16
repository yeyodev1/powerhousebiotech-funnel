<template>
  <section class="scroll-reveal-section" ref="sectionEl">

    <div class="scroll-reveal-section__bg-text">
      <p class="scroll-reveal-section__text sha-container">
        THE SCIENCE OF <em>LONGEVITY</em>,<br>
        THE ART OF <em>LIVING WELL</em>.
      </p>
    </div>

    <div class="gsap-reveal-layer" ref="revealLayer">
      <div class="gsap-reveal-layer__content sha-container">
        <p class="scroll-reveal-section__text scroll-reveal-section__text--dark">
          THE SCIENCE OF <em>LONGEVITY</em>,<br>
          THE ART OF <em>LIVING WELL</em>.
        </p>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionEl = ref<HTMLElement | null>(null)
const revealLayer = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionEl.value || !revealLayer.value) return

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    revealLayer.value.style.transform = 'translateY(0)'
    return
  }

  gsap.fromTo(
    revealLayer.value,
    { yPercent: 100 },
    {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionEl.value,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1,
      },
    }
  )
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>

<style lang="scss" scoped>
.scroll-reveal-section {
  position: relative;
  overflow: hidden;
  background: var(--sha-dark);
  min-height: 100vh;
  display: flex;
  align-items: center;
  font-family: var(--sha-font);
}

.sha-container {
  width: 100%;
  max-width: var(--sha-container);
  margin: 0 auto;
  padding: 0 var(--sha-pad-x);
}

.scroll-reveal-section__bg-text {
  position: relative;
  z-index: 1;
  padding: 160px 0;
}

.scroll-reveal-section__text {
  font-size: clamp(3rem, 7vw, 9rem);
  font-weight: var(--sha-fw-light);
  line-height: 1.0;
  letter-spacing: -0.02em;
  color: var(--sha-white);

  em {
    font-style: italic;
    font-weight: var(--sha-fw-bold);
  }

  &--dark {
    color: var(--sha-text-dark);
  }
}

.gsap-reveal-layer {
  position: absolute;
  inset: 0;
  background: var(--sha-light);
  z-index: 2;
  transform: translateY(100%);
  display: flex;
  align-items: center;
}

.gsap-reveal-layer__content {
  color: var(--sha-text-dark);
}
</style>
