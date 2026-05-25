<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

defineEmits(['click-cta'])
const { t } = useLocale()
</script>

<template>
  <section class="whatsapp-benefits">
    <div class="whatsapp-benefits__container">
      
      <!-- Stats Block -->
      <div class="whatsapp-benefits__stats" data-aos="fade-up">
        <div class="stat-card">
          <span class="stat-card__number">{{ t.whatsappCommunity.stats.members }}</span>
          <span class="stat-card__label">{{ t.whatsappCommunity.stats.membersLabel }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-card__number">{{ t.whatsappCommunity.stats.content }}</span>
          <span class="stat-card__label">{{ t.whatsappCommunity.stats.contentLabel }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-card__number highlight">{{ t.whatsappCommunity.stats.price }}</span>
          <span class="stat-card__label">{{ t.whatsappCommunity.stats.priceLabel }}</span>
        </div>
      </div>

      <!-- Benefits Header -->
      <div class="whatsapp-benefits__header" data-aos="fade-up">
        <h2 class="whatsapp-benefits__title">{{ t.whatsappCommunity.benefits.title }}</h2>
        <p class="whatsapp-benefits__subtitle">{{ t.whatsappCommunity.benefits.subtitle }}</p>
      </div>

      <!-- Benefits Grid -->
      <div class="whatsapp-benefits__grid">
        <div 
          v-for="(item, index) in t.whatsappCommunity.benefits.items" 
          :key="index"
          class="benefit-card"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="benefit-card__icon-wrapper">
            <i :class="item.icon"></i>
          </div>
          <h3 class="benefit-card__title">{{ item.title }}</h3>
          <p class="benefit-card__desc">{{ item.desc }}</p>
        </div>
      </div>

      <!-- Bottom CTA Card -->
      <div class="whatsapp-benefits__cta-block" data-aos="zoom-in" data-aos-duration="1000">
        <div class="cta-card">
          <div class="cta-card__bg-glow"></div>
          <h3 class="cta-card__title">{{ t.whatsappCommunity.ctaBlock.title }}</h3>
          <p class="cta-card__sub">{{ t.whatsappCommunity.ctaBlock.sub }}</p>
          <button @click.prevent="$emit('click-cta')" class="cta-card__button">
            <span>{{ t.whatsappCommunity.ctaBlock.btn }}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.whatsapp-benefits {
  padding: clamp(40px, 6vw, 80px) 0 clamp(80px, 12vw, 160px) 0;
  width: 100%;
  display: flex;
  justify-content: center;

  &__container {
    width: 100%;
    max-width: 1300px;
    padding: 0 clamp(20px, 5vw, 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__stats {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    width: 100%;
    max-width: 900px;
    margin-bottom: clamp(60px, 10vw, 100px);

    @media (min-width: 640px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__header {
    text-align: center;
    max-width: 680px;
    margin-bottom: clamp(40px, 8vw, 64px);
  }

  &__title {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 16px;
  }

  &__subtitle {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(0.95rem, 1.8vw, 1.1rem);
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    width: 100%;
    margin-bottom: clamp(80px, 12vw, 120px);

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

// Subcomponents / Card Styles
.stat-card {
  background: rgba(23, 24, 70, 0.5);
  border: 1px solid rgba(33, 188, 251, 0.1);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(33, 188, 251, 0.25);
    background: rgba(30, 34, 96, 0.6);
    transform: translateY(-2px);
  }

  &__number {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2rem, 4.5vw, 3rem);
    font-weight: 800;
    color: #21bcfb;
    line-height: 1;
    margin-bottom: 8px;

    &.highlight {
      color: #25D366;
    }
  }

  &__label {
    font-family: 'Manrope', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
}

.benefit-card {
  background: rgba(30, 34, 96, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    border-color: rgba(33, 188, 251, 0.15);
    background: rgba(30, 34, 96, 0.45);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
    transform: translateY(-4px);

    .benefit-card__icon-wrapper {
      background: rgba(37, 211, 102, 0.15);
      border-color: rgba(37, 211, 102, 0.4);
      color: #25D366;
    }
  }

  &__icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(33, 188, 251, 0.08);
    border: 1px solid rgba(33, 188, 251, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #21bcfb;
    font-size: 1.25rem;
    margin-bottom: 24px;
    transition: all 0.3s ease;
  }

  &__title {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(1.15rem, 2vw, 1.35rem);
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 12px 0;
  }

  &__desc {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.65);
    margin: 0;
  }
}

.cta-card {
  width: 100%;
  max-width: 960px;
  background: radial-gradient(100% 100% at 50% 0%, rgba(30, 34, 96, 0.8) 0%, rgba(23, 24, 70, 0.95) 100%);
  border: 1px solid rgba(33, 188, 251, 0.15);
  border-radius: 32px;
  padding: clamp(32px, 6vw, 64px) clamp(24px, 4vw, 48px);
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;

  &__bg-glow {
    position: absolute;
    bottom: -150px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(37, 211, 102, 0.15) 0%, transparent 70%);
    pointer-events: none;
    filter: blur(30px);
  }

  &__title {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(1.5rem, 3.5vw, 2.3rem);
    font-weight: 800;
    line-height: 1.2;
    color: #ffffff;
    margin-bottom: 16px;
    max-width: 680px;
    position: relative;
    z-index: 2;
  }

  &__sub {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(0.9rem, 1.8vw, 1.05rem);
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 32px;
    max-width: 600px;
    position: relative;
    z-index: 2;
  }

  &__button {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 16px 36px;
    background: #ffffff;
    border: none;
    border-radius: 100px;
    color: #0d0e23;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    z-index: 2;

    &:hover {
      background: #25D366;
      color: #ffffff;
      box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }

    i {
      font-size: 0.95rem;
      transition: transform 0.3s ease;
    }

    &:hover i {
      transform: translateX(4px);
    }
  }
}
</style>
