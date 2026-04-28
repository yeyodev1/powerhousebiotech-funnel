<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const scrollContainerRef = ref<HTMLElement | null>(null)

// Cases data: Focus on clinical proof + Star ratings
const cases = [
  {
    id: '01',
    category: 'Caso de Éxito',
    title: 'Fatiga Crónica',
    rating: 5,
    context: 'Paciente con evolución de 7 años. Múltiples tratamientos fallidos previos. Sin respuesta biológica inicial.',
    analysis: 'Evaluación EVR™ detectó inflamación sistémica crítica y disfunción mitocondrial de grado IV.',
    strategy: 'Protocolo de Biorreprogramación™ celular intensivo para restaurar el terreno biológico.',
    result: ['Energía vital recuperada en 21 días', 'Marcadores inflamatorios normalizados'],
    isRejected: false
  },
  {
    id: '02',
    category: 'Caso de Éxito',
    title: 'Dolor Articular',
    rating: 5,
    context: 'Paciente enfocado en medicina convencional sin éxito. Ambiente articular degenerativo.',
    analysis: 'Se identificó toxicidad tisular que impedía cualquier proceso de regeneración natural.',
    strategy: 'Recalibración metabólica profunda y optimización del microambiente celular.',
    result: ['Eliminación total del dolor inflamatorio', 'Evitó intervención quirúrgica mayor'],
    isRejected: false
  },
  {
    id: '03',
    category: 'Honestidad Clínica',
    title: 'Paciente Rechazado',
    rating: 5, // Representing high satisfaction with transparency
    context: 'Paciente con estado biológico irreversible tras análisis clínico exhaustivo.',
    analysis: 'La Evaluación de Viabilidad indicó una tasa de éxito inferior al umbral ético de PHB™.',
    strategy: 'Decisión de NO tratar. Recomendación de cuidados paliativos y soporte médico tradicional.',
    result: ['Cero inversión en falsas promesas', 'Claridad absoluta sobre su estado real'],
    isRejected: true
  }
]

onMounted(() => {
  if (!sectionRef.value || !scrollContainerRef.value) return

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia()

    mm.add({
      isDesktop: '(min-width: 769px)',
      isMobile: '(max-width: 768px)'
    }, (context) => {
      const { isMobile } = context.conditions as any
      const horizontalLength = scrollContainerRef.value!.scrollWidth - window.innerWidth

      // Main Horizontal Scroll
      gsap.to(scrollContainerRef.value, {
        x: -horizontalLength,
        ease: 'none',
        id: 'horizontalScroll', // CRITICAL: This was missing and caused containerAnimation to fail
        scrollTrigger: {
          trigger: sectionRef.value,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          start: 'top top',
          end: () => `+=${horizontalLength + (isMobile ? 800 : 1200)}`,
          invalidateOnRefresh: true,
        }
      })

      // Progress bar animation
      gsap.to('.phb-cases__progress-bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.value,
          scrub: 1,
          start: 'top top',
          end: () => `+=${horizontalLength + (isMobile ? 800 : 1200)}`,
        }
      })

      // Animation for card contents as they enter the view
      const cards = gsap.utils.toArray('.phb-case-card')
      cards.forEach((card: any) => {
        gsap.from(card.querySelectorAll('.phb-case-card__content > *'), {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'left 85%',
            containerAnimation: gsap.getById('horizontalScroll'),
            toggleActions: 'play none none reverse',
          }
        })
      })
    })
  }, sectionRef.value)
})

</script>

<template>
  <section class="phb-cases" ref="sectionRef" id="casos">
    <div class="phb-cases__sticky">
      
      <!-- Top header -->
      <div class="phb-cases__header" data-aos="fade-right">
        <div class="phb-cases__header-inner">
          <!-- <span class="phb-cases__label">Evidencia Real —</span> -->
          <h2 class="phb-cases__title">Cuando se decide bien… <br>los resultados dejan de ser suerte</h2>
        </div>
      </div>

      <!-- Scroll container -->
      <div class="phb-cases__scroll" ref="scrollContainerRef">
        <div 
          v-for="item in cases" 
          :key="item.id" 
          class="phb-case-card"
          :class="{ 'is-rejected': item.isRejected }"
        >
          <div class="phb-case-card__inner">
            
            <!-- Atmosphere Layer -->
            <div class="phb-case-card__mesh"></div>
            <div class="phb-case-card__glow"></div>

            <!-- Card Content -->
            <div class="phb-case-card__content">
              <div class="phb-case-card__top">
                <div class="phb-case-card__rating">
                  <i v-for="n in 5" :key="n" class="fa-solid fa-star"></i>
                </div>
                <span class="phb-case-card__tag">{{ item.category }}</span>
              </div>
              
              <h3 class="phb-case-card__main-title">{{ item.title }}</h3>

              <div class="phb-case-card__grid">
                <div class="phb-case-card__col">
                  <span class="phb-case-card__info-label">Contexto</span>
                  <p>{{ item.context }}</p>
                </div>
                <div class="phb-case-card__col">
                  <span class="phb-case-card__info-label">DECIDE™ Report</span>
                  <p>{{ item.analysis }}</p>
                </div>
              </div>

              <div class="phb-case-card__result" :class="{ 'is-rejected': item.isRejected }">
                <span class="phb-case-card__info-label" v-if="!item.isRejected">Desenlace PHB™</span>
                <span class="phb-case-card__info-label" v-else>Transparencia PHB™</span>
                <ul class="phb-case-card__bullet-list">
                  <li v-for="(res, idx) in item.result" :key="idx">
                    <i class="fa-solid" :class="item.isRejected ? 'fa-xmark' : 'fa-check-circle'"></i>
                    {{ res }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Highlight Statement -->
        <div class="phb-case-card phb-case-card--statement">
           <div class="phb-case-card__inner">
             <div class="phb-case-card__mesh"></div>
             <div class="phb-case-card__statement-content">
               <div class="phb-case-card__icon">
                 <i class="fa-solid fa-triangle-exclamation"></i>
               </div>
               <p class="phb-case-card__statement-text">
                 <strong>Y esto es algo que el 90% de los doctores</strong> 
                 que no tienen nuestra misma experiencia, 
                 <span class="phb-highlight-cyan">ignoran por completo.</span>
               </p>
             </div>
           </div>
        </div>

        <!-- Closing slide -->
        <div class="phb-case-card phb-case-card--outro">
           <div class="phb-case-card--outro__inner">
              <p class="phb-case-card--outro__desc">
                Si no podemos garantizar una mejoría medible, seremos los primeros en decírtelo.
                Nuestra ética clínica está por encima de cualquier tratamiento.
              </p>
              <div class="phb-case-card--outro__action">
                <router-link to="/cualificar" class="phb-case-card--outro__badge">
                  DAR CLICK AQUÍ <i class="fa-solid fa-arrow-right"></i>
                </router-link>
              </div>
           </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.phb-cases {
  position: relative;
  background-color: #ffffff;
  color: #1a1823;
  overflow: hidden;

  &__sticky {
    height: 100vh;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 4rem 0;

    @media (max-width: 768px) {
      padding: 2rem 0;
    }
  }

  &__header {
    width: 100%;
    padding: 0 8vw;
    z-index: 10;

    &-inner {
      max-width: 900px;
    }
  }

  &__label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.3em;
    color: var(--phb-cyan, #21bcfa);
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    display: block;
    opacity: 0.8;
  }

  &__title {
    font-size: clamp(2.2rem, 4vw, 4.5rem);
    font-weight: 700;
    line-height: 1.0;
    letter-spacing: -0.04em;
    text-transform: uppercase;
    color: #1a1823;
  }

  &__scroll {
    display: flex;
    padding-left: 8vw;
    gap: 5rem;
    align-items: center;
    height: 65vh;
    width: fit-content;
    will-change: transform;

    @media (max-width: 768px) {
      height: 52vh;
      gap: 1.5rem;
    }
  }

  // Individual Cards
  .phb-case-card {
    flex-shrink: 0;
    width: 85vw;
    max-width: 900px;
    height: 100%;
    background: #0c1445;
    border: 1px solid rgba(33, 188, 251, 0.1);
    border-radius: 48px;
    position: relative;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 40px 120px rgba(0, 0, 0, 0.4),
      inset 0 0 40px rgba(33, 188, 251, 0.05);
    color: #ffffff;

    @media (min-width: 1024px) {
      width: 50vw;
    }

    &:hover {
      border-color: rgba(33, 188, 251, 0.3);
      transform: translateY(-5px);
      box-shadow: 0 60px 140px rgba(0, 0, 0, 0.5);

      .phb-case-card__glow {
        opacity: 0.15;
      }
    }

    &.is-rejected {
      background: #111435;
      opacity: 0.8;

      .phb-case-card__tag {
        color: rgba(255, 255, 255, 0.5);
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.1);
      }
    }

    &__mesh {
      position: absolute;
      inset: 0;
      opacity: 0.25;
      background: radial-gradient(at 20% 20%, rgba(23, 24, 70, 0.8) 0%, transparent 80%),
        radial-gradient(at 80% 15%, rgba(33, 188, 251, 0.15) 0%, transparent 65%),
        radial-gradient(at 85% 85%, rgba(18, 120, 243, 0.15) 0%, transparent 70%),
        radial-gradient(at 15% 85%, rgba(24, 231, 240, 0.12) 0%, transparent 70%);
      z-index: 0;
    }

    &__glow {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 50% 50%, var(--phb-cyan, #21bcfa) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.6s ease;
      z-index: 0;
      pointer-events: none;
    }

    &__inner {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: clamp(1.5rem, 5vw, 4rem);
      position: relative;
      z-index: 1;

      @media (max-width: 768px) {
        padding: 1.5rem 1.5rem 1rem;
      }
    }

    &__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;

      @media (max-width: 768px) {
        margin-bottom: 1rem;
      }
    }

    &__rating {
      color: #FFD700;
      font-size: 1rem;
      display: flex;
      gap: 0.4rem;
      filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.4));
    }

    &__tag {
      font-size: 0.7rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--phb-cyan, #21bcfa);
      background: rgba(33, 188, 250, 0.08);
      padding: 0.6rem 1.2rem;
      border-radius: 100px;
      border: 1px solid rgba(33, 188, 250, 0.15);
    }

    &__main-title {
      font-size: clamp(2rem, 4vw, 3.5rem);
      font-weight: 300;
      margin-bottom: 2rem;
      color: #ffffff;
      letter-spacing: -0.02em;

      @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }
    }

    &__grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }

    &__info-label {
      display: block;
      font-size: 0.7rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.25em;
      color: var(--phb-cyan, #21bcfa);
      opacity: 0.8;
      margin-bottom: 1.2rem;

      @media (max-width: 768px) {
        margin-bottom: 0.4rem;
      }
    }

    p {
      font-size: 1.05rem;
      line-height: 1.6;
      font-weight: 300;
      color: rgba(255, 255, 255, 0.7);
      margin: 0;

      @media (max-width: 768px) {
        font-size: 0.95rem;
      }
    }

    &__result {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);

      @media (max-width: 768px) {
        margin-top: 1.5rem;
        padding-top: 1rem;
      }

      &.is-rejected {
        .phb-case-card__info-label {
          color: rgba(255, 255, 255, 0.3);
        }

        .phb-case-card__bullet-list li {
          color: rgba(255, 255, 255, 0.4);
        }
      }
    }

    &__bullet-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      li {
        font-size: 1.05rem;
        color: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: flex-start;
        gap: 0.8rem;
        margin-bottom: 0.6rem;

        @media (max-width: 768px) {
          font-size: 0.95rem;
        }

        i {
          font-size: 1.1rem;
          color: var(--phb-cyan, #21bcfa);
          filter: drop-shadow(0 0 5px rgba(33, 188, 250, 0.3));
        }
      }
    }
  }

  // Statement Card Specifics
  .phb-case-card--statement {
    background: #171846;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    .phb-case-card__inner {
      justify-content: center;
      width: 100%;
    }

    .phb-case-card__mesh {
      opacity: 0.2;
    }
  }

  .phb-case-card__statement-content {
    max-width: 700px;
    margin: 0 auto;
  }

  .phb-case-card__icon {
    font-size: 3rem;
    color: var(--phb-cyan, #21bcfa);
    margin-bottom: 2rem;
    filter: drop-shadow(0 0 20px rgba(33, 188, 250, 0.4));

    @media (max-width: 768px) {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }

  .phb-case-card__statement-text {
    font-size: clamp(1.8rem, 3.5vw, 2.8rem) !important;
    line-height: 1.3 !important;
    color: #ffffff !important;
    font-weight: 300 !important;

    strong {
      font-weight: 800;
      color: #ffffff;
    }

    .phb-highlight-cyan {
      color: var(--phb-cyan, #21bcfa);
      font-weight: 800;
      display: block;
      margin-top: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    @media (max-width: 768px) {
      font-size: 1.4rem !important;
    }
  }

  // Outro Slide
  .phb-case-card--outro {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: none;

    &__inner {
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    &__title {
      font-size: clamp(3rem, 6vw, 5rem);
      font-weight: 200;
      margin-bottom: 2.5rem;
      line-height: 1.0;
      letter-spacing: -0.05em;
    }

    &__desc {
      font-size: 1.6rem !important;
      padding: 16px;
      line-height: 1.3 !important;
      color: #1a1823 !important;
      margin-bottom: 4rem;
      font-weight: normal !important;
      letter-spacing: -0.02em;

      @media (max-width: 768px) {
        font-size: 1.8rem !important;
        margin-bottom: 3rem;
      }
    }

    &__badge {
      display: inline-flex;
      align-items: center;
      gap: 1rem;
      padding: 1.4rem 3.5rem;
      border: 1px solid rgba(33, 188, 251, 0.5);
      background: rgba(33, 188, 251, 0.08);
      border-radius: 100px;
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--phb-cyan, #21bcfa);
      letter-spacing: 0.2em;
      text-decoration: none;
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      cursor: pointer;

      &:hover {
        background: var(--phb-cyan, #21bcfa);
        color: #fff;
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(33, 188, 251, 0.3);
      }
    }
  }

  &__footer {
    padding: 2.5rem 8vw;
    background: #171846; // Dark Navy as requested
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    position: relative;
    z-index: 10;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1.5rem;
      padding: 2rem 5vw 5rem;
    }
  }

  &__progress {
    width: 100%;
    max-width: 300px;
    height: 1px;
    background: rgba(0, 0, 0, 0.05);
    position: relative;

    &-bar {
      position: absolute;
      top: -1px;
      left: 0;
      width: 100%;
      height: 3px;
      background: var(--phb-cyan, #21bcfa);
      transform-origin: left;
      transform: scaleX(0);
      box-shadow: 0 0 15px rgba(33, 188, 250, 0.5);
    }
  }

  &__guide {
    font-size: 0.7rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    text-align: center;

    @media (max-width: 768px) {
      gap: 0.8rem;
    }

    i {
      font-size: 1rem;
      color: var(--phb-cyan, #21bcfa);
    }
  }
}
</style>
