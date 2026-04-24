<script setup lang="ts">
// Presentational component
</script>

<template>
  <div class="benefits-header-wrapper">
    <div class="container">
      <div class="benefits-header" data-aos="fade-up">
        <div class="phb-line-title">
          <span class="phb-line-title__line"></span>
          EL RESULTADO FINAL
        </div>
        <h2 class="title">No solo mejores niveles. <br />Una mejor vida.</h2>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.benefits-header-wrapper {
  position: relative;
  z-index: 10;
  margin-bottom: 60px;
}

.phb-line-title {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
  color: var(--phb-cyan, #21bcfa);

  &__line {
    width: 40px;
    height: 2px;
    background: var(--phb-cyan, #21bcfa);
  }
}

.benefits-header {
  text-align: center;
  .title {
    font-size: clamp(32px, 6vw, 72px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.04em;
    color: #ffffff;
  }
}
</style>
