<script setup lang="ts">
import { onMounted, ref, onUnmounted, nextTick } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const sidebarRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

const therapies = [
  {
    title: "Vía Intravenosa (IV)",
    subtitle: "SISTÉMICA",
    desc: "Busca una acción sistémica profunda, orientada a modular la inflamación y potenciar la recuperación general a través del torrente sanguíneo.",
    icon: "M12 2v20M2 12h20",
    color: "#1278f3"
  },
  {
    title: "Vía Nebulizada",
    subtitle: "ABSORCIÓN RÁPIDA",
    desc: "Ruta complementaria de alta biodisponibilidad para un soporte metabólico directo, ideal para optimizar la oxigenación celular.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    color: "#21bcfa"
  },
  {
    title: "Vía Oral",
    subtitle: "CONTINUIDAD",
    desc: "Mantenimiento y soporte biológico constante para sostener los resultados en el tiempo y estabilizar el terreno metabólico.",
    icon: "M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42",
    color: "#18e7f0"
  }
];

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1025px)", () => {
          if (!sectionRef.value) return;

          const cards = gsap.utils.toArray('.therapy-card');
          
          ScrollTrigger.create({
            trigger: sectionRef.value,
            start: "top top",
            end: "+=2500", 
            pin: true,
            scrub: 1.5,
          });

          cards.forEach((card: any, index: number) => {
            gsap.from(card, {
              y: 100,
              opacity: 0,
              scale: 0.95,
              scrollTrigger: {
                trigger: sectionRef.value,
                start: () => `top+=${(index * 600)} top`,
                end: () => `top+=${(index * 600) + 400} top`,
                scrub: 1,
              }
            });
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
  <section ref="sectionRef" class="diabetes-protocol">
    <div class="container">
      <div class="protocol-layout">
        <!-- Sidebar -->
        <div ref="sidebarRef" class="protocol-sidebar">
          <div class="sidebar-content">
            <div class="phb-line-title">
              <span class="phb-line-title__line"></span>
              EL PROTOCOLO INTEGRAL
            </div>
            <h2 class="title">Abordaje en 3 Vías de Acceso</h2>
            <p class="description">
              No creemos en soluciones de una sola vía. La complejidad de la diabetes requiere un abordaje multifactorial, preciso y sostenido.
            </p>

            <div class="priming-card">
              <div class="priming-badge">FASE 0</div>
              <h3 class="priming-title">Priming Biológico</h3>
              <p class="priming-desc">
                Preparamos tu terreno metabólico antes de cualquier intervención mayor. Un cuerpo receptivo es la clave del éxito.
              </p>
              <div class="priming-status">
                <span class="pulse-dot"></span>
                PRE-TRATAMIENTO ACTIVADO
              </div>
            </div>
          </div>
        </div>

        <!-- Cards -->
        <div class="protocol-main">
          <div 
            v-for="(therapy, index) in therapies" 
            :key="therapy.title" 
            class="therapy-card"
          >
            <div class="therapy-number">0{{ index + 1 }}</div>
            <div class="therapy-content">
              <div class="therapy-header">
                <div class="icon-box" :style="{ color: therapy.color }">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path :d="therapy.icon"></path>
                  </svg>
                </div>
                <div class="meta">
                  <span class="subtitle" :style="{ color: therapy.color }">{{ therapy.subtitle }}</span>
                  <h3 class="card-title">{{ therapy.title }}</h3>
                </div>
              </div>
              <p class="card-desc">{{ therapy.desc }}</p>
              
              <div class="card-footer">
                <div class="tech-tag">Tecnología PHB</div>
                <div class="tech-tag">Grado Médico</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-protocol {
  background: #ffffff;
  color: #05060f;
  position: relative;
  padding: 160px 0;
  min-height: 100vh;
  display: flex;
  align-items: center;

  .protocol-layout {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 120px;
    align-items: flex-start;
    width: 100%;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 80px;
    }
  }

  .protocol-sidebar {
    @media (max-width: 1024px) {
      position: relative;
    }

    .phb-line-title {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.3em;
      color: #05060f;
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;

      &__line {
        width: 32px;
        height: 2px;
        background: #05060f;
      }
    }

    .title {
      font-size: clamp(32px, 5vw, 56px);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.04em;
      margin-bottom: 32px;
    }

    .description {
      font-size: 18px;
      line-height: 1.6;
      color: rgba(5, 6, 15, 0.6);
      font-weight: 300;
      margin-bottom: 56px;
    }

    .priming-card {
      background: #05060f;
      color: #ffffff;
      padding: 48px;
      border-radius: 40px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);

      .priming-badge {
        font-size: 10px;
        font-weight: 900;
        letter-spacing: 0.2em;
        background: var(--phb-cyan, #21bcfa);
        color: #05060f;
        padding: 6px 14px;
        border-radius: 100px;
        display: inline-block;
        margin-bottom: 24px;
      }

      .priming-title {
        font-size: 24px;
        font-weight: 800;
        margin-bottom: 16px;
      }

      .priming-desc {
        font-size: 15px;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.5);
        margin-bottom: 32px;
        font-weight: 300;
      }

      .priming-status {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.1em;
        color: var(--phb-cyan, #21bcfa);

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: var(--phb-cyan, #21bcfa);
          border-radius: 50%;
          box-shadow: 0 0 15px var(--phb-cyan, #21bcfa);
          animation: pulse 2s infinite;
        }
      }
    }
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
  }

  .protocol-main {
    display: flex;
    flex-direction: column;
    height: 100%;
    @media (min-width: 1025px) {
      position: relative;
      height: 600px; 
    }
    gap: 48px;
  }

  .therapy-card {
    background: #f8f9fa;
    border-radius: 48px;
    padding: 64px;
    display: flex;
    gap: 40px;
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    position: relative;

    @media (min-width: 1025px) {
      position: absolute;
      inset: 0;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      padding: 40px 32px;
      border-radius: 32px;
    }

    &:hover {
      background: #ffffff;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.05);
    }

    .therapy-number {
      font-size: 48px;
      font-weight: 900;
      color: rgba(5, 6, 15, 0.03);
      line-height: 1;
      font-family: serif;
      font-style: italic;
    }

    .therapy-header {
      display: flex;
      gap: 24px;
      align-items: center;
      margin-bottom: 32px;

      .icon-box {
        width: 64px;
        height: 64px;
        background: #ffffff;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      }

      .meta {
        .subtitle {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.2em;
          display: block;
          margin-bottom: 8px;
        }

        .card-title {
          font-size: 28px;
          font-weight: 800;
        }
      }
    }

    .card-desc {
      font-size: 17px;
      line-height: 1.7;
      color: rgba(5, 6, 15, 0.6);
      font-weight: 300;
      margin-bottom: 40px;
    }

    .card-footer {
      display: flex;
      gap: 12px;
      
      .tech-tag {
        font-size: 10px;
        font-weight: 700;
        color: rgba(5, 6, 15, 0.4);
        border: 1px solid rgba(5, 6, 15, 0.1);
        padding: 6px 12px;
        border-radius: 100px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }
  }
}
</style>
