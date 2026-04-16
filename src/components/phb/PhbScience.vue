<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const team = [
  {
    name: 'Dra. Elena Navarro',
    role: 'Directora Médica & Especialista en Longevidad',
    image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Más de 15 años de experiencia clínica en medicina funcional y terapias celulares.'
  },
  {
    name: 'Dr. Marcus Fenix',
    role: 'Jefe de Biotecnología y Genética',
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Enfocado en el análisis de perfiles genéticos para personalizar regímenes de reparación celular.'
  },
  {
    name: 'Isabella Cortes',
    role: 'Investigadora Principal en Nutrición Celular',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Lidera la formulación de protocolos para la desinflamación y reseteo metabólico profundo.'
  }
]

const containerRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  if (!containerRef.value) return

  ctx = gsap.context(() => {
    const cards = gsap.utils.toArray('.phb-science-card') as HTMLElement[]
    
    // We pin the container and make the cards stack on top of each other
    ScrollTrigger.create({
      trigger: '.phb-science__cards-wrapper',
      start: 'top 15%',
      end: `+=${cards.length * 50}%`,
      pin: true,
      pinSpacing: true,
    })

    cards.forEach((card, i) => {
      if (i === 0) return // the first one is already there
      
      // Animate each subsequent card over the previous
      gsap.fromTo(card,
        { 
          y: '100%', 
          scale: 0.9, 
          opacity: 0, 
          boxShadow: '0 0px 0px rgba(0,0,0,0)' 
        },
        {
          y: `${i * 20}px`, // Slight offset so they look stacked
          scale: 1,
          opacity: 1,
          boxShadow: '0 -20px 40px rgba(0,0,0,0.5)',
          ease: 'none',
          scrollTrigger: {
            trigger: '.phb-science__cards-wrapper',
            start: `top+=${i * 30}% 15%`,
            end: `top+=${i * 30 + 30}% 15%`,
            scrub: true,
          }
        }
      )
    })
  }, containerRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section class="phb-science" ref="containerRef">
    <div class="phb-science__container">
      
      <div class="phb-science__header">
        <h2 class="phb-science__title">
          NO CONFÍES EN NOSOTROS.<br>
          <span style="font-weight: 300;">CONFÍA EN LOS DATOS.</span>
        </h2>
        <p class="phb-science__subtitle">
          Nuestro equipo médico no adivina. Utiliza la ciencia de vanguardia y análisis celular de precisión para entender qué bloquea tu recuperación y diseñar protocolos que tu cuerpo sí pueda aprovechar.
        </p>
      </div>

      <!-- The wrapper that gets pinned -->
      <div class="phb-science__cards-wrapper">
        <div 
          v-for="(member, index) in team" 
          :key="index"
          class="phb-science-card"
          :style="{ zIndex: index }"
        >
          <div class="phb-science-card__image-container">
            <img :src="member.image" :alt="member.name" class="phb-science-card__img" />
            <div class="phb-science-card__overlay"></div>
          </div>
          
          <div class="phb-science-card__content">
            <h3 class="phb-science-card__name">{{ member.name }}</h3>
            <p class="phb-science-card__role">{{ member.role }}</p>
            <p class="phb-science-card__desc">{{ member.desc }}</p>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;

.phb-science {
  background-color: var(--phb-bg, #0d0f28);
  color: var(--phb-text-1, #ffffff);
  padding: 8rem 2rem;
  display: flex;
  justify-content: center;
  position: relative;

  &__container {
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4rem;

    @media (min-width: 1024px) {
      flex-direction: row;
      align-items: flex-start;
      gap: 6rem;
    }
  }

  &__header {
    flex: 1;
    position: sticky;
    top: 20%;
  }

  &__title {
    font-size: clamp(2rem, 3.5vw, 3rem);
    line-height: 1.1;
    margin: 0 0 1.5rem 0;
    font-weight: 600;
  }

  &__subtitle {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--phb-text-2, rgba(255, 255, 255, 0.7));
    font-weight: 300;
  }

  &__cards-wrapper {
    flex: 1;
    position: relative;
    height: 500px; // matches card height roughly
    width: 100%;
    max-width: 500px;
  }
}

.phb-science-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  aspect-ratio: 4/5;
  border-radius: 24px;
  overflow: hidden;
  background-color: #1a1c3a;
  display: flex;
  flex-direction: column;
  transform-origin: top center;

  &__image-container {
    position: relative;
    width: 100%;
    height: 100%;
    flex: 1;
  }

  &__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(13, 15, 40, 0.95) 0%, rgba(13, 15, 40, 0.2) 60%, transparent 100%);
  }

  &__content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2.5rem;
    z-index: 2;
  }

  &__name {
    font-size: 1.75rem;
    font-weight: 400;
    margin: 0 0 0.5rem 0;
    color: var(--phb-white);
  }

  &__role {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--phb-cyan);
    margin: 0 0 1rem 0;
    font-weight: 600;
  }

  &__desc {
    font-size: 0.95rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }
}
</style>
