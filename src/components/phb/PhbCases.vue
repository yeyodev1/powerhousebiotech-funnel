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
    outcome: 'ÉXITO TOTAL',
    category: 'Caso de Éxito',
    title: 'PATOLOGÍA: FATIGA CRÓNICA',
    subtitle: 'Mujer 42 años | Evolución 7 años',
    context: 'Había probado múltiples terapias sin éxito durante años. Su cuerpo no respondía a tratamientos regenerativos.',
    analysis: 'Evaluación de Viabilidad detectó inflamación sistémica elevada y disfunción metabólica severa.',
    strategy: 'Protocolo de Preparación Biológica™ obligatorio antes de cualquier intervención.',
    result: 'Recuperación progresiva de energía en 21 días y normalización de biomarcadores.',
    image: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#21bcfa',
    isRejected: false
  },
  {
    id: '02',
    outcome: 'ÉXITO TOTAL',
    category: 'Caso de Éxito',
    title: 'PATOLOGÍA: DOLOR ARTICULAR',
    subtitle: 'Hombre 55 años | Candidato a Cirugía',
    context: 'Paciente buscaba terapia celular inmediata tras múltiples fallas en medicina convencional.',
    analysis: 'Se identificó que el ambiente celular era hostil para la regeneración en ese momento.',
    strategy: 'Recalibración del terreno celular para asegurar la tasa de éxito del tratamiento.',
    result: 'Reducción de dolor sin cirugía inicial y éxito total en la aplicación posterior.',
    image: 'https://images.pexels.com/photos/8442436/pexels-photo-8442436.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#1278f3',
    isRejected: false
  },
  {
    id: '03',
    outcome: 'REDIRECCIÓN',
    category: 'Criterio de Selección',
    title: 'CRITERIO: PACIENTE RECHAZADO',
    subtitle: 'Ética Clínica sobre Volumen',
    context: 'Paciente con alta expectativa de mejoría pero con un estado biológico irreversible.',
    analysis: 'Evaluación Técnica indicó una probabilidad de respuesta menor al 10%.',
    strategy: 'No se recomendó tratamiento. Se evitó inversión innecesaria en falsas esperanzas.',
    result: 'Se redirigió al paciente a cuidados paliativos más adecuados para su caso real.',
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
                    <div class="phb-case-card__outcome-header">
                       <span class="phb-case-card__outcome-label">{{ item.outcome }}</span>
                    </div>
                    <div class="phb-case-card__badge">{{ item.category }}</div>
                  </div>
              </div>

              <div class="phb-case-card__right">
                 <div class="phb-case-card__info phb-case-card__reveal">
                    <h3 class="phb-case-card__case-title">{{ item.title }} <span>{{ item.subtitle }}</span></h3>
                    
                    <div class="phb-case-card__details">
                      <div class="phb-case-card__stat">
                        <span class="phb-case-card__s-label">Situación Crítica</span>
                        <p class="phb-case-card__s-value">{{ item.context }}</p>
                      </div>
                      <div class="phb-case-card__stat">
                        <span class="phb-case-card__s-label">Evaluación DECIDE™</span>
                        <p class="phb-case-card__s-value">{{ item.analysis }}</p>
                      </div>
                      <div class="phb-case-card__stat">
                        <span class="phb-case-card__s-label">Protocolo Aplicado</span>
                        <p class="phb-case-card__s-value">{{ item.strategy }}</p>
                      </div>
                    </div>

                    <div class="phb-case-card__result" :style="{ '--accent': item.accent }">
                        <div class="phb-case-card__indicator"></div>
                        <div class="phb-case-card__r-content">
                           <span class="phb-case-card__r-label">Respuesta Regenerativa</span>
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
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    font-weight: 400;
    line-height: 1.1;
    color: var(--phb-cyan, #21bcfa);
    text-shadow: 0 0 30px rgba(33, 188, 250, 0.3);
    display: inline-block;
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
  top: -5%;
  left: 5%;
  font-size: 38vw; 
  font-weight: 950;
  line-height: 1;
  pointer-events: none;
  z-index: 0;
  font-family: 'Inter', sans-serif;

  // Matching the vibrant "llamativo" style from Team section
  background: linear-gradient(135deg, rgba(33, 188, 251, 0.35) 0%, rgba(33, 188, 251, 0.05) 50%, transparent 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1.5px rgba(33, 188, 251, 0.4);
  
  opacity: 0.8; 
  filter: drop-shadow(0 0 25px rgba(33, 188, 251, 0.25));

  @media (min-width: 1024px) {
    font-size: 50vw;
  }
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
    bottom: 2rem;
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
    z-index: 5;
  }

  &__outcome-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    z-index: 4;
  }

  &__outcome-label {
    font-size: 8vw;
    font-weight: 950;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #fff;
    opacity: 0.3;
    -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.5);
    -webkit-text-fill-color: transparent;
    transform: rotate(-10deg);
    white-space: nowrap;

    @media (min-width: 1024px) {
      font-size: 5vw;
    }
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
    color: #fff;
    
    // Highlight the prefix (PATOLOGÍA / CRITERIO)
    &::first-line {
      color: var(--phb-cyan, #21bcfa);
      font-weight: 700;
      letter-spacing: 0.05em;
    }

    span {
      display: block;
      font-size: 1.1rem;
      opacity: 0.4;
      font-weight: 400;
      margin-top: 0.5rem;
      -webkit-text-fill-color: #fff; // Reset from first-line if needed
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

    @media (max-width: 480px) {
      gap: 1.25rem;
      margin-bottom: 2rem;
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
    padding: 1.25rem 1.75rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 20px;
    border-left: 3px solid var(--accent, #21bcfa);

    @media (max-width: 480px) {
      padding: 1rem;
      gap: 1rem;
    }
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
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--phb-cyan, #21bcfa); // Brighter brand color for visibility
    opacity: 0.9;
    display: block;
    margin-bottom: 0.4rem;
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
    width: 100vw;
    max-width: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 8vw; // Compensate for left padding of row
  }
}

.phb-case-final {
  max-width: 800px;
  text-align: center;

  &__h2 {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 2rem;
    color: #ffffff;
    
    background: linear-gradient(to bottom, #ffffff, var(--phb-cyan, #21bcfa));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  &__p {
    font-size: clamp(1rem, 1.5vw, 1.3rem);
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 4rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  &__badge {
    display: inline-block;
    padding: 1rem 2.5rem;
    border: 1px solid var(--phb-cyan, #21bcfa);
    border-radius: 100px;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: var(--phb-cyan, #21bcfa);
    background: rgba(33, 188, 250, 0.05);
    transition: all 0.3s ease;

    &:hover {
      background: var(--phb-cyan, #21bcfa);
      color: #05060f;
    }
  }
}

/* Animations Helper */
.phb-case-card__reveal {
  will-change: transform, opacity;
}
</style>
