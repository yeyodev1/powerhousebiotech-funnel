<script setup lang="ts">
import { onMounted, ref, onUnmounted, nextTick } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Sub-components
import BenefitHeader from './benefits/BenefitHeader.vue';
import BenefitCard from './benefits/BenefitCard.vue';
import BenefitStatement from './benefits/BenefitStatement.vue';

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

          // Tightening the timeline to match the movement exactly
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.value,
              pin: true,
              pinSpacing: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${totalWidth}`, // Exact distance
              invalidateOnRefresh: true,
              anticipatePin: 1,
            }
          });

          // Horizontal Move
          tl.to(containerRef.value, {
            x: -totalWidth,
            ease: "none"
          });
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
  <section ref="sectionRef" class="diabetes-benefits">
    <!-- Ambient Background -->
    <div class="ambient-bg">
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
    </div>

    <BenefitHeader />

    <div class="horizontal-overflow">
      <div ref="containerRef" class="benefits-horizontal-grid">
        <div 
          v-for="(benefit, index) in benefitsList" 
          :key="benefit.title" 
          class="benefit-slide"
        >
          <BenefitCard :benefit="benefit" :index="index" />
        </div>

        <BenefitStatement />
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
  z-index: 10;

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
    gap: 80px; 
    padding: 0 15vw; 
    padding-right: 40vw; // Reduced padding
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
}
</style>
