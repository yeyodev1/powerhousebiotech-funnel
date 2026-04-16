<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const scrollContainerRef = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLElement | null>(null)

const cases = [
  {
    id: '01',
    category: 'Caso de Éxito',
    title: 'Fatiga Crónica —',
    subtitle: 'Mujer 42 años',
    context: '7 años de fatiga extrema sin respuesta médica convencional.',
    analysis: 'Inflamación sistémica y desregulación mitocondrial.',
    strategy: 'Optimización biológica inmediata antes de la intervención.',
    result: 'Recuperación total de vitalidad en 22 días.',
    image: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#21bcfa',
    isRejected: false
  },
  {
    id: '02',
    category: 'Caso de Éxito',
    title: 'Dolor Articular —',
    subtitle: 'Hombre 55 años',
    context: 'Desgaste severo con expectativa de cirugía inmediata.',
    analysis: 'Ambiente celular no apto para aplicaciones regenerativas.',
    strategy: 'Protocolo de limpieza y preparación de terreno biológico.',
    result: 'Reducción de dolor del 90% sin cirugía inicial.',
    image: 'https://images.pexels.com/photos/8442436/pexels-photo-8442436.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#1278f3',
    isRejected: false
  },
  {
    id: '03',
    category: 'Honestidad Clínica',
    title: 'Caso Rechazado',
    subtitle: 'Decisión Ética',
    context: 'Paciente solicitó tratamiento inmediato con alta expectativa.',
    analysis: 'La evaluación detectó nula probabilidad de respuesta biológica.',
    strategy: 'Transparencia absoluta: No se recomendó el tratamiento.',
    result: 'Cuidado del patrimonio y salud del paciente.',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#adb5bd',
    isRejected: true
  }
]

onMounted(() => {
  if (!sectionRef.value || !scrollContainerRef.value) return

  const ctx = gsap.context(() => {
    const horizontalLength = scrollContainerRef.value!.scrollWidth - window.innerWidth

    // Main horizontal scroll animation
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${horizontalLength}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Change background color based on progress (Case 03 transition)
          if (self.progress > 0.7) {
            gsap.to(bgRef.value, { backgroundColor: '#111218', duration: 0.5 }) // Neutral Clinical Gray
          } else {
            gsap.to(bgRef.value, { backgroundColor: '#05060f', duration: 0.5 }) // Deep Navy
          }
        }
      }
    })

    mainTl.to(scrollContainerRef.value, {
      x: -horizontalLength,
      ease: 'none'
    })

    // Parallax background numbers
    const numbers = gsap.utils.toArray('.phb-case-bg-num')
    numbers.forEach((num: any, i: number) => {
      gsap.to(num, {
        x: -200, // Moves differently than the card
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.value,
          scrub: 1.5,
          start: 'top top',
          end: () => `+=${horizontalLength}`,
        }
      })
    })

    // Card internal reveals
    const cards = gsap.utils.toArray('.phb-case-card')
    cards.forEach((card: any) => {
      // Split text logic simulated with lines
      gsap.from(card.querySelectorAll('.phb-case-card__reveal'), {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          containerAnimation: mainTl,
          start: 'left 70%',
          toggleActions: 'play none none reverse'
        }
      })

      // Image scale parallax
      gsap.fromTo(card.querySelector('.phb-case-card__image'), 
        { scale: 1.2 },
        { 
          scale: 1, 
          scrollTrigger: {
            trigger: card,
            containerAnimation: mainTl,
            start: 'left right',
            end: 'right left',
            scrub: 0.5
          }
        }
      )
    })

    // Progress line
    gsap.to('.phb-cases__progress-fill', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.value,
        scrub: 0.3,
        start: 'top top',
        end: () => `+=${horizontalLength}`,
      }
    })

  }, sectionRef.value)
})
</script>

<template>
  <section class="phb-cases" ref="sectionRef">
    <!-- Background layer for color transitions -->
    <div class="phb-cases__bg" ref="bgRef"></div>

    <div class="phb-cases__sticky-wrap">
      
      <!-- Fixed Header -->
      <div class="phb-cases__header">
        <span class="phb-cases__label phb-case-card__reveal">PRUEBA SOCIAL —</span>
        <h2 class="phb-cases__title phb-case-card__reveal">Cuando se decide bien… <br>los resultados dejan de ser suerte</h2>
      </div>

      <!-- Horizontal Motion Area -->
      <div class="phb-cases__scroll-row" ref="scrollContainerRef">
        
        <div 
          v-for="(item, index) in cases" 
          :key="item.id" 
          class="phb-case-card"
          :class="{ 'is-rejected': item.isRejected }"
        >
          <!-- Parallax Background Number -->
          <div class="phb-case-bg-num">{{ item.id }}</div>

          <div class="phb-case-card__inner">
            
            <div class="phb-case-card__body">
              <div class="phb-case-card__left">
                 <div class="phb-case-card__image-container">
                    <img :src="item.image" :alt="item.title" class="phb-case-card__image" />
                    <div class="phb-case-card__img-overlay"></div>
                    <div class="phb-case-card__badge">{{ item.category }}</div>
                 </div>
              </div>

              <div class="phb-case-card__right">
                 <div class="phb-case-card__info phb-case-card__reveal">
                    <h3 class="phb-case-card__case-title">{{ item.title }} <span>{{ item.subtitle }}</span></h3>
                    
                    <div class="phb-case-card__details">
                      <div class="phb-case-card__stat">
                        <span class="phb-case-card__s-label">Problema</span>
                        <p class="phb-case-card__s-value">{{ item.context }}</p>
                      </div>
                      <div class="phb-case-card__stat">
                        <span class="phb-case-card__s-label">Decisión PHB™</span>
                        <p class="phb-case-card__s-value">{{ item.analysis }}</p>
                      </div>
                      <div class="phb-case-card__stat">
                        <span class="phb-case-card__s-label">Acción Tomada</span>
                        <p class="phb-case-card__s-value">{{ item.strategy }}</p>
                      </div>
                    </div>

                    <div class="phb-case-card__result" :style="{ '--accent': item.accent }">
                        <div class="phb-case-card__indicator"></div>
                        <div class="phb-case-card__r-content">
                           <span class="phb-case-card__r-label">Resultado Final</span>
                           <p class="phb-case-card__r-text">{{ item.result }}</p>
                        </div>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Ending Slide -->
        <div class="phb-case-card phb-case-card--final">
            <div class="phb-case-card__reveal">
              <h2 class="phb-case-final__h2">No todos los cuerpos están listos para regenerarse.</h2>
              <p class="phb-case-final__p">E iniciar un tratamiento sin saber esto es perder tu tiempo, dinero y salud. Nosotros nos aseguramos primero.</p>
              <div class="phb-case-final__cta-wrap">
                  <span class="phb-case-final__badge">MÉTODO DECIDE™</span>
              </div>
            </div>
        </div>

      </div>

      <!-- Bottom Progress UI -->
      <div class="phb-cases__ui">
         <div class="phb-cases__progress-wrap">
            <div class="phb-cases__progress-fill"></div>
         </div>
         <div class="phb-cases__scroll-hint">
            SCROLL PARA EXPLORAR <i class="fa-solid fa-arrow-right-long"></i>
         </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.phb-cases {
  position: relative;
  width: 100%;
  overflow: hidden;
  
  &__bg {
    position: absolute;
    inset: 0;
    background-color: #05060f;
    transition: background-color 0.8s ease;
    z-index: 0;
  }

  &__sticky-wrap {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 6vh 0;
    position: relative;
    z-index: 1;
  }

  &__header {
    padding: 0 8vw;
    margin-bottom: 2rem;
  }

  &__label {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.25em;
    color: var(--phb-cyan, #21bcfa);
    text-transform: uppercase;
    display: block;
    margin-bottom: 1rem;
  }

  &__title {
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 200;
    line-height: 1.1;
    color: #fff;
  }

  &__scroll-row {
    display: flex;
    align-items: center;
    padding-left: 8vw;
    gap: 8vw;
    width: fit-content;
    height: 65vh;
  }

  /* Progress UI */
  &__ui {
    padding: 0 8vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__progress-wrap {
    width: 200px;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    position: relative;
  }

  &__progress-fill {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--phb-cyan, #21bcfa);
    transform-origin: left;
    transform: scaleX(0);
  }

  &__scroll-hint {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    color: rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: center;
    gap: 1rem;
    
    i { font-size: 0.9rem; }
  }
}

/* Parallax Numbers */
.phb-case-bg-num {
  position: absolute;
  top: -10%;
  left: 10%;
  font-size: 25vw;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.03);
  line-height: 1;
  pointer-events: none;
  z-index: 0;
}

/* Cards Area */
.phb-case-card {
  flex-shrink: 0;
  width: 85vw;
  max-width: 1100px;
  height: 100%;
  position: relative;

  @media (min-width: 1200px) {
    width: 70vw;
  }

  &__inner {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    
    @media (min-width: 1024px) {
      flex-direction: row;
      align-items: center;
      gap: 5vw;
    }
  }

  &__left {
    flex: 1;
  }

  &__image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16/10;
    border-radius: 40px; // Bakano style ultra-rounded
    overflow: hidden;
    box-shadow: 0 40px 80px rgba(0,0,0,0.4);
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%);
  }

  &__badge {
    position: absolute;
    top: 2rem;
    left: 2rem;
    padding: 0.6rem 1.2rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 100px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  &__right {
    flex: 1.2;
    padding-right: 2rem;
  }

  &__case-title {
    font-size: clamp(2rem, 3.5vw, 3.2rem);
    font-weight: 300;
    margin-bottom: 2.5rem;
    line-height: 1.1;
    
    span {
      display: block;
      font-size: 1.1rem;
      opacity: 0.4;
      font-weight: 400;
      margin-top: 0.5rem;
    }
  }

  &__details {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3.5rem;
    
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__s-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.4);
    display: block;
    margin-bottom: 0.75rem;
  }

  &__s-value {
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.8);
  }

  &__result {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem 2rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 20px;
    border-left: 3px solid var(--accent, #21bcfa);
  }

  &__indicator {
    width: 12px;
    height: 12px;
    background: var(--accent, #21bcfa);
    border-radius: 50%;
    box-shadow: 0 0 15px var(--accent, #21bcfa);
    flex-shrink: 0;
  }

  &__r-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.5;
    display: block;
    margin-bottom: 0.25rem;
  }

  &__r-text {
    font-size: 1.2rem;
    font-weight: 400;
    color: #fff;
  }

  /* Rejected Case Styling */
  &.is-rejected {
    .phb-case-card__image {
      filter: grayscale(1) brightness(0.7);
    }
    .phb-case-card__result {
       opacity: 0.7;
       filter: grayscale(0.5);
    }
  }
  
  /* Final Slide */
  &--final {
    max-width: 600px;
    display: flex;
    align-items: center;
  }
}

.phb-case-final {
  &__h2 {
    font-size: 3.5rem;
    font-weight: 200;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }
  
  &__p {
    font-size: 1.2rem;
    line-height: 1.6;
    opacity: 0.5;
    margin-bottom: 3rem;
  }

  &__badge {
    display: inline-block;
    padding: 1rem 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.1em;
  }
}

/* Animations Helper */
.phb-case-card__reveal {
  will-change: transform, opacity;
}
</style>
