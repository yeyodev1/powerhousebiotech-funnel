<template>
  <section class="advisory-board" id="advisory-board">
    <div class="sha-container">
      <div class="line-title line-title--animated" :class="{ 'in-view': lineTitleVisible }" ref="lineTitle">
        Scientific Excellence
      </div>
      <div class="gap20"></div>
      <h2 class="advisory-board__heading">Meet SHA's Scientific<br>Advisory Board</h2>
      <p class="advisory-board__desc">
        The Scientific Advisory Board works alongside SHA's medical team to shape the strategic direction of its
        medical programs, ensuring every protocol reflects the latest advances in clinical science and longevity research.
      </p>

      <div class="sab-card" data-aos="fade-in">
        <div>
          <div class="sab-thumbs">
            <img
              v-for="(m, i) in members"
              :key="m.name"
              class="sab-thumb"
              :class="{ active: currentIndex === i }"
              :src="m.img"
              :alt="m.name"
              @click="updateSab(i)"
            />
          </div>
          <div class="sab-nav">
            <button class="carousel-nav-btn" @click="prevMember" aria-label="Previous">&#8592;</button>
            <button class="carousel-nav-btn" @click="nextMember" aria-label="Next">&#8594;</button>
          </div>
        </div>

        <div class="sab-featured">
          <img
            class="sab-featured__img"
            :src="current.img"
            :alt="current.name"
            :style="{ opacity: fadeOpacity }"
          />
          <div>
            <div class="sab-featured__name" :style="{ opacity: fadeOpacity }">{{ current.name }}</div>
            <div class="sab-featured__role">{{ current.role }}</div>
            <p class="sab-featured__bio">{{ current.bio }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const lineTitle = ref<HTMLElement | null>(null)
const lineTitleVisible = ref(false)
const currentIndex = ref(0)
const fadeOpacity = ref(1)
let observer: IntersectionObserver | null = null

const members = [
  {
    name: 'DR. GUILLERMO TORRE',
    role: 'Cardiologist and Academic Healthcare Leader',
    bio: 'A prominent cardiologist and medical executive, Dr. Torre specializes in advanced cardiovascular care, preventive cardiology and innovation in healthcare systems, contributing to SHA\'s cardiometabolic optimization strategies.',
    img: 'https://shawellness.com/wp-content/uploads/2025/09/dr-guillermo-torre.jpg',
  },
  {
    name: 'DR. BEATRIZ DULLOSA',
    role: 'Health Coach & Advisor for Olympic Athletes',
    bio: 'Dr. Dullosa brings cutting-edge performance science to SHA\'s programs, working at the intersection of sports medicine, nutritional science, and longevity optimization for elite athletes and high-performing executives.',
    img: 'https://shawellness.com/wp-content/uploads/2025/10/expert-beatriz-dullosa.jpg',
  },
  {
    name: 'DR. BARBARA STRÝCOVÁ',
    role: 'Wimbledon Champion & Olympic Medalist',
    bio: 'As both a world-class athlete and health advocate, Barbara brings unique insights into peak physical performance, recovery optimization, and sustainable long-term health—validating SHA\'s scientific approach from a lived perspective.',
    img: 'https://shawellness.com/wp-content/uploads/2025/10/expert-barbara-stryncova.jpg',
  },
]

const current = computed(() => members[currentIndex.value])

function updateSab(index: number) {
  fadeOpacity.value = 0
  setTimeout(() => {
    currentIndex.value = index
    fadeOpacity.value = 1
  }, 200)
}

function prevMember() {
  updateSab((currentIndex.value - 1 + members.length) % members.length)
}

function nextMember() {
  updateSab((currentIndex.value + 1) % members.length)
}

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
.advisory-board {
  background: var(--sha-light);
  color: var(--sha-text-dark);
  padding: 160px 0;
  font-family: var(--sha-font);
}

.sha-container {
  width: 100%;
  max-width: var(--sha-container);
  margin: 0 auto;
  padding: 0 var(--sha-pad-x);
}

.gap20 { height: 20px; }

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

.advisory-board__heading {
  font-size: clamp(1.8rem, 3.5vw, 3.5rem);
  font-weight: var(--sha-fw-light);
  line-height: 1.1;
  max-width: 600px;
}

.advisory-board__desc {
  font-size: 14px;
  color: var(--sha-text-muted);
  margin-top: 16px;
  max-width: 500px;
  line-height: 1.6;
}

.sab-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  align-items: start;
  padding: 32px 0;
}

.sab-thumbs {
  display: flex;
  gap: 12px;
}

.sab-thumb {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.2s;

  &.active,
  &:hover { opacity: 1; }
}

.sab-nav {
  display: flex;
  gap: 12px;
  margin-top: 32px;
}

.carousel-nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--sha-text-dark);
  cursor: pointer;
  font-family: var(--sha-font);
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: var(--sha-text-dark);
    color: var(--sha-white);
  }
}

.sab-featured {
  display: flex;
  gap: 32px;
  align-items: start;
}

.sab-featured__img {
  width: 200px;
  height: 260px;
  object-fit: cover;
  object-position: top;
  flex-shrink: 0;
  transition: opacity 0.2s ease;
}

.sab-featured__name {
  font-size: 1.3rem;
  font-weight: var(--sha-fw-regular);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: opacity 0.2s ease;
}

.sab-featured__role {
  font-size: 13px;
  color: var(--sha-text-muted);
  margin-top: 8px;
  line-height: 1.4;
}

.sab-featured__bio {
  font-size: 13px;
  color: var(--sha-text-muted);
  margin-top: 16px;
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .sab-card { grid-template-columns: 1fr; }
}
</style>
