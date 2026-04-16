<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const team = [
  {
    id: '01',
    name: 'Dra. Mariel Silva',
    role: 'Medical Services Director',
    location: 'PHB Spain',
    desc: 'Experta en medicina regenerativa avanzada. Se especializa en determinar la viabilidad real de reparación sistémica antes de cualquier intervención.',
    image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    id: '02',
    name: 'Dr. Jair Olivares',
    role: 'Biotech Research Lead',
    location: 'PHB Mexico',
    desc: 'Líder en investigación de biomarcadores. Su trabajo es identificar por qué un organismo no está respondiendo a pesar de seguir las indicaciones médicas.',
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    id: '03',
    name: 'Dr. Vicente Mera',
    role: 'Internal & Longevity Specialist',
    location: 'PHB Spain',
    desc: 'Reconocido por su capacidad de unir las piezas biológicas y explicar a detalle el nivel de gravedad real que dicen tus estudios de laboratorio.',
    image: 'https://images.pexels.com/photos/6129112/pexels-photo-6129112.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    id: '04',
    name: 'Dra. Andrea Márquez',
    role: 'Head of Regenerative Medicine',
    location: 'PHB Mexico',
    desc: 'Especialista en encaminar decisiones clínicas. Ayuda a los pacientes a entender si vale la pena o no iniciar un tratamiento avanzado según su estado actual.',
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    id: '05',
    name: 'Dr. Stefan Kraus',
    role: 'Cellular Optimization Expert',
    location: 'PHB Germany',
    desc: 'Analiza la capacidad real de respuesta del organismo. Su enfoque evita intervenciones innecesarias enfocándose solo en casos con probabilidad real de éxito.',
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1200'
  }
]

const containerRef = ref<HTMLElement | null>(null)
const slideContainerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!containerRef.value || !slideContainerRef.value) return

  const slides = gsap.utils.toArray('.phb-team-slide')
  const ctx = gsap.context(() => {
    
    // Main Pinning ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.value,
        pin: true,
        scrub: 1, // Smooth scrolling transition
        start: 'top top',
        end: `+=${slides.length * 100}%`, // Extended scroll duration
        // markers: true,
      }
    })

    // Animate each slide
    slides.forEach((slide: any, i: number) => {
      // Entrance
      if (i > 0) {
        tl.from(slide, {
          yPercent: 100,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: 'power2.inOut'
        }, i) // Start at 'i' seconds in timeline
      }

      // Progress bar animation
      tl.to(`.phb-team__nav-progress-inner`, {
        scaleY: (i + 1) / slides.length,
        duration: 0.5,
        ease: 'none'
      }, i)

      // Active ID change
      tl.call(() => {
        // This could update a reactive variable if needed, 
        // but for now we'll rely on visual animation
      }, [], i)

      // Exit (except for the last slide)
      if (i < slides.length - 1) {
        tl.to(slide, {
          scale: 0.9,
          opacity: 0,
          yPercent: -20,
          duration: 1,
          ease: 'power2.inOut'
        }, i + 0.8) // Overlap slightly with next entrance
      }
    })

    // Header reveal
    gsap.from('.phb-team__header-content', {
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out'
    })

  }, containerRef.value)
})
</script>

<template>
  <section class="phb-team" ref="containerRef">
    <div class="phb-team__wrapper">
      
      <!-- Static Header -->
      <div class="phb-team__header">
        <div class="phb-team__header-content">
          <div class="phb-team__label">Criterio Clínico —</div>
          <h2 class="phb-team__main-title">Expertos en Decisiones de Salud</h2>
          <p class="phb-team__main-desc">
            Somos la primera <b>Health Decision Platform</b> enfocada en Medicina Regenerativa. 
            Nuestros especialistas no solo aplican tratamientos; analizan tu biología profunda para determinar si tu cuerpo realmente puede mejorar.
          </p>
        </div>
      </div>

      <!-- Slides Container -->
      <div class="phb-team__slides" ref="slideContainerRef">
        <div 
          v-for="(doctor, index) in team" 
          :key="doctor.id"
          class="phb-team-slide"
          :class="{ 'is-first': index === 0 }"
        >
          <div class="phb-team-slide__inner">
            <!-- Left: ID & Text -->
            <div class="phb-team-slide__text">
              <span class="phb-team-slide__id">{{ doctor.id }}</span>
              <div class="phb-team-slide__info">
                <h3 class="phb-team-slide__name">{{ doctor.name }}</h3>
                <span class="phb-team-slide__role">{{ doctor.role }}</span>
                <span class="phb-team-slide__location">{{ doctor.location }}</span>
                <p class="phb-team-slide__desc">{{ doctor.desc }}</p>
              </div>
            </div>

            <!-- Right: Image -->
            <div class="phb-team-slide__image-wrap">
              <img :src="doctor.image" :alt="doctor.name" class="phb-team-slide__image" />
              <div class="phb-team-slide__image-gradient"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Indicators -->
      <div class="phb-team__nav">
        <div class="phb-team__nav-progress">
          <div class="phb-team__nav-progress-inner"></div>
        </div>
        <div class="phb-team__nav-count">
          <span>01</span>
          <div class="phb-team__nav-line"></div>
          <span>05</span>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.phb-team {
  position: relative;
  background-color: #05060f; // Deep Dark Mode
  color: #fff;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;

  &__wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    max-width: 1440px;
    margin: 0 auto;
    position: relative;

    @media (min-width: 1024px) {
      padding: 4rem 6rem;
    }
  }

  &__header {
    z-index: 10;
    margin-bottom: 2rem;

    &-content {
      max-width: 600px;
    }
  }

  &__label {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: var(--phb-cyan, #21bcfa);
    text-transform: uppercase;
    margin-bottom: 1rem;
    display: block;
  }

  &__main-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }

  &__main-desc {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 300;
  }

  &__slides {
    flex: 1;
    position: relative;
    width: 100%;
    margin-top: 2rem;
  }

  .phb-team-slide {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &__inner {
      display: flex;
      flex-direction: column-reverse;
      gap: 2rem;
      width: 100%;
      height: 100%;

      @media (min-width: 1024px) {
        flex-direction: row;
        align-items: center;
        gap: 6rem;
      }
    }

    &__text {
      flex: 1;
      position: relative;
    }

    &__id {
      position: absolute;
      top: -1rem;
      left: -1rem;
      font-size: 6rem;
      font-weight: 900;
      color: rgba(255, 255, 255, 0.03);
      line-height: 1;
      pointer-events: none;
      
      @media (min-width: 1024px) {
        font-size: 12rem;
        top: -4rem;
        left: -3rem;
      }
    }

    &__info {
      position: relative;
      z-index: 1;
    }

    &__name {
      font-size: clamp(2rem, 3.5vw, 3rem);
      font-weight: 400;
      margin-bottom: 0.5rem;
      color: #fff;
    }

    &__role {
      display: block;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 0.25rem;
    }

    &__location {
      display: block;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--phb-cyan, #21bcfa);
      margin-bottom: 2rem;
    }

    &__desc {
      font-size: 1.1rem;
      line-height: 1.6;
      font-weight: 300;
      color: rgba(255, 255, 255, 0.7);
      max-width: 480px;
    }

    &__image-wrap {
      flex: 1.2;
      position: relative;
      height: 50vh;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 30px 60px rgba(0,0,0,0.5);

      @media (min-width: 1024px) {
        height: 60vh;
      }
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    &__image-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(5, 6, 15, 0.8) 0%, transparent 40%);
    }
  }

  // Navigation Visuals
  &__nav {
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    z-index: 20;

    @media (max-width: 1024px) {
      display: none;
    }
  }

  &__nav-progress {
    width: 2px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    position: relative;
    border-radius: 2px;

    &-inner {
      width: 100%;
      height: 100%;
      background: var(--phb-cyan, #21bcfa);
      position: absolute;
      top: 0;
      left: 0;
      transform-origin: top;
      transform: scaleY(0.2); // Initial
    }
  }

  &__nav-count {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.4);

    &-line {
      width: 1px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
    }

    span:first-child {
      color: var(--phb-cyan, #21bcfa);
    }
  }
}
</style>
