<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isRegister = ref(false)
const loading = ref(false)
const errorMsg = ref<string | null>(null)

// Form fields
const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const isFormValid = computed(() => {
  if (!email.value || !password.value) return false
  if (isRegister.value && !name.value) return false
  if (password.value.length < 6) return false
  return true
})

function toggleMode() {
  isRegister.value = !isRegister.value
  errorMsg.value = null
  name.value = ''
  email.value = ''
  password.value = ''
}

async function handleSubmit() {
  if (!isFormValid.value || loading.value) return
  loading.value = true
  errorMsg.value = null

  try {
    if (isRegister.value) {
      await authStore.register(name.value.trim(), email.value.trim(), password.value)
    } else {
      await authStore.login(email.value.trim(), password.value)
    }
    router.push({ name: 'investigaciones' })
  } catch (e: unknown) {
    errorMsg.value = e instanceof Error ? e.message : 'Error de autenticación'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-page__bg"></div>

    <!-- Decorative glows -->
    <div class="login-glow login-glow--1"></div>
    <div class="login-glow login-glow--2"></div>

    <div class="login-container">
      <!-- Brand -->
      <div class="login-brand">
        <div class="login-brand__logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#21bcfb" stroke-width="2" />
            <path d="M10 16 L14 20 L22 12" stroke="#21bcfb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="login-brand__name">PowerHouse Biotech</span>
      </div>

      <!-- Card -->
      <div class="login-card">
        <div class="login-card__header">
          <h1 class="login-card__title">
            {{ isRegister ? 'Crear cuenta' : 'Iniciar sesión' }}
          </h1>
          <p class="login-card__subtitle">
            {{ isRegister
              ? 'Únete para acceder a contenido exclusivo'
              : 'Bienvenido de vuelta' }}
          </p>
        </div>

        <form class="login-form" @submit.prevent="handleSubmit" novalidate>
          <!-- Name (register only) -->
          <Transition name="field-slide">
            <div v-if="isRegister" class="login-field">
              <label class="login-label" for="name">Nombre</label>
              <input
                id="name"
                v-model="name"
                class="login-input"
                type="text"
                placeholder="Tu nombre"
                autocomplete="name"
                :disabled="loading"
              />
            </div>
          </Transition>

          <!-- Email -->
          <div class="login-field">
            <label class="login-label" for="email">Correo electrónico</label>
            <input
              id="email"
              v-model="email"
              class="login-input"
              type="email"
              placeholder="correo@ejemplo.com"
              autocomplete="email"
              :disabled="loading"
            />
          </div>

          <!-- Password -->
          <div class="login-field">
            <label class="login-label" for="password">Contraseña</label>
            <div class="login-input-wrap">
              <input
                id="password"
                v-model="password"
                class="login-input login-input--has-icon"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Mínimo 6 caracteres"
                autocomplete="current-password"
                :disabled="loading"
              />
              <button
                type="button"
                class="login-eye"
                @click="showPassword = !showPassword"
                :aria-label="showPassword ? 'Ocultar' : 'Mostrar'"
              >
                <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Error -->
          <Transition name="fade">
            <div v-if="errorMsg" class="login-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {{ errorMsg }}
            </div>
          </Transition>

          <!-- Submit -->
          <button
            type="submit"
            class="login-submit"
            :class="{ 'login-submit--loading': loading }"
            :disabled="!isFormValid || loading"
          >
            <span v-if="!loading">{{ isRegister ? 'Crear cuenta' : 'Entrar' }}</span>
            <span v-else class="login-spinner"></span>
          </button>
        </form>

        <!-- Toggle mode -->
        <div class="login-toggle">
          {{ isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?' }}
          <button type="button" class="login-toggle__btn" @click="toggleMode">
            {{ isRegister ? 'Inicia sesión' : 'Regístrate' }}
          </button>
        </div>
      </div>

      <!-- Back link -->
      <router-link to="/" class="login-back">
        ← Volver al inicio
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem 1rem;
  background: $PHB-NAVY-DARK;
}

.login-page__bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 50% at 15% 25%, rgba(18, 120, 243, 0.2) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 85% 75%, rgba(33, 188, 251, 0.12) 0%, transparent 60%);
  pointer-events: none;
}

.login-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  opacity: 0.3;

  &--1 {
    width: 400px; height: 400px;
    background: $PHB-BLUE;
    top: -100px; left: -100px;
  }
  &--2 {
    width: 300px; height: 300px;
    background: $PHB-CYAN;
    bottom: -80px; right: -80px;
  }
}

.login-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

/* Brand */
.login-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__name {
    font-family: $font-principal;
    font-size: 1.1rem;
    font-weight: 700;
    color: $PHB-TEXT-1;
    letter-spacing: 0.02em;
  }
}

/* Card */
.login-card {
  width: 100%;
  background: rgba(30, 34, 96, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid $PHB-BORDER-MEDIUM;
  border-radius: 1.5rem;
  padding: 2.5rem;

  &__header {
    margin-bottom: 2rem;
    text-align: center;
  }

  &__title {
    font-family: $font-principal;
    font-size: 1.75rem;
    font-weight: 800;
    color: $PHB-TEXT-1;
    margin-bottom: 0.5rem;
  }

  &__subtitle {
    font-family: $font-secondary;
    font-size: 0.9rem;
    color: $PHB-TEXT-3;
  }
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.login-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.login-label {
  font-family: $font-interface;
  font-size: 0.8rem;
  font-weight: 600;
  color: $PHB-TEXT-2;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.login-input-wrap {
  position: relative;
}

.login-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid $PHB-BORDER;
  border-radius: 0.75rem;
  padding: 0.875rem 1rem;
  font-family: $font-secondary;
  font-size: 0.95rem;
  color: $PHB-TEXT-1;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
  box-sizing: border-box;

  &::placeholder { color: $PHB-TEXT-3; }

  &:focus {
    border-color: $PHB-CYAN;
    background: rgba(33, 188, 251, 0.04);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--has-icon {
    padding-right: 3rem;
  }
}

.login-eye {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: $PHB-TEXT-3;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  transition: color 0.2s;
  &:hover { color: $PHB-TEXT-1; }
}

/* Error */
.login-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-family: $font-secondary;
  font-size: 0.875rem;
  color: #f87171;
}

/* Submit */
.login-submit {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, $PHB-CYAN 0%, $PHB-BLUE 100%);
  border: none;
  border-radius: 0.75rem;
  font-family: $font-accent;
  font-size: 1rem;
  font-weight: 700;
  color: $PHB-NAVY-DARK;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 3.2rem;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  &--loading {
    cursor: wait;
  }
}

.login-spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(23, 24, 70, 0.3);
  border-top-color: $PHB-NAVY-DARK;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Toggle */
.login-toggle {
  margin-top: 1.75rem;
  text-align: center;
  font-family: $font-secondary;
  font-size: 0.875rem;
  color: $PHB-TEXT-3;

  &__btn {
    background: transparent;
    border: none;
    color: $PHB-CYAN;
    font-family: $font-secondary;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    margin-left: 0.25rem;
    transition: color 0.2s;
    &:hover { color: $PHB-ACCENT; }
  }
}

/* Back */
.login-back {
  font-family: $font-secondary;
  font-size: 0.875rem;
  color: $PHB-TEXT-3;
  text-decoration: none;
  transition: color 0.2s;
  &:hover { color: $PHB-CYAN; }
}

/* Transitions */
.field-slide-enter-active,
.field-slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.field-slide-enter-from,
.field-slide-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-8px);
}
.field-slide-enter-to,
.field-slide-leave-from {
  opacity: 1;
  max-height: 120px;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.5rem;
    border-radius: 1.25rem;
  }
}
</style>
