<script setup lang="ts">
import { onMounted, ref, onUnmounted, nextTick } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

const benefitsList = [
  {
    title: "Claridad y Energía",
    desc: "Recupera la vitalidad que el desorden metabólico te había robado. Despierta con la mente despejada y el cuerpo listo para el día.",
    icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Estabilidad Biológica",
    desc: "Un sistema que funciona en equilibrio, sin picos ni caídas drásticas. Seguridad interna en cada proceso fisiológico.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    image: "https://images.unsplash.com/photo-1505751172676-4e922123062c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Libertad de Acción",
    desc: "Deja de vivir en función de tu condición y empieza a vivir en función de tus metas. El control real vuelve a tus manos.",
    icon: "M12 2v20M2 12h20",
    image: "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?auto=format&fit=crop&q=80&w=800"
  }
];

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1025px)", () => {
          if (!containerRef.value || !sectionRef.value) return;

          const scrollWidth = containerRef.value.scrollWidth;
          const viewportWidth = window.innerWidth;
          const totalWidth = scrollWidth - viewportWidth;

          gsap.to(containerRef.value, {
            x: -totalWidth,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.value,
              pin: true,
              scrub: 1.5,
              start: "top top",
              end: () => `+=${totalWidth + 1000}`,
              invalidateOnRefresh: true,
            }
          });
        });
      });
      ScrollTrigger.refresh();
    }, 100);
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section ref="sectionRef" class="diabetes-benefits">
    <!-- Parallax Ambient Background -->
    <div class="ambient-bg">
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
    </div>

    <div class="benefits-header-wrapper">
      <div class="container">
        <div class="benefits-header" data-aos="fade-up">
          <div class="phb-line-title">
            <span class="phb-line-title__line"></span>
            EL RESULTADO FINAL
          </div>
          <h2 class="title">No solo mejores niveles. <br />Una mejor vida.</h2>
        </div>
      </div>
    </div>

    <div class="horizontal-overflow">
      <div ref="containerRef" class="benefits-horizontal-grid">
        <div 
          v-for="(benefit, index) in benefitsList" 
          :key="benefit.title" 
          class="benefit-slide"
        >
          <div class="benefit-card-premium">
            <div class="card-visual">
              <img :src="benefit.image" :alt="benefit.title" />
              <div class="icon-floating">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path :d="benefit.icon"></path>
                </svg>
              </div>
            </div>
            
            <div class="card-body">
              <span class="benefit-number">0{{ index + 1 }}</span>
              <h3 class="benefit-title">{{ benefit.title }}</h3>
              <p class="benefit-desc">{{ benefit.desc }}</p>
              
              <div class="card-link">
                Evolución Biológica
                <span class="dot"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Statement Slide -->
        <div class="benefit-slide slide-statement">
          <div class="statement-content">
            <p>
              Recuperar tu salud no es un lujo. <br />
              <strong>Es el cimiento sobre el cual construyes todo lo demás.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-benefits {
  background: #05060f;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  padding: 100px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .ambient-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;

    .glow {
      position: absolute;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      filter: blur(120px);
      opacity: 0.1;
    }

    .glow-1 {
      top: -10%;
      left: -10%;
      background: var(--phb-cyan, #21bcfa);
    }

    .glow-2 {
      bottom: -10%;
      right: -10%;
      background: #1278f3;
    }
  }

  .benefits-header-wrapper {
    position: relative;
    z-index: 10;
    margin-bottom: 60px;
  }

  .phb-line-title {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 24px;
    color: var(--phb-cyan, #21bcfa);

    &__line {
      width: 40px;
      height: 2px;
      background: var(--phb-cyan, #21bcfa);
    }
  }

  .benefits-header {
    text-align: center;
    .title {
      font-size: clamp(32px, 6vw, 72px);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.04em;
    }
  }

  .horizontal-overflow {
    position: relative;
    width: 100%;
    z-index: 5;
    
    @media (max-width: 1024px) {
      overflow-x: auto;
      padding: 0 24px 60px;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar { display: none; }
    }
  }

  .benefits-horizontal-grid {
    display: flex;
    gap: 60px;
    padding: 0 15vw 0 15vw; 
    padding-right: 40vw; 
    width: max-content;

    @media (max-width: 1024px) {
      padding: 0 24px;
    }
  }

  .benefit-slide {
    width: 500px;
    flex-shrink: 0;

    @media (max-width: 768px) {
      width: 320px;
    }
  }

  .benefit-card-premium {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 48px;
    overflow: hidden;
    height: 100%;
    transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);

    &:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: var(--phb-cyan, #21bcfa);
      transform: translateY(-20px);

      .card-visual img {
        transform: scale(1.1);
      }
    }

    .card-visual {
      height: 300px;
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 1s ease;
      }

      .icon-floating {
        position: absolute;
        bottom: 24px;
        right: 24px;
        width: 64px;
        height: 64px;
        background: var(--phb-cyan, #21bcfa);
        color: #05060f;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 20px 40px rgba(33, 188, 251, 0.3);
      }
    }

    .card-body {
      padding: 48px;

      .benefit-number {
        display: block;
        font-size: 14px;
        font-weight: 900;
        color: var(--phb-cyan, #21bcfa);
        margin-bottom: 24px;
        letter-spacing: 0.2em;
        opacity: 0.6;
      }

      .benefit-title {
        font-size: 32px;
        font-weight: 800;
        margin-bottom: 20px;
        line-height: 1.1;
      }

      .benefit-desc {
        font-size: 17px;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.5);
        font-weight: 300;
        margin-bottom: 40px;
      }

      .card-link {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: rgba(255, 255, 255, 0.3);
        display: flex;
        align-items: center;
        gap: 12px;

        .dot {
          width: 6px;
          height: 6px;
          background: var(--phb-cyan, #21bcfa);
          border-radius: 50%;
        }
      }
    }
  }

  .slide-statement {
    width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 60px;

    @media (max-width: 768px) {
      width: 100vw;
      padding: 0 24px;
    }

    p {
      font-size: clamp(28px, 4vw, 44px);
      font-weight: 200;
      line-height: 1.2;
      color: rgba(255, 255, 255, 0.8);

      strong {
        color: #ffffff;
        font-weight: 800;
        display: block;
        margin-top: 32px;
      }
    }
  }
}
</style>
