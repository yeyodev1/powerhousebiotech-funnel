<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()
const router = useRouter()

const heroImg = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095175/assets-juan/e218f195-9aeb-4e69-a502-38a0cc524535.jpg'

const goToQualify = () => {
  router.push('/cualificar')
}

onMounted(() => {
  const tl = gsap.timeline()

  // Background Image scale down reveal
  tl.fromTo('.phb-hero__image',
    { scale: 1.1, opacity: 0 },
    { scale: 1, opacity: 0.8, duration: 1.5, ease: 'power3.out' }
  )
  
  // Text stagger reveal
  tl.fromTo('.phb-hero__reveal',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' },
    '-=1.0'
  )

  // Bullets reveal
  tl.fromTo('.hero-bullets li',
    { x: -20, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
    '-=0.6'
  )
})
</script>

<template>
  <section class="phb-hero">
    
    <!-- Hero Image Background -->
    <div class="phb-hero__visual">
      <img :src="heroImg" alt="Juan Román Garza - Founder" class="phb-hero__image" />
      <div class="phb-hero__overlay"></div>
      <div class="phb-hero__gradient"></div>
    </div>
    
    <div class="phb-container">
      <div class="hero-content">
        
        <div class="hero-badge phb-hero__reveal">
          <i class="fa-solid fa-microscope"></i> PowerHouse Biotech by Juan Román Garza
        </div>

        <h1 class="hero-title phb-hero__reveal">
          {{ t.hero.title1 }}
          <span>{{ t.hero.titleAccent }}</span>
        </h1>

        <div class="hero-box phb-hero__reveal">
          <ul class="hero-bullets">
            <li v-for="(bullet, index) in t.hero.bullets" :key="index">
              <i class="fa-solid fa-check"></i>
              {{ bullet }}
            </li>
          </ul>
        </div>

        <p class="hero-disclaimer phb-hero__reveal" @click="goToQualify">
          {{ t.hero.disclaimer }}
        </p>

        <div class="hero-actions phb-hero__reveal">
          <button type="button" class="btn btn-primary" @click="goToQualify">
            <span class="btn-text">{{ t.hero.cta }}</span>
            <span class="btn-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.phb-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 100px;
  overflow: hidden;
  position: relative;
  background-color: #05060f;

  &__visual {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 70% 30%; // Focus more on his face/figure on the right side
    opacity: 0.8;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    // Radial gradient to make text readable on the left and show image on the right
    background: radial-gradient(circle at 75% 50%, transparent 0%, rgba(5, 6, 15, 0.4) 40%, #05060f 90%);
  }

  &__gradient {
    position: absolute;
    inset: 0;
    // Linear gradient for mobile readibility
    background: linear-gradient(90deg, #05060f 0%, rgba(5, 6, 15, 0.9) 40%, transparent 100%);
    
    @media (max-width: 768px) {
      background: linear-gradient(0deg, #05060f 0%, rgba(5, 6, 15, 0.8) 60%, transparent 100%);
    }
  }

  .phb-container {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 clamp(24px, 5vw, 80px);
    position: relative;
    z-index: 2;
  }

  .hero-content {
    max-width: 800px;
    position: relative;
    z-index: 2;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 100px;
    backdrop-filter: blur(10px);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 2.5rem;

    i {
      color: var(--phb-cyan, #21bcfa);
    }
  }

  .hero-title {
    font-size: clamp(3rem, 6.5vw, 5.5rem);
    line-height: 1.05;
    font-weight: 800;
    margin-bottom: 40px;
    color: #ffffff;
    letter-spacing: -0.04em;

    span {
      display: block;
      background: linear-gradient(135deg, #21bcfa 0%, #1278f3 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .hero-box {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: clamp(24px, 4vw, 32px);
    border-radius: 24px;
    margin-bottom: 40px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
    max-width: 650px;
  }

  .hero-bullets {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    li {
      display: flex;
      align-items: flex-start;
      gap: 1.2rem;
      font-size: clamp(1rem, 1.5vw, 1.15rem);
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.7);
      font-weight: 300;

      i {
        color: var(--phb-cyan, #21bcfa);
        margin-top: 0.35rem;
        font-size: 1rem;
      }
    }
  }

  .hero-disclaimer {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 48px;
    font-style: italic;
    max-width: 500px;
    line-height: 1.6;
    text-decoration: underline;
    text-underline-offset: 4px;
    cursor: pointer;
    transition: color 0.3s ease;
    font-weight: 400;

    &:hover {
      color: #ffffff;
      text-decoration-color: var(--phb-cyan, #21bcfa);
    }
  }

  .hero-actions {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .btn {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 40px;
    border-radius: 100px; // Round pill button
    font-size: 1rem;
    font-weight: 700;
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.1em;

    &-primary {
      background: #ffffff;
      color: #05060f;
      border: none;
      box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);

      &:hover {
        background: var(--phb-cyan, #21bcfa);
        color: #05060f;
        transform: translateY(-8px);
        box-shadow: 0 30px 60px rgba(33, 188, 250, 0.4);
      }
    }
  }
}

@media (max-width: 768px) {
  .phb-hero {
    padding-top: 140px;
    text-align: left;
    
    &__image {
      object-position: 80% 20%;
    }

    .hero-content {
      width: 100%;
    }

    .hero-actions {
      flex-direction: column;
    }

    .btn {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>



