<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps({
  text: {
    type: String,
    default: 'Quiero evaluar mi caso'
  },
  theme: {
    type: String,
    default: 'dark' // 'dark' = for dark backgrounds (white button), 'light' = for light backgrounds (black button)
  }
})

const router = useRouter()
const goToQualify = () => {
  router.push('/cualificar')
}
</script>

<template>
  <button 
    type="button" 
    class="phb-btn-primary" 
    :class="`phb-btn-primary--${theme}`"
    @click="goToQualify"
  >
    <span class="btn-text">{{ text }}</span>
    <span class="btn-icon">→</span>
  </button>
</template>

<style lang="scss" scoped>
.phb-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 18px 40px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: none;
  text-decoration: none;

  /* For dark backgrounds (button is white, turns blue) */
  &--dark {
    background: #ffffff;
    color: #05060f;
    box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);

    &:hover {
      background: var(--phb-blue, #1278f3);
      color: #ffffff;
      transform: translateY(-8px);
      box-shadow: 0 30px 60px rgba(18, 120, 243, 0.4);
    }
  }

  /* For light backgrounds (button is dark, turns blue) */
  &--light {
    background: #05060f;
    color: #ffffff;
    box-shadow: 0 20px 40px rgba(5, 6, 15, 0.15);

    &:hover {
      background: var(--phb-blue, #1278f3);
      color: #ffffff;
      transform: translateY(-8px);
      box-shadow: 0 30px 60px rgba(18, 120, 243, 0.4);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 16px 20px;
    font-size: 15px;
  }
}
</style>
