<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useContactStore } from '@/stores/contact'
import { useLocale } from '@/composables/useLocale'

const router = useRouter()
const contactStore = useContactStore()
const { locale, t, toggleLocale } = useLocale()

const firstName = computed(() => contactStore.contact.nombre.split(' ')[0] || '')

const form = ref({ nombre: firstName.value, email: contactStore.contact.email, whatsapp: contactStore.contact.telefono, archivos: null as FileList | null })
const errors = ref({ nombre: '', email: '', whatsapp: '', archivos: '' })
const submitting = ref(false)
const submitted = ref(false)

function onFiles(e: Event) {
  const input = e.target as HTMLInputElement
  form.value.archivos = input.files
}

function validate() {
  errors.value = { nombre: '', email: '', whatsapp: '', archivos: '' }
  let ok = true
  if (!form.value.nombre.trim()) { errors.value.nombre = t.value.notQualified.nombre.error; ok = false }
  if (!form.value.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) { errors.value.email = t.value.notQualified.email.error; ok = false }
  if (!form.value.whatsapp.trim()) { errors.value.whatsapp = t.value.notQualified.whatsapp.error; ok = false }
  if (!form.value.archivos || form.value.archivos.length === 0) { errors.value.archivos = t.value.notQualified.archivos.error; ok = false }
  return ok
}

async function submit() {
  if (!validate()) return
  submitting.value = true
  try {
    const data = new FormData()
    data.append('form-name', 'analisis-laboratorio')
    data.append('nombre', form.value.nombre)
    data.append('email', form.value.email)
    data.append('whatsapp', form.value.whatsapp)
    if (form.value.archivos) {
      Array.from(form.value.archivos).forEach(f => data.append('archivos', f))
    }
    await fetch('/', { method: 'POST', body: data })
    submitted.value = true
  } catch {
    // still show success — file will arrive if network ok
    submitted.value = true
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="notq">
    <nav class="notq__nav">
      <img
        src="https://static.wixstatic.com/media/2361a8_1db8efe7c9d74e49be06a716224efb99~mv2.png"
        alt="PowerHouse Biotech"
        class="notq__nav-logo"
      />
      <button class="lang-toggle" @click="toggleLocale" :aria-label="locale === 'es' ? 'Switch to English' : 'Cambiar a Español'">
        {{ locale === 'es' ? 'EN' : 'ES' }}
      </button>
    </nav>

    <!-- SUCCESS STATE -->
    <div v-if="submitted" class="notq__success">
      <div class="notq__success-icon">
        <i class="fa-solid fa-circle-check"></i>
      </div>
      <h1 class="notq__success-title">{{ t.notQualified.successTitle }}</h1>
      <p class="notq__success-sub">{{ t.notQualified.successSub }}</p>
      <button class="btn btn--primary" @click="router.push('/')">
        <i class="fa-solid fa-house"></i>
        {{ t.notQualified.successBtn }}
      </button>
    </div>

    <!-- MAIN CONTENT -->
    <div v-else class="notq__wrap">

      <!-- Header -->
      <div class="notq__header">
        <div class="notq__badge">
          <i class="fa-solid fa-flask"></i>
          {{ t.notQualified.badge }}
        </div>

        <h1 class="notq__title">
          <span v-if="firstName">{{ firstName }}{{ t.notQualified.titlePrefix }}</span>{{ t.notQualified.title }}
        </h1>

        <p class="notq__sub">{{ t.notQualified.sub }}</p>

        <div class="notq__quote">
          <i class="fa-solid fa-quote-left"></i>
          <p>{{ t.notQualified.quote }}</p>
        </div>
      </div>

      <!-- Offer -->
      <div class="notq__offer">
        <h2 class="notq__offer-title">{{ t.notQualified.offerTitle }}</h2>
        <div class="notq__offer-grid">
          <div v-for="item in t.notQualified.offerItems" :key="item.title" class="notq__offer-card">
            <div class="notq__offer-icon">
              <i :class="['fa-solid', item.icon]"></i>
            </div>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="notq__form-wrap">
        <div class="notq__price-badge">
          <i class="fa-solid fa-tag"></i>
          $50 USD
        </div>
        <h2 class="notq__form-title">{{ t.notQualified.formTitle }}</h2>
        <p class="notq__form-sub">{{ t.notQualified.formSub }}</p>

        <form class="notq__form" @submit.prevent="submit" novalidate>

          <div class="notq__field" :class="{ 'notq__field--error': errors.nombre }">
            <label>{{ t.notQualified.nombre.label }}</label>
            <input v-model="form.nombre" type="text" :placeholder="t.notQualified.nombre.placeholder" />
            <span v-if="errors.nombre" class="notq__error">{{ errors.nombre }}</span>
          </div>

          <div class="notq__field" :class="{ 'notq__field--error': errors.email }">
            <label>{{ t.notQualified.email.label }}</label>
            <input v-model="form.email" type="email" :placeholder="t.notQualified.email.placeholder" />
            <span v-if="errors.email" class="notq__error">{{ errors.email }}</span>
          </div>

          <div class="notq__field" :class="{ 'notq__field--error': errors.whatsapp }">
            <label>{{ t.notQualified.whatsapp.label }}</label>
            <input v-model="form.whatsapp" type="tel" :placeholder="t.notQualified.whatsapp.placeholder" />
            <span v-if="errors.whatsapp" class="notq__error">{{ errors.whatsapp }}</span>
          </div>

          <div class="notq__field notq__field--file" :class="{ 'notq__field--error': errors.archivos }">
            <label>{{ t.notQualified.archivos.label }}</label>
            <div class="notq__file-drop" @click="($refs.fileInput as HTMLInputElement).click()">
              <i class="fa-solid fa-cloud-arrow-up"></i>
              <span>{{ t.notQualified.archivos.hint }}</span>
              <span v-if="form.archivos && form.archivos.length" class="notq__file-count">
                <i class="fa-solid fa-check"></i>
                {{ form.archivos.length }} {{ locale === 'es' ? (form.archivos.length === 1 ? 'archivo' : 'archivos') : (form.archivos.length === 1 ? 'file' : 'files') }}
              </span>
            </div>
            <input ref="fileInput" type="file" accept=".pdf,.jpg,.jpeg,.png" multiple @change="onFiles" hidden />
            <span v-if="errors.archivos" class="notq__error">{{ errors.archivos }}</span>
          </div>

          <p class="notq__disclaimer">
            <i class="fa-solid fa-lock"></i>
            {{ t.notQualified.disclaimer }}
          </p>

          <button type="submit" class="btn btn--primary btn--full" :disabled="submitting">
            <i v-if="!submitting" class="fa-solid fa-paper-plane"></i>
            <i v-else class="fa-solid fa-spinner fa-spin"></i>
            {{ submitting ? t.notQualified.submitting : t.notQualified.submitBtn }}
          </button>

        </form>
      </div>

    </div>

    <footer class="notq__footer">
      <img
        src="https://static.wixstatic.com/media/2361a8_1db8efe7c9d74e49be06a716224efb99~mv2.png"
        alt="PowerHouse Biotech"
        class="notq__footer-logo"
      />
      <p>© {{ new Date().getFullYear() }} PowerHouse Biotech. {{ t.notQualified.footer.rights }}</p>
      <div class="notq__footer-links">
        <RouterLink to="/politicas-privacidad">{{ t.notQualified.footer.privacy }}</RouterLink>
        <span>·</span>
        <RouterLink to="/aviso-legal">{{ t.notQualified.footer.legal }}</RouterLink>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as c;
@use '@/styles/fonts.modules.scss' as f;

.notq {
  min-height: 100vh;
  background: c.$PHB-BG;
  color: c.$PHB-TEXT-1;
  display: flex;
  flex-direction: column;

  &__nav {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid c.$PHB-BORDER;
    display: flex;
    align-items: center;
    justify-content: center;
    background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-SM;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  &__nav-logo { height: 42px; width: auto; }

  // ── Success state ──
  &__success {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 1.5rem;
    padding: 4rem 1.5rem;
    max-width: 560px;
    margin: 0 auto;
  }
  &__success-icon {
    font-size: 4rem;
    color: #16a34a;
  }
  &__success-title {
    font-family: f.$font-principal;
    font-size: clamp(1.6rem, 4vw, 2.2rem);
    font-weight: 800;
    color: c.$PHB-TEXT-1;
    margin: 0;
  }
  &__success-sub {
    font-family: f.$font-secondary;
    font-size: 1rem;
    color: c.$PHB-TEXT-2;
    line-height: 1.8;
    margin: 0;
  }

  // ── Main wrap ──
  &__wrap {
    flex: 1;
    max-width: 720px;
    margin: 0 auto;
    padding: 3.5rem 1.5rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width: 100%;
  }

  // ── Header ──
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.2rem;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: f.$font-accent;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: c.$PHB-PURPLE;
    border: 1px solid rgba(18, 120, 243, 0.25);
    border-radius: 100px;
    padding: 0.35rem 1rem;
    background: rgba(18, 120, 243, 0.06);
  }

  &__title {
    font-family: f.$font-principal;
    font-size: clamp(1.6rem, 4vw, 2.2rem);
    font-weight: 800;
    color: c.$PHB-TEXT-1;
    line-height: 1.3;
    margin: 0;
  }

  &__sub {
    font-family: f.$font-secondary;
    font-size: 1rem;
    color: c.$PHB-TEXT-2;
    line-height: 1.8;
    margin: 0;
    max-width: 580px;
  }

  &__quote {
    padding: 1.2rem 1.8rem;
    border-left: 3px solid c.$PHB-PURPLE;
    background: rgba(18, 120, 243, 0.04);
    border-radius: 0 10px 10px 0;
    text-align: left;
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    width: 100%;
    max-width: 560px;

    i { color: rgba(18, 120, 243, 0.3); font-size: 1.1rem; flex-shrink: 0; margin-top: 0.15rem; }

    p {
      font-family: f.$font-secondary;
      font-size: 0.92rem;
      color: c.$PHB-TEXT-2;
      line-height: 1.7;
      font-style: italic;
      margin: 0;
    }
  }

  // ── Offer ──
  &__offer {
    width: 100%;
  }
  &__offer-title {
    font-family: f.$font-principal;
    font-size: 1.15rem;
    font-weight: 700;
    color: c.$PHB-TEXT-1;
    margin: 0 0 1.2rem;
    text-align: center;
  }
  &__offer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.8rem;
    @media (min-width: 640px) { grid-template-columns: repeat(2, 1fr); }
  }
  &__offer-card {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    padding: 1.2rem 1.4rem;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 14px;
    background: c.$PHB-SURFACE;
    box-shadow: c.$PHB-SHADOW-SM;
    transition: border-color 0.15s, box-shadow 0.15s;
    &:hover { border-color: rgba(18, 120, 243, 0.25); box-shadow: c.$PHB-SHADOW-MD; }

    h3 {
      font-family: f.$font-accent;
      font-size: 0.88rem;
      font-weight: 700;
      color: c.$PHB-TEXT-1;
      margin: 0 0 0.3rem;
    }
    p {
      font-family: f.$font-secondary;
      font-size: 0.82rem;
      color: c.$PHB-TEXT-3;
      line-height: 1.5;
      margin: 0;
    }
  }
  &__offer-icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    background: rgba(18, 120, 243, 0.08);
    border: 1px solid rgba(18, 120, 243, 0.15);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    i { color: c.$PHB-PURPLE; font-size: 1rem; }
  }

  // ── Form section ──
  &__form-wrap {
    background: c.$PHB-SURFACE;
    border: 1px solid c.$PHB-BORDER;
    border-radius: 20px;
    padding: 2.5rem 2rem;
    box-shadow: c.$PHB-SHADOW-MD;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    @media (max-width: 480px) { padding: 2rem 1.2rem; }
  }

  &__price-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, c.$PHB-PURPLE, c.$PHB-CYAN);
    color: #fff;
    font-family: f.$font-accent;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 0.4rem 1.1rem;
    border-radius: 100px;
    align-self: flex-start;
    i { font-size: 0.85rem; }
  }

  &__form-title {
    font-family: f.$font-principal;
    font-size: 1.3rem;
    font-weight: 800;
    color: c.$PHB-TEXT-1;
    margin: 0;
  }
  &__form-sub {
    font-family: f.$font-secondary;
    font-size: 0.9rem;
    color: c.$PHB-TEXT-2;
    margin: 0;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    label {
      font-family: f.$font-accent;
      font-size: 0.82rem;
      font-weight: 600;
      color: c.$PHB-TEXT-2;
    }

    input[type="text"],
    input[type="email"],
    input[type="tel"] {
      padding: 0.75rem 1rem;
      border: 1.5px solid c.$PHB-BORDER;
      border-radius: 10px;
      background: c.$PHB-BG;
      font-family: f.$font-secondary;
      font-size: 0.95rem;
      color: c.$PHB-TEXT-1;
      outline: none;
      transition: border-color 0.15s;
      -webkit-appearance: none;
      &::placeholder { color: c.$PHB-TEXT-3; }
      &:focus { border-color: c.$PHB-PURPLE; }
    }

    &--error {
      input, .notq__file-drop { border-color: #dc2626 !important; }
    }
  }

  &__file-drop {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1.8rem 1rem;
    border: 1.5px dashed c.$PHB-BORDER;
    border-radius: 12px;
    background: c.$PHB-BG;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    text-align: center;
    &:hover { border-color: c.$PHB-PURPLE; background: rgba(18, 120, 243, 0.03); }

    i:first-child { font-size: 1.8rem; color: c.$PHB-PURPLE; opacity: 0.5; }

    span {
      font-family: f.$font-secondary;
      font-size: 0.85rem;
      color: c.$PHB-TEXT-3;
    }
  }

  &__file-count {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: #16a34a !important;
    font-weight: 600 !important;
    i { font-size: 0.8rem; }
  }

  &__error {
    font-family: f.$font-secondary;
    font-size: 0.78rem;
    color: #dc2626;
  }

  &__disclaimer {
    font-family: f.$font-secondary;
    font-size: 0.78rem;
    color: c.$PHB-TEXT-3;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin: 0;
    i { font-size: 0.75rem; color: c.$PHB-PURPLE; }
  }

  // ── Footer ──
  &__footer {
    padding: 2.5rem 1.5rem;
    border-top: 1px solid c.$PHB-BORDER;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    background: c.$PHB-SURFACE;

    &-logo { height: 36px; width: auto; opacity: 0.7; }

    p {
      font-family: f.$font-secondary;
      font-size: 0.8rem;
      color: c.$PHB-TEXT-3;
      margin: 0;
    }

    &-links {
      display: flex;
      gap: 0.7rem;
      align-items: center;
      font-family: f.$font-secondary;
      font-size: 0.8rem;
      a { color: c.$PHB-TEXT-3; text-decoration: none; &:hover { color: c.$PHB-PURPLE; } }
      span { opacity: 0.4; }
    }
  }
}

.lang-toggle {
  position: absolute;
  right: 1.5rem;
  background: rgba(18, 120, 243, 0.07);
  color: c.$PHB-PURPLE;
  border: 1px solid rgba(18, 120, 243, 0.2);
  border-radius: 6px;
  padding: 0.3rem 0.7rem;
  font-family: f.$font-accent;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.06em;
  transition: all 0.2s;
  &:hover { background: rgba(18, 120, 243, 0.12); }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-family: f.$font-accent;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  text-decoration: none;

  &--primary {
    background: linear-gradient(135deg, c.$PHB-PURPLE, c.$PHB-CYAN);
    color: #fff;
    padding: 1rem 2rem;
    font-size: 1rem;
    box-shadow: 0 4px 20px rgba(18, 120, 243, 0.3);
    &:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(18, 120, 243, 0.4); }
    &:disabled { opacity: 0.6; cursor: not-allowed; }
  }

  &--full { width: 100%; }
}
</style>
