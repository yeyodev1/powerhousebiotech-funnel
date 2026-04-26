<script setup lang="ts">
import { onMounted, ref, onUnmounted, nextTick } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Assets
import image1 from '@/assets/stock/diabetes/image-1.jpeg';
import image2 from '@/assets/stock/diabetes/image-2.jpeg';
import image3 from '@/assets/stock/diabetes/image-3.jpeg';
import image4 from '@/assets/stock/diabetes/image-4.jpeg';

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
    icon: "fa-solid fa-bolt-lightning",
    image: image2
  },
  {
    title: "Estabilidad Biológica",
    desc: "Un sistema que funciona en equilibrio, sin picos ni caídas drásticas. Seguridad interna en cada proceso fisiológico.",
    icon: "fa-solid fa-shield-heart",
    image: image3
  },
  {
    title: "Libertad de Acción",
    desc: "Deja de vivir en función de tu condición y empieza a vivir en función de tus metas. El control real vuelve a tus manos.",
    icon: "fa-solid fa-mountain-sun",
    image: image4
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

    <BenefitHeader :image="image1" />

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
  padding: 60px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1024px) {
    justify-content: flex-start;
    padding: 40px 0;
  }
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
