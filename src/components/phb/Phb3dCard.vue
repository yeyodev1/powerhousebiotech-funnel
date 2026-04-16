<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  perspective: {
    type: Number,
    default: 1000
  }
})

const containerRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)
const rotateX = ref(0)
const rotateY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  if (!containerRef.value) return
  const { left, top, width, height } = containerRef.value.getBoundingClientRect()
  
  // Calculate relative position based on center
  const x = (e.clientX - left - width / 2) / 25
  const y = (e.clientY - top - height / 2) / 25
  
  // Update rotations. Note the inversion for realistic tilt
  rotateX.value = -y
  rotateY.value = x
}

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
  rotateX.value = 0
  rotateY.value = 0
}

const wrapperStyle = computed(() => ({
  perspective: `${props.perspective}px`
}))

const cardStyle = computed<import('vue').CSSProperties>(() => {
  if (isHovered.value) {
    return {
      transform: `rotateY(${rotateY.value}deg) rotateX(${rotateX.value}deg)`,
      transformStyle: 'preserve-3d'
    }
  }
  return {
    transform: 'rotateY(0deg) rotateX(0deg)',
    transformStyle: 'preserve-3d'
  }
})
</script>

<template>
  <div 
    class="phb-3d-wrapper"
    :style="wrapperStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousemove="handleMouseMove"
  >
    <div 
      class="phb-3d-container"
      ref="containerRef"
      :style="cardStyle"
    >
      <!-- We expose isHovered via slot props so animated children know when to translateZ -->
      <slot :isHovered="isHovered" />
    </div>
  </div>
</template>

<style scoped>
.phb-3d-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.phb-3d-container {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.2s ease-out;
  transform-style: preserve-3d;
}

/* Let children optionally use 3D transform */
:deep(.preserve-3d) {
  transform-style: preserve-3d;
}
</style>
