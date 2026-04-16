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
    <div class="phb-expect__bg-text">RESULTS</div>

    <div class="phb-expect__container">
      
      <!-- Header -->
      <div class="phb-expect__header">
        <div class="phb-expect__title-wrap">
          <div class="phb-expect__line"></div>
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

      <!-- Footer / Quote Area -->
      <div class="phb-expect__footer">
        <div class="phb-expect__quote">
          <h3 class="phb-expect__quote-title">{{ t.expectations.quoteTitle }}</h3>
          <p class="phb-expect__quote-text">{{ t.expectations.quoteText }}</p>
        </div>

        <!-- Floating Media (Optional/Placeholder per Plan) -->
        <div class="phb-expect__media">
          <div class="phb-expect__media-inner">
            <img src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Meditation Balance" />
            <div class="phb-expect__media-play">
              <i class="fa-solid fa-play"></i>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.phb-expect {
  background-color: #05060f; // Deep black/navy
  padding: 10rem 2rem;
  position: relative;
  overflow: hidden;
  color: #ffffff;

  &__bg-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 25vw;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.02);
    z-index: 0;
    pointer-events: none;
    letter-spacing: 0.1em;
  }

  &__container {
    max-width: 1300px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
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
    background-color: #ffffff;
    margin-top: 1.2rem;
    flex-shrink: 0;
  }

  &__title {
    font-size: clamp(2rem, 4.5vw, 3rem);
    font-weight: 300;
    line-height: 1.1;
    margin: 0;
  }

  &__subtitle {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 300;
    margin-left: calc(60px + 2rem);
    max-width: 500px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 4rem;
    margin-bottom: 10rem;

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
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: rgba(255, 255, 255, 0.4);
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
    color: rgba(255, 255, 255, 0.6);
    font-weight: 300;
    margin: 0;
    max-width: 250px;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    gap: 4rem;

    @media (min-width: 1024px) {
      flex-direction: row;
      align-items: flex-end;
    }
  }

  &__quote {
    max-width: 600px;
    
    &-title {
      font-size: clamp(2rem, 5vw, 4rem);
      font-weight: 600;
      line-height: 1;
      margin-bottom: 1.5rem;
      letter-spacing: -0.02em;
    }

    &-text {
      font-size: 1.25rem;
      font-weight: 300;
      color: rgba(255, 255, 255, 0.6);
      margin: 0;
    }
  }

  &__media {
    width: 100%;
    max-width: 380px;
    aspect-ratio: 16/10;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 30px 60px rgba(0,0,0,0.5);

    &-inner {
      width: 100%;
      height: 100%;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-play {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 1rem;
    }
  }
}
</style>
