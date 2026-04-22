<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PhbEncryptedText from '../phb/PhbEncryptedText.vue'
import { useLocale } from '@/composables/useLocale'

gsap.registerPlugin(ScrollTrigger)

const { t } = useLocale()
const sectionRef = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRef.value || !bgRef.value) return

  const ctx = gsap.context(() => {
    // Background Parallax
    gsap.to(bgRef.value, {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      y: '20%',
      ease: 'none'
    })

    // Glass box entrance
    gsap.from('.sha-kpi__glass', {
      scrollTrigger: {
        trigger: '.sha-kpi__glass',
        start: 'top 85%',
      },
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    })

    // Stats staggered entrance
    gsap.from('.sha-kpi-stat', {
      scrollTrigger: {
        trigger: '.sha-kpi__stats-grid',
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    })
  }, sectionRef.value)
})
</script>

<template>
  <section class="sha-kpi" ref="sectionRef">
    <!-- Full-width background with Parallax -->
    <div class="sha-kpi__bg-wrap">
      <img 
        ref="bgRef"
        src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1600" 
        alt="Biotech Lab Background" 
        class="sha-kpi__bg-img"
      />
      <div class="sha-kpi__bg-overlay"></div>
    </div>

    <div class="sha-kpi__container">
      
      <div class="sha-kpi__glass">
        <div class="sha-kpi__content">
          <header class="sha-kpi__header">
            <h2 class="sha-kpi__quote">
              {{ t.shaKpi.quote }} <span>{{ t.shaKpi.quoteAccent }}</span>
            </h2>
          </header>

          <div class="sha-kpi__stats-grid">
            <div v-for="(stat, index) in t.shaKpi.stats" :key="index" class="sha-kpi-stat">
              <div class="sha-kpi-stat__wrap">
                <h3 class="sha-kpi-stat__val">
                  <PhbEncryptedText 
                    :text="stat.val"
                    charset="0123456789%"
                    :revealDelayMs="120"
                    :flipDelayMs="30"
                  />
                </h3>
                <p class="sha-kpi-stat__text">{{ stat.text }}</p>
              </div>
            </div>
          </div>

          <footer class="sha-kpi__footer">
            <p>{{ t.shaKpi.footer }}</p>
          </footer>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.sha-kpi {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10rem 2rem;
  overflow: hidden;
  background-color: #0d0f28;

  &__bg-wrap {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
  }

  &__bg-img {
    width: 100%;
    height: 120%; // Extra height for parallax
    object-fit: cover;
    object-position: center;
    opacity: 0.4;
  }

  &__bg-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(13, 15, 40, 0.4) 0%, #0d0f28 100%);
  }

  &__container {
    width: 100%;
    max-width: 1100px;
    position: relative;
    z-index: 1;
  }

  &__glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 40px;
    padding: 4rem;
    box-shadow: 0 40px 100px rgba(0,0,0,0.5);

    @media (max-width: 768px) {
      padding: 2.5rem;
      border-radius: 24px;
    }
  }

  &__header {
    text-align: center;
    margin-bottom: 5rem;
  }

  &__quote {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 300;
    line-height: 1.2;
    color: #ffffff;

    span {
      display: block;
      color: var(--phb-cyan, #21bcfa);
      font-weight: 500;
      margin-top: 0.5rem;
    }
  }

  &__stats-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4rem;

    @media (min-width: 768px) {
      gap: 6rem clamp(4rem, 8vw, 10rem);
    }
  }

  .sha-kpi-stat {
    text-align: center;
    flex: 0 1 100%;
    max-width: 500px;

    @media (min-width: 768px) {
      flex: 0 1 calc(50% - 5rem);
    }

    &__val {
      font-size: clamp(3rem, 6vw, 4.5rem);
      font-weight: 300;
      color: #ffffff;
      margin-bottom: 1rem;
      line-height: 1;
    }

    &__text {
      font-size: 1rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 300;
      max-width: 400px;
      margin: 0 auto;
    }
  }

  &__footer {
    margin-top: 6rem;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 2rem;

    p {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.3);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }
}
</style>
