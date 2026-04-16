import { onMounted, onUnmounted, type Ref } from 'vue'

export function useOutsideClick(
  ref: Ref<HTMLElement | null>,
  callback: (event: MouseEvent | TouchEvent) => void
) {
  const listener = (event: MouseEvent | TouchEvent) => {
    // DO NOTHING if the element being clicked is the target element or their children
    if (!ref.value || !event.target || ref.value.contains(event.target as Node)) {
      return
    }
    callback(event)
  }

  onMounted(() => {
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', listener)
    document.removeEventListener('touchstart', listener)
  })
}

// Minimal correction for the logic: ref.value instead of ref.current (React style)
