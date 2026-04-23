<script setup lang="ts">
const steps = [
  { title: "Evaluación Integral", desc: "Evaluamos tu caso de forma completa, no solo síntomas aislados." },
  { title: "Análisis Estratégico", desc: "Analizamos tus biomarcadores clave bajo un enfoque regenerativo." },
  { title: "Detección de Bloqueos", desc: "Identificamos obstáculos invisibles que impiden tu recuperación." },
  { title: "Medición de Respuesta", desc: "Medimos tu capacidad real de respuesta biológica al protocolo." },
  { title: "Determinación de Candidatura", desc: "Definimos con honestidad si eres apto para un protocolo serio." }
];
</script>

<template>
  <section class="diabetes-system">
    <div class="container">
      <header class="system-header" data-aos="fade-up">
        <h2 class="title">Nuestro Sistema</h2>
        <p class="subtitle">Aquí no improvisamos. Aquí buscamos precisión.</p>
      </header>

      <div class="steps-container">
        <div 
          v-for="(step, index) in steps" 
          :key="step.title" 
          class="step-card" 
          data-aos="fade-up" 
          :data-aos-delay="index * 100"
        >
          <div class="step-num">{{ index + 1 }}</div>
          <div class="step-content">
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-system {
  background: var(--phb-bg);
  padding: 100px 0;

  .system-header {
    text-align: center;
    margin-bottom: 80px;

    .title {
      font-size: clamp(32px, 5vw, 56px);
      font-weight: 700;
      color: var(--phb-white);
      margin-bottom: 16px;
    }

    .subtitle {
      font-size: 20px;
      color: var(--phb-accent);
      font-weight: 500;
    }
  }

  .steps-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 32px;
  }

  .step-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 40px;
    border-radius: 24px;
    transition: transform 0.3s ease, border-color 0.3s ease;

    &:hover {
      transform: translateY(-10px);
      border-color: var(--phb-accent);
      background: rgba(255, 255, 255, 0.05);
    }

    .step-num {
      width: 40px;
      height: 40px;
      background: var(--phb-accent);
      color: var(--phb-navy);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 800;
      margin-bottom: 24px;
    }

    .step-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 12px;
      color: var(--phb-white);
    }

    .step-desc {
      font-size: 16px;
      line-height: 1.5;
      color: var(--phb-muted);
    }
  }
}
</style>
