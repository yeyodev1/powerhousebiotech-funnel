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
    icon: "M12 2v20M2 12h20"
  },
  {
    title: "Priming Metabólico",
    description: "Preparamos el cuerpo para que sea capaz de recibir y procesar las terapias avanzadas.",
    icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z"
  },
  {
    title: "Intervención de Precisión",
    description: "Aplicamos el protocolo integral (IV, Nebulizado, Oral) diseñado específicamente para tu caso.",
    icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
  },
  {
    title: "Seguimiento Biológico",
    description: "Monitoreamos la respuesta de tus células y ajustamos el protocolo en tiempo real.",
    icon: "M22 12h-4l-3 9L9 3l-3 9H2"
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

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.value,
              pin: true,
              pinSpacing: true, // Explicitly set to true to push subsequent content down
              scrub: 1.2,
              start: "top top",
              end: () => `+=${totalWidth + 2000}`, // Ample vertical room
              invalidateOnRefresh: true,
              anticipatePin: 1,
            }
          });

          // Horizontal Move (finishes at 80% of the timeline)
          tl.to(gridRef.value, {
            x: -totalWidth,
            ease: "none",
            duration: 0.8
          });

          // Progress bar syncs with the move
          if (progressRef.value) {
            tl.to(progressRef.value, {
              scaleX: 1,
              ease: "none",
              duration: 0.8
            }, 0);
          }

          // Buffer at the end: stays pinned and looking at the last card for 20% of the scroll
          tl.to({}, { duration: 0.2 });
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
    padding-right: 50vw; 
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
