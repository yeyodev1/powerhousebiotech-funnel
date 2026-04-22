<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js'

gsap.registerPlugin(ScrollTrigger)

import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()

const isVisible = ref(false)
const hasBeenShown = ref(false)
const isLoading = ref(false)
const formRef = ref<HTMLElement | null>(null)

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  countryCode: 'ES' as CountryCode
})

const errors = ref({
  email: '',
  phone: ''
})

// Detect country based on locale and timezone
const detectCountry = () => {
  try {
    const locale = navigator.language || (navigator.languages && navigator.languages[0])
    if (locale && locale.includes('-')) {
      const region = locale.split('-')[1].toUpperCase()
      if (region.length === 2) {
        formData.value.countryCode = region as CountryCode
        return
      }
    }

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    const tzMap: Record<string, CountryCode> = {
      'Europe/Madrid': 'ES',
      'America/Mexico_City': 'MX',
      'America/Bogota': 'CO',
      'America/Argentina/Buenos_Aires': 'AR',
      'America/Santiago': 'CL',
      'America/Lima': 'PE',
      'America/Caracas': 'VE',
      'America/Guayaquil': 'EC',
      'America/Panama': 'PA',
      'America/Costa_Rica': 'CR',
      'America/Guatemala': 'GT',
      'America/Asuncion': 'PY',
      'America/Montevideo': 'UY',
      'America/La_Paz': 'BO',
      'America/Santo_Dominigo': 'DO',
      'America/Puerto_Rico': 'PR',
      'America/El_Salvador': 'SV',
      'America/Tegucigalpa': 'HN',
      'America/Managua': 'NI',
      'America/New_York': 'US',
      'America/Chicago': 'US',
      'America/Denver': 'US',
      'America/Los_Angeles': 'US',
      'Europe/Paris': 'FR',
      'Europe/London': 'GB',
      'Europe/Rome': 'IT'
    }

    for (const [key, value] of Object.entries(tzMap)) {
      if (tz.includes(key)) {
        formData.value.countryCode = value
        return
      }
    }
  } catch (e) {
    console.error('Country detection failed', e)
  }
}

const validatePhone = () => {
  const phoneNumber = parsePhoneNumberFromString(formData.value.phone, formData.value.countryCode)
  if (!phoneNumber || !phoneNumber.isValid()) {
    errors.value.phone = t.value.popup.errorPhone
    return false
  }
  errors.value.phone = ''
  formData.value.phone = phoneNumber.formatInternational()
  return true
}

const showPopup = () => {
  if (hasBeenShown.value) return
  
  isVisible.value = true
  hasBeenShown.value = true
  // localStorage.setItem('phb_popup_shown', 'true') // Disabled for testing
  
  setTimeout(() => {
    gsap.fromTo('.phb-popup__card', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
  }, 10)
}

const handleExitIntent = (e: MouseEvent) => {
  if (e.clientY <= 10 && !hasBeenShown.value) {
    showPopup()
  }
}

const closePopup = () => {
  gsap.to('.phb-popup__card', {
    y: 50,
    opacity: 0,
    duration: 0.4,
    ease: 'power2.in',
    onComplete: () => {
      isVisible.value = false
    }
  })
}

const handleSubmit = async () => {
  if (!validatePhone()) return
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  isLoading.value = false
  closePopup()
}

onMounted(() => {
  detectCountry()
  
  // Trigger by Scroll Percentage (15%)
  ScrollTrigger.create({
    trigger: 'body',
    start: '15% top',
    onEnter: () => showPopup()
  })

  // Trigger by Exit Intent
  document.addEventListener('mouseleave', handleExitIntent)
})

onUnmounted(() => {
  document.removeEventListener('mouseleave', handleExitIntent)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="phb-popup">
      <div class="phb-popup__overlay" @click="closePopup"></div>
      
      <div class="phb-popup__card" ref="formRef">
        <button class="phb-popup__close" @click="closePopup">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="phb-popup__header">
          <div class="phb-popup__icon">
            <i class="fa-solid fa-dna"></i>
          </div>
          <h2 class="phb-popup__title">{{ t.popup.title }}</h2>
          <p class="phb-popup__subtitle">{{ t.popup.subtitle }}</p>
        </div>

        <form @submit.prevent="handleSubmit" class="phb-popup__form">
          <div class="phb-popup__row">
            <div class="phb-popup__field">
              <label>{{ t.popup.firstName }}</label>
              <input v-model="formData.firstName" type="text" placeholder="Ej. Juan" required />
            </div>
            <div class="phb-popup__field">
              <label>{{ t.popup.lastName }}</label>
              <input v-model="formData.lastName" type="text" placeholder="Ej. Pérez" required />
            </div>
          </div>

          <div class="phb-popup__field">
            <label>{{ t.popup.email }}</label>
            <input v-model="formData.email" type="email" placeholder="juan.perez@ejemplo.com" required />
          </div>

          <div class="phb-popup__field">
            <label>{{ t.popup.phone }}</label>
            <div class="phb-popup__phone-input">
              <select v-model="formData.countryCode" class="phb-popup__country-select">
                <option value="AR">🇦🇷 +54</option>
                <option value="BO">🇧🇴 +591</option>
                <option value="CL">🇨🇱 +56</option>
                <option value="CO">🇨🇴 +57</option>
                <option value="CR">🇨🇷 +506</option>
                <option value="DO">🇩🇴 +1</option>
                <option value="EC">🇪🇨 +593</option>
                <option value="ES">🇪🇸 +34</option>
                <option value="GT">🇬🇹 +502</option>
                <option value="HN">🇭🇳 +504</option>
                <option value="MX">🇲🇽 +52</option>
                <option value="NI">🇳🇮 +505</option>
                <option value="PA">🇵🇦 +507</option>
                <option value="PE">🇵🇪 +51</option>
                <option value="PR">🇵🇷 +1</option>
                <option value="PY">🇵🇾 +595</option>
                <option value="SV">🇸🇻 +503</option>
                <option value="US">🇺🇸 +1</option>
                <option value="UY">🇺🇾 +598</option>
                <option value="VE">🇻🇪 +58</option>
              </select>
              <input 
                v-model="formData.phone" 
                type="tel" 
                :placeholder="t.popup.phone" 
                @blur="validatePhone"
                required 
              />
            </div>
            <span v-if="errors.phone" class="phb-popup__error">{{ errors.phone }}</span>
          </div>

          <button type="submit" class="phb-popup__submit" :disabled="isLoading">
            <span v-if="!isLoading">{{ t.popup.submit }}</span>
            <span v-else class="phb-popup__loader"></span>
          </button>

          <p class="phb-popup__privacy">
            <i class="fa-solid fa-lock"></i>
            {{ t.popup.privacy }}
          </p>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.phb-popup {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 57, 173, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  &__card {
    position: relative;
    width: 100%;
    max-width: 500px;
    background: #ffffff;
    border-radius: 12px;
    padding: 2.5rem;
    box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.3);
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #0039ad, #21bcfa);
    }
  }

  &__close {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    background: none;
    border: none;
    font-size: 1.25rem;
    color: #0039ad;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }

  &__header {
    text-align: center;
    margin-bottom: 2rem;
  }

  &__icon {
    font-size: 2.5rem;
    color: #0039ad;
    margin-bottom: 1rem;
    animation: pulse 2s infinite ease-in-out;
  }

  &__title {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 1.75rem;
    font-weight: 600;
    color: #0039ad;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  &__subtitle {
    font-size: 0.95rem;
    color: #666;
    line-height: 1.5;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #0039ad;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    input {
      padding: 0.8rem 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 1rem;
      transition: all 0.2s;

      &:focus {
        outline: none;
        border-color: #0039ad;
        box-shadow: 0 0 0 3px rgba(0, 57, 173, 0.1);
      }
    }
  }

  &__phone-input {
    display: flex;
    gap: 0.5rem;

    input {
      flex: 1;
    }
  }

  &__country-select {
    padding: 0.8rem 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: #f8fafc;
    font-size: 0.9rem;
    cursor: pointer;
  }

  &__error {
    font-size: 0.75rem;
    color: #ef4444;
    font-weight: 500;
  }

  &__submit {
    margin-top: 0.5rem;
    padding: 1rem;
    background: #0039ad;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover:not(:disabled) {
      background: #002d8a;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 57, 173, 0.2);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  &__loader {
    width: 20px;
    height: 20px;
    border: 2px solid #ffffff;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  &__privacy {
    text-align: center;
    font-size: 0.75rem;
    color: #94a3b8;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
}
</style>
