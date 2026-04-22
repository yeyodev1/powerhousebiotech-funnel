import { ref, computed } from 'vue'
import { es } from '@/i18n/es'
import { en } from '@/i18n/en'

type Locale = 'es' | 'en'

const locale = ref<Locale>(
  (localStorage.getItem('phb_locale') as Locale) || 'es'
)

const isTransitioning = ref(false)

export function useLocale() {
  const t = computed(() => locale.value === 'es' ? es : en)

  function setLocale(l: Locale) {
    locale.value = l
    localStorage.setItem('phb_locale', l)
  }

  function toggleLocale() {
    isTransitioning.value = true
    
    // Smooth transition delay
    setTimeout(() => {
      setLocale(locale.value === 'es' ? 'en' : 'es')
      
      // Wait for language content to swap before fading out
      setTimeout(() => {
        isTransitioning.value = false
      }, 300)
    }, 600)
  }

  return { locale, t, setLocale, toggleLocale, isTransitioning }
}
