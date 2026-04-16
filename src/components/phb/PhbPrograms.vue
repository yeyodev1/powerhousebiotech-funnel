<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Phb3dCard from './Phb3dCard.vue'

const programs = [
  {
    tag: '1',
    title: 'Detectar',
    desc: 'Entendemos qué está pasando en tu cuerpo, analizando a un nivel microscópico la base celular.',
    features: ['Evaluación integral', 'Síntomas ocultos']
  },
  {
    tag: '2',
    title: 'Evaluar',
    desc: 'Analizamos tu estado real, no solo los síntomas. Medimos la edad biológica de tus órganos.',
    features: ['Lectura de biomarcadores', 'Nivel de inflamación']
  },
  {
    tag: '3',
    title: 'Aclarar',
    desc: 'Definimos qué se puede mejorar... y qué no. Sin falsas promesas, solo medicina guiada por datos.',
    features: ['Transparencia total', 'Expectativas reales']
  },
  {
    tag: '4',
    title: 'Identificar',
    desc: 'Determinamos si eres candidato o no para tratamientos, maximizando siempre tu probabilidad de respuesta.',
    features: ['Selección rigurosa', 'Probabilidad de éxito']
  },
  {
    tag: '5',
    title: 'Diseñar',
    desc: 'Creamos una ruta clara, paso a paso, priorizando la preparación biológica antes que la intervención.',
    features: ['Protocolo personalizado', 'Tiempos exactos']
  },
  {
    tag: '6',
    title: 'Encaminar',
    desc: 'Te acompañamos durante todo el proceso clínico, ajustando variables para resultados duraderos.',
    features: ['Soporte continuo', 'Ajustes adaptativos']
  }
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  gsap.fromTo('.phb-anim-wrap',
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.phb-programs__grid',
        start: 'top 85%'
      }
    }
  )
})
</script>

<template>
  <section class="phb-programs">
    <div class="phb-programs__container">
      <div class="phb-programs__header">
        <h2 class="phb-programs__title">MÉTODO DECIDE™</h2>
        <p class="phb-programs__subtitle">
          Así logramos resultados reales:<br>
          <span style="font-weight: 300; opacity: 0.8;">Primero entendemos. Luego medimos. Después preparamos. Y solo entonces... Iniciamos tratamiento.</span>
        </p>
      </div>

      <div class="phb-programs__grid">
        <div 
          v-for="(program, index) in programs" 
          :key="index"
          class="phb-anim-wrap flex w-full"
        >
          <Phb3dCard :perspective="1200" class="w-full">
            <template #default="{ isHovered }">
              <div 
                class="phb-method-card"
                :class="{ 'is-hovered': isHovered }"
              >
                <!-- Glowing background effect behind the border on hover -->
                <div class="phb-method-card__glow"></div>
                
                <div class="phb-method-card__inner preserve-3d">
                  
                  <div class="phb-method-card__top preserve-3d">
                    <span 
                      class="phb-method-card__tag transition-transform duration-300"
                      :style="{ transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)' }"
                    >
                      Paso {{ program.tag }}
                    </span>
                    
                    <h3 
                      class="phb-method-card__title transition-transform duration-300"
                      :style="{ transform: isHovered ? 'translateZ(50px)' : 'translateZ(0)' }"
                    >
                      {{ program.title }}
                    </h3>
                    
                    <p 
                      class="phb-method-card__desc transition-transform duration-300"
                      :style="{ transform: isHovered ? 'translateZ(40px)' : 'translateZ(0)' }"
                    >
                      {{ program.desc }}
                    </p>
                  </div>
                  
                  <div 
                    class="phb-method-card__features transition-transform duration-300"
                    :style="{ transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)' }"
                  >
                    <ul>
                      <li v-for="(feat, fIndex) in program.features" :key="fIndex">
                        <i class="fa-solid fa-check"></i>
                        {{ feat }}
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </template>
          </Phb3dCard>
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
    max-width: 700px;
    margin-bottom: 4rem;
  }

  &__title {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    font-weight: 300;
    line-height: 1.1;
    margin: 0 0 1.5rem 0;
    color: var(--phb-white);
  }

  &__subtitle {
    font-size: clamp(1.1rem, 1.5vw, 1.25rem);
    font-weight: 300;
    line-height: 1.6;
    color: var(--phb-text-2, rgba(255,255,255,0.75));
    margin: 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
    
    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}

.preserve-3d {
  transform-style: preserve-3d;
}

/* Premium Card Styles */
.phb-method-card {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 380px;
  border-radius: 16px;
  background-color: #121433; // slightly elevated from #0d0f28
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  transition: border-color 0.4s ease, box-shadow 0.4s ease;

  &.is-hovered {
    border-color: rgba(33, 188, 251, 0.4);
    box-shadow: 0 20px 40px -15px rgba(33, 188, 251, 0.15);

    .phb-method-card__glow {
      opacity: 1;
    }
  }

  &__glow {
    position: absolute;
    inset: -1px;
    border-radius: 16px;
    background: radial-gradient(circle at 50% 0%, rgba(33, 188, 251, 0.15) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 0;
    pointer-events: none;
  }

  &__inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    height: 100%;
  }

  &__top {
    flex-grow: 1;
  }

  &__tag {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--phb-cyan);
    margin-bottom: 1.5rem;
    background: rgba(33, 188, 251, 0.1);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    will-change: transform;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--phb-white);
    margin: 0 0 1rem 0;
    will-change: transform;
  }

  &__desc {
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.65);
    margin: 0;
    will-change: transform;
  }

  &__features {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    will-change: transform;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    li {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      i {
        color: var(--phb-cyan);
        font-size: 0.75rem;
      }
    }
  }
}

/* smooth transitions for inline translates */
.transition-transform {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>
