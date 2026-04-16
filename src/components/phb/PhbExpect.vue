<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const data = reactive({
  stat1: { val: 0, target: 30, text: 'Reducción en marcadores clave de inflamación.' },
  stat2: { val: 0, target: 35, text: 'Mejora en la calidad del sueño.' },
  stat3: { val: 0, target: 40, text: 'Aumento en energía y rendimiento cognitivo.' },
  stat4: { val: 0, target: 70, text: 'Los pacientes sostienen hábitos saludables meses después de su programa.' }
})

const statsSection = ref(null)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: statsSection.value,
      start: 'top 80%',
    }
  })

  // Fade in text
  tl.fromTo('.phb-expect__header, .phb-expect__subtitle', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.2 }
  )
  
  tl.fromTo('.phb-stat-card',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.1 },
    "-=0.6"
  )

  // Animate numbers
  Object.keys(data).forEach((key) => {
    tl.to(data[key as keyof typeof data], { 
      val: data[key as keyof typeof data].target, 
      duration: 2, 
      ease: 'power3.out', 
      roundProps: 'val' 
    }, "-=0.8")
  })
})
</script>

<template>
  <section class="phb-expect" ref="statsSection">
    <div class="phb-expect__wrapper">
      <div class="phb-expect__header">
        <div class="phb-expect__line"></div>
        <h2 class="phb-expect__title">
          <span class="font-light">What To Expect</span><br />
          From Our Programs
        </h2>
      </div>
      
      <p class="phb-expect__subtitle">
        Mejoras medibles y basadas en ciencia en cuestión de días.
      </p>

      <div class="phb-expect__grid">
        <div v-for="(stat, key) in data" :key="key" class="phb-stat-card">
          <div class="phb-stat-card__icon">
            <!-- Icon placeholder similar to SHA -->
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div class="phb-stat-card__content">
            <h3 class="phb-stat-card__value">{{ stat.val }}%</h3>
            <p class="phb-stat-card__text">{{ stat.text }}</p>
          </div>
        </div>
      </div>

      <div class="phb-expect__footer">
        <h4 class="phb-expect__footer-title">10 AÑOS MÁS JOVEN.</h4>
        <p class="phb-expect__footer-text">Así es como nuestros pacientes describen su vitalidad y enfoque diario.</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;

.phb-expect {
  background-color: var(--phb-bg, #0d0f28);
  color: var(--phb-text-1, #ffffff);
  padding: 8rem 2rem;
  display: flex;
  justify-content: center;

  &__wrapper {
    max-width: 1200px;
    width: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  &__line {
    width: 60px;
    height: 1px;
    background-color: var(--phb-text-2, rgba(255,255,255,0.75));
  }

  &__title {
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 300;
    margin: 0;
    
    .font-light {
      font-style: italic;
    }
  }

  &__subtitle {
    font-size: 1.125rem;
    color: var(--phb-text-2, rgba(255,255,255,0.75));
    margin-bottom: 5rem;
    margin-left: 5.5rem; /* align with text after the line */
    font-weight: 300;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 4rem 2rem;
    margin-left: 0;
    
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      margin-left: 20%;
    }
  }

  .phb-stat-card {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;

    &__icon {
      width: 48px;
      height: 48px;
      color: var(--phb-text-2, rgba(255,255,255,0.75));
      opacity: 0.6;
      flex-shrink: 0;
      
      svg {
        width: 100%;
        height: 100%;
      }
    }

    &__value {
      font-size: 3.5rem;
      font-weight: 300;
      line-height: 1;
      margin: 0 0 1rem 0;
      color: var(--phb-text-1, #ffffff);
    }

    &__text {
      color: var(--phb-text-2, rgba(255,255,255,0.75));
      font-size: 1rem;
      line-height: 1.6;
      margin: 0;
      font-weight: 300;
      max-width: 280px;
    }
  }

  &__footer {
    margin-top: 8rem;

    &-title {
      font-size: 1.25rem;
      font-weight: 400;
      letter-spacing: 0.05em;
      margin: 0 0 0.5rem 0;
    }

    &-text {
      color: var(--phb-text-2, rgba(255,255,255,0.75));
      font-size: 1.125rem;
      font-weight: 300;
      margin: 0;
    }
  }
}

@media (max-width: 768px) {
  .phb-expect {
    padding: 5rem 1.5rem;

    &__subtitle {
      margin-left: 0;
    }
    
    &__title {
      font-size: 2rem;
    }
    
    &__line {
      width: 40px;
    }
    
    .phb-stat-card {
      &__value {
        font-size: 3rem;
      }
    }
  }
}
</style>
