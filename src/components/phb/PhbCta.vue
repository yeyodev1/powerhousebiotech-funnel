<script setup lang="ts">
import PhbCtaCopy from './PhbCtaCopy.vue'
import PhbCtaCard from './PhbCtaCard.vue'
</script>

<template>
  <section class="phb-cta" id="cta">
    <div class="phb-container">
      <div class="phb-cta__inner">
        <PhbCtaCopy />
        <PhbCtaCard />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.phb-cta {
  background-color: #ffffff;
  color: #1a1823;
  padding: clamp(100px, 15vw, 200px) 0;
  font-family: var(--phb-font, 'Inter', sans-serif);
  position: relative;
  z-index: 1;
}

.phb-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(20px, 8vw, 120px);
}

.phb-cta__inner {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: clamp(60px, 10vw, 160px);
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 80px;
  }
}
</style>
