<template>
  <section class="sha-unique" id="sha-unique">
    <div class="sha-container">
      <div class="sha-unique__inner">

        <div>
          <div class="line-title line-title--animated" :class="{ 'in-view': lineTitleVisible }" ref="lineTitle">
            Our Difference
          </div>
          <div class="gap20"></div>
          <h2 class="sha-unique__heading">What makes<br><em>SHA unique</em></h2>
          <div class="gap20"></div>
          <p class="sha-unique__desc">
            SHA integrates everything proven to optimize health and performance into one seamless,
            science-driven method refined over nearly two decades. Through hyper-personalized programs,
            advanced diagnostics, and expert care, guests achieve measurable, lasting transformation in record time.
          </p>
        </div>

        <div class="sha-unique__stats" data-aos="fade-in">
          <div class="stat-item" v-for="stat in stats" :key="stat.number">
            <div class="stat-item__number">{{ stat.number }}</div>
            <p class="stat-item__desc">{{ stat.desc }}</p>
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

const stats = [
  { number: '+500', desc: 'Professionals and experts, backed by 20 years of pioneering work.' },
  { number: '+1,000', desc: 'Evidence-based treatments.' },
  { number: '+100,000', desc: 'Guests who have entrusted SHA with their health and longevity.' },
  { number: '+50', desc: 'Integrative Medical & Wellness Specialties.' },
  { number: '+100 🏆', desc: 'International awards recognizing excellence and innovation.' },
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
.sha-unique {
  background: var(--sha-beige);
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

.gap20 { height: 20px; }

.sha-unique__inner {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 100px;
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
}

.sha-unique__heading {
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  font-weight: var(--sha-fw-light);
  line-height: 1.3;
  margin-top: 20px;

  em { font-style: italic; }
}

.sha-unique__desc {
  font-size: 14px;
  color: var(--sha-text-muted);
  line-height: 1.7;
}

.sha-unique__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px 60px;
}

.stat-item__number {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: var(--sha-fw-light);
  letter-spacing: -0.02em;
  line-height: 1;
}

.stat-item__desc {
  font-size: 13px;
  color: var(--sha-text-muted);
  margin-top: 8px;
  line-height: 1.5;
  max-width: 200px;
}

@media (max-width: 1024px) {
  .sha-unique__inner { grid-template-columns: 1fr; }
}
</style>
