<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import juanImg from '@/assets/team/juan.png'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  gsap.fromTo('.phb-authority__image-wrap', 
    { opacity: 0, scale: 0.95, y: 30 },
    {
      opacity: 1, scale: 1, y: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.phb-authority',
        start: 'top 75%',
      }
    }
  )
  
  gsap.fromTo('.phb-authority__content > *',
    { opacity: 0, x: -30 },
    {
      opacity: 1, x: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.phb-authority',
        start: 'top 75%',
      }
    }
  )
})
</script>

<template>
  <section class="phb-authority">
    <div class="phb-container">
      <div class="phb-authority__grid">
        <div class="phb-authority__content">
          <div class="phb-line-title">
            <span class="phb-line-title__line"></span>
            Liderazgo Científico
          </div>
          <h2 class="phb-authority__title">
            Ciencia y experiencia compartida a nivel <em>internacional</em>.
          </h2>
          <p class="phb-authority__desc">
            En PowerHouse Biotech no solo aplicamos los protocolos más avanzados del mundo; también somos parte activa de la comunidad científica internacional. Nuestra presencia en conferencias médicas globales garantiza que cada evaluación y protocolo esté fundamentado en los últimos descubrimientos de la medicina regenerativa.
          </p>
          
          <div class="phb-authority__stats">
            <div class="phb-authority__stat">
              <span class="phb-authority__stat-num">+15</span>
              <span class="phb-authority__stat-label">Años de Investigación</span>
            </div>
            <div class="phb-authority__stat">
              <span class="phb-authority__stat-num">Top</span>
              <span class="phb-authority__stat-label">Estándares Globales</span>
            </div>
          </div>
        </div>

        <div class="phb-authority__visual">
          <div class="phb-authority__image-wrap">
            <img :src="juanImg" alt="Juan en conferencia internacional" class="phb-authority__image" />
            <div class="phb-authority__badge">
              <i class="fa-solid fa-microphone-lines"></i>
              <span>Speaker Internacional</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.phb-authority {
  background: #ffffff;
  padding: clamp(80px, 10vw, 140px) 0;
  color: #05060f;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 45%;
    height: 100%;
    background: #f8fbff;
    z-index: 0;
    border-radius: 40px 0 0 40px;

    @media (max-width: 1024px) {
      width: 100%;
      height: 60%;
      top: auto;
      bottom: 0;
      border-radius: 40px 40px 0 0;
    }
  }

  .phb-container {
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 60px);
    position: relative;
    z-index: 1;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(40px, 8vw, 100px);
    align-items: center;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }

  .phb-line-title {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--phb-blue, #1278f3);
    margin-bottom: 24px;

    &__line {
      display: block;
      width: 32px;
      height: 2px;
      background: var(--phb-blue, #1278f3);
      flex-shrink: 0;
    }
  }

  &__title {
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    letter-spacing: -0.03em;
    color: #05060f;

    em {
      font-style: normal;
      color: var(--phb-cyan, #21bcfa);
    }
  }

  &__desc {
    font-size: clamp(1.1rem, 1.5vw, 1.3rem);
    line-height: 1.6;
    color: rgba(5, 6, 15, 0.7);
    margin-bottom: 3rem;
    font-weight: 300;
  }

  &__stats {
    display: flex;
    gap: 3rem;
    
    @media (max-width: 600px) {
      flex-direction: column;
      gap: 1.5rem;
    }
  }

  &__stat {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &-num {
      font-size: 2.5rem;
      font-weight: 900;
      color: #05060f;
      line-height: 1;
      letter-spacing: -0.05em;
    }

    &-label {
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: rgba(5, 6, 15, 0.5);
    }
  }

  &__visual {
    position: relative;
    padding: 2rem 0;
  }

  &__image-wrap {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.1);
    transform: translateZ(0);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 24px;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
      pointer-events: none;
    }
  }

  &__image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    aspect-ratio: 4/5;
    transform: scale(1.02);
    transition: transform 0.7s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__badge {
    position: absolute;
    bottom: 30px;
    left: -20px;
    background: #ffffff;
    padding: 16px 24px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    z-index: 10;
    
    @media (max-width: 768px) {
      left: 20px;
      bottom: 20px;
    }

    i {
      color: var(--phb-blue, #1278f3);
      font-size: 1.2rem;
    }

    span {
      font-size: 0.9rem;
      font-weight: 800;
      color: #05060f;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }
}
</style>
