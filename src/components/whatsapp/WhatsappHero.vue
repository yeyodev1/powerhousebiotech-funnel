<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

defineEmits(['click-cta'])
const { t } = useLocale()
</script>

<template>
  <section class="whatsapp-hero">
    <div class="whatsapp-hero__container">
      <!-- Glow effect behind hero -->
      <div class="whatsapp-hero__glow"></div>

      <!-- Content wrapper -->
      <div class="whatsapp-hero__content" data-aos="fade-up" data-aos-duration="1000">
        <!-- Badge -->
        <span class="whatsapp-hero__badge">
          <i class="fa-solid fa-circle-check"></i>
          {{ t.whatsappCommunity.hero.badge }}
        </span>

        <!-- Title -->
        <h1 class="whatsapp-hero__title">
          {{ t.whatsappCommunity.hero.title }}
          <span class="whatsapp-hero__accent-text">
            {{ t.whatsappCommunity.hero.accent }}
          </span>
        </h1>

        <!-- Glassmorphism Description Card -->
        <div class="whatsapp-hero__card">
          <p class="whatsapp-hero__sub">
            {{ t.whatsappCommunity.hero.sub }}
          </p>

          <!-- CTA Wrapper -->
          <div class="whatsapp-hero__action">
            <button 
              @click.prevent="$emit('click-cta')"
              class="whatsapp-hero__cta"
            >
              <i class="fa-brands fa-whatsapp whatsapp-hero__icon"></i>
              <span>{{ t.whatsappCommunity.hero.cta }}</span>
            </button>
            
            <p class="whatsapp-hero__disclaimer">
              <i class="fa-solid fa-shield-halved"></i>
              {{ t.whatsappCommunity.hero.disclaimer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.whatsapp-hero {
  position: relative;
  padding: clamp(100px, 15vw, 160px) 0 clamp(40px, 6vw, 80px) 0;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;

  &__container {
    width: 100%;
    max-width: 1300px;
    padding: 0 clamp(20px, 5vw, 60px);
    position: relative;
    z-index: 2;
  }

  &__glow {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: clamp(300px, 60vw, 800px);
    height: clamp(300px, 60vw, 800px);
    background: radial-gradient(circle, rgba(37, 211, 102, 0.12) 0%, rgba(33, 188, 251, 0.05) 50%, transparent 70%);
    pointer-events: none;
    z-index: 1;
    filter: blur(40px);
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(37, 211, 102, 0.1);
    border: 1px solid rgba(37, 211, 102, 0.3);
    border-radius: 100px;
    color: #25D366;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 24px;

    i {
      font-size: 12px;
    }
  }

  &__title {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(2rem, 5.5vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin-bottom: 32px;
  }

  &__accent-text {
    display: block;
    background: linear-gradient(135deg, #18e7f0 0%, #25D366 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 8px;
  }

  &__card {
    background: rgba(30, 34, 96, 0.3);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(33, 188, 251, 0.12);
    border-radius: 24px;
    padding: clamp(24px, 5vw, 48px) clamp(20px, 4vw, 40px);
    width: 100%;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  &__sub {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(0.95rem, 2vw, 1.15rem);
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 32px;
    text-align: center;
  }

  &__action {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    max-width: 440px;
    padding: clamp(16px, 2vw, 20px) 32px;
    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
    border: none;
    border-radius: 100px;
    color: #ffffff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(0.85rem, 1.5vw, 0.95rem);
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    box-shadow: 0 8px 30px rgba(37, 211, 102, 0.35);
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
      transition: all 0.6s ease;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(37, 211, 102, 0.5), 0 0 15px rgba(24, 231, 240, 0.3);
      
      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(-1px);
    }
  }

  &__icon {
    font-size: 1.5rem;
    animation: pulse-whatsapp 2s infinite;
  }

  &__disclaimer {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Manrope', sans-serif;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;

    i {
      color: rgba(37, 211, 102, 0.7);
    }
  }
}

@keyframes pulse-whatsapp {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}
</style>
