<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '@/composables/useLocale'

gsap.registerPlugin(ScrollTrigger)

const { t } = useLocale()
const sectionRef = ref<HTMLElement | null>(null)

// Map icons to the translated results from the locale file
const icons = [
  'M2 12h20M12 2v20',
  'M12 3v1m0 16v1m9-9h-1M4 12H3',
  'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
]

onMounted(() => {
  if (!sectionRef.value) return

  const ctx = gsap.context(() => {
    // Entrance Animation
    gsap.from('.phb-expect__item', {
      scrollTrigger: {
        trigger: '.phb-expect__grid',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    })

    // Parallax on the large number in background or items
    gsap.to('.phb-expect__bg-text', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      y: -100,
      ease: 'none'
    })

    // Bottom quote entrance
    gsap.from('.phb-expect__quote', {
      scrollTrigger: {
        trigger: '.phb-expect__footer',
        start: 'top 90%',
      },
      x: -30,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    })
  }, sectionRef.value)
})
</script>

<template>
  <section class="phb-expect" ref="sectionRef">
    <!-- Subtle Background Text -->
    <!-- <div class="phb-expect__bg-text">RESULTS</div> -->

    <div class="phb-expect__container">
      
      <!-- Header -->
      <div class="phb-expect__header">
        <div class="phb-expect__title-wrap">
          <!-- <div class="phb-expect__line"></div> -->
          <h2 class="phb-expect__title" v-html="t.expectations.title.replace('PowerHouse', 'PowerHouse<br>')"></h2>
        </div>
        <p class="phb-expect__subtitle">{{ t.expectations.subtitle }}</p>
      </div>

      <!-- Results Grid -->
      <div class="phb-expect__grid">
        <div 
          v-for="(item, index) in t.expectations.results" 
          :key="item.id" 
          class="phb-expect__item"
        >
          <div class="phb-expect__icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path :d="icons[index]" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="phb-expect__val">{{ item.val }}</div>
          <p class="phb-expect__label">{{ item.label }}</p>
        </div>
      </div>

      <!-- EVR Explanation Section -->
      <div class="phb-expect__evr" data-aos="fade-up">
        <div class="phb-expect__evr-content">
          <h3 class="phb-expect__evr-title" v-html="t.expectations.evr.title"></h3>
          <p class="phb-expect__evr-subtitle">{{ t.expectations.evr.subtitle }}</p>
          
          <div class="phb-expect__evr-question">
            {{ t.expectations.evr.question }}
          </div>

          <div class="phb-expect__evr-features">
            <div class="phb-expect__evr-label">{{ t.expectations.evr.offerLabel }}</div>
            <div class="phb-expect__evr-list">
              <div v-for="(feature, idx) in t.expectations.evr.features" :key="idx" class="phb-expect__evr-feature">
                <span class="phb-expect__evr-plus">+</span>
                <span class="phb-expect__evr-text">{{ feature }}</span>
              </div>
            </div>
          </div>

          <p class="phb-expect__evr-footer">{{ t.expectations.evr.footer }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.phb-expect {
  background-color: #ffffff;
  padding: clamp(80px, 10vw, 140px) 0;
  position: relative;
  overflow: hidden;
  color: #1a1823;

  &__bg-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 25vw;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.03);
    z-index: 0;
    pointer-events: none;
    letter-spacing: 0.1em;
  }

  &__container {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    padding: 0 clamp(20px, 8vw, 120px);
  }

  &__header {
    margin-bottom: 6rem;
  }

  &__title-wrap {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }

  &__line {
    width: 60px;
    height: 1.5px;
    background-color: #1a1823;
    margin-top: 1.2rem;
    flex-shrink: 0;
  }

  &__title {
    font-size: clamp(2rem, 4.5vw, 3rem);
    font-weight: 600;
    line-height: 1.1;
    margin: 0;

    :deep(em) {
      font-style: italic;
      font-weight: 700;
      color: var(--phb-cyan, #21bcfa);
    }
  }

  &__subtitle {
    font-size: clamp(1.2rem, 2.5vw, 1.5rem);
    color: rgba(0, 0, 0, 0.5);
    font-weight: 300;
    max-width: 700px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 4rem;
    margin-bottom: 4rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__icon-box {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    color: rgba(0, 0, 0, 0.3);
  }

  &__val {
    font-size: clamp(3rem, 6vw, 4.5rem);
    font-weight: 300;
    line-height: 1;
    color: var(--phb-cyan, #21bcfa);
  }

  &__label {
    font-size: 1rem;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 300;
    margin: 0;
    max-width: 250px;
  }

  &__evr {
    margin-top: 8rem;
    padding: 4rem;
    background: $PHB-BG;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 40px;
    backdrop-filter: blur(10px);
    text-align: center;
    color: #ffffff;

    &-content {
      max-width: 800px;
      margin: 0 auto;
    }

    &-title {
      font-size: clamp(1.5rem, 3vw, 2.5rem);
      font-weight: 300;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      color: #ffffff;

      :deep(em) {
        font-style: italic;
        font-weight: 700;
        color: var(--phb-cyan, #21bcfa);
      }
    }

    &-subtitle {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 2rem;
    }

    &-question {
      font-size: clamp(1.8rem, 4vw, 3rem);
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 3.5rem;
      letter-spacing: -0.02em;
    }

    &-features {
      background: rgba(255, 255, 255, 0.05);
      padding: 2.5rem;
      border-radius: 24px;
      margin-bottom: 2rem;
    }

    &-label {
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: rgba(255, 255, 255, 0.4);
      margin-bottom: 2rem;
    }

    &-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      align-items: center;

      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: center;
        gap: 3rem;
      }
    }

    &-feature {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    &-plus {
      color: var(--phb-cyan, #21bcfa);
      font-size: 1.5rem;
      font-weight: 700;
    }

    &-text {
      font-size: 1rem;
      font-weight: 400;
      color: #ffffff;
    }

    &-footer {
      font-size: 1.1rem;
      font-style: italic;
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
