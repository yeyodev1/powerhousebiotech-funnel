<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 75%',
    }
  })

  tl.fromTo('.phb-testimonial__image', 
    { filter: 'grayscale(100%)', scale: 1.05 },
    { filter: 'grayscale(0%)', scale: 1, duration: 2, ease: 'power2.out' }
  )
  
  tl.fromTo('.phb-testimonial__content > *',
    { x: -30, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
    "-=1.5"
  )
})
</script>

<template>
  <section class="phb-testimonial" ref="sectionRef">
    <div class="phb-testimonial__grid">
      
      <!-- Text Side -->
      <div class="phb-testimonial__text-wrapper">
        <div class="phb-testimonial__content">
          <blockquote class="phb-testimonial__quote">
            "Para mí, PowerHouse es donde la longevidad se convierte en una estrategia. Es el entorno adecuado para invertir en tu salud a largo plazo."
          </blockquote>
          
          <p class="phb-testimonial__author-info">
            <span class="phb-testimonial__author-name">Paciente Destacado</span> — conoce que el rendimiento se construye sobre una visión a largo plazo. Ahora, aborda su salud con la misma disciplina y estrategia que en su carrera, enfocándose en longevidad, prevención y rendimiento sostenible.
          </p>
          
          <div class="phb-testimonial__actions">
            <button class="phb-testimonial__btn">
              Explorar más Historias PHB
            </button>
          </div>
        </div>
      </div>

      <!-- Image / Video Side -->
      <div class="phb-testimonial__media-wrapper">
        <div class="phb-testimonial__image-container">
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200" 
            alt="Testimonial background" 
            class="phb-testimonial__image"
          />
          <div class="phb-testimonial__overlay">
            <button class="phb-testimonial__play-btn" aria-label="Play video">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;

.phb-testimonial {
  background-color: var(--phb-bg-alt, #1a1d52);
  color: var(--phb-text-1, #ffffff);
  width: 100%;
  
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    min-height: 700px;
    
    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__text-wrapper {
    padding: 4rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1e1e24; /* Specific Dark neutral tone like in the reference */
  }

  &__content {
    max-width: 500px;
    width: 100%;
  }

  &__quote {
    font-size: 2.25rem;
    font-weight: 300;
    font-style: italic;
    line-height: 1.3;
    margin: 0 0 2rem 0;
    color: #ffffff;
  }

  &__author-info {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.6);
    margin: 0 0 3rem 0;
  }

  &__author-name {
    color: #ffffff;
    font-weight: 400;
  }

  &__btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.8);
    color: #fff;
    padding: 1rem 2rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: #ffffff;
      color: #000;
    }
  }

  &__media-wrapper {
    position: relative;
    width: 100%;
    height: 500px;
    
    @media (min-width: 992px) {
      height: 100%;
    }
  }

  &__image-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__play-btn {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.8);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s ease, background 0.3s ease;
    
    svg {
      width: 32px;
      height: 32px;
      margin-left: 4px; /* optical alignment */
    }

    &:hover {
      transform: scale(1.1);
      background: rgba(255,255,255,0.1);
    }
  }
}

@media (max-width: 992px) {
  .phb-testimonial {
    &__text-wrapper {
      padding: 5rem 1.5rem;
    }
    
    &__quote {
      font-size: 1.75rem;
    }
  }
}
</style>
