<script setup lang="ts">
import { ref } from 'vue';

const cases = [
  {
    title: "Diabetes Tipo 2 + Fatiga",
    rating: 5,
    context: "Paciente de 54 años con diagnóstico de 12 años. Dependencia de metformina e insulina con picos constantes.",
    report: "Evaluación EVR™ identificó resistencia periférica severa y un terreno biológico altamente acidificado.",
    outcomes: [
      "Reducción del 70% en requerimiento de insulina",
      "Estabilización de niveles basales en 30 días",
      "Recuperación total de claridad mental"
    ]
  },
  {
    title: "Neuropatía Incipiente",
    rating: 5,
    context: "Paciente con dolor neuropático en extremidades. Evolución tórpida a pesar de control farmacológico.",
    report: "Se detectó microinflamación neurovascular y niveles críticos de estrés oxidativo tisular.",
    outcomes: [
      "Remisión del dolor en un 85%",
      "Mejora medible en la conducción nerviosa",
      "Retorno a actividad física regular"
    ]
  }
];
</script>

<template>
  <section class="diabetes-cases">
    <div class="container">
      <div class="cases-header" data-aos="fade-up">
        <h2 class="title">Resultados que dejan de ser <span>suerte.</span></h2>
        <p class="subtitle">Casos reales analizados bajo el criterio de Viabilidad Regenerativa™.</p>
      </div>

      <div class="cases-grid">
        <div 
          v-for="(item, index) in cases" 
          :key="item.title" 
          class="case-card"
          data-aos="fade-up"
          :data-aos-delay="index * 200"
        >
          <div class="card-header">
            <div class="stars">
              <i v-for="n in item.rating" :key="n" class="fa-solid fa-star"></i>
            </div>
            <div class="case-badge">CASO DE ÉXITO</div>
          </div>

          <h3 class="case-title">{{ item.title }}</h3>

          <div class="case-info-grid">
            <div class="info-col">
              <span class="info-label">CONTEXTO</span>
              <p>{{ item.context }}</p>
            </div>
            <div class="info-col">
              <span class="info-label">DECIDE™ REPORT</span>
              <p>{{ item.report }}</p>
            </div>
          </div>

          <div class="case-divider"></div>

          <div class="case-outcomes">
            <span class="info-label">DESENLACE PHB™</span>
            <ul class="outcomes-list">
              <li v-for="outcome in item.outcomes" :key="outcome">
                <i class="fa-solid fa-circle-check"></i>
                <span>{{ outcome }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-cases {
  background: #f8f9fb;
  color: #05060f;
  padding: 120px 0;

  .cases-header {
    text-align: center;
    margin-bottom: 80px;

    .title {
      font-size: clamp(32px, 5vw, 56px);
      font-weight: 850;
      letter-spacing: -0.04em;
      line-height: 1.1;
      margin-bottom: 24px;

      span {
        color: var(--phb-blue, #1278f3);
      }
    }

    .subtitle {
      font-size: 20px;
      color: rgba(5, 6, 15, 0.5);
      font-weight: 300;
    }
  }

  .cases-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }

  .case-card {
    background: #ffffff;
    border-radius: 48px;
    padding: clamp(32px, 5vw, 60px);
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.03);
    transition: all 0.4s ease;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 60px 120px rgba(18, 120, 243, 0.08);
      border-color: rgba(18, 120, 243, 0.1);
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;

    .stars {
      color: #ffc107;
      font-size: 14px;
      display: flex;
      gap: 4px;
    }

    .case-badge {
      font-size: 11px;
      font-weight: 800;
      color: var(--phb-blue, #1278f3);
      background: rgba(18, 120, 243, 0.08);
      padding: 8px 16px;
      border-radius: 100px;
      letter-spacing: 0.1em;
    }
  }

  .case-title {
    font-size: clamp(24px, 3vw, 36px);
    font-weight: 800;
    margin-bottom: 40px;
    letter-spacing: -0.02em;
  }

  .case-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 40px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .info-label {
      display: block;
      font-size: 11px;
      font-weight: 900;
      color: var(--phb-blue, #1278f3);
      letter-spacing: 0.15em;
      margin-bottom: 16px;
      opacity: 0.8;
    }

    p {
      font-size: 16px;
      line-height: 1.6;
      color: rgba(5, 6, 15, 0.7);
      font-weight: 300;
    }
  }

  .case-divider {
    height: 1px;
    background: rgba(0, 0, 0, 0.05);
    margin-bottom: 40px;
  }

  .case-outcomes {
    .info-label {
      display: block;
      font-size: 11px;
      font-weight: 900;
      color: var(--phb-blue, #1278f3);
      letter-spacing: 0.15em;
      margin-bottom: 24px;
    }

    .outcomes-list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 16px;

      li {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 16px;
        font-weight: 300;
        color: #05060f;

        i {
          color: var(--phb-blue, #1278f3);
          font-size: 18px;
        }
      }
    }
  }
}
</style>
