<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()
const router = useRouter()
const bgVideo = ref<HTMLVideoElement | null>(null)

const goToQualify = () => {
  router.push('/cualificar')
}

onMounted(() => {
  // Force Safari to play video
  if (bgVideo.value) {
    bgVideo.value.play().catch(e => console.warn('Video autoplay:', e))
  }

  const tl = gsap.timeline()

  tl.fromTo('.hero-title',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
  )
    .fromTo('.hero-bullets li',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo('.hero-disclaimer',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('.hero-actions',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.1'
    )

  // Scroll animation for DNA Video
  gsap.to('.hero-visual-video', {
    scrollTrigger: {
      trigger: '.phb-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    opacity: 0.3,
    scale: 1.1
  })
})
</script>

<template>
  <section class="phb-hero">
    <!-- DNA Background Video -->
    <div class="hero-visual-container">
      <video 
        ref="bgVideo"
        autoplay 
        muted 
        loop 
        playsinline 
        webkit-playsinline
        class="hero-visual-video"
      >
        <source src="https://icdlabs.in/immune-internal/wp-content/themes/immuneel/assets/videos/DNA.mp4" type="video/mp4" />
      </video>
      <div class="hero-visual-overlay"></div>
    </div>
    
    <div class="phb-container">
      <div class="hero-content">
        
        <h1 class="hero-title">
          {{ t.hero.title1 }}
          <span>{{ t.hero.titleAccent }}</span>
        </h1>

        <div class="hero-box">
          <ul class="hero-bullets">
            <li v-for="(bullet, index) in t.hero.bullets" :key="index">
              <i class="fa-solid fa-check"></i>
              {{ bullet }}
            </li>
          </ul>
        </div>

        <p class="hero-disclaimer" @click="goToQualify">
          {{ t.hero.disclaimer }}
        </p>

        <div class="hero-actions">
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

  .hero-visual-container {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .hero-visual-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.6;
    transform-origin: center;
  }

  .hero-visual-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(5, 6, 15, 0.4) 50%, #05060f 100%);
  }

  .phb-container {
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 60px);
    position: relative;
    z-index: 2;
  }

  .hero-content {
    max-width: 900px;
    position: relative;
    z-index: 2;
  }

  .hero-title {
    font-size: clamp(44px, 7vw, 84px);
    line-height: 1.05;
    font-weight: 800;
    margin-bottom: 48px;
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
    padding: clamp(30px, 5vw, 40px);
    border-radius: 32px;
    margin-bottom: 40px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
  }

  .hero-bullets {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    li {
      display: flex;
      align-items: flex-start;
      gap: 1.2rem;
      font-size: clamp(16px, 2.5vw, 20px);
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 300;

      i {
        color: var(--phb-cyan, #21bcfa);
        margin-top: 0.35rem;
        font-size: 1.2rem;
      }
    }
  }

  .hero-disclaimer {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.3);
    margin-bottom: 56px;
    font-style: italic;
    max-width: 600px;
    line-height: 1.6;
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
    border-radius: 12px; // Medical sharp look
    font-size: 16px;
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
        background: var(--phb-blue, #1278f3);
        color: #ffffff;
        transform: translateY(-8px);
        box-shadow: 0 30px 60px rgba(18, 120, 243, 0.4);
      }
    }
  }
}

@media (max-width: 768px) {
  .phb-hero {
    padding-top: 120px;
    text-align: left;

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



