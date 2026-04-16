<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const team = [
  {
    name: 'Dr. Guillermo Rodríguez',
    role: 'Medical Services Director',
    location: 'PHB México',
    image: 'https://images.unsplash.com/photo-1612349317150-e410f624c427?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Dra. Victoria Salas',
    role: 'Internal & Longevity Specialist',
    location: 'PHB Colombia',
    image: 'https://images.unsplash.com/photo-1594824436998-d8f99fac46a5?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Dr. Augusto Ferrara',
    role: 'Head of Regenerative Therapies',
    location: 'PHB España',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800'
  }
]

const galleryRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    const cards = gsap.utils.toArray('.phb-science__card')
    
    if (cards.length > 0) {
      // Pin the gallery section and stack cards on top of each other
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryRef.value,
          start: 'top 10%',
          end: `+=${cards.length * 80}%`,
          pin: true,
          scrub: 1,
        }
      })

      // The first card stays, others stack on top from the right or bottom
      cards.forEach((card, i) => {
        if (i === 0) return
        
        // Start below viewport
        gsap.set(card as Element, { yPercent: 100 })
        
        tl.to(card as Element, {
          yPercent: 0,
          ease: 'none',
        })
      })
    }
  }, galleryRef.value!)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section class="phb-science" ref="galleryRef">
    <div class="phb-science__container">
      
      <!-- Text Info Content -->
      <div class="phb-science__info">
        <div class="phb-science__header">
          <div class="phb-science__line"></div>
          <h2 class="phb-science__title">
            The Science at the Heart of PowerHouse
          </h2>
        </div>
        
        <h3 class="phb-science__subtitle">MEET OUR TEAM</h3>
        <p class="phb-science__description">
          Our medical team brings together world-class experts in longevity,
          preventive medicine and performance, united by a shared, science-based
          approach. We are pleased to introduce the heads of each unit—leading
          specialists who guide every area of the PowerHouse Method.
        </p>
      </div>

      <!-- Overlapping Gallery -->
      <div class="phb-science__gallery-wrapper">
        <div 
          v-for="(member, index) in team" 
          :key="index"
          class="phb-science__card"
          :style="{ zIndex: index }"
        >
          <div class="phb-science__card-image">
            <img :src="member.image" :alt="member.name" loading="lazy" />
            <div class="phb-science__card-overlay"></div>
          </div>
          <div class="phb-science__card-content">
            <h4 class="phb-science__card-name">{{ member.name }}</h4>
            <p class="phb-science__card-role">{{ member.role }}</p>
            <p class="phb-science__card-location">{{ member.location }}</p>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;

.phb-science {
  background-color: var(--phb-bg-alt, #f9f9f9); /* Use light bg if standard for this section, else dark */
  color: var(--phb-text-1, #171846); /* Dark text for light background */
  padding: 6rem 2rem;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;

  /* If brand needs this to be light or white: */
  background: #ffffff;
  color: #191423;

  &__container {
    max-width: 1400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  &__info {
    max-width: 800px;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  &__line {
    width: 60px;
    height: 1px;
    background-color: #191423;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 300;
    line-height: 1.2;
    margin: 0;
  }

  &__subtitle {
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: #666;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  &__description {
    font-size: 1.125rem;
    font-weight: 300;
    line-height: 1.6;
    color: #555;
    font-style: italic;
    margin: 0;
  }

  &__gallery-wrapper {
    position: relative;
    width: 100%;
    height: 600px; /* fixed height for stacking effect */
    border-radius: 12px;
    overflow: hidden;
  }

  &__card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #e2e2e2;
    will-change: transform;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 -10px 30px rgba(0,0,0,0.1);
  }

  &__card-image {
    position: relative;
    width: 100%;
    height: 100%;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 20%;
    }
  }

  &__card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%);
  }

  &__card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 3rem 2rem;
    color: #ffffff;
    z-index: 10;
  }

  &__card-name {
    font-size: 2rem;
    font-weight: 300;
    margin: 0 0 0.5rem 0;
  }

  &__card-role {
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin: 0 0 0.25rem 0;
    opacity: 0.9;
  }

  &__card-location {
    font-size: 0.75rem;
    font-weight: 300;
    opacity: 0.7;
    margin: 0;
  }
}

@media (max-width: 768px) {
  .phb-science {
    padding: 4rem 1.5rem;

    &__title {
      font-size: 2rem;
    }
    
    &__line {
      width: 40px;
    }

    &__gallery-wrapper {
      height: 450px;
    }
  }
}
</style>
