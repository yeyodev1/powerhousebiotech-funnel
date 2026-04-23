<script setup lang="ts">
const steps = [
  {
    title: "Evaluación del Terreno Biológico",
    description: "No miramos solo laboratorios. Evaluamos inflamación, estrés oxidativo y capacidad regenerativa real.",
    icon: "M12 2v20M2 12h20", // Cross
    delay: 100
  },
  {
    title: "Priming Metabólico",
    description: "Preparamos el cuerpo para que sea capaz de recibir y procesar las terapias avanzadas.",
    icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", // Lightning
    delay: 200
  },
  {
    title: "Intervención de Precisión",
    description: "Aplicamos el protocolo integral (IV, Nebulizado, Oral) diseñado específicamente para tu caso.",
    icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z", // Hexagon
    delay: 300
  },
  {
    title: "Seguimiento Biológico",
    description: "Monitoreamos la respuesta de tus células y ajustamos el protocolo en tiempo real.",
    icon: "M22 12h-4l-3 9L9 3l-3 9H2", // Pulse
    delay: 400
  }
];
</script>

<template>
  <section class="diabetes-system">
    <div class="container">
      <div class="system-header" data-aos="fade-up">
        <div class="phb-line-title">
          <span class="phb-line-title__line"></span>
          EL SISTEMA POWERHOUSE
        </div>
        <h2 class="title">Evaluación en 4 Dimensiones</h2>
        <p class="subtitle">Un protocolo diseñado para la máxima precisión biológica.</p>
      </div>

      <div class="steps-grid">
        <div 
          v-for="(step, index) in steps" 
          :key="step.title" 
          class="step-card" 
          data-aos="fade-up" 
          :data-aos-delay="step.delay"
        >
          <div class="step-num">0{{ index + 1 }}</div>
          <div class="step-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path :d="step.icon"></path>
            </svg>
          </div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-desc">{{ step.description }}</p>
          <div class="step-progress"></div>
        </div>
      </div>

      <div class="system-footer" data-aos="fade-up">
        <div class="footer-box">
          <p>Cada fase está interconectada. No son pasos aislados, es un <strong>ecosistema de recuperación</strong>.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-system {
  background: #05060f;
  position: relative;
  overflow: hidden;
  padding: 100px 0;

  .system-header {
    text-align: center;
    margin-bottom: 80px;

    .title {
      font-size: clamp(32px, 5vw, 64px);
      font-weight: 800;
      margin-bottom: 24px;
      color: #ffffff;
    }

    .subtitle {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.5);
      font-weight: 300;
    }
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  .step-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 40px;
    border-radius: 32px;
    position: relative;
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    display: flex;
    flex-direction: column;
    min-height: 380px;

    &:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: var(--phb-cyan, #21bcfa);
      transform: translateY(-15px);

      .step-progress {
        width: 100%;
        opacity: 1;
      }

      .step-icon {
        color: var(--phb-cyan, #21bcfa);
        transform: scale(1.1);
      }
    }

    .step-num {
      font-size: 14px;
      font-weight: 900;
      color: rgba(255, 255, 255, 0.1);
      margin-bottom: 32px;
      letter-spacing: 0.2em;
    }

    .step-icon {
      width: 64px;
      height: 64px;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32px;
      color: rgba(255, 255, 255, 0.4);
      transition: all 0.5s ease;
    }

    .step-title {
      font-size: 22px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 20px;
      line-height: 1.2;
    }

    .step-desc {
      font-size: 16px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.5);
      font-weight: 300;
    }

    .step-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4px;
      width: 0%;
      background: var(--phb-cyan, #21bcfa);
      opacity: 0;
      transition: all 0.8s ease;
      border-radius: 0 0 32px 32px;
    }
  }

  .system-footer {
    margin-top: 80px;
    display: flex;
    justify-content: center;

    .footer-box {
      background: rgba(33, 188, 251, 0.05);
      padding: 24px 48px;
      border-radius: 100px;
      border: 1px solid rgba(33, 188, 251, 0.1);

      p {
        font-size: 18px;
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
        
        strong {
          color: var(--phb-cyan, #21bcfa);
        }
      }
    }
  }
}
</style>
