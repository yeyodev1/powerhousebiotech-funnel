<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

const { isTransitioning } = useLocale()
</script>

<template>
  <Transition name="fade-overlay">
    <div v-if="isTransitioning" class="language-transition">
      <div class="language-transition__content">
        <div class="loader"></div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.language-transition {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--sha-dark, #090a11);
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
}

.loader {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Transition classes */
.fade-overlay-enter-active,
.fade-overlay-leave-active {
  transition: opacity 0.5s ease;
}

.fade-overlay-enter-from,
.fade-overlay-leave-to {
  opacity: 0;
}
</style>
