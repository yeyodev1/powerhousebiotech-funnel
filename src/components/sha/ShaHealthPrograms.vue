<template>
  <section class="health-programs" id="health-programs">
    <div class="sha-container">
      <div class="line-title line-title--animated line-title--light" :class="{ 'in-view': lineTitleVisible }" ref="lineTitle">
        Our Programs
      </div>
      <div class="gap20"></div>
      <h2 class="health-programs__heading"><em>HEALTH</em> PROGRAMS</h2>
      <p class="health-programs__sub">
        Programs grounded in scientific and medical evidence for a measurable health transformation.
      </p>

      <div class="programs-tabs" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="program-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="programs-grid" data-aos="fade-in" data-aos-delay="100">
        <div
          v-for="program in filteredPrograms"
          :key="program.title"
          class="program-card"
        >
          <div>
            <div class="program-card__label">{{ program.label }}</div>
            <div class="program-card__arrow">&#8599;</div>
            <svg class="program-card__icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5" v-html="program.iconPath"></svg>
            <h3 class="program-card__title" v-html="program.title"></h3>
            <p class="program-card__desc">{{ program.desc }}</p>
          </div>
          <div class="program-card__quote" v-html="program.quote"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const lineTitle = ref<HTMLElement | null>(null)
const lineTitleVisible = ref(false)
let observer: IntersectionObserver | null = null

const activeTab = ref('all')

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'signature', label: 'Signature' },
  { id: 'personalized', label: 'Personalized' },
  { id: 'flexible', label: 'Flexible' },
]

const programs = [
  {
    category: 'signature',
    label: '+ Balance · Energy',
    iconPath: '<circle cx="20" cy="20" r="14"/><path d="M20 10v20M10 20h20"/>',
    title: 'REBALANCE<br>&amp; ENERGIZE',
    desc: 'Recover your balance and restore vitality. Reduce stress load, optimize energy, and improve emotional wellbeing.',
    quote: '"Within a few days at SHA, I felt lighter, calmer, and with a clarity I hadn\'t had in years."<br><em>— David, USA · TripAdvisor, SHA Mexico</em>',
  },
  {
    category: 'signature',
    label: '+ Focus · Recovery',
    iconPath: '<path d="M20 8 L34 34 H6 Z"/>',
    title: 'LEADERSHIP<br>&amp; PERFORMANCE',
    desc: 'Optimize performance and sustain it under high-demand life and work conditions.',
    quote: '"In just one week I felt the program truly delivered."<br><em>— Brian · TripAdvisor</em>',
  },
  {
    category: 'personalized',
    label: '+ Longevity',
    iconPath: '<rect x="6" y="6" width="28" height="28" rx="3"/><path d="M20 13v14M13 20h14"/>',
    title: 'LONGEVITY<br>ASSESSMENT',
    desc: 'A comprehensive 360° analysis of your biological age, health markers, and genetic predispositions.',
    quote: '"The most thorough health assessment I\'ve ever experienced."<br><em>— Sophie, UK · Google Reviews</em>',
  },
  {
    category: 'flexible',
    label: '+ Detox',
    iconPath: '<circle cx="20" cy="20" r="13"/><path d="M14 20 Q20 10 26 20 Q20 30 14 20Z"/>',
    title: 'DETOX &amp;<br>CLEANSE',
    desc: 'Eliminate accumulated toxins, reset your digestive system, and restore your body\'s natural equilibrium.',
    quote: '"I left feeling completely renewed, inside and out."<br><em>— Maria, Spain · TripAdvisor</em>',
  },
]

const filteredPrograms = computed(() =>
  activeTab.value === 'all'
    ? programs
    : programs.filter((p) => p.category === activeTab.value)
)

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
.health-programs {
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

.health-programs__heading {
  font-size: clamp(3rem, 7vw, 8rem);
  font-weight: var(--sha-fw-bold);
  letter-spacing: -0.02em;
  line-height: 0.95;

  em { font-style: italic; font-weight: var(--sha-fw-bold); }
}

.health-programs__sub {
  font-size: clamp(0.9rem, 1.2vw, 1.05rem);
  font-weight: var(--sha-fw-light);
  color: rgba(255, 255, 255, 0.55);
  margin-top: 16px;
  max-width: 500px;
  line-height: 1.6;
}

.programs-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 32px;
}

.program-tab {
  padding: 8px 20px;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: none;
  color: rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  cursor: pointer;
  font-family: var(--sha-font);
  transition: all 0.2s;

  &.active,
  &:hover {
    border-color: rgba(255, 255, 255, 0.8);
    color: var(--sha-white);
  }
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2px;
  margin-top: 32px;
}

.program-card {
  position: relative;
  background: var(--sha-mauve);
  padding: 32px 28px;
  min-height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  cursor: pointer;

  &:nth-child(2n) { background: #b8a8a8; }
  &:nth-child(3n) { background: #c8b0b0; }
  &:nth-child(4n) { background: #bfb0c0; }
}

.program-card__label {
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(30, 20, 30, 0.5);
  display: flex;
  align-items: center;
  gap: 8px;
}

.program-card__icon {
  width: 40px;
  height: 40px;
  margin: 60px 0 16px;
  opacity: 0.4;
}

.program-card__title {
  font-size: clamp(1.6rem, 2.5vw, 2.2rem);
  font-weight: var(--sha-fw-bold);
  line-height: 1.05;
  color: var(--sha-text-dark);
  text-transform: uppercase;
}

.program-card__desc {
  font-size: 13px;
  color: rgba(30, 20, 30, 0.65);
  line-height: 1.6;
  margin-top: 12px;
}

.program-card__quote {
  font-size: 12px;
  font-style: italic;
  color: rgba(30, 20, 30, 0.5);
  border-top: 1px solid rgba(30, 20, 30, 0.1);
  padding-top: 16px;
  margin-top: 16px;
  line-height: 1.5;
}

.program-card__arrow {
  position: absolute;
  top: 28px;
  right: 28px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(30, 20, 30, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: rgba(30, 20, 30, 0.5);
}

@media (max-width: 768px) {
  .programs-grid { grid-template-columns: 1fr; }
}
</style>
