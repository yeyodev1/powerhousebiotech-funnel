<template>
  <section class="media-section" id="media-section">
    <div class="sha-container">
      <h2 class="media-section__heading" data-aos="fade-in">
        DON'T TAKE OUR WORD FOR IT<br>LOOK AT THE PROOF
      </h2>

      <div class="media-logos">
        <div
          v-for="(item, i) in mediaItems"
          :key="item.name"
          data-aos="fade-in"
          :data-aos-delay="i * 100"
        >
          <div class="media-logo__name" :style="item.style">{{ item.name }}</div>
          <p class="media-logo__quote">{{ item.quote }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const mediaItems = [
  {
    name: "Men's Health",
    style: '',
    quote: '"One of the most transformative experiences in health optimization."',
  },
  {
    name: 'VOGUE',
    style: '',
    quote: '"I tested Mexico\'s most innovative new wellness destination — a new temple of mental and physical well-being set along the turquoise waters of the Caribbean." — Jade Simon',
  },
  {
    name: 'Financial Times',
    style: '',
    quote: '"The world-leading health and wellness resort."',
  },
  {
    name: 'VANITY FAIR',
    style: 'font-size: 1.2rem',
    quote: '"Just a few days there are enough to slow down aging and restore exceptional health. SHA is the world\'s most sought-after wellness destination."',
  },
]
</script>

<style lang="scss" scoped>
.media-section {
  background: var(--sha-light);
  color: var(--sha-text-dark);
  padding: 160px 0;
  font-family: var(--sha-font);
}

.sha-container {
  width: 100%;
  max-width: var(--sha-container);
  margin: 0 auto;
  padding: 0 var(--sha-pad-x);
}

.media-section__heading {
  font-size: clamp(2.8rem, 6vw, 7rem);
  font-weight: var(--sha-fw-light);
  line-height: 1.05;
  letter-spacing: -0.01em;
  color: var(--sha-text-dark);
  max-width: 700px;
}

.media-logos {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 60px;
  align-items: start;
  margin-top: 60px;
}

.media-logo__name {
  font-size: clamp(1.3rem, 2vw, 1.8rem);
  font-weight: var(--sha-fw-bold);
  letter-spacing: 0.05em;
  font-style: italic;
}

.media-logo__quote {
  font-size: 13px;
  color: var(--sha-text-muted);
  line-height: 1.6;
  margin-top: 16px;
}

@media (max-width: 1024px) {
  .media-logos { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .media-logos { grid-template-columns: 1fr; }
}
</style>
