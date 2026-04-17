<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div 
    class="phb-problem-card" 
    data-aos="fade-up" 
    :data-aos-delay="index * 150"
  >
    <div class="phb-problem-card__icon">
      <i :class="icon"></i>
    </div>
    <div class="phb-problem-card__content">
      <h3 class="phb-problem-card__title">{{ title }}</h3>
      <p class="phb-problem-card__body">{{ body }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.phb-problem-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 3.5rem 2.5rem;
  border-radius: 32px;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;

  &:hover {
    transform: translateY(-12px);
    border-color: var(--phb-cyan, #21bcfa);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);

    .phb-problem-card__icon {
      transform: scale(1.1) rotate(5deg);
      color: var(--phb-cyan, #21bcfa);
    }
  }

  &__icon {
    font-size: 2.2rem;
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.4s ease;
    width: fit-content;
    height: 3rem;
    display: flex;
    align-items: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  &__title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  &__body {
    font-size: 1.15rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.6;
    font-weight: 300;
  }
}
</style>
