<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement[]>([]);
let ctx: gsap.Context | null = null;

const diffs = [
  {
    title: "Criterio Clínico Superior",
    subtitle: "Precisión diagnóstica",
    desc: "No silenciamos síntomas. Resolvemos el desequilibrio biológico que los genera a través de una lectura profunda de tu terreno celular.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  },
  {
    title: "Protocolo 360° Real",
    subtitle: "Intervención Multimodal",
    desc: "Cada cuerpo es único. Tu tratamiento integra vías IV, nebulizadas y orales diseñadas exclusivamente para tu firma biológica.",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
  },
  {
    title: "Tecnología de Vanguardia",
    subtitle: "Ciencia Regenerativa",
    desc: "Utilizamos las terapias celulares y exosomales más avanzadas, con respaldo clínico internacional y protocolos de seguridad Grado A.",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.722 2.166a2 2 0 00.155 1.573l1.196 2.05a2 2 0 001.62.946h.542a2 2 0 001.62-.946l1.196-2.05a2 2 0 00.155-1.573l-.722-2.166z"
  }
];

onMounted(() => {
  ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      // Stacking cards effect
      cardsRef.value.forEach((card, index) => {
        if (index === 0) return; // First card doesn't need to move

        gsap.from(card, {
          y: 100,
          opacity: 0,
          scale: 0.9,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            end: "top center",
            scrub: true,
          }
        });
      });
    });
  });
});

onUnmounted(() => {
  ctx?.revert();
});

const setCardRef = (el: any) => {
  if (el) cardsRef.value.push(el);
};
</script>

<template>
  <section ref="sectionRef" class="diabetes-diff">
    <div class="container">
      <div class="diff-layout">
        <!-- Sticky Left Content -->
        <div class="diff-content" data-aos="fade-right">
          <h2 class="title">La diferencia está en el <span>criterio biológico.</span></h2>
          <p class="description">
            En un mundo saturado de soluciones genéricas, nosotros apostamos por la precisión molecular y la honestidad clínica.
          </p>
          
          <div class="diff-image-box">
            <img src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=1000" alt="Clinical Precision" />
            <div class="image-overlay">
              <span>98% Precisión en Diagnóstico Molecular</span>
            </div>
          </div>
        </div>

        <!-- Scrollable Cards -->
        <div class="diff-cards">
          <div 
            v-for="(item, index) in diffs" 
            :key="item.title"
            :ref="setCardRef"
            class="diff-card"
          >
            <div class="card-inner">
              <div class="card-header">
                <div class="card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path :d="item.icon"></path>
                  </svg>
                </div>
                <div class="card-meta">
                  <span class="card-subtitle">{{ item.subtitle }}</span>
                  <h3 class="card-title">{{ item.title }}</h3>
                </div>
              </div>
              <p class="card-desc">{{ item.desc }}</p>
              
              <div class="card-footer">
                <span class="check-badge">Protocolo Verificado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-diff {
  background: #fcfcfd;
  color: #05060f;
  padding: 160px 0;
  position: relative;

  .diff-layout {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 100px;
    align-items: flex-start;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 80px;
    }
  }

  .diff-content {
    position: sticky;
    top: 140px;

    @media (max-width: 1024px) {
      position: relative;
      top: 0;
    }

    .title {
      font-size: clamp(32px, 5vw, 64px);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.04em;
      margin-bottom: 32px;

      span {
        color: #1278f3;
      }
    }

    .description {
      font-size: 20px;
      line-height: 1.6;
      color: rgba(5, 6, 15, 0.6);
      font-weight: 300;
      margin-bottom: 56px;
      max-width: 500px;
    }

    .diff-image-box {
      position: relative;
      border-radius: 40px;
      overflow: hidden;
      box-shadow: 0 40px 80px rgba(0, 0, 0, 0.1);

      img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        transition: transform 1s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }

      .image-overlay {
        position: absolute;
        bottom: 24px;
        left: 24px;
        right: 24px;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        padding: 16px 24px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 700;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .diff-cards {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .diff-card {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.04);
    border-radius: 48px;
    padding: 60px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.02);
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      padding: 40px 30px;
      border-radius: 32px;
    }

    &:hover {
      box-shadow: 0 40px 80px rgba(0, 0, 0, 0.05);
      border-color: #1278f3;
      transform: translateY(-5px);
    }

    .card-header {
      display: flex;
      gap: 24px;
      align-items: center;
      margin-bottom: 40px;

      .card-icon {
        width: 64px;
        height: 64px;
        background: #f8f9fa;
        color: #1278f3;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .card-meta {
        .card-subtitle {
          display: block;
          font-size: 12px;
          font-weight: 800;
          color: #1278f3;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .card-title {
          font-size: 26px;
          font-weight: 800;
          line-height: 1.2;
        }
      }
    }

    .card-desc {
      font-size: 18px;
      line-height: 1.7;
      color: rgba(5, 6, 15, 0.6);
      font-weight: 300;
      margin-bottom: 40px;
    }

    .card-footer {
      padding-top: 32px;
      border-top: 1px solid #f1f3f5;

      .check-badge {
        font-size: 12px;
        font-weight: 700;
        color: #1278f3;
        background: rgba(18, 120, 243, 0.05);
        padding: 8px 16px;
        border-radius: 100px;
        display: inline-flex;
        align-items: center;
        gap: 8px;

        &::before {
          content: '✓';
        }
      }
    }
  }
}
</style>
