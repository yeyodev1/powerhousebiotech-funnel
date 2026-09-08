<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ArticlesResponse } from '@/services/api'

type Pagination = ArticlesResponse['pagination']

const props = defineProps<{ pagination: Pagination; loading?: boolean }>()
const emit = defineEmits<{ change: [page: number] }>()

const pageInput = ref(String(props.pagination.page))
watch(() => props.pagination.page, (p) => (pageInput.value = String(p)))

const from = computed(() => (props.pagination.total === 0 ? 0 : (props.pagination.page - 1) * props.pagination.limit + 1))
const to = computed(() => Math.min(props.pagination.total, props.pagination.page * props.pagination.limit))

const pages = computed(() => {
  const { page, pages: total } = props.pagination
  const out: (number | '…')[] = []
  const add = (n: number) => { if (!out.includes(n)) out.push(n) }
  add(1)
  for (let i = page - 2; i <= page + 2; i++) if (i > 1 && i < total) add(i)
  if (total > 1) add(total)
  // insertar puntos suspensivos donde haya saltos
  const withGaps: (number | '…')[] = []
  out.forEach((n, i) => {
    const prev = out[i - 1]
    if (typeof prev === 'number' && typeof n === 'number' && n - prev > 1) withGaps.push('…')
    withGaps.push(n)
  })
  return withGaps
})

function go(page: number) {
  if (props.loading) return
  const p = Math.min(Math.max(1, page), props.pagination.pages)
  if (p !== props.pagination.page) emit('change', p)
}

function goInput() {
  const n = parseInt(pageInput.value, 10)
  if (Number.isNaN(n)) { pageInput.value = String(props.pagination.page); return }
  go(n)
}
</script>

<template>
  <nav class="pg" aria-label="Paginación de artículos">
    <p class="pg__summary">
      Mostrando <strong>{{ from }}–{{ to }}</strong> de <strong>{{ pagination.total }}</strong> artículos
      <span class="pg__sep">·</span>
      Página <strong>{{ pagination.page }}</strong> de <strong>{{ pagination.pages }}</strong>
    </p>

    <div v-if="pagination.pages > 1" class="pg__controls">
      <button class="pg__btn" :disabled="pagination.page === 1 || loading" title="Primera página" @click="go(1)"><i class="fa-solid fa-angles-left"></i></button>
      <button class="pg__btn pg__btn--text" :disabled="pagination.page === 1 || loading" @click="go(pagination.page - 1)"><i class="fa-solid fa-chevron-left"></i> Anterior</button>

      <template v-for="(p, i) in pages" :key="i">
        <span v-if="p === '…'" class="pg__gap">…</span>
        <button v-else class="pg__btn" :class="{ 'pg__btn--active': p === pagination.page }" :disabled="loading" @click="go(p)">{{ p }}</button>
      </template>

      <button class="pg__btn pg__btn--text" :disabled="pagination.page === pagination.pages || loading" @click="go(pagination.page + 1)">Siguiente <i class="fa-solid fa-chevron-right"></i></button>
      <button class="pg__btn" :disabled="pagination.page === pagination.pages || loading" title="Última página" @click="go(pagination.pages)"><i class="fa-solid fa-angles-right"></i></button>

      <label class="pg__jump">
        Ir a
        <input v-model="pageInput" type="number" min="1" :max="pagination.pages" inputmode="numeric" @keydown.enter.prevent="goInput" @blur="goInput" />
      </label>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.pg {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  background: $PHB-SURFACE;
  border: 1px solid $PHB-BORDER;
  border-radius: 0.9rem;
  padding: 0.75rem 1rem;
  font-family: $font-secondary;

  &__summary { font-size: 0.85rem; color: $PHB-TEXT-3; strong { color: $PHB-TEXT-1; font-weight: 600; } }
  &__sep { margin: 0 0.5rem; opacity: 0.5; }

  &__controls { display: flex; align-items: center; gap: 0.3rem; flex-wrap: wrap; }

  &__btn {
    min-width: 36px;
    height: 36px;
    padding: 0 0.6rem;
    border-radius: 0.55rem;
    background: transparent;
    border: 1px solid $PHB-BORDER-MEDIUM;
    color: $PHB-TEXT-1;
    font-family: $font-secondary;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    transition: border-color 0.15s, background 0.15s, color 0.15s;
    &:hover:not(:disabled) { border-color: $PHB-CYAN; color: $PHB-CYAN; }
    &--active { background: $PHB-CYAN; color: $PHB-NAVY-DARK; border-color: $PHB-CYAN; font-weight: 700; }
    &--text { padding: 0 0.8rem; }
    &:disabled { opacity: 0.35; cursor: not-allowed; }
  }

  &__gap { color: $PHB-TEXT-3; padding: 0 0.2rem; }

  &__jump {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-left: 0.5rem;
    font-size: 0.8rem;
    color: $PHB-TEXT-3;
    input {
      width: 58px;
      height: 36px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid $PHB-BORDER-MEDIUM;
      border-radius: 0.55rem;
      color: $PHB-TEXT-1;
      text-align: center;
      font-size: 0.85rem;
      outline: none;
      &:focus { border-color: $PHB-CYAN; }
    }
  }

  @media (max-width: 640px) {
    justify-content: center;
    &__summary { width: 100%; text-align: center; }
    &__controls { justify-content: center; }
  }
}
</style>
