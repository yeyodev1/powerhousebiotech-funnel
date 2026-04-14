import { ref, computed } from 'vue'
import { es } from '@/i18n/es'
import { en } from '@/i18n/en'

type Locale = 'es' | 'en'

const locale = ref<Locale>(
  (localStorage.getItem('phb_locale') as Locale) || 'es'
)

export function useLocale() {
  const t = computed(() => locale.value === 'es' ? es : en)

  function setLocale(l: Locale) {
    locale.value = l
    localStorage.setItem('phb_locale', l)
  }

  function toggleLocale() {
    setLocale(locale.value === 'es' ? 'en' : 'es')
  }

  return { locale, t, setLocale, toggleLocale }
}
