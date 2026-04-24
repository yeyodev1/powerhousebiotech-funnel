<script setup lang="ts">
const props = defineProps({
  benefit: {
    type: Object as () => { title: string; desc: string; icon: string; image: string },
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="benefit-card-premium">
    <div class="card-visual">
      <img :src="benefit.image" :alt="benefit.title" />
      <div class="icon-floating">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path :d="benefit.icon"></path>
        </svg>
      </div>
    </div>
    
    <div class="card-body">
      <span class="benefit-number">0{{ index + 1 }}</span>
      <h3 class="benefit-title">{{ benefit.title }}</h3>
      <p class="benefit-desc">{{ benefit.desc }}</p>
      
      <div class="card-link">
        Evolución Biológica
        <span class="dot"></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.benefit-card-premium {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 48px;
  overflow: hidden;
  height: 100%;
  transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  display: flex;
  flex-direction: column;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: var(--phb-cyan, #21bcfa);
    transform: translateY(-20px);

    .card-visual img {
      transform: scale(1.1);
    }
  }

  .card-visual {
    height: 300px;
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 1s ease;
    }

    .icon-floating {
      position: absolute;
      bottom: 24px;
      right: 24px;
      width: 64px;
      height: 64px;
      background: var(--phb-cyan, #21bcfa);
      color: #05060f;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 20px 40px rgba(33, 188, 251, 0.3);
    }
  }

  .card-body {
    padding: 48px;

    .benefit-number {
      display: block;
      font-size: 14px;
      font-weight: 900;
      color: var(--phb-cyan, #21bcfa);
      margin-bottom: 24px;
      letter-spacing: 0.2em;
      opacity: 0.6;
    }

    .benefit-title {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 20px;
      line-height: 1.1;
      color: #ffffff;
    }

    .benefit-desc {
      font-size: 17px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.5);
      font-weight: 300;
      margin-bottom: 40px;
    }

    .card-link {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.3);
      display: flex;
      align-items: center;
      gap: 12px;

      .dot {
        width: 6px;
        height: 6px;
        background: var(--phb-cyan, #21bcfa);
        border-radius: 50%;
      }
    }
  }
}
</style>
