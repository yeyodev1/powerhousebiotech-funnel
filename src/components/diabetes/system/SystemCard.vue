<script setup lang="ts">
const props = defineProps({
  step: {
    type: Object as () => { title: string; description: string; icon: string },
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="step-card">
    <div class="step-num">ETAPA 0{{ index + 1 }}</div>
    <div class="step-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path :d="step.icon"></path>
      </svg>
    </div>
    <h3 class="step-title">{{ step.title }}</h3>
    <p class="step-desc">{{ step.description }}</p>
    
    <div class="step-bg-glow"></div>
  </div>
</template>

<style lang="scss" scoped>
.step-card {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 60px 48px;
  border-radius: 56px;
  position: relative;
  transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  display: flex;
  flex-direction: column;
  width: 450px;
  flex-shrink: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 300px;
    padding: 40px 30px;
    border-radius: 40px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: var(--phb-cyan, #21bcfa);
    transform: scale(1.02);

    .step-bg-glow {
      opacity: 0.1;
    }

    .step-icon {
      color: var(--phb-cyan, #21bcfa);
      background: rgba(33, 188, 251, 0.1);
    }
  }

  .step-num {
    font-size: 11px;
    font-weight: 900;
    color: var(--phb-cyan, #21bcfa);
    margin-bottom: 32px;
    letter-spacing: 0.3em;
    opacity: 0.6;
  }

  .step-icon {
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    color: rgba(255, 255, 255, 0.3);
    transition: all 0.5s ease;
  }

  .step-title {
    font-size: 28px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 24px;
    line-height: 1.1;
  }

  .step-desc {
    font-size: 17px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 300;
  }

  .step-bg-glow {
    position: absolute;
    top: -20%;
    right: -20%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, var(--phb-cyan, #21bcfa) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.6s ease;
    pointer-events: none;
  }
}
</style>
