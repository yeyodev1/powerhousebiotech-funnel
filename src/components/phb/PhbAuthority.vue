<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)

// Cloudinary Images
const imgHeadshot = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095174/assets-juan/db808425-b579-4ae3-bca6-1cb1cc73fa7d.jpg'
const imgSpeaking = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095157/assets-juan/0c1b4726-41c7-49cf-83ea-6569e887393e.jpg'
const imgOutdoor = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095175/assets-juan/e218f195-9aeb-4e69-a502-38a0cc524535.jpg'

onMounted(() => {
  if (!sectionRef.value) return

  const ctx = gsap.context(() => {
    // Reveal text elements
    gsap.fromTo('.phb-authority__reveal',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 75%',
        }
      }
    )

    // Main Pinning ScrollTrigger for Gallery Slider
    const slides = gsap.utils.toArray('.phb-authority__img-wrap')
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        pin: true,
        scrub: 1, 
        snap: 1 / (slides.length - 1), // Adds snap to ensure image-by-image lock
        start: 'top top',
        end: `+=${slides.length * 100}%`,
      }
    })

    // Animate each image slide sequentially
    slides.forEach((slide: any, i: number) => {
      // Enter animation for next slides
      if (i > 0) {
        tl.from(slide, {
          yPercent: 100,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: 'power2.inOut'
        }, i)
      }

      // Exit animation for current slide
      if (i < slides.length - 1) {
        tl.to(slide, {
          scale: 0.9,
          opacity: 0,
          yPercent: -20,
          duration: 1,
          ease: 'power2.inOut'
        }, i + 0.8)
      }
    })
  }, sectionRef.value)
})
</script>

<template>
  <section class="phb-authority" ref="sectionRef" id="fundador">
    <div class="phb-authority__container">
      
      <!-- Typography & Context -->
      <div class="phb-authority__content">
        <div class="phb-authority__label phb-authority__reveal">
          <span class="phb-authority__line"></span>
          Founder & CEO — Health Decision Platform
        </div>
        
        <h2 class="phb-authority__title phb-authority__reveal">
          Juan Román Garza.
        </h2>
        
        <div class="phb-authority__subtitle phb-authority__reveal">
          Longevidad Regenerativa y <em>Medicina de Frontera</em>.
        </div>
        
        <p class="phb-authority__desc phb-authority__reveal">
          Conecta Psicología, Tecnología y Medicina Regenerativa para ayudarte a optimizar tu salud celular y el rendimiento humano. Como fundador de PowerHouse Biotech, Juan Román ha liderado la evaluación de viabilidad de más de 100,000 casos clínicos. Su enfoque integral abarca desde Células Madre y Exosomas hasta la Psicooncología y la Psicología Organizacional, estableciendo un estándar internacional para líderes empresariales y pacientes que buscan la verdad biológica.
        </p>

        <div class="phb-authority__stats">
          <div class="phb-authority__stat phb-authority__reveal">
            <span class="phb-authority__stat-num">+15</span>
            <span class="phb-authority__stat-label">Años de<br>Investigación</span>
          </div>
          <div class="phb-authority__stat phb-authority__reveal">
            <span class="phb-authority__stat-num">100k+</span>
            <span class="phb-authority__stat-label">Casos Clínicos<br>Evaluados</span>
          </div>
          <div class="phb-authority__stat phb-authority__reveal">
            <span class="phb-authority__stat-num">Global</span>
            <span class="phb-authority__stat-label">Speaker<br>Internacional</span>
          </div>
        </div>
        
        <div class="phb-authority__action phb-authority__reveal">
          <a href="https://juanromangarza.com/" target="_blank" rel="noopener noreferrer" class="phb-authority__btn">
            Conoce más sobre Juan <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>

      <!-- Pinned Image Slider Gallery -->
      <div class="phb-authority__gallery">
        <div class="phb-authority__img-wrap phb-authority__img-1">
          <img :src="imgHeadshot" alt="Juan Román Garza - Investigador Principal" />
          <div class="phb-authority__img-caption">
            <i class="fa-solid fa-microscope"></i> Principal Investigator
          </div>
        </div>
        
        <div class="phb-authority__img-wrap phb-authority__img-2">
          <img :src="imgSpeaking" alt="Juan Román Garza en conferencia internacional" />
          <div class="phb-authority__img-caption">
            <i class="fa-solid fa-microphone-lines"></i> Global Speaker
          </div>
        </div>
        
        <div class="phb-authority__img-wrap phb-authority__img-3">
          <img :src="imgOutdoor" alt="Juan Román Garza" />
          <div class="phb-authority__img-caption">
            <i class="fa-solid fa-leaf"></i> Longevity Pioneer
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.phb-authority {
  background-color: #0c1445; // Dark premium navy theme
  color: #ffffff;
  padding: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 80%;
    height: 150%;
    background: radial-gradient(ellipse at center, rgba(33, 188, 250, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  &__container {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    padding: clamp(100px, 10vw, 140px) clamp(24px, 5vw, 80px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(60px, 8vw, 120px);
    align-items: center;
    position: relative;
    z-index: 1;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      padding: clamp(100px, 10vw, 120px) 24px;
      
      .phb-authority__content {
        order: 2;
      }
      .phb-authority__gallery {
        order: 1;
        height: 60vh;
        margin-bottom: 2rem;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__label {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--phb-cyan, #21bcfa);
    margin-bottom: 2rem;
  }

  &__line {
    width: 40px;
    height: 1px;
    background: var(--phb-cyan, #21bcfa);
  }

  &__title {
    font-size: clamp(3rem, 6vw, 5.5rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
    margin-bottom: 1rem;
    color: #ffffff;
  }

  &__subtitle {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 300;
    line-height: 1.2;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2.5rem;

    em {
      font-style: italic;
      color: var(--phb-cyan, #21bcfa);
      font-weight: 600;
    }
  }

  &__desc {
    font-size: clamp(1.1rem, 1.5vw, 1.25rem);
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 4rem;
    font-weight: 300;
    max-width: 600px;
  }

  &__stats {
    display: flex;
    gap: clamp(2rem, 4vw, 4rem);
    padding-top: 3rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 4rem;

    @media (max-width: 600px) {
      flex-wrap: wrap;
      gap: 2rem;
    }
  }

  &__stat {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &-num {
      font-size: clamp(2rem, 3vw, 3rem);
      font-weight: 800;
      color: #ffffff;
      line-height: 1;
      letter-spacing: -0.03em;
    }

    &-label {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: rgba(255, 255, 255, 0.4);
      line-height: 1.4;
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 18px 32px;
    background: transparent;
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 100px;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: all 0.4s ease;

    i {
      color: var(--phb-cyan, #21bcfa);
      transition: transform 0.3s ease;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.4);

      i {
        transform: translate(3px, -3px);
      }
    }
  }

  &__gallery {
    position: relative;
    height: 800px;
    width: 100%;

    @media (max-width: 1024px) {
      height: 600px;
    }

    @media (max-width: 600px) {
      height: 500px;
    }
  }

  &__img-wrap {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 24px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
    will-change: transform, opacity;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top; // Keep head visible
    }
  }

  &__img-caption {
    position: absolute;
    bottom: 30px;
    left: 30px;
    background: rgba(12, 20, 69, 0.85);
    backdrop-filter: blur(12px);
    padding: 14px 24px;
    border-radius: 100px; 
    font-size: 0.85rem;
    font-weight: 800;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    display: flex;
    align-items: center;
    gap: 12px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

    i {
      color: var(--phb-cyan, #21bcfa);
      font-size: 1.1rem;
    }
  }

  &__img-1 {
    z-index: 1;
  }

  &__img-2 {
    z-index: 2;
  }

  &__img-3 {
    z-index: 3;
  }
}
</style>
