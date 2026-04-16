<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '@/composables/useLocale'

gsap.registerPlugin(ScrollTrigger)

interface Stat {
  id: number
  label: string
  targetValue: number
  currentValue: number
  suffix: string
  prefix: string
}
const { t } = useLocale()
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRef.value) return

  const ctx = gsap.context(() => {
    // Reveal header
    gsap.from('.phb-science__header', {
      scrollTrigger: {
        trigger: '.phb-science__header',
        start: 'top 85%',
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })

    // Reveal Stats
    gsap.from('.phb-science__stat-item', {
      scrollTrigger: {
        trigger: '.phb-science__stats',
        start: 'top 80%',
      },
      x: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out'
    })
  }, sectionRef.value)
})
</script>

<template>
  <section class="phb-science" ref="sectionRef" id="ciencia">
    <div class="phb-science__container">
      
      <header class="phb-science__header">
        <div class="phb-science__badge">Biotechnology & Precision</div>
        <h2 class="phb-science__title">
          {{ t.science.title }} <span>{{ t.science.titleAccent }}</span> {{ t.science.titleEnd }}
        </h2>
        <p class="phb-science__desc">
          {{ t.science.desc }}
        </p>
      </header>

      <div class="phb-science__grid">
        <!-- Left: Image/Visual -->
        <div class="phb-science__visual">
          <div class="phb-science__image-wrap">
            <img src="https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Biotech Lab" />
            <div class="phb-science__image-overlay"></div>
          </div>
          <!-- Floating Feature -->
          <div class="phb-science__floating-card">
            <i class="fa-solid fa-microscope"></i>
            <div>
              <strong>100% Data-Driven</strong>
              <span>Análisis de biomarcadores</span>
            </div>
          </div>
        </div>

        <!-- Right: Stats/Benefits -->
        <div class="phb-science__stats">
          <div v-for="(stat, index) in t.science.stats" :key="index" class="phb-science__stat-item">
            <div class="phb-science__stat-icon">
              <i class="fa-solid fa-check"></i>
            </div>
            <p class="phb-science__stat-text">{{ stat }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;

.phb-science {
  background-color: var(--phb-bg, #171846);
  padding: 8rem 2rem;
  color: var(--phb-text-1, #ffffff);

  &__container {
    max-width: 1300px;
    margin: 0 auto;
  }

  &__header {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    margin-bottom: 8rem;

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1.2fr;
      align-items: start;
    }
  }

  &__title-wrap {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
  }

  &__line {
    width: 60px;
    height: 1.5px;
    background-color: var(--phb-cyan, #21bcfb);
    margin-top: 1.2rem;
    flex-shrink: 0;
  }

  &__title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 300;
    line-height: 1.1;
    margin: 0;
    color: var(--phb-white, #ffffff);

    em {
      font-style: italic;
      font-weight: 500;
      color: var(--phb-cyan, #21bcfb);
    }
  }

  &__desc {
    p {
      font-size: 1.15rem;
      line-height: 1.6;
      font-weight: 300;
      color: var(--phb-text-2, rgba(255, 255, 255, 0.7));
      margin: 0;
      max-width: 650px;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    column-gap: 4rem;
    row-gap: 6rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.phb-science-stat {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__number {
    font-size: clamp(3.5rem, 6vw, 5rem);
    font-weight: 300;
    line-height: 0.9;
    letter-spacing: -0.02em;
    color: var(--phb-cyan, #21bcfb); 
  }

  &__label {
    font-size: 1.05rem;
    line-height: 1.5;
    font-weight: 300;
    color: var(--phb-text-2, rgba(255, 255, 255, 0.6));
    margin: 0;
    max-width: 320px;
  }
}
</style>
