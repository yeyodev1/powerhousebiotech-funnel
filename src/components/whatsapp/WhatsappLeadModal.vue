<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js'
import { useLocale } from '@/composables/useLocale'
import { useContactStore } from '@/stores/contact'
import { sendContactToGHL } from '@/services/ghl'

const emit = defineEmits(['close'])

const { locale, t } = useLocale()
const contactStore = useContactStore()

const isLoading = ref(false)
const whatsappLink = 'https://chat.whatsapp.com/FRDRGGu2RP433j36MK8xrg'

// Default forzado MX (CSP del dominio bloquea fetch externo, no se puede leer IP).
// EC se excluye por requerimiento del producto: nunca caer en Ecuador.
function detectCountryLocal(): CountryCode {
  console.log('[WhatsappLeadModal] default forzado → MX (CSP bloquea IP lookup)')
  return 'MX'
}

const formData = ref({
  fullName: '',
  email: '',
  phone: '',
  countryCode: detectCountryLocal()
})

const errors = ref({
  phone: ''
})

// Localized modal labels fallback if not present in main i18n
const modalLabels = {
  es: {
    title: 'Únete a la Comunidad',
    sub: 'Completa tus datos para recibir el enlace de acceso directo al canal de WhatsApp.',
    nameLabel: 'Nombre completo',
    namePlaceholder: 'Ej. Juan Pérez',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'tu@email.com',
    phoneLabel: 'Celular',
    submit: 'Acceder a la comunidad',
    submitting: 'Redirigiendo...',
    disclaimer: 'Tus datos están protegidos por protocolos de confidencialidad.',
    errorPhone: 'Número de WhatsApp inválido'
  },
  en: {
    title: 'Join the Community',
    sub: 'Enter your details to receive the direct access link to the WhatsApp channel.',
    nameLabel: 'Full name',
    namePlaceholder: 'e.g. John Doe',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@email.com',
    phoneLabel: 'Mobile',
    submit: 'Access the community',
    submitting: 'Redirecting...',
    disclaimer: 'Your data is protected by confidentiality protocols.',
    errorPhone: 'Invalid WhatsApp number'
  }
}

const activeLabels = ref(locale.value === 'en' ? modalLabels.en : modalLabels.es)

// Keep labels in sync with locale changes
onMounted(() => {
  activeLabels.value = locale.value === 'en' ? modalLabels.en : modalLabels.es
  formData.value.countryCode = detectCountryLocal()
  console.log('[WhatsappLeadModal] initial countryCode:', formData.value.countryCode)
  document.body.style.overflow = 'hidden'
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    close()
  }
}

const validatePhone = () => {
  const phoneNumber = parsePhoneNumberFromString(formData.value.phone, formData.value.countryCode)
  if (!phoneNumber || !phoneNumber.isValid()) {
    errors.value.phone = activeLabels.value.errorPhone
    return false
  }
  errors.value.phone = ''
  formData.value.phone = phoneNumber.formatInternational()
  return true
}

const handleSubmit = async () => {
  if (!validatePhone()) return
  isLoading.value = true

  const nameParts = formData.value.fullName.trim().split(' ')
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ') || ''

  // Sync with GoHighLevel CRM
  await sendContactToGHL({
    nombre: firstName,
    apellido: lastName,
    email: formData.value.email.trim(),
    telefono: formData.value.phone.trim(),
    source: 'Comunidad WhatsApp',
    nota: 'Lead registrado para unirse a la comunidad de WhatsApp de PowerHouse Biotech.',
    paso: 'whatsapp-community-optin',
  })

  // Save to Pinia store / LocalStorage
  contactStore.save({
    nombre: firstName,
    apellido: lastName,
    email: formData.value.email.trim(),
    telefono: formData.value.phone.trim(),
  })

  isLoading.value = false
  close()

  // Direct redirect to WhatsApp Invite link
  window.location.href = whatsappLink
}

const close = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div class="whatsapp-modal">
      <!-- Dark backdrop -->
      <div class="whatsapp-modal__overlay" @click="close"></div>

      <!-- Glassmorphic Card Container -->
      <div class="whatsapp-modal__card" data-aos="zoom-in" data-aos-duration="400">
        <!-- Close button -->
        <button class="whatsapp-modal__close" @click="close" type="button" aria-label="Close">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <!-- Header -->
        <div class="whatsapp-modal__header">
          <div class="whatsapp-modal__badge">
            <i class="fa-brands fa-whatsapp"></i>
          </div>
          <h2 class="whatsapp-modal__title">{{ activeLabels.title }}</h2>
          <p class="whatsapp-modal__subtitle">{{ activeLabels.sub }}</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="whatsapp-modal__form">
          <!-- Name Field -->
          <div class="whatsapp-modal__field">
            <label class="whatsapp-modal__label">{{ activeLabels.nameLabel }}</label>
            <div class="whatsapp-modal__input-wrapper">
              <i class="fa-solid fa-user field-icon"></i>
              <input 
                v-model="formData.fullName" 
                type="text" 
                :placeholder="activeLabels.namePlaceholder" 
                required 
              />
            </div>
          </div>

          <!-- Email Field -->
          <div class="whatsapp-modal__field">
            <label class="whatsapp-modal__label">{{ activeLabels.emailLabel }}</label>
            <div class="whatsapp-modal__input-wrapper">
              <i class="fa-solid fa-envelope field-icon"></i>
              <input 
                v-model="formData.email" 
                type="email" 
                :placeholder="activeLabels.emailPlaceholder" 
                required 
              />
            </div>
          </div>

          <!-- Phone Field -->
          <div class="whatsapp-modal__field">
            <label class="whatsapp-modal__label">{{ activeLabels.phoneLabel }}</label>
            <div class="whatsapp-modal__input-wrapper phone-wrapper">
              <i class="fa-solid fa-phone field-icon"></i>
              <select v-model="formData.countryCode" class="whatsapp-modal__country-select">
                <option value="ES">🇪🇸 +34</option>
                <option value="MX">🇲🇽 +52</option>
                <option value="CO">🇨🇴 +57</option>
                <option value="EC">🇪🇨 +593</option>
                <option value="PE">🇵🇪 +51</option>
                <option value="CL">🇨🇱 +56</option>
                <option value="AR">🇦🇷 +54</option>
                <option value="VE">🇻🇪 +58</option>
                <option value="US">🇺🇸 +1</option>
                <option value="PA">🇵🇦 +507</option>
                <option value="CR">🇨🇷 +506</option>
                <option value="GT">🇬🇹 +502</option>
                <option value="PY">🇵🇾 +595</option>
                <option value="UY">🇺🇾 +598</option>
                <option value="BO">🇧🇴 +591</option>
                <option value="DO">🇩🇴 +1</option>
                <option value="PR">🇵🇷 +1</option>
                <option value="SV">🇸🇻 +503</option>
                <option value="HN">🇭🇳 +504</option>
                <option value="NI">🇳🇮 +505</option>
              </select>
              <input 
                v-model="formData.phone" 
                type="tel" 
                placeholder="55 1234 5678" 
                required 
              />
            </div>
            <p v-if="errors.phone" class="whatsapp-modal__error-text">{{ errors.phone }}</p>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="whatsapp-modal__submit-btn" 
            :disabled="isLoading"
          >
            <span v-if="isLoading">
              <i class="fa-solid fa-circle-notch fa-spin"></i> {{ activeLabels.submitting }}
            </span>
            <span v-else>
              {{ activeLabels.submit }} <i class="fa-solid fa-arrow-right"></i>
            </span>
          </button>
        </form>

        <div class="whatsapp-modal__footer">
          <i class="fa-solid fa-lock"></i>
          <span>{{ activeLabels.disclaimer }}</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.whatsapp-modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(5, 6, 15, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  &__card {
    position: relative;
    z-index: 2001;
    width: 100%;
    max-width: 500px;
    background: rgba(30, 34, 96, 0.45);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(33, 188, 251, 0.15);
    border-radius: 28px;
    padding: clamp(24px, 5vw, 40px);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
      transform: scale(1.05);
    }
  }

  &__header {
    text-align: center;
    margin-bottom: 28px;
  }

  &__badge {
    width: 60px;
    height: 60px;
    border-radius: 20px;
    background: rgba(37, 211, 102, 0.1);
    border: 1px solid rgba(37, 211, 102, 0.3);
    color: #25D366;
    font-size: 2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    box-shadow: 0 0 15px rgba(37, 211, 102, 0.15);
  }

  &__title {
    font-family: 'Outfit', sans-serif;
    font-size: 1.75rem;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 8px 0;
    letter-spacing: -0.01em;
  }

  &__subtitle {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.9rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;

    input {
      width: 100%;
      height: 52px;
      background: rgba(9, 10, 17, 0.4);
      border: 1px solid rgba(33, 188, 251, 0.15);
      border-radius: 12px;
      padding: 0 16px 0 46px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.95rem;
      color: #ffffff;
      transition: all 0.3s ease;

      &::placeholder {
        color: rgba(255, 255, 255, 0.35);
      }

      &:focus {
        outline: none;
        border-color: #21bcfb;
        background: rgba(9, 10, 17, 0.7);
        box-shadow: 0 0 10px rgba(33, 188, 251, 0.15);
      }
    }

    .field-icon {
      position: absolute;
      left: 16px;
      color: rgba(33, 188, 251, 0.6);
      font-size: 1rem;
      pointer-events: none;
    }
  }

  .phone-wrapper {
    input {
      padding-left: 150px;
    }
  }

  &__country-select {
    position: absolute;
    left: 42px;
    height: 36px;
    width: 96px;
    background: transparent;
    border: none;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    color: #ffffff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.85rem;
    padding-right: 4px;
    cursor: pointer;
    outline: none;

    option {
      background: #171846;
      color: #ffffff;
    }
  }

  &__error-text {
    font-family: 'Manrope', sans-serif;
    font-size: 11px;
    color: #ff4a4a;
    margin: 0;
  }

  &__submit-btn {
    margin-top: 10px;
    height: 52px;
    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
    border: none;
    border-radius: 12px;
    color: #ffffff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.25);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
    font-family: 'Manrope', sans-serif;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);

    i {
      color: #21bcfb;
    }
  }
}
</style>
