<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PhbEncryptedText from '../phb/PhbEncryptedText.vue'

const stats = [
  { val: '50%', text: 'De los adultos mayores de 45 años viven con al menos una enfermedad crónica.' },
  { val: '60%', text: 'De las personas tienen más de una condición que provoca malestar (6 de cada 10).' },
  { val: '70%', text: 'De los tratamientos convencionales no logran los resultados esperados.' },
  { val: '20%', text: 'Es el porcentaje de casos viables que aceptamos para asegurar resultados.' }
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsap.fromTo('.sha-kpi-stat', 
    { opacity: 0, y: 20 },
    {
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.sha-kpi-right',
        start: 'top 80%'
      }
    }
  )
})
</script>

<template>
  <section class="sha-kpi">
    <div class="sha-kpi__container">
      
      <!-- Left side: The Quote / Reality styling -->
      <div class="sha-kpi__left">
        <h2 class="sha-kpi__quote">
          "<span style="font-style: italic; font-weight: 300;">La realidad incómoda:</span><br/>
          Vas de médico en médico, de tratamiento en tratamiento... sin un criterio que conecte todo."
        </h2>
        
        <div class="sha-kpi__sub">
          <span class="sha-kpi__sub-label">El Problema Real —</span>
          El problema no es lo que haces. Es que estás actuando sin entender tu biología profunda. Vas a ciegas.
        </div>

        <button class="sha-kpi__btn">
          Descubrir Nuestro Método
        </button>
      </div>

      <!-- Right side: The Stats grid and an overlay image to mimic the SHA section -->
      <div class="sha-kpi__right">
        <div class="sha-kpi__image-bg">
          <div class="sha-kpi__image-overlay"></div>
          <!-- Background image for the right side matching the aesthetic -->
          <img src="https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Regenerative treatment" />
        </div>

        <!-- Floating Stats on top of the image (or alongside) -->
        <div class="sha-kpi__stats-grid">
          <div v-for="(stat, index) in stats" :key="index" class="sha-kpi-stat">
            <h3 class="sha-kpi-stat__val">
              <PhbEncryptedText 
                :text="stat.val"
                charset="0123456789%"
                :revealDelayMs="120"
                :flipDelayMs="30"
                revealedClass="font-weight-400"
                encryptedClass="opacity-50"
              />
            </h3>
            <p class="sha-kpi-stat__text">{{ stat.text }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;

.sha-kpi {
  background-color: var(--phb-bg, #0d0f28);
  color: var(--phb-text-1, #ffffff);
  padding: 8rem 0; /* Let left side touch edges inside flex */
  overflow: hidden;

  &__container {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    
    @media (min-width: 1024px) {
      flex-direction: row;
      align-items: stretch;
      min-height: 80vh;
    }
  }

  &__left {
    padding: 2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (min-width: 1024px) {
      padding: 4rem 6rem;
      max-width: 55%;
    }
  }

  &__quote {
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 300;
    line-height: 1.25;
    color: var(--phb-white);
    margin: 0 0 3rem 0;
    max-width: 600px;
  }

  &__sub {
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 3rem;
    max-width: 480px;

    &-label {
      font-weight: 600;
      color: var(--phb-white);
    }
  }

  &__btn {
    align-self: flex-start;
    padding: 1rem 2rem;
    border: 1px solid rgba(255,255,255,0.3);
    background: transparent;
    color: var(--phb-white);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: var(--phb-white);
      color: var(--phb-bg);
    }
  }

  &__right {
    flex: 1;
    position: relative;
    padding: 4rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 1024px) {
      padding: 0;
    }
  }

  &__image-bg {
    position: absolute;
    inset: 0;
    z-index: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, #0d0f28 0%, rgba(13, 15, 40, 0.6) 100%);
    z-index: 1;

    @media (max-width: 1024px) {
      background: linear-gradient(to top, #0d0f28 0%, rgba(13, 15, 40, 0.6) 100%);
    }
  }

  &__stats-grid {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    max-width: 500px;
    padding: 2rem;
  }

  .sha-kpi-stat {
    &__val {
      font-size: clamp(2.5rem, 4vw, 3.5rem);
      font-weight: 300;
      margin: 0 0 0.5rem 0;
      color: var(--phb-cyan);
    }

    &__text {
      font-size: 0.85rem;
      line-height: 1.5;
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
    }
  }
}
</style>
