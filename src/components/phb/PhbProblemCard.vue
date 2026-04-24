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
  background: #ffffff;
  border: 1px solid var(--phb-cyan, #21bcfa);
  padding: 3.5rem 2.5rem;
  border-radius: 32px;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  transform: translateY(-12px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(0);
    border-color: rgba(0, 0, 0, 0.05);
    background: #f8f9fa;
    box-shadow: none;

    .phb-problem-card__icon {
      transform: scale(1) rotate(0deg);
      color: rgba(0, 0, 0, 0.6);
    }
  }

  &__icon {
    font-size: 2.2rem;
    color: var(--phb-cyan, #21bcfa);
    transition: all 0.4s ease;
    width: fit-content;
    height: 3rem;
    display: flex;
    align-items: center;
    transform: scale(1.1) rotate(5deg);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  &__title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #1a1823;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  &__body {
    font-size: 1.15rem;
    color: rgba(0, 0, 0, 0.7);
    line-height: 1.6;
    font-weight: 300;
  }
}
</style>
