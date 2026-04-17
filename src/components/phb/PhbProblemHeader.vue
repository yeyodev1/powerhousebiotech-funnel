<script setup lang="ts">
const props = defineProps({
  lineTitle: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  sub: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="phb-problem-header" data-aos="fade-up">
    <div class="phb-line-title">
      <span class="phb-line-title__line"></span>
      {{ lineTitle }}
    </div>
    <h2 class="phb-problem-header__title" v-html="title"></h2>
    <p class="phb-problem-header__sub">{{ sub }}</p>
  </div>
</template>

<style lang="scss" scoped>
.phb-line-title {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--phb-cyan, #21bcfa);
  margin-bottom: 40px;
}

.phb-line-title__line {
  display: block;
  width: 50px;
  height: 1.5px;
  background: var(--phb-cyan, #21bcfa);
  flex-shrink: 0;
}

.phb-problem-header {
  max-width: 900px;
  margin-bottom: 5rem;

  &__title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
    color: #fff;
    margin-bottom: 2rem;
    text-transform: uppercase;

    :deep(em) {
      font-style: italic;
      font-weight: 300;
      opacity: 0.7;
    }
  }

  &__sub {
    font-size: clamp(1.1rem, 1.8vw, 1.4rem);
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    font-weight: 300;
  }
}
</style>
