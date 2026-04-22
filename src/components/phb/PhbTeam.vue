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
const stepIcons = [
  'fa-magnifying-glass-plus',
  'fa-microscope',
  'fa-lightbulb',
  'fa-fingerprint',
  'fa-compass-drafting',
  'fa-route'
]

onMounted(() => {
  if (!containerRef.value || !slideContainerRef.value) return

  const slides = gsap.utils.toArray('.phb-method-slide')
  const ctx = gsap.context(() => {
    
    // Main Pinning ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.value,
        pin: true,
        scrub: 1, 
        start: 'top top',
        end: `+=${slides.length * 100}%`,
      }
    })

    // Animate each slide
    slides.forEach((slide: any, i: number) => {
      if (i > 0) {
        tl.from(slide, {
          yPercent: 100,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: 'power2.inOut'
        }, i)
      }

      tl.to(`.phb-method__nav-progress-inner`, {
        scaleY: (i + 1) / slides.length,
        duration: 0.5,
        ease: 'none'
      }, i)

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

    gsap.from('.phb-method__header-content', {
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
  <section class="phb-method" ref="containerRef">
    <div class="phb-method__wrapper">
      
      <header class="phb-method__header">
        <div class="phb-method__header-content">
          <span class="phb-method__label">{{ t.programs.title }}</span>
          <h2 class="phb-method__main-title" v-html="t.programs.subtitle"></h2>
        </div>
      </header>

      <div class="phb-method__slides" ref="slideContainerRef">
        <div 
          v-for="(step, index) in t.programs.steps" 
          :key="step.tag"
          class="phb-method-slide"
          :class="{ 'is-first': index === 0 }"
        >
          <div class="phb-method-slide__inner">
            <div class="phb-method-slide__text">
              <span class="phb-method-slide__id">{{ step.tag }}</span>
              <div class="phb-method-slide__bg-letter">{{ step.letter }}</div>
              <div class="phb-method-slide__info">
                <h3 class="phb-method-slide__name">{{ step.title }}</h3>
                <p class="phb-method-slide__desc">{{ step.desc }}</p>
                <div class="phb-method-slide__features">
                  <div v-for="feat in step.features" :key="feat" class="phb-method-slide__feat">
                    <span class="phb-method-slide__plus">+</span> {{ feat }}
                  </div>
                </div>
              </div>
            </div>

            <div class="phb-method-slide__icon-wrap">
              <div class="phb-method-slide__icon-bg">
                <i :class="['fa-solid', stepIcons[index]]"></i>
              </div>
              <div class="phb-method-slide__icon-glow"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="phb-method__nav">
        <div class="phb-method__nav-progress">
          <div class="phb-method__nav-progress-inner"></div>
        </div>
        <div class="phb-method__nav-count">
          <span>01</span>
          <div class="phb-method__nav-line"></div>
          <span>06</span>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.phb-method {
  position: relative;
  background-color: #f8fbff; // Premium clinical off-white/blue
  background-image: 
    radial-gradient(circle at 0% 0%, rgba(33, 188, 251, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 100% 100%, rgba(33, 188, 251, 0.05) 0%, transparent 50%);
  color: #1a1823;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(33, 188, 251, 0.12) 1px, transparent 1px);
    background-size: 60px 60px;
    opacity: 0.4;
    pointer-events: none;
    z-index: 1;
    -webkit-mask-image: radial-gradient(circle at 50% 50%, black 30%, transparent 90%);
    mask-image: radial-gradient(circle at 50% 50%, black 30%, transparent 90%);
  }

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
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 800;
    line-height: 1.1;
    color: #1a1823;
    text-transform: uppercase;
    letter-spacing: -0.04em;

    :deep(em) {
      font-style: normal;
      color: var(--phb-cyan, #21bcfa);
    }
  }

  &__slides {
    flex: 1;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .phb-method-slide {
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
      padding-top: 15vh;

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
    }

    &__info {
      position: relative;
      z-index: 2;
    }

    &__bg-letter {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 60vw;
      font-weight: 950;
      line-height: 1;
      pointer-events: none;
      z-index: 0;
      
      color: rgba(33, 188, 251, 0.05);
      -webkit-text-stroke: 1px rgba(33, 188, 251, 0.15);
      
      opacity: 1;
      filter: none;

      @media (min-width: 1024px) {
        font-size: 40vw;
        top: 20%;
        left: 0;
        transform: translate(-20%, -30%);
      }
    }

    &__id {
      font-size: 1.1rem;
      font-weight: 800;
      color: #1a1823; // Darker for contrast
      background: rgba(33, 188, 251, 0.1);
      padding: 0.4rem 1.2rem;
      border-radius: 4px;
      display: inline-block;
      margin-bottom: 2rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      
      &::after {
        content: '';
        display: inline-block;
        width: 40px;
        height: 2px;
        background: var(--phb-cyan, #21bcfa);
        vertical-align: middle;
        margin-left: 1.5rem;
        opacity: 0.8; // More visible line
      }
    }

    &__name {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 300;
      margin-bottom: 2rem;
      color: #1a1823;
      letter-spacing: -0.02em;
    }

    &__desc {
      font-size: 1.25rem;
      line-height: 1.6;
      font-weight: 300;
      color: rgba(0, 0, 0, 0.7);
      max-width: 520px;
      margin-bottom: 2.5rem;
    }

    &__features {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__feat {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.1rem;
      color: rgba(0, 0, 0, 0.5);
    }

    &__plus {
      color: var(--phb-cyan, #21bcfa);
      font-weight: 700;
    }

    &__icon-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;

      @media (max-width: 1024px) {
        flex: 0.5;
      }
    }

    &__icon-bg {
      width: clamp(200px, 25vw, 320px);
      height: clamp(200px, 25vw, 320px);
      background: #ffffff;
      border: 1px solid rgba(0,0,0,0.03);
      border-radius: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      box-shadow: 
        0 40px 100px rgba(0,0,0,0.03),
        inset 0 0 40px rgba(33, 188, 251, 0.02);

      i {
        font-size: 6rem;
        color: var(--phb-cyan, #21bcfa);
        filter: drop-shadow(0 0 30px rgba(33, 188, 250, 0.4));
      }

      @media (max-width: 768px) {
        width: 180px;
        height: 180px;
        border-radius: 40px;
        i { font-size: 4rem; }
      }
    }

    &__icon-glow {
      position: absolute;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(33, 188, 251, 0.1) 0%, transparent 70%);
      z-index: 0;
    }
  }

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
    background: rgba(0, 0, 0, 0.05);
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
      transform: scaleY(0.16); 
    }
  }

  &__nav-count {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.3);

    &-line {
      width: 1px;
      height: 40px;
      background: rgba(0, 0, 0, 0.1);
    }

    span:first-child {
      color: var(--phb-cyan, #21bcfa);
    }
  }
}
</style>
