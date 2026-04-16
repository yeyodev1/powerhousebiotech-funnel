<template>
  <section class="kpi-section" id="kpi-section">
    <div class="kpi-section__zone-2">
      <div class="sha-container">
        <div class="line-title line-title--animated line-title--light" ref="lineTitle1">
          What To Expect From a SHA Program
        </div>
        <div class="gap16"></div>
        <p class="kpi-section__subtitle">
          Measurable, science-based improvements within days.
        </p>
        <div class="gap80"></div>
        <div class="kpi-grid" data-aos="fade-in" data-aos-delay="200">
          <div class="kpi-item">
            <div class="kpi-item__number">30%</div>
            <p class="kpi-item__desc">Reduction in key inflammation markers.</p>
          </div>
          <div class="kpi-item">
            <div class="kpi-item__number">35%</div>
            <p class="kpi-item__desc">Improvement in sleep quality.</p>
          </div>
          <div class="kpi-item">
            <div class="kpi-item__number">40%</div>
            <p class="kpi-item__desc">Boost in energy and cognitive performance.</p>
          </div>
          <div class="kpi-item">
            <div class="kpi-item__number">70%</div>
            <p class="kpi-item__desc">Guests sustain healthy lifestyle habits three months after leaving SHA.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="kpi-section__zone-4">
      <div class="sha-container">
        <div class="hero-sources" data-aos="fade-in" data-aos-delay="400">
          <p class="title-m">
            <span class="title-m--regular">10 YEARS YOUNGER.</span><br>
            That's how guests often describe their vitality and focus.
          </p>
        </div>
        <div class="gap60"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.kpi-section {
  background: var(--sha-dark);
  color: var(--sha-white);
  font-family: var(--sha-font);
}

.sha-container {
  width: 100%;
  max-width: var(--sha-container);
  margin: 0 auto;
  padding: 0 var(--sha-pad-x);
}

.kpi-section__zone-2 {
  padding: 160px 0 60px;
}

.kpi-section__subtitle {
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  color: rgba(255, 255, 255, 0.55);
  margin-top: 12px;
  font-weight: var(--sha-fw-light);
}

.gap16 { height: 16px; }
.gap80 { height: 80px; }
.gap60 { height: 60px; }

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 100px;
  margin-top: 60px;
  max-width: 700px;
}

.kpi-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.kpi-item__number {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: var(--sha-fw-light);
  line-height: 1;
  letter-spacing: -0.02em;
}

.kpi-item__desc {
  font-size: 13px;
  font-weight: var(--sha-fw-light);
  color: rgba(255, 255, 255, 0.6);
  max-width: 200px;
  line-height: 1.4;
}

.kpi-section__zone-4 {
  padding: 60px 0 160px;
}

.hero-sources { max-width: 700px; }

.title-m {
  font-size: clamp(0.85rem, 1.1vw, 1rem);
  font-weight: var(--sha-fw-light);
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.5;
  letter-spacing: 0.02em;
}

.title-m--regular {
  color: rgba(255, 255, 255, 0.85);
  font-weight: var(--sha-fw-regular);
}

/* line-title */
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

@media (max-width: 1024px) {
  .kpi-grid { grid-template-columns: 1fr 1fr; }
}
</style>
