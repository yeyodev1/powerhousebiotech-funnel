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
    .fromTo('.phb-hero__separator',
      { height: 0 },
      { height: 60, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo('.phb-hero__bullets li',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('.phb-hero__cta-wrapper',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.1'
    )

  // Scroll animation for DNA Video
  gsap.to('.phb-hero__bg-video', {
    scrollTrigger: {
      trigger: '.phb-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    opacity: 0.4,
    scale: 1.1
  })

  // Floating animation for background text
  gsap.to('.phb-hero__bg-text', {
    y: -20,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
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
      >
        <source src="https://icdlabs.in/immune-internal/wp-content/themes/immuneel/assets/videos/DNA.mp4" type="video/mp4" />
      </video>
      <div class="phb-hero__bg-overlay"></div>
      <!-- <div class="phb-hero__bg-text">biotech</div> -->
    </div>

    <div class="phb-hero__content">
      <div class="phb-hero__text-column">
        <h1 class="phb-hero__title">
          {{ t.hero.title1 }}
        </h1>
        
        <div class="phb-hero__subtitle">
          <p>{{ t.hero.titleAccent }}</p>
        </div>

        <!-- <div class="phb-hero__separator"></div> -->

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
  color: #ffffff;
  padding: 8rem 2rem 4rem 2rem;
  background-color: #0039ad; // Immuneel electric blue
  font-family: 'IBM Plex Sans', sans-serif;

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
    background: radial-gradient(circle at center, transparent 0%, rgba(0, 57, 173, 0.4) 50%, rgba(0, 0, 0, 0.6) 100%);
  }

  &__bg-text {
    position: absolute;
    bottom: -5%;
    left: 10%;
    font-size: 20rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.08);
    text-transform: lowercase;
    pointer-events: none;
    user-select: none;
    z-index: 1;

    @media (max-width: 768px) {
      font-size: 10rem;
      bottom: 5%;
    }
  }

  &__content {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
  }

  &__text-column {
    max-width: 800px;
    text-align: left;
  }

  &__title {
    font-size: clamp(2.5rem, 6vw, 4.2rem);
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 0;
    color: #ffffff;
    text-align: left;
    text-transform: capitalize;
  }

  &__subtitle {
    font-size: clamp(2.5rem, 6vw, 4.2rem);
    font-weight: 600;
    line-height: 1.1;
    color: #ffffff;
    margin-bottom: 2rem;
    text-align: left;

    p {
      margin: 0;
    }
  }

  &__separator {
    width: 1px;
    height: 60px;
    background: rgba(255, 255, 255, 0.3);
    margin: 2rem 0;
    display: block;
  }

  &__bullets {
    list-style: none;
    padding: 0;
    margin: 0 0 3rem 0;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    li {
      display: flex;
      align-items: flex-start;
      gap: 1.2rem;
      font-size: 1.15rem;
      font-weight: 300;
      color: rgba(255, 255, 255, 0.9);
      max-width: 600px;

      i {
        color: var(--phb-cyan, #21bcfa);
        margin-top: 0.35rem;
        font-size: 1rem;
      }
    }
  }

  &__cta-wrapper {
    display: inline-flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center; // Centered relative to the button
  }

  &__cta-btn {
    background: #ffffff;
    border: 1px solid #ffffff;
    color: #0039ad;
    padding: 1.2rem 3rem;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    border-radius: 4px; // Clinical sharp design
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    text-transform: uppercase;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    width: 100%;
    text-align: center;

    &:hover {
      background: #0039ad;
      color: #ffffff;
      transform: translateY(-5px);
      box-shadow: 0 20px 60px rgba(0, 57, 173, 0.4);
    }
  }

  &__cta-sub {
    font-size: 1rem; // Matches button size (approx)
    color: rgba(255, 255, 255, 0.6);
    text-align: center; // Centered
    margin: 0;
    text-decoration: underline; // Underlined
    cursor: pointer;
    transition: color 0.3s ease;
    font-weight: 300;
    letter-spacing: 0.05em;

    &:hover {
      color: #ffffff;
    }
  }
}

@media (max-width: 768px) {
  .phb-hero {
    padding-top: 10rem;

    &__bg-overlay {
      background: linear-gradient(to bottom,
          rgba(0, 57, 173, 0.7) 0%,
          rgba(0, 57, 173, 0.9) 60%,
          #0039ad 100%);
    }

    &__text-column {
      max-width: 100%;
    }

    &__cta-wrapper {
      width: 100%;
    }

    &__cta-btn {
      width: 100%;
    }

    &__bg-video {
      object-position: left bottom;
    }
  }
}
</style>



