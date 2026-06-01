<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { isLoaderActive } from '@/composables/useLoader'

const loaderRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)

function playEnterAnimation() {
  gsap.to(loaderRef.value, {
    yPercent: 0,
    duration: 0.8,
    ease: 'power3.inOut'
  })
  gsap.to(textRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    delay: 0.3,
    ease: 'power2.out'
  })
}

function playLeaveAnimation() {
  gsap.to(textRef.value, {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: 'power2.in'
  })
  gsap.to(loaderRef.value, {
    yPercent: -100,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.inOut'
  })
}

watch(isLoaderActive, (isActive) => {
  if (isActive) {
    playEnterAnimation()
  } else {
    playLeaveAnimation()
  }
})

onMounted(() => {
  if (isLoaderActive.value) {
    gsap.set(loaderRef.value, { yPercent: 0 })
    gsap.set(textRef.value, { opacity: 1, y: 0 })
    
    // Dismiss initial loader once window is fully loaded
    const dismiss = () => {
      setTimeout(() => {
        isLoaderActive.value = false
      }, 800)
    }

    if (document.readyState === 'complete') {
      dismiss()
    } else {
      window.addEventListener('load', dismiss)
    }
  } else {
    gsap.set(loaderRef.value, { yPercent: -100 })
  }
})
</script>

<template>
  <div class="juan-loader" ref="loaderRef">
    <div class="juan-loader__text" ref="textRef">
      JUAN ROMÁN GARZA
    </div>
  </div>
</template>

<style lang="scss" scoped>
.juan-loader {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: #05060f;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &__text {
    color: #ffffff;
    font-size: clamp(24px, 4vw, 48px);
    font-weight: 800;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
}
</style>
