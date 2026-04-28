<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const currentMessage = ref('')
let intervalId: ReturnType<typeof setInterval> | null = null
let timeoutId: ReturnType<typeof setTimeout> | null = null

const messages = [
  "Alguien en Ciudad de México acaba de agendar su Evaluación (EVR™).",
  "Un paciente en Monterrey calificó para el programa regenerativo.",
  "Nuevo caso aprobado para evaluación médica en Guadalajara.",
  "Una persona en Querétaro inició su protocolo de exosomas.",
  "Alguien en Puebla está descubriendo su potencial celular.",
  "Un paciente en Mérida acaba de reservar su cupo para evaluación.",
  "Nuevo registro para tratamiento regenerativo en Tijuana.",
  "Alguien en Polanco ha comenzado su valoración clínica."
]

const showToast = () => {
  // If already visible, don't overlap
  if (isVisible.value) return

  // Pick a random message
  const randomIndex = Math.floor(Math.random() * messages.length)
  currentMessage.value = messages[randomIndex]
  
  isVisible.value = true

  // Hide after 6 seconds
  timeoutId = setTimeout(() => {
    isVisible.value = false
  }, 6000)
}

onMounted(() => {
  // Show the very first one after 5 seconds to not make the user wait 13s initially
  timeoutId = setTimeout(() => {
    showToast()
    
    // Then start the strict 13s interval
    intervalId = setInterval(() => {
      showToast()
    }, 13000)
  }, 5000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<template>
  <Transition name="toast">
    <div v-if="isVisible" class="phb-toast">
      <div class="phb-toast__icon">
        <div class="phb-toast__dot"></div>
      </div>
      <div class="phb-toast__content">
        <p class="phb-toast__text">{{ currentMessage }}</p>
        <span class="phb-toast__time">Hace un momento</span>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.phb-toast {
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 99999; /* Ensure it's above everything */
  
  display: flex;
  align-items: center;
  gap: 16px;
  
  background: rgba(5, 6, 15, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 16px 20px;
  max-width: 320px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(33, 188, 250, 0.1);
  
  &__icon {
    width: 36px;
    height: 36px;
    background: rgba(33, 188, 250, 0.15);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
  
  &__dot {
    width: 10px;
    height: 10px;
    background: var(--phb-cyan, #21bcfa);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--phb-cyan, #21bcfa);
    animation: pulse 2s infinite ease-in-out;
  }
  
  &__content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  &__text {
    margin: 0;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.4;
    color: #ffffff;
    font-family: var(--phb-font, 'IBM Plex Sans', sans-serif);
  }
  
  &__time {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
    font-family: var(--phb-font, 'IBM Plex Sans', sans-serif);
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
}

/* Animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

@media (max-width: 768px) {
  .phb-toast {
    bottom: 20px;
    left: 20px;
    right: 20px;
    max-width: calc(100vw - 40px);
    width: auto;
  }
}
</style>
