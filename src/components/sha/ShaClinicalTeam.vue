<template>
  <section class="clinical-team" id="clinical-team">
    <div class="gap-l"></div>

    <div class="clinical-team__header">
      <div class="sha-container">
        <div class="line-title line-title--animated" :class="{ 'in-view': lineTitleVisible }" ref="lineTitle">
          MEET OUR TEAM
        </div>
        <div class="gap20"></div>
        <h2 class="clinical-team__heading">The Science at the <em>Heart</em> of SHA</h2>
        <p class="clinical-team__desc">
          Our medical team brings together world-class experts in longevity, preventive medicine and performance,
          united by a shared, science-based approach. We are pleased to introduce the heads of each unit—leading
          specialists who guide every area of the SHA Method with expertise and a truly multidisciplinary vision of health.
        </p>
      </div>
    </div>

    <div class="gap60"></div>

    <div class="clinical-team__nav">
      <button class="carousel-nav-btn" @click="slidePrev" aria-label="Previous">&#8592;</button>
      <button class="carousel-nav-btn" @click="slideNext" aria-label="Next">&#8594;</button>
    </div>

    <div class="splide" ref="splideEl" aria-label="Clinical team members">
      <div class="splide__track">
        <ul class="splide__list">
          <li class="splide__slide" v-for="doc in doctors" :key="doc.name">
            <div class="doctor-card">
              <img :src="doc.img" :alt="doc.name" loading="lazy" />
              <div class="doctor-card__info">
                <div class="doctor-card__name">{{ doc.name }}</div>
                <div class="doctor-card__role">{{ doc.role }}</div>
                <div class="doctor-card__location">{{ doc.location }}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="gap-l"></div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Splide from '@splidejs/splide'
import '@splidejs/splide/css'

const splideEl = ref<HTMLElement | null>(null)
const lineTitle = ref<HTMLElement | null>(null)
const lineTitleVisible = ref(false)
let splideInstance: Splide | null = null
let observer: IntersectionObserver | null = null

const doctors = [
  {
    name: 'Dr. Mariel Silva',
    role: 'Medical Services Director',
    location: 'SHA Spain',
    img: 'https://shawellness.com/wp-content/uploads/2025/09/dr-mariel-silva.jpg',
  },
  {
    name: 'Dr. Jair Olivares',
    role: 'Medical Services Director',
    location: 'SHA Mexico',
    img: 'https://shawellness.com/wp-content/uploads/2025/09/dr-jair-olivares.jpg',
  },
  {
    name: 'Dr. Vicente Mera',
    role: 'Internal & Longevity Specialist',
    location: 'SHA Spain',
    img: 'https://shawellness.com/wp-content/uploads/2025/09/dr-vicente-mera.jpg',
  },
  {
    name: 'Dr. Andrea Márquez',
    role: 'Head of Regenerative Medicine',
    location: 'SHA Mexico',
    img: 'https://shawellness.com/wp-content/uploads/2025/09/dr-andrea-marquez.jpg',
  },
  {
    name: 'Dr. Esteban Torres',
    role: 'Neurology & Cognitive Health',
    location: 'SHA Spain',
    img: 'https://shawellness.com/wp-content/uploads/2025/09/dr-esteban-torres.jpg',
  },
]

function slidePrev() { splideInstance?.go('<') }
function slideNext() { splideInstance?.go('>') }

onMounted(() => {
  if (splideEl.value) {
    splideInstance = new Splide(splideEl.value, {
      type: 'loop',
      perPage: 4,
      perMove: 1,
      gap: '2px',
      arrows: false,
      pagination: false,
      breakpoints: {
        1024: { perPage: 3 },
        768: { perPage: 2 },
        480: { perPage: 1 },
      },
    }).mount()
  }

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

onUnmounted(() => {
  splideInstance?.destroy()
  observer?.disconnect()
})
</script>

<style lang="scss" scoped>
.clinical-team {
  background: var(--sha-light);
  color: var(--sha-text-dark);
  overflow: hidden;
  font-family: var(--sha-font);
}

.sha-container {
  width: 100%;
  max-width: var(--sha-container);
  margin: 0 auto;
  padding: 0 var(--sha-pad-x);
}

.gap-l { height: clamp(60px, 8vw, 120px); }
.gap20 { height: 20px; }
.gap60 { height: 60px; }

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

.clinical-team__heading {
  font-size: clamp(1.8rem, 3.5vw, 3.5rem);
  font-weight: var(--sha-fw-light);
  margin-top: 20px;
  max-width: 700px;
  line-height: 1.1;

  em { font-style: italic; }
}

.clinical-team__desc {
  font-size: 14px;
  color: var(--sha-text-muted);
  margin-top: 16px;
  max-width: 600px;
  line-height: 1.6;
}

.clinical-team__nav {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 0 var(--sha-pad-x);
  margin-bottom: 24px;
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

.doctor-card {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  background: #ccc;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    transition: transform 0.5s ease;
  }

  &:hover img { transform: scale(1.04); }
}

.doctor-card__info {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 20px 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
  color: var(--sha-white);
}

.doctor-card__name {
  font-size: 15px;
  font-weight: var(--sha-fw-regular);
}

.doctor-card__role {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.65);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 4px;
}

.doctor-card__location {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 2px;
}
</style>
