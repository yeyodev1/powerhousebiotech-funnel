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
    // Horizontal scroll calculation
    const horizontalLength = scrollContainerRef.value!.scrollWidth - window.innerWidth

    gsap.to(scrollContainerRef.value, {
      x: -horizontalLength,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.value,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${horizontalLength + 1000}`,
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
        end: () => `+=${horizontalLength + 1000}`,
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
          start: 'left center',
          toggleActions: 'play none none reverse',
          containerAnimation: gsap.getById('horizontalScroll') // Not strictly needed with trigger card but good practice
        }
      })
    })

  }, sectionRef.value)
})

</script>

<template>
  <section class="phb-cases" ref="sectionRef">
    <div class="phb-cases__sticky">
      
      <!-- Top header -->
      <div class="phb-cases__header" data-aos="fade-right">
        <div class="phb-cases__header-inner">
          <span class="phb-cases__label">Evidencia Real —</span>
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

        <!-- Closing slide -->
        <div class="phb-case-card phb-case-card--outro">
           <div class="phb-case-card--outro__inner">
              <h2 class="phb-case-card--outro__title">No buscamos pacientes… <br>buscamos resultados.</h2>
              <p class="phb-case-card--outro__desc">
                Si no podemos garantizar una mejoría medible, seremos los primeros en decírtelo.
                Nuestra ética clínica está por encima de cualquier tratamiento.
              </p>
              <div class="phb-case-card--outro__action">
                <span class="phb-case-card--outro__badge">SABER ES PODER</span>
              </div>
           </div>
        </div>
      </div>

      <!-- Footer progress -->
      <div class="phb-cases__footer">
        <div class="phb-cases__progress">
          <div class="phb-cases__progress-bar"></div>
        </div>
        <div class="phb-cases__guide">
          DESLIZA PARA VER LA VERDAD CLÍNICA <i class="fa-solid fa-arrow-right-long"></i>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.phb-cases {
  position: relative;
  background-color: #05060f;
  color: #fff;
  overflow: hidden;

  &__sticky {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 4rem 0;
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
    font-size: clamp(2.2rem, 5vw, 4.5rem);
    font-weight: 700;
    line-height: 1.0;
    letter-spacing: -0.04em;
    text-transform: uppercase;
  }

  &__scroll {
    display: flex;
    padding-left: 8vw;
    gap: 5rem;
    align-items: center;
    height: 60vh;
    width: fit-content;
    will-change: transform;
  }

  // Individual Cards
  .phb-case-card {
    flex-shrink: 0;
    width: 85vw;
    max-width: 900px;
    height: 100%;
    background: rgba(10, 11, 24, 0.4);
    backdrop-filter: blur(40px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 48px;
    position: relative;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    
    @media (min-width: 1024px) {
      width: 50vw;
    }

    &:hover {
      border-color: rgba(33, 188, 251, 0.3);
      background: rgba(10, 11, 24, 0.6);
      transform: scale(1.02);

      .phb-case-card__glow {
        opacity: 0.15;
      }
    }

    &.is-rejected {
      background: rgba(20, 20, 30, 0.4);
      border-color: rgba(255, 255, 255, 0.05);
      
      .phb-case-card__tag {
        color: rgba(255, 255, 255, 0.4);
        background: rgba(255, 255, 255, 0.05);
      }
      
      .phb-case-card__mesh {
        display: none;
      }
    }

    &__mesh {
      position: absolute;
      inset: 0;
      opacity: 0.4;
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
      padding: 4rem;
      position: relative;
      z-index: 1;
    }

    &__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
    }

    &__rating {
      color: #FFD700;
      font-size: 1rem;
      display: flex;
      gap: 0.4rem;
      filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.4));
    }

    &__tag {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--phb-cyan, #21bcfa);
      background: rgba(33, 188, 250, 0.1);
      padding: 0.6rem 1.2rem;
      border-radius: 100px;
      border: 1px solid rgba(33, 188, 250, 0.15);
    }

    &__main-title {
      font-size: clamp(2.5rem, 4vw, 3.5rem);
      font-weight: 300;
      margin-bottom: 3.5rem;
      color: #fff;
      letter-spacing: -0.02em;
    }

    &__grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
      margin-bottom: auto;
      
      @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
      }
    }

    &__info-label {
      display: block;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: var(--phb-cyan, #21bcfa);
      opacity: 0.6;
      margin-bottom: 1.2rem;
    }

    p {
      font-size: 1.05rem;
      line-height: 1.6;
      font-weight: 300;
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
    }

    &__result {
      margin-top: 4rem;
      padding-top: 3rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);

      &.is-rejected {
        .phb-case-card__info-label { color: rgba(255, 255, 255, 0.3); }
        .phb-case-card__bullet-list li { color: rgba(255, 255, 255, 0.4); }
        .fa-xmark { color: rgba(255, 255, 255, 0.2) !important; }
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
        font-size: 1.1rem;
        font-weight: 400;
        color: #fff;
        display: flex;
        align-items: center;
        gap: 1.2rem;
        
        i { 
          font-size: 1.1rem; 
          color: var(--phb-cyan, #21bcfa);
          filter: drop-shadow(0 0 5px rgba(33, 188, 250, 0.3));
        }
      }
    }
  }

  // Outro Slide
  .phb-case-card--outro {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    backdrop-filter: none;
    
    &__inner {
      max-width: 600px;
    }

    &__title {
      font-size: clamp(3rem, 6vw, 5rem);
      font-weight: 200;
      margin-bottom: 2.5rem;
      line-height: 1.0;
      letter-spacing: -0.05em;
    }

    &__desc {
      font-size: 1.3rem;
      line-height: 1.6;
      opacity: 0.5;
      margin-bottom: 4rem;
      font-weight: 300;
    }

    &__badge {
      display: inline-block;
      padding: 1.2rem 3rem;
      border: 1px solid rgba(33, 188, 251, 0.4);
      background: rgba(33, 188, 251, 0.05);
      border-radius: 100px;
      font-size: 1rem;
      font-weight: 700;
      color: var(--phb-cyan, #21bcfa);
      letter-spacing: 0.2em;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        background: var(--phb-cyan, #21bcfa);
        color: #05060f;
      }
    }
  }

  &__footer {
    padding: 0 8vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__progress {
    width: 300px;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
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
    font-size: 0.8rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;

    i {
      font-size: 1rem;
      color: var(--phb-cyan, #21bcfa);
    }
  }
}
</style>
