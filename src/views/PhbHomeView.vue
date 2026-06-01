
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import AOS from 'aos'
import 'aos/dist/aos.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import JuanHeader from '@/components/juan/JuanHeader.vue'
import PhbHero from '@/components/phb/PhbHero.vue'
import PhbAbout from '@/components/phb/PhbAbout.vue'
import PhbScience from '@/components/phb/PhbScience.vue'
import PhbTeam from '@/components/phb/PhbTeam.vue'
import PhbCases from '@/components/phb/PhbCases.vue'
import PhbCtaTransition from '@/components/phb/PhbCtaTransition.vue'
import PhbExpectations from '@/components/phb/PhbExpectations.vue'
import PhbCta from '@/components/phb/PhbCta.vue'
import PhbFooter from '@/components/phb/PhbFooter.vue'
import PhbAuthority from '@/components/phb/PhbAuthority.vue'
import PhbProblem from '@/components/phb/PhbProblem.vue'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null
let lenisTicker: ((time: number) => void) | null = null

onMounted(() => {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  lenisTicker = (time: number) => lenis!.raf(time * 1000)
  gsap.ticker.add(lenisTicker)
  gsap.ticker.lagSmoothing(0)
  lenis.on('scroll', ScrollTrigger.update)

  AOS.init({
    duration: 700,
    easing: 'ease-out',
    once: true,
    offset: 60,
  })

  // Re-trigger scroll animations after Vue mounts DOM
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 500)
})

onUnmounted(() => {
  lenis?.destroy()
  if (lenisTicker) gsap.ticker.remove(lenisTicker)
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <div class="phb-home">
    <JuanHeader />
    <PhbHero />
    <PhbAbout />
    <PhbAuthority />
    <PhbProblem /> 
    <PhbExpectations />
    <!-- Removed SHA-inspired sections -->
    <PhbCtaTransition />
    <PhbTeam />
    <PhbCases />
    <!-- End new sections -->
    <!-- WhatsApp Community Section -->
    <section class="phb-community">
      <div class="phb-container">
        <div class="phb-community__inner">
          <div class="phb-community__icon">
            <i class="fa-brands fa-whatsapp"></i>
          </div>
          <h2 class="phb-community__title">¿Ya formas parte de nuestra comunidad?</h2>
          <p class="phb-community__desc">Únete a nuestro canal exclusivo de WhatsApp y accede a contenido de valor, casos clínicos y sesiones de preguntas y respuestas con nuestro equipo.</p>
          <a href="/comunidad" class="phb-community__cta">
            <i class="fa-brands fa-whatsapp"></i>
            Unirme a la comunidad
          </a>
        </div>
      </div>
    </section>

    <PhbCta />
    <PhbFooter />
  </div>
</template>

<style lang="scss">
.phb-home {
  background: var(--phb-white);
  font-family: var(--phb-font);
  color: var(--phb-text);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img,
  video {
    display: block;
    max-width: 100%;
  }
}

/* AOS overrides */
.phb-home [data-aos] {
  transition-duration: 0.7s !important;
}

/* WhatsApp Community Section */
.phb-community {
  background: linear-gradient(135deg, #0a0b1a 0%, #1a1d3f 100%);
  padding: clamp(80px, 12vw, 140px) 0;
  text-align: center;

  .phb-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 clamp(20px, 8vw, 120px);
  }

  &__inner {
    max-width: 680px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  &__icon {
    width: 80px;
    height: 80px;
    border-radius: 24px;
    background: rgba(37, 211, 102, 0.1);
    border: 1px solid rgba(37, 211, 102, 0.3);
    color: #25D366;
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 30px rgba(37, 211, 102, 0.15);
  }

  &__title {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    color: #ffffff;
    margin: 0;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  &__desc {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(0.95rem, 1.6vw, 1.1rem);
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 32px;
    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
    border: none;
    border-radius: 100px;
    color: #ffffff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    box-shadow: 0 8px 30px rgba(37, 211, 102, 0.3);
    transition: all 0.3s ease;
    margin-top: 8px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(37, 211, 102, 0.5);
    }
  }
}
</style>
