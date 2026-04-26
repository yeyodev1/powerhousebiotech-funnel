<script setup lang="ts">
import { onMounted, ref, onUnmounted, nextTick } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Sub-components
import SystemHeader from './system/SystemHeader.vue';
import SystemCard from './system/SystemCard.vue';
import SystemFooter from './system/SystemFooter.vue';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);
const progressRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

const steps = [
  {
    title: "Evaluación del Terreno Biológico",
    description: "No miramos solo laboratorios. Evaluamos inflamación, estrés oxidativo y capacidad regenerativa real.",
    icon: "fa-solid fa-microscope"
  },
  {
    title: "Priming Metabólico",
    description: "Preparamos el cuerpo para que sea capaz de recibir y procesar las terapias avanzadas.",
    icon: "fa-solid fa-flask-vial"
  },
  {
    title: "Intervención de Precisión",
    description: "Aplicamos el protocolo integral (IV, Nebulizado, Oral) diseñado específicamente para tu caso.",
    icon: "fa-solid fa-dna"
  },
  {
    title: "Seguimiento Biológico",
    description: "Monitoreamos la respuesta de tus células y ajustamos el protocolo en tiempo real.",
    icon: "fa-solid fa-chart-line"
  }
];

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1025px)", () => {
          if (!gridRef.value || !sectionRef.value) return;

          const scrollWidth = gridRef.value.scrollWidth;
          const viewportWidth = window.innerWidth;
          const totalWidth = scrollWidth - viewportWidth;

          // Removing the extra vertical room to avoid "dead space"
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.value,
              pin: true,
              pinSpacing: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${totalWidth}`, // Exact distance for horizontal move
              invalidateOnRefresh: true,
              anticipatePin: 1,
            }
          });

          // Horizontal Move
          tl.to(gridRef.value, {
            x: -totalWidth,
            ease: "none"
          });

          // Progress bar syncs with the move
          if (progressRef.value) {
            tl.to(progressRef.value, {
              scaleX: 1,
              ease: "none"
            }, 0);
          }
        });
      });
      ScrollTrigger.refresh();
    }, 200);
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section ref="sectionRef" class="diabetes-system">
    <SystemHeader />

    <div class="horizontal-scroll-container">
      <div ref="gridRef" class="steps-grid">
        <SystemCard 
          v-for="(step, index) in steps" 
          :key="step.title" 
          :step="step"
          :index="index"
        />
      </div>

      <div class="scroll-progress-container">
        <div ref="progressRef" class="scroll-progress-bar"></div>
      </div>
    </div>

    <SystemFooter />
  </section>
</template>

<style lang="scss" scoped>
.diabetes-system {
  background: #05060f;
  position: relative;
  overflow: hidden;
  padding: 80px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 5;

  .horizontal-scroll-container {
    position: relative;
    width: 100%;
    margin: 40px 0;
    
    @media (max-width: 1024px) {
      overflow-x: auto;
      padding-bottom: 40px;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar { display: none; }
    }
  }

  .steps-grid {
    display: flex;
    gap: 80px;
    padding: 0 15vw; 
    padding-right: 40vw; // Reduced from 50vw to tighten the end
    width: max-content;

    @media (max-width: 1024px) {
      padding: 0 24px;
    }
  }

  .scroll-progress-container {
    position: absolute;
    bottom: -40px;
    left: 15vw;
    right: 15vw;
    height: 2px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2px;
    overflow: hidden;

    @media (max-width: 1024px) {
      display: none;
    }
  }

  .scroll-progress-bar {
    height: 100%;
    width: 100%;
    background: var(--phb-cyan, #21bcfa);
    transform: scaleX(0);
    transform-origin: left;
    box-shadow: 0 0 20px rgba(33, 188, 251, 0.5);
  }
}
</style>
