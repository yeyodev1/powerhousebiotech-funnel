<template>
  <header class="site-header" :class="{ scrolled: isScrolled }">
    <div class="header-left">
      <button class="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <button class="header-lang">EN &#9660;</button>
    </div>

    <div class="header-center">
      <a href="#" class="site-logo">SHA</a>
    </div>

    <div class="header-right">
      <a href="#footer-cta" class="cta-book">Book</a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 80
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style lang="scss" scoped>
.site-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--sha-pad-x);
  height: 64px;
  transition: background 0.3s, backdrop-filter 0.3s;

  &.scrolled {
    background: rgba(9, 10, 17, 0.92);
    backdrop-filter: blur(12px);
  }
}

.header-left { display: flex; align-items: center; gap: 32px; }
.header-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.header-right { display: flex; align-items: center; gap: 20px; }

.site-logo {
  font-size: 22px;
  font-weight: var(--sha-fw-bold);
  letter-spacing: 0.25em;
  color: var(--sha-white);
  text-decoration: none;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;

  span {
    display: block;
    width: 24px;
    height: 1px;
    background: var(--sha-white);
    transition: transform 0.3s;
  }
}

.header-lang {
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--sha-font);
}

.cta-book {
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 8px 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: var(--sha-white);
  background: none;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: var(--sha-white);
    color: var(--sha-text-dark);
  }
}

@media (max-width: 768px) {
  .header-center {
    position: static;
    transform: none;
  }
  .site-header {
    justify-content: space-between;
  }
}
</style>
