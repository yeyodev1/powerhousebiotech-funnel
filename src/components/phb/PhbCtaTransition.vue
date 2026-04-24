<script setup lang="ts">
// Transition component between Cases and CTA
</script>

<template>
  <div class="phb-cta-transition">
    <div class="phb-cta-transition__visual">
      <img src="@/assets/stock/imagen-mujer.jpeg" alt="Transition Visual" class="phb-cta-transition__img" />
      <div class="phb-cta-transition__overlay"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.phb-cta-transition {
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 400px;
  max-height: 700px;
  background-color: #ffffff;
  overflow: hidden;
  z-index: 1;

  &__visual {
    width: 100%;
    height: 100%;
    position: relative;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
    display: block;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 15%,
      rgba(255, 255, 255, 0) 85%,
      #ffffff 100%
    );
  }
}

@media (max-width: 768px) {
  .phb-cta-transition {
    height: 40vh;
  }
}
</style>
