<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

// We avoid internal GSAP for initial states to ensure components are visible by default
// and rely on the global AOS initialization in PhbHomeView.
const { t } = useLocale()
</script>

<template>
  <section class="sha-discover" id="metodo" ref="sectionRef">
    <!-- Fixed Mesh Background -->
    <div class="sha-discover__mesh"></div>

    <div class="phb-container">
      <!-- Main Glass Box -->
      <div 
        class="sha-discover__glass"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div class="sha-discover__grid">
          
          <!-- Left Side: Narrative -->
          <div class="sha-discover__info">
            <div class="phb-line-title">
              <!-- <span class="phb-line-title__line"></span> -->
              <!-- {{ t.discover.lineTitle }} -->
            </div>
            <h2 class="sha-discover__title">
              {{ t.discover.title }}
            </h2>
            <div class="sha-discover__footer-desktop">
              <div class="sha-discover__divider"></div>
              <p class="sha-discover__footer-text">
                {{ t.discover.footer }}
              </p>
            </div>
          </div>

          <!-- Right Side: Benefits List -->
          <div class="sha-discover__content">
            <ul class="sha-discover__list">
              <li 
                v-for="(item, index) in t.discover.items" 
                :key="index" 
                class="sha-discover__item"
                data-aos="fade-left"
                :data-aos-delay="index * 100"
              >
                <div class="sha-discover__icon">
                  <i class="fa-solid fa-circle-check"></i>
                </div>
                <p class="sha-discover__text">{{ item }}</p>
              </li>
            </ul>
            
            <!-- Mobile Footer -->
            <p class="sha-discover__footer-mobile">
              {{ t.discover.footer }}
            </p>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.sha-discover {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #05060f;
  overflow: hidden;
  padding: 4rem 0;

  &__mesh {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(at 20% 20%, rgba(23, 24, 70, 0.8) 0%, transparent 80%),
      radial-gradient(at 80% 15%, rgba(33, 188, 251, 0.15) 0%, transparent 65%),
      radial-gradient(at 85% 85%, rgba(18, 120, 243, 0.15) 0%, transparent 70%),
      radial-gradient(at 15% 85%, rgba(24, 231, 240, 0.12) 0%, transparent 70%);
    background-attachment: fixed;
    z-index: 1;
  }

  .phb-container {
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 60px);
    position: relative;
    z-index: 2;
  }

  &__glass {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 48px;
    padding: clamp(30px, 6vw, 80px);
    box-shadow: 0 40px 120px rgba(0, 0, 0, 0.6);
  }

  &__grid {
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 4rem;
    align-items: center;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }

  .phb-line-title {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--phb-cyan, #21bcfa);
    margin-bottom: 24px;
  }

  .phb-line-title__line {
    display: block;
    width: 32px;
    height: 1.5px;
    background: var(--phb-cyan, #21bcfa);
  }

  &__title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.1;
    color: #fff;
    letter-spacing: -0.04em;
    margin-bottom: 2rem;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 1.25rem 1.75rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    transition: all 0.4s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(33, 188, 251, 0.3);
      transform: translateX(12px);
    }
  }

  &__icon {
    font-size: 1.4rem;
    color: var(--phb-cyan, #21bcfa);
    flex-shrink: 0;
  }

  &__text {
    font-size: clamp(1rem, 1.3vw, 1.15rem);
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.5;
    font-weight: 300;
    margin: 0;
  }

  &__footer-desktop {
    margin-top: 3rem;

    @media (max-width: 1024px) {
      display: none;
    }
  }

  &__divider {
    width: 60px;
    height: 1px;
    background: rgba(255, 255, 255, 0.15);
    margin-bottom: 1.5rem;
  }

  &__footer-text {
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 300;
    font-style: italic;
    max-width: 400px;
  }

  &__footer-mobile {
    display: none;

    @media (max-width: 1024px) {
      display: block;
      margin-top: 2rem;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.3);
      font-style: italic;
      line-height: 1.6;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding-top: 1.5rem;
    }
  }
}
</style>
