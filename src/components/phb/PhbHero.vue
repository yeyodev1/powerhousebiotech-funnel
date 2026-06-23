<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()
const router = useRouter()

const heroVideo = 'https://res.cloudinary.com/drw5sn8qw/video/upload/v1782231565/assets-juan/uicyiqkjhaoxi7fzoioa.mp4'

const goToQualify = () => {
  router.push('/cualificar')
}

onMounted(() => {
  const tl = gsap.timeline()

  // Background video scale down reveal
  tl.fromTo('.phb-hero__video',
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
    
    <!-- Hero Video Background -->
    <div class="phb-hero__visual">
      <video
        :src="heroVideo"
        class="phb-hero__video"
        autoplay
        muted
        loop
        playsinline
        poster="https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095175/assets-juan/e218f195-9aeb-4e69-a502-38a0cc524535.jpg"
        aria-hidden="true"
      />
      <div class="phb-hero__overlay"></div>
      <div class="phb-hero__gradient"></div>
    </div>
    
    <div class="phb-container">
      <div class="hero-content">
        
        
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
        
        <div class="hero-badge phb-hero__reveal">
          <i class="fa-solid fa-microscope"></i> 
          <span>PowerHouse Biotech by 
            <a href="https://juanromangarza.com/" target="_blank" rel="noopener noreferrer" class="founder-link">
              Juan Román Garza
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </span>
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

        <div class="hero-social phb-hero__reveal">
          <span class="hero-social__label">SÍGUENOS</span>
          <div class="hero-social__links">
            <a href="https://www.instagram.com/jromangarzainc/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@jromangarzainc" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <i class="fa-brands fa-tiktok"></i>
            </a>
          </div>
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

  &__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 10% 10%; // Base position
    opacity: 0.8;

    @media (min-width: 1025px) {
      // Force the video to be wider than the screen on desktop
      // and align it to the left, pushing the center (Juan) to the right.
      width: 135%;
      position: absolute;
      top: 0;
      left: 0;
      object-position: 0% 10%;
      transform-origin: left top;
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    // background: radial-gradient(circle at 75% 50%, transparent 0%, rgba(5, 6, 15, 0.4) 40%, #05060f 90%);
  }

  &__gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #05060f 0%, rgba(5, 6, 15, 0.5) 40%, transparent 100%);

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
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: clamp(0.7rem, 1vw, 0.85rem);
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2.5rem;
    text-align: left;

    >i {
      color: var(--phb-cyan, #21bcfa);
      margin-top: 2px;
      font-size: 1rem;
    }

    span {
      line-height: 1.5;
    }

    .founder-link {
      color: #ffffff;
      text-decoration: none;
      position: relative;
      transition: color 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;

      i {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.8em;
        transition: color 0.3s ease, transform 0.3s ease;
      }

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 1px;
        bottom: -2px;
        left: 0;
        background-color: var(--phb-cyan, #21bcfa);
        transform-origin: bottom right;
        transition: transform 0.3s ease-out;
      }

      &:hover {
        color: var(--phb-cyan, #21bcfa);

        i {
          color: var(--phb-cyan, #21bcfa);
          transform: translate(2px, -2px);
        }

        &::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      }
    }
  }

  .hero-title {
    font-size: clamp(2rem, 4vw, 4rem);
    line-height: 1.05;
    font-weight: 800;
    margin-bottom: 40px;
    color: #ffffff;
    letter-spacing: -0.04em;

    margin-top: 150px;

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
      font-size: clamp(0.9rem, 1.2vw, 1.15rem);
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
    font-size: clamp(0.85rem, 1vw, 1rem);
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

  .hero-social {
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 24px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    backdrop-filter: blur(10px);

    @media (max-width: 768px) {
      align-items: center;
      width: 100%;
    }

    &__label {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.5);
      text-transform: uppercase;
    }

    &__links {
      display: flex;
      gap: 1.5rem;

      a {
        color: #ffffff;
        font-size: 1.5rem;
        transition: all 0.3s ease;

        &:hover {
          color: var(--phb-cyan, #21bcfa);
          transform: translateY(-3px);
        }
      }
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

    &__video {
      object-position: 25% 10%; // Ajustado para mover al sujeto a la derecha
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



