<template>
  <section class="sha-method" id="sha-method">

    <div class="sha-method__left">
      <div class="line-title line-title--animated" :class="{ 'in-view': lineTitleVisible }" ref="lineTitle">
        Explore
      </div>
      <div class="sha-method__links">
        <a href="#" class="sha-method__link">THE SHA METHOD</a>
        <a href="#" class="sha-method__link">AWARDS</a>
        <a href="#" class="sha-method__link">OUR STORY</a>
      </div>
    </div>

    <div class="sha-method__right">
      <img
        src="https://shawellness.com/wp-content/uploads/2025/10/sha-method-portrait.jpg"
        alt="SHA Method"
        loading="lazy"
      />
      <div class="sha-method__right-content">
        <div class="sha-method__right-label">Explore our integrative method</div>
        <button class="sha-method__right-arrow" aria-label="Explore">&#8599;</button>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const lineTitle = ref<HTMLElement | null>(null)
const lineTitleVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (lineTitle.value && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          lineTitleVisible.value = true
          observer?.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(lineTitle.value)
  }
})

onUnmounted(() => observer?.disconnect())
</script>

<style lang="scss" scoped>
.sha-method {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 60vh;
  font-family: var(--sha-font);
}

.sha-method__left {
  background: var(--sha-light);
  color: var(--sha-text-dark);
  padding: clamp(60px, 8vw, 120px) var(--sha-pad-x);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.line-title {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  font-weight: var(--sha-fw-regular);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--sha-text-muted);

  &::before {
    content: '';
    display: block;
    width: 0;
    height: 1px;
    background: currentColor;
    transition: width 0.8s ease;
    flex-shrink: 0;
  }

  &.in-view::before { width: 40px; }
}

.sha-method__links {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 32px;
}

.sha-method__link {
  font-size: clamp(1.5rem, 2.5vw, 2.5rem);
  font-weight: var(--sha-fw-light);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(30, 20, 30, 0.35);
  text-decoration: none;
  transition: color 0.2s;

  &:hover { color: var(--sha-text-dark); }
}

.sha-method__right {
  position: relative;
  overflow: hidden;
  background: var(--sha-dark);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(60%);
    opacity: 0.6;
  }
}

.sha-method__right-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(40px, 5vw, 80px);
  color: var(--sha-white);
}

.sha-method__right-label {
  font-size: 14px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '';
    display: block;
    width: 30px;
    height: 1px;
    background: rgba(255, 255, 255, 0.4);
  }
}

.sha-method__right-arrow {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: none;
  color: var(--sha-white);
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover { background: rgba(255, 255, 255, 0.15); }
}

@media (max-width: 1024px) {
  .sha-method {
    grid-template-columns: 1fr;
  }
  .sha-method__right { min-height: 50vh; }
}
</style>
