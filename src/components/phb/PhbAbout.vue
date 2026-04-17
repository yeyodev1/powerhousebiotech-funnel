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

      <!-- Image strip -->
      <div class="phb-about__images" data-aos="fade-up" data-aos-delay="200">
        <div class="phb-about__img-card">
          <img src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Análisis de laboratorio" loading="lazy" />
        </div>
        <div class="phb-about__img-card phb-about__img-card--tall">
          <img src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Consulta médica" loading="lazy" />
        </div>
        <div class="phb-about__img-card">
          <img src="https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Especialista en regenerativa" loading="lazy" />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
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

.phb-about__images {
  display: grid;
  grid-template-columns: 1fr 1.3fr 1fr;
  gap: 3px;
  margin-top: clamp(60px, 8vw, 100px);
  height: 380px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    height: 280px;
  }
}

.phb-about__img-card {
  border-radius: 12px;
  overflow: hidden;
  overflow: hidden;
  background: var(--phb-surface);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }

  &:hover img { transform: scale(1.04); }

  &--tall {
    @media (max-width: 768px) { display: none; }
  }
}

@media (max-width: 900px) {
  .phb-about__grid { grid-template-columns: 1fr; }
}
</style>
