<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Phb3dCard from './Phb3dCard.vue'

const programs = [
  {
    letter: 'D',
    tag: '01',
    title: 'Detectar',
    desc: 'Entendemos qué está pasando en tu cuerpo, analizando a un nivel microscópico la base celular.',
    features: ['Evaluación integral', 'Síntomas ocultos']
  },
  {
    letter: 'E',
    tag: '02',
    title: 'Evaluar',
    desc: 'Analizamos tu estado real, no solo los síntomas. Medimos la edad biológica de tus órganos.',
    features: ['Lectura de biomarcadores', 'Nivel de inflamación']
  },
  {
    letter: 'C',
    tag: '03',
    title: 'Clarificar',
    desc: 'Definimos qué se puede mejorar... y qué no. Sin falsas promesas, solo medicina guiada por datos.',
    features: ['Transparencia total', 'Expectativas reales']
  },
  {
    letter: 'I',
    tag: '04',
    title: 'Identificar',
    desc: 'Determinamos si eres candidato o no para tratamientos, maximizando siempre tu probabilidad de respuesta.',
    features: ['Selección rigurosa', 'Probabilidad de éxito']
  },
  {
    letter: 'D',
    tag: '05',
    title: 'Diseñar',
    desc: 'Creamos una ruta clara, paso a paso, priorizando la preparación biológica antes que la intervención.',
    features: ['Protocolo personalizado', 'Tiempos exactos']
  },
  {
    letter: 'E',
    tag: '06',
    title: 'Encaminar',
    desc: 'Te acompañamos durante todo el proceso clínico, ajustando variables para resultados duraderos.',
    features: ['Soporte continuo', 'Ajustes adaptativos']
  }
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  // Title reveal animation
  const titleChars = document.querySelectorAll('.phb-programs__title span')
  gsap.from(titleChars, {
    y: 100,
    opacity: 0,
    rotationX: -90,
    stagger: 0.02,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.phb-programs__header',
      start: 'top 80%'
    }
  })

  // Grid items reveal
  gsap.fromTo('.phb-anim-wrap',
    { 
      y: 60, 
      opacity: 0,
      scale: 0.95
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
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
        <h2 class="phb-programs__title">
          <span v-for="(char, i) in 'MÉTODO DECIDE™'" :key="i" class="inline-block">{{ char === ' ' ? '\u00A0' : char }}</span>
        </h2>
        <p class="phb-programs__subtitle">
          Así logramos resultados reales:<br>
          <span class="phb-programs__subtitle-accent">Primero entendemos. Luego medimos. Después preparamos. Y solo entonces... Iniciamos tratamiento.</span>
        </p>
      </div>

      <div class="phb-programs__grid">
        <div 
          v-for="(program, index) in programs" 
          :key="index"
          class="phb-anim-wrap flex w-full"
        >
          <Phb3dCard :perspective="1500" class="w-full">
            <template #default="{ isHovered, mouseX, mouseY }">
              <div 
                class="phb-method-card"
                :class="{ 'is-hovered': isHovered }"
                :style="{ '--mx': mouseX + '%', '--my': mouseY + '%' }"
              >
                <!-- Large background branding letter -->
                <div class="phb-method-card__letter" :style="{ transform: isHovered ? 'translateZ(10px)' : 'translateZ(0)' }">
                  {{ program.letter }}
                </div>

                <!-- Dynamic torch glow effect -->
                <div class="phb-method-card__torch"></div>
                
                <div class="phb-method-card__inner preserve-3d">
                  
                  <div class="phb-method-card__top preserve-3d">
                    <div class="phb-method-card__meta preserve-3d" :style="{ transform: isHovered ? 'translateZ(40px)' : 'translateZ(0)' }">
                      <span class="phb-method-card__tag">
                        PASO {{ program.tag }}
                      </span>
                    </div>
                    
                    <h3 
                      class="phb-method-card__title"
                      :style="{ transform: isHovered ? 'translateZ(70px)' : 'translateZ(0)' }"
                    >
                      {{ program.title }}
                    </h3>
                    
                    <p 
                      class="phb-method-card__desc"
                      :style="{ transform: isHovered ? 'translateZ(50px)' : 'translateZ(0)' }"
                    >
                      {{ program.desc }}
                    </p>
                  </div>
                  
                  <div 
                    class="phb-method-card__features preserve-3d"
                    :style="{ transform: isHovered ? 'translateZ(40px)' : 'translateZ(0)' }"
                  >
                    <ul>
                      <li v-for="(feat, fIndex) in program.features" :key="fIndex">
                        <span class="phb-method-card__dot"></span>
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
  background-color: var(--phb-bg, #171846);
  color: var(--phb-text-1, #ffffff);
  padding: clamp(6rem, 10vw, 10rem) 1.5rem;
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -5%;
    width: 40vw;
    height: 40vw;
    background: radial-gradient(circle, rgba(33, 188, 251, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  &__container {
    max-width: 1300px;
    width: 100%;
    position: relative;
    z-index: 2;
  }

  &__header {
    max-width: 800px;
    margin-bottom: 6rem;
    perspective: 1000px;
  }

  &__title {
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 200;
    line-height: 1;
    letter-spacing: -0.02em;
    margin: 0 0 2rem 0;
    color: var(--phb-white);
    text-transform: uppercase;

    span {
      display: inline-block;
      will-change: transform, opacity;
    }
  }

  &__subtitle {
    font-size: clamp(1.2rem, 1.8vw, 1.5rem);
    font-weight: 300;
    line-height: 1.4;
    color: var(--phb-text-2, rgba(255,255,255,0.7));
    margin: 0;

    &-accent {
      font-weight: 300;
      opacity: 0.9;
      background: linear-gradient(90deg, var(--phb-cyan) 0%, var(--phb-white) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
      margin-top: 1rem;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
    
    @media (min-width: 1100px) {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1.5rem;
    }
  }
}

.preserve-3d {
  transform-style: preserve-3d;
}

/* Awwards Style Premium Card */
.phb-method-card {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 420px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;

  &.is-hovered {
    border-color: rgba(33, 188, 251, 0.3);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 
      0 30px 60px -20px rgba(0, 0, 0, 0.4),
      0 0 20px rgba(33, 188, 251, 0.1);

    .phb-method-card__torch {
      opacity: 0.6;
    }
    
    .phb-method-card__letter {
      opacity: 0.15;
      transform: translateZ(20px) scale(1.1) !important;
    }
  }

  /* Dynamic mouse follow effect */
  &__torch {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s ease;
    background: radial-gradient(
      circle 300px at var(--mx) var(--my),
      rgba(33, 188, 251, 0.15),
      transparent 80%
    );
    z-index: 0;
  }

  &__letter {
    position: absolute;
    top: 50%;
    right: -5%;
    transform: translateY(-50%);
    font-size: 15rem;
    font-weight: 900;
    line-height: 1;
    // Using a more vibrant cyan gradient to separate from the deep navy
    background: linear-gradient(135deg, rgba(33, 188, 251, 0.15) 0%, transparent 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 1px rgba(33, 188, 251, 0.25);
    opacity: 0.12;
    pointer-events: none;
    user-select: none;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 0;
  }

  &__inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
  }

  &__top {
    flex-grow: 1;
  }

  &__meta {
    margin-bottom: 2rem;
    will-change: transform;
    transition: transform 0.4s ease-out;
  }

  &__tag {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: var(--phb-cyan);
    padding: 0.5rem 1rem;
    border-radius: 100px;
    background: rgba(33, 188, 251, 0.08);
    border: 1px solid rgba(33, 188, 251, 0.15);
  }

  &__title {
    font-size: 2.25rem;
    font-weight: 300;
    color: var(--phb-white);
    margin: 0 0 1.5rem 0;
    letter-spacing: -0.01em;
    transition: transform 0.5s ease-out;
    will-change: transform;
  }

  &__desc {
    font-size: 1.05rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
    font-weight: 300;
    max-width: 90%;
    transition: transform 0.45s ease-out;
    will-change: transform;
  }

  &__features {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    transition: transform 0.4s ease-out;
    will-change: transform;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    li {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.7);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 400;
      letter-spacing: 0.02em;
    }
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--phb-cyan);
    box-shadow: 0 0 10px var(--phb-cyan);
    flex-shrink: 0;
  }
}
</style>
