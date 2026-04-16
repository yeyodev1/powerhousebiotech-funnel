<template>
  <div class="home-hero-wrapper">
    <section class="slideshow-sha" aria-label="Main carousel">
      <!-- Swiper -->
      <div class="swiper slideshow-sha__swiper" ref="swiperEl">
        <div class="swiper-wrapper">

          <!-- SLIDE 1: Video hero -->
          <div class="swiper-slide slideshow-sha__slide">
            <div class="slideshow-sha__slide-inner">
              <div class="slideshow-sha__media">
                <video
                  class="slideshow-sha__video slideshow-sha__video--desktop"
                  muted playsinline autoplay loop preload="auto"
                  aria-label="Background video"
                >
                  <source src="https://media.shawellness.com/home-2025/sha_homepage_bg_movie_16x9.mp4" type="video/mp4" />
                </video>
              </div>
              <div class="slideshow-sha__bottom-blend" aria-hidden="true"></div>
              <div class="slideshow-sha__content sha-container">
                <h1 class="slideshow-sha__heading slideshow-sha__motion slideshow-sha__motion--heading">
                  SHA'S SCIENTIFIC <em>ADVISORY BOARD</em>
                </h1>
                <p class="slideshow-sha__subheading slideshow-sha__motion slideshow-sha__motion--sub">
                  Defining the Next Frontier of Health Optimization.
                </p>
                <div class="gap32"></div>
                <a href="#advisory-board" class="sha-btn slideshow-sha__motion slideshow-sha__motion--cta">DISCOVER</a>
              </div>
            </div>
          </div>

          <!-- SLIDE 2: Destinations -->
          <div class="swiper-slide slideshow-sha__slide">
            <div class="slideshow-sha__slide-inner">
              <div class="slideshow-sha__media">
                <img
                  src="https://shawellness.com/wp-content/uploads/2025/12/sha-spain-hero.jpg"
                  alt="SHA Spain" class="slideshow-sha__video" loading="lazy"
                />
              </div>
              <div class="slideshow-sha__bottom-blend" aria-hidden="true"></div>
              <div class="slideshow-sha__content sha-container">
                <h2 class="slideshow-sha__heading slideshow-sha__motion slideshow-sha__motion--heading">
                  OUR <em>DESTINATIONS</em>
                </h2>
                <p class="slideshow-sha__subheading slideshow-sha__motion slideshow-sha__motion--sub">
                  Where your transformation starts.
                </p>
                <div class="gap32"></div>
                <a href="#destinations" class="sha-btn slideshow-sha__motion slideshow-sha__motion--cta">DISCOVER</a>
              </div>
            </div>
          </div>

          <!-- SLIDE 3: Masters of Longevity -->
          <div class="swiper-slide slideshow-sha__slide">
            <div class="slideshow-sha__slide-inner">
              <div class="slideshow-sha__media">
                <img
                  src="https://shawellness.com/wp-content/uploads/2026/01/location-mex-1.jpg"
                  alt="SHA Mexico" class="slideshow-sha__video" loading="lazy"
                />
              </div>
              <div class="slideshow-sha__bottom-blend" aria-hidden="true"></div>
              <div class="slideshow-sha__content sha-container">
                <h2 class="slideshow-sha__heading slideshow-sha__motion slideshow-sha__motion--heading">
                  MASTERS OF <em>LONGEVITY</em>
                </h2>
                <p class="slideshow-sha__subheading slideshow-sha__motion slideshow-sha__motion--sub">
                  Science-based programs for measurable health transformation.
                </p>
                <div class="gap32"></div>
                <a href="#health-programs" class="sha-btn slideshow-sha__motion slideshow-sha__motion--cta">EXPLORE</a>
              </div>
            </div>
          </div>

        </div>
        <div class="swiper-pagination slideshow-sha__pagination" aria-label="Carousel pagination"></div>
      </div>

      <!-- KPI Section -->
      <ShaKpiSection />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import ShaKpiSection from './ShaKpiSection.vue'

const swiperEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!swiperEl.value) return

  new Swiper(swiperEl.value, {
    modules: [Autoplay, EffectFade, Pagination],
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 800,
    loop: true,
    pagination: {
      el: '.slideshow-sha__pagination',
      type: 'bullets',
      clickable: true,
    },
    on: {
      slideChangeTransitionStart() {
        document.querySelectorAll('.slideshow-sha__video').forEach((v) => {
          if (v instanceof HTMLVideoElement) v.pause()
        })
      },
      slideChangeTransitionEnd() {
        const active = document.querySelector('.swiper-slide-active')
        if (active) {
          const video = active.querySelector('video')
          if (video) video.play().catch(() => {})
        }
      },
    },
  })
})
</script>

<style lang="scss" scoped>
.home-hero-wrapper {
  background: var(--sha-dark);
}

.slideshow-sha {
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--sha-dark);
  isolation: isolate;
  overflow: hidden;
  --swiper-pagination-bullet-inactive-opacity: 1;
  --swiper-pagination-bullet-opacity: 1;
  --swiper-pagination-color: #ffffff;
}

.slideshow-sha__swiper,
:deep(.swiper-wrapper),
:deep(.swiper-slide) {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-height: 100dvh;
}

.slideshow-sha__slide-inner {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-height: 100dvh;
}

.slideshow-sha__media {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0; right: 0; bottom: 0;
    height: 32%;
    max-height: 280px;
    background: linear-gradient(
      to bottom,
      rgba(9, 10, 17, 0) 0%,
      rgba(9, 10, 17, 0.45) 45%,
      rgba(9, 10, 17, 0.92) 100%
    );
    z-index: 2;
  }
}

.slideshow-sha__bottom-blend {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: clamp(140px, 32vh, 360px);
  z-index: 3;
  pointer-events: none;
  background: linear-gradient(
    to top,
    var(--sha-dark) 0%,
    rgba(9, 10, 17, 0.82) 22%,
    rgba(9, 10, 17, 0.35) 52%,
    transparent 100%
  );
}

.slideshow-sha__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.slideshow-sha__video--desktop { display: block; }

.slideshow-sha__content {
  position: absolute;
  inset: 0;
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px var(--sha-pad-x) 120px;
}

.sha-container {
  width: 100%;
  max-width: var(--sha-container);
  margin: 0 auto;
}

.slideshow-sha__heading {
  font-size: clamp(2.4rem, 5vw, 6.5rem);
  font-weight: var(--sha-fw-light);
  line-height: 1.06;
  letter-spacing: -0.01em;
  color: var(--sha-white);
  max-width: 900px;
  font-family: var(--sha-font);

  em {
    font-style: italic;
    font-weight: var(--sha-fw-bold);
  }
}

.slideshow-sha__subheading {
  font-size: clamp(0.95rem, 1.4vw, 1.15rem);
  font-weight: var(--sha-fw-light);
  color: rgba(255, 255, 255, 0.85);
  margin-top: 16px;
  max-width: 600px;
  font-family: var(--sha-font);
}

.gap32 { height: 32px; }

.sha-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  font-family: var(--sha-font);
  font-size: 13px;
  font-weight: var(--sha-fw-regular);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.8);
  background: transparent;
  color: var(--sha-white);
  text-decoration: none;
  transition: background 0.25s, color 0.25s;
  width: fit-content;

  &:hover {
    background: var(--sha-white);
    color: var(--sha-text-dark);
  }
}

/* Slide animations */
@keyframes sha-fade-up {
  from { opacity: 0; transform: translate3d(0, 40px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
}

:deep(.swiper-slide:not(.swiper-slide-active)) {
  .slideshow-sha__motion--heading,
  .slideshow-sha__motion--sub,
  .slideshow-sha__motion--cta {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
}

:deep(.swiper-slide-active) {
  .slideshow-sha__motion--heading {
    animation: sha-fade-up 0.9s ease-out 0.1s both;
  }
  .slideshow-sha__motion--sub {
    animation: sha-fade-up 0.8s ease-out 0.4s both;
  }
  .slideshow-sha__motion--cta {
    animation: sha-fade-up 0.8s ease-out 0.8s both;
  }
}

/* Pagination */
.slideshow-sha__pagination {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  gap: 8px;
}

:deep(.slideshow-sha__pagination .swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  opacity: 1;
  transition: background 0.3s;
}
:deep(.slideshow-sha__pagination .swiper-pagination-bullet-active) {
  background: #ffffff;
}

@media (max-width: 768px) {
  .slideshow-sha__video--desktop { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .slideshow-sha__motion {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }
}
</style>
