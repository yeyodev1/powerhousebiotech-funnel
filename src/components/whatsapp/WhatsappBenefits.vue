<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

const props = defineProps<{ whatsappLink: string }>()
const { t } = useLocale()
</script>

<template>
  <section class="whatsapp-benefits">
    <div class="whatsapp-benefits__container">

      <!-- CTA Card with phone + seal -->
      <div class="cta-card" data-aos="zoom-in" data-aos-duration="800">
        <div class="cta-card__bg-glow"></div>

        <div class="cta-card__top">
          <!-- Phone illustration -->
          <div class="cta-card__phone" aria-hidden="true">
            <div class="cta-card__phone-glow"></div>
            <div class="cta-card__phone-frame">
              <div class="cta-card__phone-screen">
                <i class="fa-brands fa-whatsapp"></i>
              </div>
            </div>
          </div>

          <!-- Text block -->
          <div class="cta-card__text">
            <p class="cta-card__eyebrow">{{ t.whatsappCommunity.cta.eyebrow }}</p>
            <p class="cta-card__body">
              {{ t.whatsappCommunity.cta.body }}
              <span class="cta-card__body-accent">
                {{ t.whatsappCommunity.cta.bodyAccent }}
                <i class="fa-solid fa-heart cta-card__body-heart"></i>
              </span>
            </p>
          </div>

          <!-- Seal -->
          <div class="cta-card__seal" aria-hidden="true">
            <span class="cta-card__seal-line1">{{ t.whatsappCommunity.cta.sealLine1 }}</span>
            <span class="cta-card__seal-line2">{{ t.whatsappCommunity.cta.sealLine2 }}</span>
            <span class="cta-card__seal-line3">{{ t.whatsappCommunity.cta.sealLine3 }}</span>
          </div>
        </div>

        <!-- Big CTA Button -->
        <a :href="props.whatsappLink" target="_blank" rel="noopener noreferrer" class="cta-card__button">
          <span class="cta-card__button-icon">
            <i class="fa-brands fa-whatsapp"></i>
          </span>
          <span class="cta-card__button-label">{{ t.whatsappCommunity.cta.btn }}</span>
          <i class="fa-solid fa-chevron-right cta-card__button-chevron"></i>
        </a>
      </div>

      <!-- Trust Badges -->
      <ul class="whatsapp-benefits__trust" data-aos="fade-up">
        <li
          v-for="(item, i) in t.whatsappCommunity.trust"
          :key="i"
          class="trust"
          :style="{ '--trust-color': item.color }"
        >
          <span class="trust__icon"><i :class="item.icon"></i></span>
          <div class="trust__body">
            <span class="trust__title">{{ item.title }}</span>
            <span class="trust__desc">{{ item.desc }}</span>
          </div>
        </li>
      </ul>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.whatsapp-benefits {
  padding: clamp(20px, 4vw, 40px) 0 clamp(80px, 12vw, 140px);
  width: 100%;
  display: flex;
  justify-content: center;

  &__container {
    width: 100%;
    max-width: 1200px;
    padding: 0 clamp(20px, 5vw, 48px);
    display: flex;
    flex-direction: column;
    gap: clamp(24px, 4vw, 40px);
  }

  &__trust {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    @media (min-width: 760px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

.cta-card {
  position: relative;
  background: linear-gradient(180deg, rgba(30, 34, 96, 0.55) 0%, rgba(23, 24, 70, 0.7) 100%);
  border: 1px solid rgba(33, 188, 251, 0.18);
  border-radius: 32px;
  padding: clamp(28px, 5vw, 56px) clamp(20px, 4vw, 48px);
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.05);

  &__bg-glow {
    position: absolute;
    inset: -10% -10% auto auto;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, transparent 70%);
    pointer-events: none;
    filter: blur(40px);
  }

  &__top {
    display: grid;
    grid-template-columns: 1fr;
    gap: 28px;
    align-items: center;
    position: relative;
    z-index: 2;
    margin-bottom: clamp(28px, 5vw, 44px);

    @media (min-width: 900px) {
      grid-template-columns: auto 1fr auto;
      gap: 36px;
    }
  }

  // Phone illustration
  &__phone {
    position: relative;
    width: 120px;
    height: 180px;
    margin: 0 auto;

    @media (min-width: 900px) {
      width: 140px;
      height: 220px;
    }
  }

  &__phone-glow {
    position: absolute;
    inset: -30%;
    background: radial-gradient(circle, rgba(37, 211, 102, 0.4) 0%, transparent 65%);
    filter: blur(30px);
    pointer-events: none;
  }

  &__phone-frame {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(160deg, #1a1d3f 0%, #0a0b18 100%);
    border-radius: 28px;
    border: 2px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 50%;
      height: 16px;
      background: #000;
      border-radius: 0 0 12px 12px;
    }
  }

  &__phone-screen {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 2.4rem;
    box-shadow: 0 8px 24px rgba(37, 211, 102, 0.55);

    @media (min-width: 900px) {
      width: 76px;
      height: 76px;
      font-size: 2.8rem;
    }
  }

  // Text block
  &__text {
    text-align: center;

    @media (min-width: 900px) {
      text-align: left;
    }
  }

  &__eyebrow {
    font-family: 'Caveat', 'Outfit', cursive;
    font-style: italic;
    font-size: clamp(1.5rem, 3.4vw, 2.2rem);
    font-weight: 600;
    color: #2dd4bf;
    margin: 0 0 12px;
    line-height: 1;
  }

  &__body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(0.95rem, 1.8vw, 1.1rem);
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.82);
    margin: 0;
  }

  &__body-accent {
    display: inline;
    color: #ffffff;
    font-weight: 700;
  }

  &__body-heart {
    color: #c084fc;
    margin-left: 6px;
    font-size: 0.9em;
  }

  // Seal (Juntos podremos más)
  &__seal {
    width: clamp(120px, 18vw, 160px);
    height: clamp(120px, 18vw, 160px);
    border-radius: 50%;
    border: 1.5px solid rgba(168, 85, 247, 0.45);
    background: radial-gradient(circle, rgba(30, 34, 96, 0.5) 0%, rgba(23, 24, 70, 0.2) 100%);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.25), inset 0 0 20px rgba(168, 85, 247, 0.08);
    flex-shrink: 0;

    &-line1,
    &-line2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(0.7rem, 1.4vw, 0.85rem);
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.1em;
      line-height: 1.2;
    }

    &-line3 {
      font-family: 'Caveat', 'Outfit', cursive;
      font-style: italic;
      font-size: clamp(1.4rem, 3vw, 1.9rem);
      font-weight: 600;
      background: linear-gradient(135deg, #18e7f0 0%, #25D366 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin-top: 4px;
    }
  }

  // Big button
  &__button {
    position: relative;
    z-index: 2;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 18px clamp(20px, 3vw, 28px);
    background: linear-gradient(90deg, #18e7f0 0%, #25D366 100%);
    border: none;
    border-radius: 100px;
    color: #06121b;
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(0.85rem, 1.6vw, 1rem);
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 12px 40px rgba(37, 211, 102, 0.4), 0 0 30px rgba(24, 231, 240, 0.25);
    transition: all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
      transition: left 0.7s ease;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 18px 50px rgba(37, 211, 102, 0.55), 0 0 40px rgba(24, 231, 240, 0.4);

      &::before {
        left: 100%;
      }

      .cta-card__button-chevron {
        transform: translateX(4px);
      }
    }

    &:active {
      transform: translateY(-1px);
    }
  }

  &__button-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(6, 18, 27, 0.18);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  &__button-label {
    flex: 1;
    text-align: center;
    line-height: 1.25;
  }

  &__button-chevron {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(6, 18, 27, 0.18);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }
}

// Trust badges
.trust {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  background: rgba(23, 24, 70, 0.4);
  border: 1px solid color-mix(in srgb, var(--trust-color) 18%, transparent);
  border-radius: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(30, 34, 96, 0.55);
    border-color: color-mix(in srgb, var(--trust-color) 45%, transparent);
    transform: translateY(-2px);
  }

  &__icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: color-mix(in srgb, var(--trust-color) 14%, transparent);
    color: var(--trust-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.78rem;
    font-weight: 800;
    color: var(--trust-color);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    line-height: 1.2;
  }

  &__desc {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.78rem;
    line-height: 1.35;
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
