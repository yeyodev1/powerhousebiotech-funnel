<script setup lang="ts">
// No logic needed for this presentational component
</script>

<template>
  <div class="container header-container">
    <div class="system-header" data-aos="fade-up">
      <div class="phb-line-title">
        <span class="phb-line-title__line"></span>
        EL SISTEMA POWERHOUSE
      </div>
      <h2 class="title">Evaluación en 4 Dimensiones</h2>
      <p class="subtitle">Un protocolo diseñado para la máxima precisión biológica.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  z-index: 10;
}

.system-header {
  text-align: center;
  margin-bottom: 60px;

  .title {
    font-size: clamp(32px, 5vw, 64px);
    font-weight: 800;
    margin-bottom: 24px;
    color: #ffffff;
    letter-spacing: -0.04em;
  }

  .subtitle {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
  }

  .phb-line-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--phb-cyan, #21bcfa);
    margin-bottom: 24px;

    &__line {
      display: block;
      width: 32px;
      height: 1.5px;
      background: var(--phb-cyan, #21bcfa);
    }
  }
}
</style>
