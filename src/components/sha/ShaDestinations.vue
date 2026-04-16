<template>
  <section class="destinations-section" id="destinations">

    <div class="destinations-intro">
      <div class="line-title line-title--animated" :class="{ 'in-view': lineTitleVisible }" ref="lineTitle">
        Our Locations
      </div>
      <h2 class="destinations-intro__heading">
        DESTINATIONS<br>FOR A LONGER, HEALTHIER LIFE
      </h2>
    </div>

    <div class="locations-stack" ref="stackEl">
      <div
        v-for="(loc, i) in locations"
        :key="loc.name"
        class="location-card"
        :ref="(el) => { if (el) cardEls[i] = el as HTMLElement }"
        :data-location="loc.id"
      >
        <img class="location-card__image" :src="loc.img" :alt="loc.alt" loading="lazy" />
        <div class="location-card__overlay"></div>
        <div class="location-card__content">
          <div class="location-card__name">
            {{ loc.name }}
            <button class="location-card__arrow-btn" :aria-label="`Visit ${loc.name}`">&#8599;</button>
          </div>
          <div v-if="loc.opening" class="location-card__opening">{{ loc.opening }}</div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lineTitle = ref<HTMLElement | null>(null)
const lineTitleVisible = ref(false)
const stackEl = ref<HTMLElement | null>(null)
const cardEls = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

const locations = [
  {
    id: 'spain',
    name: 'SHA SPAIN',
    alt: 'SHA Spain — mountain landscape and infinity pool',
    img: 'https://shawellness.com/wp-content/uploads/2025/12/sha-spain-landscape.jpg',
    opening: null,
  },
  {
    id: 'mexico',
    name: 'SHA MEXICO',
    alt: 'SHA Mexico — curved building by the sea',
    img: 'https://shawellness.com/wp-content/uploads/2026/01/location-mex-1.jpg',
    opening: null,
  },
  {
    id: 'emirates',
    name: 'SHA EMIRATES',
    alt: 'SHA Emirates — aerial view of island',
    img: 'https://shawellness.com/wp-content/uploads/2025/11/sha-emirates-aerial.jpg',
    opening: 'Opening in 2027',
  },
]

onMounted(() => {
  // Line title observer
  if (lineTitle.value && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          lineTitleVisible.value = true
          observer?.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(lineTitle.value)
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  // GSAP curtain effect: each card (except first) slides up over the previous
  cardEls.value.forEach((card, i) => {
    if (i === 0) return

    gsap.fromTo(
      card,
      { yPercent: 100 },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.5,
        },
      }
    )
  })
})

onUnmounted(() => {
  observer?.disconnect()
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>

<style lang="scss" scoped>
.destinations-section {
  position: relative;
  font-family: var(--sha-font);
}

.destinations-intro {
  background: var(--sha-light);
  color: var(--sha-text-dark);
  padding: 160px var(--sha-pad-x);
  position: relative;
  z-index: 1;
}

.line-title {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  font-weight: var(--sha-fw-regular);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--sha-text-muted);

  &::before {
    content: '';
    display: block;
    width: 0;
    height: 1px;
    background: currentColor;
    transition: width 0.8s ease;
    flex-shrink: 0;
  }

  &.in-view::before { width: 40px; }
}

.destinations-intro__heading {
  font-size: clamp(2rem, 4.5vw, 5rem);
  font-weight: var(--sha-fw-light);
  margin-top: 20px;
  line-height: 1.05;
  max-width: 700px;
}

.locations-stack {
  position: relative;
}

.location-card {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  will-change: transform;
}

.location-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.location-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55) 0%, transparent 50%);
}

.location-card__content {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 48px var(--sha-pad-x);
  color: var(--sha-white);
}

.location-card__name {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: var(--sha-fw-light);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 20px;
}

.location-card__arrow-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--sha-white);
  font-size: 16px;
  flex-shrink: 0;
  cursor: pointer;
}

.location-card__opening {
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 8px;
}
</style>
