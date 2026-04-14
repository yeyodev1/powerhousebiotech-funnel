<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()

const visible = ref(false)
const current = ref({ action: '' })

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function show() {
  current.value = { action: rand(t.value.toast.actions) }
  visible.value = true
  setTimeout(() => { visible.value = false }, 4500)
}

let interval: ReturnType<typeof setInterval>

onMounted(() => {
  const first = setTimeout(() => {
    show()
    interval = setInterval(() => {
      show()
    }, 10000)
  }, 10000)

  onUnmounted(() => {
    clearTimeout(first)
    clearInterval(interval)
  })
})
</script>

<template>
  <Transition name="toast">
    <div v-if="visible" class="sp-toast" role="status" aria-live="polite">
      <div class="sp-toast__avatar">
        <i class="fa-solid fa-user-check"></i>
      </div>
      <div class="sp-toast__body">
        <p class="sp-toast__action">{{ current.action }}</p>
      </div>
      <div class="sp-toast__dot"></div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as c;
@use '@/styles/fonts.modules.scss' as f;

.sp-toast {
  position: fixed;
  bottom: 1.8rem;
  left: 1.5rem;
  z-index: 1200;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.85rem 1.1rem;
  background: c.$PHB-SURFACE;
  border: 1px solid c.$PHB-BORDER;
  border-radius: 14px;
  box-shadow: c.$PHB-SHADOW-MD;
  max-width: 320px;
  pointer-events: none;

  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(18, 120, 243, 0.08);
    border: 1px solid rgba(18, 120, 243, 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    color: c.$PHB-PURPLE;
    font-size: 0.95rem;
    flex-shrink: 0;
  }

  &__body {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
  }

  &__action {
    font-family: f.$font-secondary;
    font-size: 0.85rem;
    font-weight: 600;
    color: c.$PHB-TEXT-1;
    margin: 0;
    line-height: 1.3;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: c.$PHB-TEAL;
    flex-shrink: 0;
    box-shadow: 0 0 0 3px rgba(0, 152, 128, 0.2);
    animation: pulse 2s infinite;
  }
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(0, 152, 128, 0.2); }
  50%       { box-shadow: 0 0 0 6px rgba(0, 152, 128, 0.08); }
}

.toast-enter-active { transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from  { opacity: 0; transform: translateY(16px) scale(0.95); }
.toast-leave-to    { opacity: 0; transform: translateX(-12px); }
</style>
