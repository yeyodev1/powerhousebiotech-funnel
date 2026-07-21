<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import JuanHeader from '@/components/juan/JuanHeader.vue'
import PhbFooter from '@/components/phb/PhbFooter.vue'
import { api, type Article } from '@/services/api'

const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.slug as string)

const article = ref<Article & { content?: string } | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

async function fetchArticle() {
  loading.value = true
  error.value = null
  try {
    const res = await api.articles.get(slug.value)
    article.value = res.data
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Artículo no encontrado'
  } finally {
    loading.value = false
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function goBack() {
  router.push({ name: 'investigaciones' })
}

onMounted(fetchArticle)
</script>

<template>
  <div class="articulo-page">
    <JuanHeader />

    <!-- Loading -->
    <div v-if="loading" class="articulo-loading">
      <div class="articulo-loading__inner">
        <div class="articulo-spinner"></div>
        <p>Cargando artículo...</p>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="articulo-error">
      <div class="articulo-error__inner">
        <p>{{ error }}</p>
        <button class="art-btn art-btn--ghost" @click="goBack">← Volver a investigaciones</button>
      </div>
    </div>

    <!-- Content -->
    <template v-else-if="article">
      <!-- Hero -->
      <section class="art-hero">
        <div class="art-hero__bg"></div>
        <div class="art-wrap">
          <!-- Back -->
          <button class="art-back" @click="goBack">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Investigaciones
          </button>

          <!-- Meta -->
          <div class="art-meta">
            <span class="art-meta__badge">Medicina Regenerativa</span>
            <time class="art-meta__date">{{ formatDate(article.date) }}</time>
          </div>

          <!-- Title -->
          <h1 class="art-title">{{ article.title }}</h1>

          <!-- Excerpt -->
          <p v-if="article.excerpt" class="art-excerpt">{{ article.excerpt }}</p>

          <!-- Featured image -->
          <div v-if="article.featuredImage" class="art-cover">
            <img :src="article.featuredImage" :alt="article.title" class="art-cover__img" />
          </div>
          <div v-else class="art-cover art-cover--default">
            <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="30" stroke="rgba(33,188,251,0.25)" stroke-width="1.5"/>
              <path d="M20 32 Q26 22 32 32 Q38 42 44 32" stroke="rgba(33,188,251,0.6)" stroke-width="2" fill="none" stroke-linecap="round"/>
              <path d="M20 28 Q26 18 32 28 Q38 38 44 28" stroke="rgba(33,188,251,0.3)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
              <path d="M20 36 Q26 26 32 36 Q38 46 44 36" stroke="rgba(33,188,251,0.3)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
              <circle cx="20" cy="32" r="3" fill="rgba(33,188,251,0.5)"/>
              <circle cx="32" cy="32" r="3" fill="rgba(33,188,251,0.7)"/>
              <circle cx="44" cy="32" r="3" fill="rgba(33,188,251,0.5)"/>
            </svg>
          </div>
        </div>
      </section>

      <!-- Article body -->
      <section class="art-body">
        <div class="art-wrap">
          <div
            v-if="article.content"
            class="art-content"
            v-html="article.content"
          ></div>
          <div v-else class="art-content">
            <p>{{ article.excerpt }}</p>
          </div>

          <!-- Source link -->
          <div class="art-source">
            <p class="art-source__text">Fuente original:</p>
            <a :href="article.sourceUrl" target="_blank" rel="noopener noreferrer" class="art-source__link">
              {{ article.sourceUrl }}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>

          <!-- Back button -->
          <div class="art-footer-nav">
            <button class="art-btn art-btn--primary" @click="goBack">
              ← Volver a Investigaciones
            </button>
          </div>
        </div>
      </section>
    </template>

    <PhbFooter />
  </div>
</template>

<style lang="scss" scoped>
.articulo-page {
  min-height: 100vh;
  background: $PHB-BG;
  padding-top: 100px;
}

/* Loading */
.articulo-loading {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    color: $PHB-TEXT-3;
    font-family: $font-secondary;
  }
}

.articulo-spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid $PHB-BORDER;
  border-top-color: $PHB-CYAN;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Error */
.articulo-error {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &__inner {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    color: $PHB-TEXT-2;
    font-family: $font-secondary;
  }
}

/* Wrapper */
.art-wrap {
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  padding: 0 2.5rem;
  box-sizing: border-box;

  @media (max-width: 768px) { padding: 0 1.25rem; }
}

/* Hero */
.art-hero {
  position: relative;
  padding: 3rem 0 4rem;
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 0%, rgba(18, 120, 243, 0.15) 0%, transparent 65%),
      radial-gradient(ellipse 50% 40% at 80% 90%, rgba(33, 188, 251, 0.08) 0%, transparent 65%),
      $PHB-NAVY-DARK;
    pointer-events: none;
  }
}

/* Back button */
.art-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: $PHB-CYAN;
  font-family: $font-interface;
  font-size: 0.82rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  padding: 0;
  margin-bottom: 2rem;
  transition: opacity 0.2s;
  position: relative;
  &:hover { opacity: 0.75; }
}

/* Meta */
.art-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  &__badge {
    display: inline-block;
    padding: 0.3rem 0.9rem;
    border: 1px solid $PHB-BORDER-MEDIUM;
    border-radius: 2rem;
    font-size: 0.72rem;
    font-family: $font-accent;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $PHB-CYAN;
  }

  &__date {
    font-family: $font-interface;
    font-size: 0.85rem;
    color: $PHB-TEXT-3;
  }
}

/* Title */
.art-title {
  font-family: $font-principal;
  font-size: clamp(1.75rem, 4vw, 2.8rem);
  font-weight: 800;
  color: $PHB-TEXT-1;
  line-height: 1.2;
  margin-bottom: 1.25rem;
  position: relative;
}

/* Excerpt */
.art-excerpt {
  font-family: $font-secondary;
  font-size: 1.1rem;
  color: $PHB-TEXT-2;
  line-height: 1.75;
  margin-bottom: 2.5rem;
  position: relative;
  max-width: 680px;
}

/* Cover image */
.art-cover {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 0;

  &__img {
    width: 100%;
    max-height: 440px;
    object-fit: cover;
    display: block;
  }

  &--default {
    background: linear-gradient(135deg, $PHB-SURFACE 0%, $PHB-BG-ALT 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 220px;
    border: 1px solid $PHB-BORDER;
  }
}

/* Body */
.art-body {
  padding: 3rem 0 5rem;
}

/* Article HTML content */
.art-content {
  font-family: $font-secondary;
  font-size: 1.05rem;
  color: $PHB-TEXT-2;
  line-height: 1.85;
  margin-bottom: 3rem;

  :deep(h1), :deep(h2), :deep(h3), :deep(h4) {
    font-family: $font-principal;
    color: $PHB-TEXT-1;
    font-weight: 700;
    line-height: 1.3;
    margin: 2rem 0 1rem;
  }
  :deep(h2) { font-size: 1.5rem; }
  :deep(h3) { font-size: 1.25rem; }

  :deep(p) {
    margin-bottom: 1.4rem;
    color: $PHB-TEXT-2;
  }

  :deep(strong), :deep(b) {
    color: $PHB-TEXT-1;
    font-weight: 700;
  }

  :deep(ul), :deep(ol) {
    margin: 1rem 0 1.4rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  :deep(li) {
    color: $PHB-TEXT-2;
  }

  :deep(a) {
    color: $PHB-CYAN;
    text-decoration: underline;
    text-underline-offset: 3px;
    &:hover { color: $PHB-ACCENT; }
  }

  :deep(img) {
    width: 100%;
    border-radius: 0.75rem;
    margin: 1.5rem 0;
  }

  :deep(blockquote) {
    border-left: 3px solid $PHB-CYAN;
    padding: 0.75rem 1.5rem;
    margin: 1.5rem 0;
    background: rgba(33, 188, 251, 0.04);
    border-radius: 0 0.5rem 0.5rem 0;
    color: $PHB-TEXT-2;
    font-style: italic;
  }

  :deep(figure) {
    margin: 1.5rem 0;
    img { margin: 0; }
    figcaption {
      font-size: 0.82rem;
      color: $PHB-TEXT-3;
      text-align: center;
      margin-top: 0.5rem;
    }
  }

  :deep(hr) {
    border: none;
    border-top: 1px solid $PHB-BORDER;
    margin: 2rem 0;
  }
}

/* Source */
.art-source {
  border-top: 1px solid $PHB-BORDER;
  padding-top: 1.5rem;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  &__text {
    font-family: $font-interface;
    font-size: 0.8rem;
    color: $PHB-TEXT-3;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: $font-secondary;
    font-size: 0.85rem;
    color: $PHB-CYAN;
    text-decoration: none;
    word-break: break-all;
    transition: opacity 0.2s;
    &:hover { opacity: 0.75; }
  }
}

/* Footer nav */
.art-footer-nav {
  display: flex;
  justify-content: flex-start;
}

/* Buttons */
.art-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  border-radius: 2rem;
  font-family: $font-accent;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &--primary {
    background: $PHB-CYAN;
    color: $PHB-NAVY-DARK;
    border: none;
    &:hover { background: $PHB-ACCENT; transform: translateY(-2px); }
  }

  &--ghost {
    background: transparent;
    border: 1px solid $PHB-BORDER-MEDIUM;
    color: $PHB-TEXT-1;
    &:hover { border-color: $PHB-CYAN; color: $PHB-CYAN; }
  }
}
</style>
