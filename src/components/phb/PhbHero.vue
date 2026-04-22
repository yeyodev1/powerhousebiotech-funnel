<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()

onMounted(() => {
  const tl = gsap.timeline()

  tl.fromTo('.phb-hero__title',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
  )
    .fromTo('.phb-hero__subtitle',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    )
    .fromTo('.phb-hero__bullets li',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo('.phb-hero__cta-wrapper',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.2'
    )

  // Scroll animation for DNA Video
  gsap.to('.phb-hero__bg-video', {
    scrollTrigger: {
      trigger: '.phb-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    opacity: 0.3,
    scale: 1.2,
    filter: 'blur(10px)'
  })
})
</script>

<template>
  <section class="phb-hero">
    <!-- DNA Background Video -->
    <div class="phb-hero__bg-container">
      <video 
        autoplay 
        muted 
        loop 
        playsinline 
        class="phb-hero__bg-video"
        poster="/hero-bg.png"
      >
        <source src="https://icdlabs.in/immune-internal/wp-content/themes/immuneel/assets/videos/DNA.mp4" type="video/mp4" />
      </video>
      <div class="phb-hero__bg-overlay"></div>
    </div>

    <div class="phb-hero__content">
      <div class="phb-hero__text-column">
        <h1 class="phb-hero__title">
          {{ t.hero.title1 }}
          <span class="phb-hero__title-highlight"> <br/>  
            {{ t.hero.titleAccent }}</span>
        </h1>
        
        <div class="phb-hero__subtitle">
          <p>{{ t.hero.sub }}</p>
          <!-- <p>{{ t.hero.desc }}</p> -->
        </div>

        <ul class="phb-hero__bullets">
          <li v-for="(bullet, index) in t.hero.bullets" :key="index">
            <i class="fa-solid fa-check"></i>
            {{ bullet }}
          </li>
        </ul>
        
        <div class="phb-hero__cta-wrapper">
          <router-link to="/cualificar" class="phb-hero__cta-btn">{{ t.hero.cta }}</router-link>
          <p class="phb-hero__cta-sub">{{ t.hero.disclaimer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;

.phb-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: var(--phb-text-1, #ffffff);
  padding: 8rem 2rem 4rem 2rem;

  &__bg-container {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  &__bg-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.8;
  }

  &__bg-overlay {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(2px);
    background: radial-gradient(at 15% 15%, rgba(23, 24, 70, 0.85) 0%, transparent 75%),
      radial-gradient(at 85% 15%, rgba(33, 188, 251, 0.2) 0%, transparent 65%),
      radial-gradient(at 50% 50%, rgba(24, 231, 240, 0.08) 0%, transparent 60%);
  }

  &__content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
  }

  &__text-column {
    max-width: 700px;
    text-align: left;
  }

  &__title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 2rem;
    color: var(--phb-white);
    text-align: left;

    &-highlight {
      font-weight: 600;
      color: var(--phb-cyan);
    }
  }

  &__subtitle {
    font-size: 1.125rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2.5rem;
    text-align: left;

    p {
      margin-bottom: 1rem;
    }
  }

  &__bullets {
    list-style: none;
    padding: 0;
    margin: 0 0 3rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      font-size: 1.1rem;
      font-weight: 400;
      color: var(--phb-white);

      i {
        color: var(--phb-cyan);
        margin-top: 0.35rem;
        font-size: 1.1rem;
        -webkit-text-stroke: 0.5px var(--phb-cyan); // Simulates extra weight
        display: inline-block;
      }
    }
  }

  &__cta-wrapper {
    display: inline-flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__cta-btn {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--phb-white);
    padding: 1.2rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);

    &:hover {
      background: var(--phb-white);
      color: var(--phb-bg, #0d0f28);
      transform: translateY(-2px);
      box-shadow: 0 15px 40px -10px rgba(255, 255, 255, 0.2);
    }
  }

  &__cta-sub {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.5);
    text-align: left;
    margin: 0;
  }
}

@media (max-width: 768px) {
  .phb-hero {
    &__bg-overlay {
      background: linear-gradient(to bottom,
          rgba(13, 15, 40, 0.95) 0%,
          rgba(13, 15, 40, 0.85) 60%,
          rgba(13, 15, 40, 0.6) 100%);
    }

    &__cta-wrapper {
      width: 100%;
    }

    &__cta-btn {
      width: 100%;
    }
  }
}
</style>
