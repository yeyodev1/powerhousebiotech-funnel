<template>
  <section class="phb-about">
    <div class="phb-container">

      <div class="phb-about__grid">
        <!-- Left: main statement -->
        <div class="phb-about__left" data-aos="fade-up">
          <div class="phb-line-title">
            <span class="phb-line-title__line"></span>
            {{ t.about.label }}
          </div>
          <h2 class="phb-about__heading" v-html="t.about.heading"></h2>
          <p class="phb-about__body" v-html="t.about.body1"></p>
          <p class="phb-about__truth">
            {{ t.about.truth }}
          </p>
          <p class="phb-about__body phb-about__body--small">
            {{ t.about.body2 }}
          </p>
        </div>

        <!-- Right: bullets -->
        <div class="phb-about__right" data-aos="fade-up" data-aos-delay="150">
          <div class="phb-about__bullets-label">{{ t.about.bulletsLabel }}</div>
          <ul class="phb-about__bullets">
            <li v-for="bullet in t.about.bullets" :key="bullet">
              <span class="phb-about__bullet-icon">
                <svg viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <span>{{ bullet }}</span>
            </li>
          </ul>

          <a href="#cta" class="phb-btn">
            {{ t.about.cta }}
            <svg viewBox="0 0 20 20" fill="none" class="phb-btn__arrow"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>

      <!-- Ultra-Minimalist Platform Mockup -->
      <div class="phb-about__mockup-wrapper" data-aos="zoom-in" data-aos-delay="200">
        <div class="phb-about__mockup">
          <img :src="platformImg" alt="PowerHouse Biotech Platform Preview" loading="lazy" />
          <div class="phb-about__mockup-glow"></div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
import platformImg from '@/assets/stock/platform.png'
const { t } = useLocale()
</script>

<style lang="scss" scoped>
.phb-about {
  background: $PHB-BG;
  background-image: $PHB-MESH-GRADIENT;
  color: var(--phb-white, #ffffff);
  padding: clamp(80px, 10vw, 140px) 0;
  font-family: var(--phb-font);
}

.phb-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 80px);
}

.phb-about__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 6vw, 100px);
  align-items: center;
}

.phb-line-title {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 24px;
}

.phb-line-title__line {
  display: block;
  width: 32px;
  height: 1px;
  background: var(--phb-cyan, #21bcfa);
  flex-shrink: 0;
}

.phb-about__heading {
  font-size: clamp(1.8rem, 3vw, 3rem);
  font-weight: 300;
  line-height: 1.15;
  letter-spacing: -0.01em;

  em {
    font-style: italic;
    font-weight: 700;
    color: var(--phb-cyan, #21bcfa);
  }
}

.phb-about__body {
  font-size: clamp(0.95rem, 1.2vw, 1.15rem);
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin-top: 24px;

  strong {
    color: #ffffff;
    font-weight: 600;
  }

  &--small { 
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.4);
  }
}

.phb-about__truth {
  font-size: clamp(1.2rem, 1.8vw, 1.6rem);
  font-weight: 300;
  color: #ffffff;
  line-height: 1.3;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 24px 30px;
  border-left: 2px solid var(--phb-cyan, #21bcfa);
  background: rgba(33, 188, 250, 0.05);
  border-radius: 0 12px 12px 0;
}

.phb-about__bullets-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--phb-cyan, #21bcfa);
  margin-bottom: 20px;
}

.phb-about__bullets {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 36px;

  li {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
  }
}

.phb-about__bullet-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 1px;
  color: var(--phb-cyan, #21bcfa);

  svg { width: 100%; height: 100%; }
}

.phb-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--phb-font);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--phb-cyan, #21bcfa);
  text-decoration: none;
  padding: 12px 0;
  border-bottom: 1px solid rgba(33, 188, 251, 0.3);
  transition: gap 0.2s, opacity 0.2s;

  &:hover { gap: 16px; }

  &__arrow { width: 18px; height: 18px; flex-shrink: 0; }
}

/* Mockup Styles */
.phb-about__mockup-wrapper {
  margin-top: clamp(60px, 8vw, 100px);
  perspective: 2000px;
  display: flex;
  justify-content: center;
}

.phb-about__mockup {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: #0f172a;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.6),
    0 0 30px rgba(33, 188, 251, 0.03);
  overflow: hidden;
  animation: float 6s ease-in-out infinite;
  transform-style: preserve-3d;

  img {
    width: 100%;
    height: auto;
    display: block;
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }

  &:hover img { opacity: 1; }
}

.phb-about__mockup-glow {
  position: absolute;
  inset: -20%;
  background: radial-gradient(circle at center, rgba(33, 188, 251, 0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: -1;
}

@keyframes float {
  0% { transform: translateY(0px) rotateX(1deg); }
  50% { transform: translateY(-10px) rotateX(2deg); }
  100% { transform: translateY(0px) rotateX(1deg); }
}

@media (max-width: 900px) {
  .phb-about__grid { grid-template-columns: 1fr; }
  .phb-about__mockup {
    max-width: 100%;
    animation: float-mobile 5s ease-in-out infinite;
  }
}

@keyframes float-mobile {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}

@media (max-width: 900px) {
  .phb-about__grid { grid-template-columns: 1fr; }
}
</style>
