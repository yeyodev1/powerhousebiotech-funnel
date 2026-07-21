<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import JuanHeader from '@/components/juan/JuanHeader.vue'
import PhbFooter from '@/components/phb/PhbFooter.vue'
import { api, type Article } from '@/services/api'

const articles = ref<Article[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const search = ref('')
const searchInput = ref('')
const currentPage = ref(1)
const totalPages = ref(1)
const totalArticles = ref(0)
const LIMIT = 12

async function fetchArticles(page = 1) {
  loading.value = true
  error.value = null
  try {
    const res = await api.articles.list({
      page,
      limit: LIMIT,
      source: 'drjuangarza',
      search: search.value || undefined,
    })
    articles.value = res.data
    totalPages.value = res.pagination.pages
    totalArticles.value = res.pagination.total
    currentPage.value = page
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Error al cargar artículos'
    articles.value = []
  } finally {
    loading.value = false
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
}

function handleSearch() {
  search.value = searchInput.value
  currentPage.value = 1
  fetchArticles(1)
}

function clearSearch() {
  searchInput.value = ''
  search.value = ''
  fetchArticles(1)
}

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  fetchArticles(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const pages = computed(() => {
  const range: number[] = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  for (let i = start; i <= end; i++) range.push(i)
  return range
})

onMounted(() => fetchArticles(1))
</script>

<template>
  <div class="investigaciones-page">
    <JuanHeader />

    <!-- Hero -->
    <section class="inv-hero">
      <div class="inv-hero__bg"></div>
      <div class="inv-wrap inv-hero__content">
        <div class="inv-hero__badge">Investigaciones &amp; Artículos</div>
        <h1 class="inv-hero__title">
          Avances en <span class="inv-hero__accent">Medicina Regenerativa</span>
        </h1>
        <p class="inv-hero__subtitle">
          Explora más de 200 artículos sobre células madre, longevidad y tratamientos regenerativos
          del Dr. Juan Antonio Garza Quintanilla.
        </p>
        <!-- Search -->
        <div class="inv-search">
          <input
            v-model="searchInput"
            class="inv-search__input"
            type="text"
            placeholder="Buscar artículos..."
            @keydown.enter="handleSearch"
          />
          <button class="inv-search__btn" @click="handleSearch">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button v-if="search" class="inv-search__clear" @click="clearSearch">✕</button>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="inv-content">
      <div class="inv-wrap">
        <!-- Stats bar -->
        <div class="inv-stats" v-if="!loading">
          <span class="inv-stats__count">
            {{ search ? `${totalArticles} resultados para "${search}"` : `${totalArticles} artículos` }}
          </span>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="inv-loading">
          <div class="inv-loading__grid">
            <div v-for="i in 6" :key="i" class="inv-card inv-card--skeleton">
              <div class="inv-card__img-skeleton"></div>
              <div class="inv-card__body">
                <div class="skeleton-line skeleton-line--sm"></div>
                <div class="skeleton-line skeleton-line--lg"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line skeleton-line--sm"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="inv-error">
          <p>{{ error }}</p>
          <button class="inv-btn inv-btn--primary" @click="fetchArticles(currentPage)">Reintentar</button>
        </div>

        <!-- Empty -->
        <div v-else-if="articles.length === 0" class="inv-empty">
          <div class="inv-empty__icon">🔬</div>
          <p class="inv-empty__text">No se encontraron artículos.</p>
          <button v-if="search" class="inv-btn inv-btn--ghost" @click="clearSearch">Ver todos</button>
        </div>

        <!-- Grid -->
        <div v-else class="inv-grid">
          <RouterLink
            v-for="article in articles"
            :key="article._id"
            :to="{ name: 'articulo', params: { slug: article.slug } }"
            class="inv-card"
          >
            <div class="inv-card__img-wrap">
              <img
                v-if="article.featuredImage"
                :src="article.featuredImage"
                :alt="article.title"
                class="inv-card__img"
                loading="lazy"
              />
              <div v-else class="inv-card__img-placeholder">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
                </svg>
              </div>
            </div>
            <div class="inv-card__body">
              <time class="inv-card__date">{{ formatDate(article.date) }}</time>
              <h3 class="inv-card__title">{{ article.title }}</h3>
              <p class="inv-card__excerpt">{{ article.excerpt }}</p>
              <span class="inv-card__link">Leer artículo →</span>
            </div>
          </RouterLink>
        </div>

        <!-- Pagination -->
        <div v-if="!loading && totalPages > 1" class="inv-pagination">
          <button class="inv-page-btn" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">←</button>
          <button
            v-if="pages[0] > 1"
            class="inv-page-btn"
            @click="goToPage(1)"
          >1</button>
          <span v-if="pages[0] > 2" class="inv-page-ellipsis">…</span>
          <button
            v-for="p in pages"
            :key="p"
            class="inv-page-btn"
            :class="{ 'inv-page-btn--active': p === currentPage }"
            @click="goToPage(p)"
          >{{ p }}</button>
          <span v-if="pages[pages.length - 1] < totalPages - 1" class="inv-page-ellipsis">…</span>
          <button
            v-if="pages[pages.length - 1] < totalPages"
            class="inv-page-btn"
            @click="goToPage(totalPages)"
          >{{ totalPages }}</button>
          <button class="inv-page-btn" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">→</button>
        </div>
      </div>
    </section>

    <PhbFooter />
  </div>
</template>

<style lang="scss" scoped>
/* wrapper centrado — no depende de .container global */
.inv-wrap {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 2.5rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 1.25rem;
  }
}

.investigaciones-page {
  min-height: 100vh;
  background: $PHB-BG;
  /* empuja el contenido por debajo del header fijo (~100px) */
  padding-top: 100px;
}

/* Hero */
.inv-hero {
  position: relative;
  padding: 7rem 0 5rem;
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 20%, rgba(18, 120, 243, 0.15) 0%, transparent 70%),
      radial-gradient(ellipse 60% 40% at 80% 80%, rgba(33, 188, 251, 0.1) 0%, transparent 70%),
      $PHB-NAVY-DARK;
    pointer-events: none;
  }

  &__content {
    position: relative;
  }

  &__badge {
    display: inline-block;
    padding: 0.35rem 1rem;
    border: 1px solid $PHB-BORDER-MEDIUM;
    border-radius: 2rem;
    font-size: 0.75rem;
    font-family: $font-accent;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $PHB-CYAN;
    margin-bottom: 1.5rem;
  }

  &__title {
    font-family: $font-principal;
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 800;
    color: $PHB-TEXT-1;
    line-height: 1.15;
    margin-bottom: 1.25rem;
  }

  &__accent {
    color: $PHB-CYAN;
  }

  &__subtitle {
    font-family: $font-secondary;
    font-size: 1.05rem;
    color: $PHB-TEXT-2;
    line-height: 1.7;
    margin-bottom: 2.5rem;
    max-width: 580px;
  }
}

/* Search */
.inv-search {
  display: flex;
  align-items: center;
  gap: 0;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid $PHB-BORDER-MEDIUM;
  border-radius: 3rem;
  max-width: 520px;
  overflow: hidden;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: $PHB-CYAN;
  }

  &__input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 0.9rem 1.25rem;
    font-family: $font-secondary;
    font-size: 0.95rem;
    color: $PHB-TEXT-1;
    &::placeholder { color: $PHB-TEXT-3; }
  }

  &__btn {
    padding: 0 1.25rem;
    background: transparent;
    border: none;
    color: $PHB-CYAN;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: color 0.2s;
    &:hover { color: $PHB-ACCENT; }
  }

  &__clear {
    padding: 0 1rem;
    background: transparent;
    border: none;
    color: $PHB-TEXT-3;
    cursor: pointer;
    font-size: 0.85rem;
    &:hover { color: $PHB-TEXT-1; }
  }
}

/* Content section */
.inv-content {
  padding: 3rem 0 6rem;
}

.inv-stats {
  margin-bottom: 2rem;
  &__count {
    font-family: $font-secondary;
    font-size: 0.9rem;
    color: $PHB-TEXT-3;
  }
}

/* Grid */
.inv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

/* Card */
.inv-card {
  background: $PHB-SURFACE;
  border: 1px solid $PHB-BORDER;
  border-radius: 1rem;
  overflow: hidden;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: $PHB-BORDER-MEDIUM;
    box-shadow: $PHB-SHADOW-MD;
  }

  &__img-wrap {
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: $PHB-SURFACE-2;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
    .inv-card:hover & { transform: scale(1.04); }
  }

  &__img-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, $PHB-SURFACE 0%, $PHB-BG-ALT 100%);
    color: $PHB-TEXT-3;
  }

  &__body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__date {
    font-family: $font-interface;
    font-size: 0.75rem;
    color: $PHB-CYAN;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.75rem;
  }

  &__title {
    font-family: $font-principal;
    font-size: 1rem;
    font-weight: 700;
    color: $PHB-TEXT-1;
    line-height: 1.5;
    margin-bottom: 0.75rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__excerpt {
    font-family: $font-secondary;
    font-size: 0.875rem;
    color: $PHB-TEXT-2;
    line-height: 1.65;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 1.25rem;
  }

  &__link {
    font-family: $font-accent;
    font-size: 0.825rem;
    color: $PHB-CYAN;
    font-weight: 600;
    letter-spacing: 0.04em;
    transition: color 0.2s;
    .inv-card:hover & { color: $PHB-ACCENT; }
  }

  /* Skeleton */
  &--skeleton {
    pointer-events: none;
  }

  &__img-skeleton {
    aspect-ratio: 16 / 9;
    background: linear-gradient(90deg, $PHB-SURFACE 0%, $PHB-SURFACE-2 50%, $PHB-SURFACE 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
}

/* Skeleton lines */
.skeleton-line {
  height: 0.85rem;
  border-radius: 4px;
  background: linear-gradient(90deg, $PHB-SURFACE 0%, $PHB-SURFACE-2 50%, $PHB-SURFACE 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  margin-bottom: 0.6rem;
  &--sm { width: 40%; }
  &--lg { width: 85%; height: 1rem; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Loading grid */
.inv-loading__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

/* Errors / empty */
.inv-error, .inv-empty {
  text-align: center;
  padding: 5rem 0;
  color: $PHB-TEXT-2;
  font-family: $font-secondary;
}

.inv-empty__icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.inv-empty__text {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

/* Buttons */
.inv-btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 2rem;
  font-family: $font-accent;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  &--primary {
    background: $PHB-CYAN;
    color: $PHB-NAVY-DARK;
    &:hover { background: $PHB-ACCENT; transform: translateY(-2px); }
  }

  &--ghost {
    background: transparent;
    border: 1px solid $PHB-BORDER-MEDIUM;
    color: $PHB-TEXT-1;
    &:hover { border-color: $PHB-CYAN; color: $PHB-CYAN; }
  }
}

/* Pagination */
.inv-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3.5rem;
  flex-wrap: wrap;
}

.inv-page-btn {
  min-width: 2.5rem;
  height: 2.5rem;
  padding: 0 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid $PHB-BORDER;
  background: $PHB-SURFACE;
  color: $PHB-TEXT-2;
  font-family: $font-interface;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: $PHB-CYAN;
    color: $PHB-CYAN;
  }

  &--active {
    background: $PHB-CYAN;
    border-color: $PHB-CYAN;
    color: $PHB-NAVY-DARK;
    font-weight: 700;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.inv-page-ellipsis {
  color: $PHB-TEXT-3;
  font-family: $font-interface;
  padding: 0 0.25rem;
}

/* Responsive */
@media (max-width: 768px) {
  .inv-hero {
    padding: 5rem 0 3.5rem;
  }
  .inv-grid {
    grid-template-columns: 1fr;
  }
}
</style>
