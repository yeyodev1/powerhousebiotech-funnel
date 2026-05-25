<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

defineEmits(['click-cta'])
const { t } = useLocale()
</script>

<template>
  <section class="whatsapp-hero">
    <!-- Portrait absolute background -->
    <div class="whatsapp-hero__portrait" aria-hidden="true">
      <div class="whatsapp-hero__portrait-glow"></div>
      <img
        src="@/assets/stock/couple_hugging.png"
        alt=""
        loading="lazy"
      />
    </div>

    <div class="whatsapp-hero__container">
      <div class="whatsapp-hero__glow"></div>

      <!-- Headline -->
      <div class="whatsapp-hero__top" data-aos="fade-up" data-aos-duration="1000">
        <div class="whatsapp-hero__heading">
          <h1 class="whatsapp-hero__title">
            {{ t.whatsappCommunity.hero.titleMain }}
            <span class="whatsapp-hero__accent">{{ t.whatsappCommunity.hero.titleAccent }}</span>
            <span class="whatsapp-hero__underline" aria-hidden="true"></span>
          </h1>
        </div>
      </div>

      <!-- Glass card with copy -->
      <div class="whatsapp-hero__card" data-aos="fade-up" data-aos-delay="150">
        <p class="whatsapp-hero__subtitle">
          {{ t.whatsappCommunity.hero.subtitleStart }}<br />
          <span class="whatsapp-hero__subtitle-accent">{{ t.whatsappCommunity.hero.subtitleAccent }}</span>
        </p>

        <div class="whatsapp-hero__divider" aria-hidden="true">
          <span class="whatsapp-hero__divider-line"></span>
          <i class="fa-solid fa-heart whatsapp-hero__divider-icon"></i>
          <span class="whatsapp-hero__divider-line"></span>
        </div>

        <p class="whatsapp-hero__body">
          {{ t.whatsappCommunity.hero.bodyBefore }}<span class="whatsapp-hero__body-highlight">{{ t.whatsappCommunity.hero.bodyHighlight }}</span>{{ t.whatsappCommunity.hero.bodyAfter }}
        </p>

        <!-- Pillars -->
        <ul class="whatsapp-hero__pillars">
          <li
            v-for="(p, i) in t.whatsappCommunity.pillars"
            :key="i"
            class="pillar"
            :style="{ '--pillar-color': p.color }"
            data-aos="fade-up"
            :data-aos-delay="200 + i * 80"
          >
            <span class="pillar__icon"><i :class="p.icon"></i></span>
            <h3 class="pillar__title">{{ p.title }}</h3>
            <p class="pillar__desc">{{ p.desc }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.whatsapp-hero {
  position: relative;
  padding: clamp(90px, 13vw, 150px) 0 clamp(40px, 6vw, 70px);
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;

  &__container {
    width: 100%;
    max-width: 1200px;
    padding: 0 clamp(20px, 5vw, 48px);
    position: relative;
    z-index: 2;
  }

  &__glow {
    position: absolute;
    top: -10%;
    right: -10%;
    width: clamp(400px, 70vw, 900px);
    height: clamp(400px, 70vw, 900px);
    background: radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(37, 211, 102, 0.08) 45%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    filter: blur(50px);
  }

  &__top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: clamp(200px, 30vh, 320px);
    margin-bottom: clamp(28px, 5vw, 48px);
    position: relative;
    z-index: 2;
  }

  &__heading {
    max-width: 100%;
    position: relative;
    z-index: 3;

    @media (min-width: 900px) {
      max-width: 55%;
    }
  }

  &__title {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(2.4rem, 7vw, 4.5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin: 0;
    position: relative;
  }

  &__accent {
    display: block;
    font-family: 'Caveat', 'Outfit', cursive;
    font-style: italic;
    font-weight: 600;
    background: linear-gradient(135deg, #18e7f0 0%, #25D366 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-top: 4px;
    letter-spacing: -0.01em;
  }

  &__underline {
    display: block;
    width: 80px;
    height: 3px;
    margin-top: 12px;
    background: linear-gradient(90deg, #18e7f0, #25D366);
    border-radius: 4px;
  }

  &__portrait {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: clamp(380px, 55vh, 650px);
    z-index: 1;
    pointer-events: none;
    overflow: hidden;

    @media (min-width: 600px) {
      width: 75%;
    }

    @media (min-width: 900px) {
      width: 55%;
      height: clamp(550px, 75vh, 800px);
    }

    // Mask container to smoothly fade edges and remove the harsh box shape
    -webkit-mask-image: linear-gradient(to left, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%),
                        linear-gradient(to bottom, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%);
    -webkit-mask-composite: source-in;
    mask-image: linear-gradient(to left, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%),
                linear-gradient(to bottom, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%);
    mask-composite: intersect;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      display: block;
      filter: saturate(0.92) brightness(0.82);
    }
  }

  &__portrait-glow {
    position: absolute;
    inset: -30%;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 60%);
    filter: blur(40px);
    z-index: -1;
    pointer-events: none;
  }

  &__card {
    background: linear-gradient(180deg, rgba(30, 34, 96, 0.45) 0%, rgba(23, 24, 70, 0.35) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(33, 188, 251, 0.14);
    border-radius: 28px;
    padding: clamp(28px, 5vw, 56px) clamp(20px, 4vw, 48px);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  &__subtitle {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(1.05rem, 2.2vw, 1.5rem);
    font-weight: 600;
    line-height: 1.4;
    color: #ffffff;
    text-align: center;
    margin: 0 0 24px;
  }

  &__subtitle-accent {
    color: #2dd4bf;
  }

  &__divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 24px;

    &-line {
      flex: 0 0 80px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.5), transparent);

      @media (min-width: 640px) {
        flex-basis: 140px;
      }
    }

    &-icon {
      color: #2dd4bf;
      font-size: 0.95rem;
    }
  }

  &__body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(0.95rem, 1.8vw, 1.1rem);
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.82);
    text-align: center;
    max-width: 720px;
    margin: 0 auto clamp(32px, 5vw, 48px);
  }

  &__body-highlight {
    color: #2dd4bf;
    font-weight: 700;
  }

  &__pillars {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(2, 1fr);

    @media (min-width: 700px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1000px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }
}

.pillar {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px 4px;

  &__icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--pillar-color) 12%, transparent);
    border: 1px solid color-mix(in srgb, var(--pillar-color) 35%, transparent);
    color: var(--pillar-color);
    font-size: 1.5rem;
    margin-bottom: 14px;
    box-shadow: 0 8px 24px color-mix(in srgb, var(--pillar-color) 18%, transparent);
    transition: transform 0.3s ease;
  }

  &:hover &__icon {
    transform: translateY(-3px);
  }

  &__title {
    font-family: 'Outfit', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--pillar-color);
    margin: 0 0 6px;
  }

  &__desc {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.8rem;
    line-height: 1.45;
    color: rgba(255, 255, 255, 0.62);
    margin: 0;
  }
}
</style>
