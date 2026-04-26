<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<template>
  <div class="benefits-header-wrapper">
    <div v-if="image" class="header-bg">
      <img :src="image" alt="Benefits Background" />
      <div class="overlay"></div>
    </div>
    
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
  margin-bottom: 40px;
  padding: 60px 0 30px;
  overflow: hidden;
  border-radius: 60px;
  margin: 0 40px 40px;

  @media (max-width: 768px) {
    margin: 0 20px 30px;
    padding: 40px 0 20px;
    border-radius: 30px;
  }
}

.header-bg {
  position: absolute;
  inset: 0;
  z-index: -1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.6) saturate(1.2);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      #05060f 0%,
      rgba(5, 6, 15, 0.4) 50%,
      #05060f 100%
    );
  }
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
  position: relative;
  z-index: 1;

  .title {
    font-size: clamp(32px, 6vw, 72px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.04em;
    color: #ffffff;
    text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }
}
</style>
