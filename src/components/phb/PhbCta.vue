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
  background-color: #05060f;
  background-image: radial-gradient(at 20% 20%, rgba(23, 24, 70, 0.8) 0%, transparent 80%),
                    radial-gradient(at 80% 15%, rgba(33, 188, 251, 0.15) 0%, transparent 65%),
                    radial-gradient(at 85% 85%, rgba(18, 120, 243, 0.15) 0%, transparent 70%),
                    radial-gradient(at 15% 85%, rgba(24, 231, 240, 0.12) 0%, transparent 70%);
  color: #ffffff;
  padding: clamp(100px, 15vw, 200px) 0;
  font-family: var(--phb-font, 'Inter', sans-serif);
  position: relative;
  overflow: hidden;
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
