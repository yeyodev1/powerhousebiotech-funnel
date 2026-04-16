<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Stat {
  id: number
  label: string
  targetValue: number
  currentValue: number
  suffix: string
  prefix: string
}

const stats = reactive<Stat[]>([
  { id: 1, label: 'Especialistas y expertos médicos, respaldados por años de investigación pionera.', targetValue: 50, currentValue: 0, suffix: '', prefix: '+' },
  { id: 2, label: 'Tratamientos basados en evidencia biotecnológica avanzada.', targetValue: 1000, currentValue: 0, suffix: '', prefix: '+' },
  { id: 3, label: 'Especialidades médicas y regenerativas integradas en un solo lugar.', targetValue: 50, currentValue: 0, suffix: '', prefix: '+' },
  { id: 4, label: 'Pacientes que han transformado su salud con nuestro enfoque biológico.', targetValue: 100000, currentValue: 0, suffix: '', prefix: '+' },
  { id: 5, label: 'Reconocimientos internacionales a la innovación en medicina regenerativa.', targetValue: 100, currentValue: 0, suffix: '', prefix: '+' }
])

const sectionRef = ref<HTMLElement | null>(null)

const formatNumber = (val: number) => {
  return Math.floor(val).toLocaleString('en-US')
}

onMounted(() => {
  if (!sectionRef.value) return

  ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 75%',
    onEnter: () => {
      stats.forEach((stat) => {
        gsap.to(stat, {
          currentValue: stat.targetValue,
          duration: 1.2,
          ease: 'power3.out',
          snap: { currentValue: 1 }
        })
      })
    },
    once: true
  })
})
</script>

<template>
  <section class="phb-science" ref="sectionRef">
    <div class="phb-science__container">
      
      <!-- Top Section -->
      <div class="phb-science__header">
        <div class="phb-science__title-wrap">
          <div class="phb-science__line"></div>
          <h2 class="phb-science__title">Lo que hace a <br><em>PowerHouse</em> único</h2>
        </div>
        
        <div class="phb-science__desc">
          <p>
            PowerHouse integra todo lo probado para optimizar la salud y el rendimiento en un método único y fluido, impulsado por la ciencia y perfeccionado durante años. A través de programas hiper-personalizados, diagnósticos avanzados y atención experta, nuestros pacientes logran una transformación tangible y duradera en tiempo récord.
          </p>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="phb-science__grid">
        <div 
          v-for="stat in stats" 
          :key="stat.id" 
          class="phb-science-stat"
        >
          <div class="phb-science-stat__number">
            {{ stat.prefix }}{{ formatNumber(stat.currentValue) }}{{ stat.suffix }}
          </div>
          <p class="phb-science-stat__label">
            {{ stat.label }}
          </p>
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
