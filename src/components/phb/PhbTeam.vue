<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '@/composables/useLocale'

gsap.registerPlugin(ScrollTrigger)

const { t } = useLocale()
const containerRef = ref<HTMLElement | null>(null)
const slideContainerRef = ref<HTMLElement | null>(null)

// Define images separately since they are assets, not text
const doctorImages = [
  'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6129112/pexels-photo-6129112.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1200'
]

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
      
      <!-- Immersive Header Overlay -->
      <header class="phb-team__header">
        <div class="phb-team__header-content">
          <span class="phb-team__label">{{ t.team.label }}</span>
          <h2 class="phb-team__main-title">{{ t.team.title }}</h2>
        </div>
      </header>

      <!-- Slides Container -->
      <div class="phb-team__slides" ref="slideContainerRef">
        <div 
          v-for="(doctor, index) in t.team.doctors" 
          :key="doctor.id"
          class="phb-team-slide"
          :class="{ 'is-first': index === 0 }"
        >
          <div class="phb-team-slide__inner">
            <!-- Left: ID & Text -->
            <div class="phb-team-slide__text">
              <span class="phb-team-slide__id">{{ doctor.id }}</span>
              <!-- Background Number (Bakano Style) -->
              <div class="phb-team-slide__bg-id">{{ doctor.id }}</div>
              <div class="phb-team-slide__info">
                <h3 class="phb-team-slide__name">{{ doctor.name }}</h3>
                <span class="phb-team-slide__role">{{ doctor.role }}</span>
                <span class="phb-team-slide__location">{{ doctor.location }}</span>
                <p class="phb-team-slide__desc">{{ doctor.desc }}</p>
              </div>
            </div>

            <!-- Right: Image -->
            <div class="phb-team-slide__image-wrap">
              <img :src="doctorImages[index]" :alt="doctor.name" class="phb-team-slide__image" />
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
    position: absolute;
    top: 4rem;
    left: 2rem;
    z-index: 100;

    @media (min-width: 1024px) {
      left: 6rem;
      top: 6rem;
    }

    &-content {
      max-width: 800px;
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
    font-size: clamp(1.8rem, 3.5vw, 2.5rem);
    font-weight: 300;
    line-height: 1.1;
    color: var(--phb-cyan, #21bcfa);
    text-shadow: 0 0 30px rgba(33, 188, 250, 0.2);
  }

  &__slides {
    flex: 1;
    position: relative;
    width: 100%;
    height: 100%;
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
      flex-direction: column; 
      gap: 2rem;
      width: 100%;
      height: 100%;
      padding-top: 15vh; // Leave space for overlay header

      @media (min-width: 1024px) {
        flex-direction: row;
        align-items: center;
        gap: 8rem;
        padding-top: 0;
      }
    }

    &__text {
      flex: 1;
      position: relative;
      text-align: left;
      z-index: 5;

      @media (min-width: 1024px) {
        text-align: left;
      }
    }

    &__info {
      position: relative;
      z-index: 2;
    }

    &__bg-id {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 50vw;
      font-weight: 950;
      line-height: 1;
      pointer-events: none;
      z-index: 0;
      
      background: linear-gradient(135deg, rgba(33, 188, 251, 0.4) 0%, rgba(33, 188, 251, 0.05) 50%, transparent 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke: 1.5px rgba(33, 188, 251, 0.5);
      
      opacity: 0.8;
      filter: drop-shadow(0 0 25px rgba(33, 188, 251, 0.25));

      @media (min-width: 1024px) {
        font-size: 50vw;
        top: 20%;
        left: 0;
        transform: translate(-30%, -30%);
      }
    }

    &__name {
      font-size: clamp(2.2rem, 4vw, 3rem);
      font-weight: 300;
      margin-bottom: 0.5rem;
      color: #fff;
    }

    &__role {
      display: block;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
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
      flex: 1.5;
      position: relative;
      width: 100%;
      height: 40vh;
      border-radius: 40px;
      overflow: hidden;
      box-shadow: 0 40px 80px rgba(0,0,0,0.5);
      z-index: 1;

      @media (min-width: 1024px) {
        flex: 1.2;
        height: 60vh;
      }
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 15%; 
    }

    &__image-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(5, 6, 15, 0.9) 0%, transparent 40%);
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
