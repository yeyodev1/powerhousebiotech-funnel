<template>
  <section class="backed-section" id="backed-section">
    <div class="sha-container">

      <div class="backed-section__intro">
        <div>
          <div class="line-title line-title--animated line-title--light" :class="{ 'in-view': lineTitleVisible }" ref="lineTitle">
            Credibility
          </div>
          <div class="gap20"></div>
          <h2 class="backed-section__heading">Backed by Science<br><em>Trusted by Experts</em></h2>
        </div>
        <p class="backed-section__desc">
          The most influential voices in health and sports believe in our path to longevity.
        </p>
      </div>

      <div class="experts-grid" data-aos="fade-in">
        <div
          v-for="expert in experts"
          :key="expert.name"
          class="expert-card"
          :class="expert.modifier"
        >
          <img :src="expert.img" :alt="expert.name" loading="lazy" />
          <div v-if="expert.hasPlay" class="expert-card__play">&#9654;</div>
          <div class="expert-card__overlay">
            <div class="expert-card__name">{{ expert.name }}</div>
            <div class="expert-card__title">{{ expert.title }}</div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const lineTitle = ref<HTMLElement | null>(null)
const lineTitleVisible = ref(false)
let observer: IntersectionObserver | null = null

const experts = [
  {
    name: 'Lluis García Fraile',
    title: 'International Interior Designer',
    img: 'https://shawellness.com/wp-content/uploads/2025/10/expert-luis-garcia.jpg',
    modifier: 'expert-card--tall',
    hasPlay: true,
  },
  {
    name: 'Don Saladino',
    title: 'Trainer & Health Commentator',
    img: 'https://shawellness.com/wp-content/uploads/2025/10/expert-don-saladino.jpg',
    modifier: '',
    hasPlay: true,
  },
  {
    name: 'Beatriz Dullosa',
    title: 'Health Coach & Advisor for Olympic Athletes',
    img: 'https://shawellness.com/wp-content/uploads/2025/10/expert-beatriz-dullosa.jpg',
    modifier: '',
    hasPlay: false,
  },
  {
    name: 'Barbora Strýcová',
    title: 'Wimbledon Champion and Olympic Medalist',
    img: 'https://shawellness.com/wp-content/uploads/2025/10/expert-barbara-stryncova.jpg',
    modifier: '',
    hasPlay: false,
  },
  {
    name: 'Teddy Thomas',
    title: 'Professional Rugby Player',
    img: 'https://shawellness.com/wp-content/uploads/2025/10/expert-teddy-thomas.jpg',
    modifier: '',
    hasPlay: true,
  },
  {
    name: 'Pauline Ferrand-Prévot',
    title: 'World champion triathlete',
    img: 'https://shawellness.com/wp-content/uploads/2025/10/expert-pauline-ferrand.jpg',
    modifier: '',
    hasPlay: false,
  },
]

onMounted(() => {
  if (lineTitle.value && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          lineTitleVisible.value = true
          observer?.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(lineTitle.value)
  }
})

onUnmounted(() => observer?.disconnect())
</script>

<style lang="scss" scoped>
.backed-section {
  background: var(--sha-dark);
  color: var(--sha-white);
  padding: 160px 0;
  font-family: var(--sha-font);
}

.sha-container {
  width: 100%;
  max-width: var(--sha-container);
  margin: 0 auto;
  padding: 0 var(--sha-pad-x);
}

.gap20 { height: 20px; }

.backed-section__intro {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 100px;
  align-items: start;
}

.line-title {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  font-weight: var(--sha-fw-regular);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--sha-text-muted);

  &::before {
    content: '';
    display: block;
    width: 0;
    height: 1px;
    background: currentColor;
    transition: width 0.8s ease;
    flex-shrink: 0;
  }

  &.in-view::before { width: 40px; }
  &.line-title--light { color: rgba(255, 255, 255, 0.5); }
}

.backed-section__heading {
  font-size: clamp(1.5rem, 2.5vw, 2.5rem);
  font-weight: var(--sha-fw-light);
  line-height: 1.2;

  em { font-style: italic; }
}

.backed-section__desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
}

.experts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  margin-top: 60px;
}

.expert-card {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
  background: #222;
  cursor: pointer;

  &--tall { grid-row: span 2; }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(30%);
    transition: transform 0.4s, filter 0.4s;
  }

  &:hover img {
    transform: scale(1.04);
    filter: grayscale(0);
  }
}

.expert-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 60%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  color: var(--sha-white);
}

.expert-card__name {
  font-size: 14px;
  font-weight: var(--sha-fw-regular);
}

.expert-card__title {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 2px;
}

.expert-card__play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--sha-white);
  opacity: 0;
  transition: opacity 0.3s;

  .expert-card:hover & { opacity: 1; }
}

@media (max-width: 1024px) {
  .backed-section__intro { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .experts-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
