import { ref } from 'vue'

export const isLoaderActive = ref(true) // Inicia en true para cargar la primera vez

export function showLoader(): Promise<void> {
  isLoaderActive.value = true
  return new Promise((resolve) => {
    // Le damos a GSAP 800ms para bajar la cortina antes de permitir que la ruta cambie
    setTimeout(() => {
      resolve()
    }, 800)
  })
}

export function hideLoader() {
  // Se llama después de montar la nueva vista
  isLoaderActive.value = false
}
