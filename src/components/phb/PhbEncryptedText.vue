<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  revealDelayMs: {
    type: Number,
    default: 50
  },
  flipDelayMs: {
    type: Number,
    default: 50
  },
  charset: {
    type: String,
    default: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?"
  },
  encryptedClass: {
    type: String,
    default: 'text-neutral-500'
  },
  revealedClass: {
    type: String,
    default: ''
  }
})

const containerRef = ref<HTMLElement | null>(null)
const isInView = ref(false)
const revealCount = ref(0)
const scrambleChars = ref<string[]>([])

let animationFrameId: number | null = null
let startTime = 0
let lastFlipTime = 0

const generateRandomChar = () => {
  const index = Math.floor(Math.random() * props.charset.length)
  return props.charset.charAt(index)
}

const generateGibberish = (original: string) => {
  if (!original) return ''
  let result = ''
  for (let i = 0; i < original.length; i++) {
    result += original[i] === ' ' ? ' ' : generateRandomChar()
  }
  return result
}

const startAnimation = () => {
  // Cancel any existing loop
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }

  scrambleChars.value = generateGibberish(props.text).split('')
  startTime = performance.now()
  lastFlipTime = startTime
  revealCount.value = 0

  const update = (now: number) => {
    const elapsedMs = now - startTime
    const totalLength = props.text.length
    
    // Calculate how many letters to reveal based on time
    const currentRevealCount = Math.min(
      totalLength,
      Math.floor(elapsedMs / Math.max(1, props.revealDelayMs))
    )

    revealCount.value = currentRevealCount

    if (currentRevealCount >= totalLength) {
      return // Done!
    }

    // Flip unrevealed gibberish characters periodically
    const timeSinceLastFlip = now - lastFlipTime
    if (timeSinceLastFlip >= Math.max(0, props.flipDelayMs)) {
      for (let i = currentRevealCount; i < totalLength; i++) {
        if (props.text[i] !== ' ') {
          scrambleChars.value[i] = generateRandomChar()
        }
      }
      lastFlipTime = now
    }

    animationFrameId = requestAnimationFrame(update)
  }

  animationFrameId = requestAnimationFrame(update)
}

// Intersection Observer to trigger when visible
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (containerRef.value) {
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isInView.value) {
        isInView.value = true
        startAnimation()
        // Once triggered, optionally disconnect. But we can leave it if we want it to trigger only once.
        observer?.disconnect()
      }
    }, { threshold: 0.1 })
    
    observer.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
})

// Restart on text change if it's already in view
watch(() => props.text, () => {
  if (isInView.value) {
    startAnimation()
  }
})
</script>

<template>
  <span ref="containerRef" :aria-label="text" role="text" class="phb-encrypted-text">
    <template v-for="(char, index) in text.split('')" :key="index">
      <span 
        :class="index < revealCount ? revealedClass : encryptedClass"
      >
        <template v-if="index < revealCount">{{ char }}</template>
        <template v-else-if="char === ' '"> </template>
        <template v-else>{{ scrambleChars[index] || char }}</template>
      </span>
    </template>
  </span>
</template>

<style scoped>
.phb-encrypted-text {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
