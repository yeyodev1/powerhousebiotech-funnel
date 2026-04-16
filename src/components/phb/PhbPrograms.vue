<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const cards = [
  {
    category: 'Regeneración · Energía',
    title: 'REBALANCE & ENERGIZE',
    description: 'Recupera tu balance y restaura la vitalidad. Reduce la carga de estrés, optimiza tu energía y mejora tu bienestar.',
    quote: '"En pocos días me sentí más ligero, calmado y con una claridad que no había tenido en años."',
    author: '— Diego, México',
    stat: 'El estrés crónico puede reducir la eficiencia metabólica un 20-50%',
    gradient: 'linear-gradient(135deg, rgba(33, 188, 251, 0.1), rgba(23, 24, 70, 0.4))'
  },
  {
    category: 'Enfoque · Recuperación',
    title: 'FOCUS & RECOVERY',
    description: 'Desbloquea tu potencial cognitivo. Protocolos de neurogénesis para optimizar el descanso fisiológico profundo.',
    quote: '"Mi capacidad de concentración y agilidad mental volvieron a ser las de hace 10 años."',
    author: '— Roberto, España',
    stat: 'El daño cognitivo por inflamación afecta a 1 de cada 4 adultos.',
    gradient: 'linear-gradient(135deg, rgba(18, 120, 243, 0.15), rgba(23, 24, 70, 0.4))'
  }
]

const programsRef = ref(null)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Fade up the cards
  gsap.fromTo('.phb-program-card',
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.phb-programs__grid',
        start: 'top 85%'
      }
    }
  )
})
</script>

<template>
  <section class="phb-programs" ref="programsRef">
    <div class="phb-programs__container">
      
      <div class="phb-programs__header">
        <h2 class="phb-programs__title">
          <span class="font-light">PROGRAMAS</span> REGENERATIVOS
        </h2>
        <p class="phb-programs__subtitle">
          Programas fundamentados en evidencia científica y médica para lograr una transformación medible.
        </p>
      </div>

      <div class="phb-programs__filters">
        <button class="phb-programs__filter active">All</button>
        <button class="phb-programs__filter">Signature</button>
        <button class="phb-programs__filter">Personalized</button>
      </div>

      <div class="phb-programs__grid">
        <div 
          v-for="(card, i) in cards" 
          :key="i"
          class="phb-program-card"
          :style="{ background: card.gradient }"
        >
          <div class="phb-program-card__header">
            <span class="phb-program-card__category">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
              </svg>
              {{ card.category }}
            </span>
            <button class="phb-program-card__btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M5 19L19 5"></path>
                <path d="M5 5h14v14"></path>
              </svg>
            </button>
          </div>

          <div class="phb-program-card__body">
            <!-- abstract graphic placeholder -->
            <div class="phb-program-card__graphic">
              <div v-if="i === 0" class="phb-anim-rings">
                <span></span><span></span><span></span>
              </div>
              <div v-else class="phb-anim-cross">
                 <svg viewBox="0 0 100 100" stroke="currentColor" stroke-width="1" fill="none">
                   <path d="M10,50 L90,50 M50,10 L50,90 M40,40 Q50,60 60,40" />
                 </svg>
              </div>
            </div>
            
            <h3 class="phb-program-card__title">{{ card.title }}</h3>
            <p class="phb-program-card__description">{{ card.description }}</p>
            
            <div class="phb-program-card__quote">
              <p>{{ card.quote }}</p>
              <small>{{ card.author }}</small>
            </div>
          </div>

          <div class="phb-program-card__footer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 3v18h18"></path>
              <path d="M18 9l-5 5-4-4-6 6"></path>
            </svg>
            <p>{{ card.stat }}</p>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;

.phb-programs {
  background-color: var(--phb-bg, #0d0f28);
  color: var(--phb-text-1, #ffffff);
  padding: 8rem 2rem;
  display: flex;
  justify-content: center;

  &__container {
    max-width: 1200px;
    width: 100%;
  }

  &__header {
    max-width: 600px;
    margin-bottom: 3rem;
  }

  &__title {
    font-size: 3.5rem;
    font-weight: 400;
    line-height: 1.1;
    margin: 0 0 1.5rem 0;
    
    .font-light {
      font-style: italic;
      font-weight: 300;
      opacity: 0.9;
    }
  }

  &__subtitle {
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 1.5;
    color: var(--phb-text-2, rgba(255,255,255,0.75));
    margin: 0;
  }

  &__filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }

  &__filter {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.2);
    color: var(--phb-text-2, rgba(255,255,255,0.8));
    padding: 0.75rem 2rem;
    border-radius: 4px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover, &.active {
      border-color: rgba(255,255,255,0.6);
      color: #fff;
    }
    
    &.active {
      background: rgba(255,255,255,0.1);
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* Card Styles */
  .phb-program-card {
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    min-height: 500px;
    position: relative;
    overflow: hidden;
    transition: transform 0.4s ease, border-color 0.4s ease;

    &:hover {
      border-color: rgba(33, 188, 251, 0.3);
      transform: translateY(-5px);
    }

    &__header {
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    &__category {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: rgba(255,255,255,0.6);
      padding: 0.25rem 0.75rem;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 20px;
    }

    &__btn {
      background: transparent;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: #fff;
        color: #000;
      }
    }

    &__body {
      padding: 3rem 2rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    &__graphic {
      height: 120px;
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      color: rgba(255,255,255,0.8);
      
      .phb-anim-rings {
        display: flex;
        flex-direction: column;
        gap: 8px;
        span {
          display: block;
          width: 80px;
          height: 20px;
          border: 1px solid currentColor;
          border-radius: 50%;
        }
      }

      .phb-anim-cross {
        width: 100px;
        height: 100px;
      }
    }

    &__title {
      font-size: 1.75rem;
      font-weight: 300;
      line-height: 1.2;
      margin: 0 0 1rem 0;
    }

    &__description {
      font-size: 1rem;
      color: rgba(255,255,255,0.7);
      line-height: 1.6;
      margin: 0 0 2rem 0;
      max-width: 90%;
    }

    &__quote {
      margin-top: auto;
      font-style: italic;
      p {
        font-size: 0.95rem;
        color: rgba(255,255,255,0.8);
        margin: 0 0 0.5rem 0;
        line-height: 1.5;
      }
      small {
        font-size: 0.8rem;
        color: rgba(255,255,255,0.5);
      }
    }

    &__footer {
      padding: 1.25rem 1.5rem;
      background: rgba(255,255,255,0.03);
      border-top: 1px solid rgba(255,255,255,0.05);
      display: flex;
      align-items: center;
      gap: 1rem;
      
      svg {
        color: var(--phb-accent, #18e7f0);
        flex-shrink: 0;
      }
      
      p {
        margin: 0;
        font-size: 0.875rem;
        color: rgba(255,255,255,0.6);
      }
    }
  }
}

@media (max-width: 768px) {
  .phb-programs {
    padding: 5rem 1.5rem;

    &__title {
      font-size: 2.25rem;
    }
    
    .phb-program-card {
      min-height: auto;
      
      &__body {
        padding: 2rem 1.5rem;
      }
    }
  }
}
</style>
