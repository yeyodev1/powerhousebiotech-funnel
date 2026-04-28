<script setup lang="ts">
import PhbPrimaryBtn from '@/components/phb/PhbPrimaryBtn.vue';

const signals = [
  "Tu cuerpo no está usando la glucosa de forma eficiente",
  "Tu energía celular está comprometida",
  "Tu sistema metabólico está desordenado",
  "Tu capacidad de recuperación biológica está limitada"
];

const factors = [
  { title: "Resistencia a la insulina", delay: 0 },
  { title: "Inflamación crónica", delay: 100 },
  { title: "Desregulación metabólica", delay: 200 },
  { title: "Deterioro celular progresivo", delay: 300 }
];
</script>

<template>
  <section class="diabetes-truth">
    <div class="container">
      <div class="truth-header" data-aos="fade-up">
        <h2 class="title">La diabetes no es solo un número alto.</h2>
        <p class="subtitle">Es el resultado de un sistema que lleva tiempo deteriorándose:</p>
      </div>

      <div class="factors-row">
        <div 
          v-for="factor in factors" 
          :key="factor.title" 
          class="factor-tag" 
          data-aos="zoom-in" 
          :data-aos-delay="factor.delay"
        >
          <div class="factor-dot"></div>
          {{ factor.title }}
        </div>
      </div>

      <div class="truth-content">
        <div class="truth-left" data-aos="fade-right">
          <div class="truth-card">
            <p class="main-p">
              Y eso no se revierte con control superficial. Tu fatiga, tu dificultad para bajar de peso, tu dependencia creciente de medicación, tus altibajos de energía y la sensación de que tu cuerpo ya no responde como antes, no son casualidad.
            </p>
            <div class="highlight-quote">
              <p>La diabetes no solo altera tus análisis de laboratorios, sino que también altera <strong>tu libertad</strong>, tu tranquilidad y la dinámica de tu familia.</p>
            </div>
          </div>
        </div>

        <div class="truth-right" data-aos="fade-left">
          <div class="signals-box">
            <h3 class="signals-title">Son señales críticas de que:</h3>
            <ul class="signals-list">
              <li v-for="(signal, index) in signals" :key="index" data-aos="fade-up" :data-aos-delay="index * 100">
                <div class="signal-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
                <p>{{ signal }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="truth-cta" data-aos="fade-up" data-aos-delay="200">
        <PhbPrimaryBtn />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-truth {
  background: #05060f;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 77, 77, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  .truth-header {
    text-align: center;
    margin-bottom: 64px;

    .title {
      font-size: clamp(32px, 5vw, 64px);
      font-weight: 800;
      margin-bottom: 24px;
      letter-spacing: -0.03em;
      color: #ffffff;
    }

    .subtitle {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.5);
      font-weight: 300;
    }
  }

  .factors-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 100px;
  }

  .factor-tag {
    padding: 14px 28px;
    background: rgba(255, 77, 77, 0.05);
    border: 1px solid rgba(255, 77, 77, 0.15);
    border-radius: 100px;
    font-size: 16px;
    font-weight: 700;
    color: #ff4d4d;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.4s ease;

    &:hover {
      background: rgba(255, 77, 77, 0.1);
      border-color: #ff4d4d;
      transform: translateY(-5px);
    }

    .factor-dot {
      width: 8px;
      height: 8px;
      background: #ff4d4d;
      border-radius: 50%;
      box-shadow: 0 0 10px #ff4d4d;
    }
  }

  .truth-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 100px;
    align-items: flex-start;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 60px;
    }
  }

  .truth-card {
    .main-p {
      font-size: 22px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 48px;
      font-weight: 300;
    }

    .highlight-quote {
      padding: 40px;
      background: rgba(255, 255, 255, 0.02);
      border-left: 4px solid #ff4d4d;
      border-radius: 0 24px 24px 0;

      p {
        font-size: 26px;
        font-weight: 700;
        line-height: 1.4;
        color: #ffffff;

        strong {
          color: #ff4d4d;
        }
      }
    }
  }

  .signals-box {
    background: #0c1445;
    border: 1px solid rgba(33, 188, 251, 0.1);
    padding: clamp(30px, 6vw, 60px);
    border-radius: 40px;
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.4),
                inset 0 0 40px rgba(33, 188, 251, 0.05);

    .signals-title {
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 40px;
      color: #ffffff;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }

  .signals-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;

    li {
      display: flex;
      gap: 20px;
      align-items: center;

      .signal-icon {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        background: rgba(255, 77, 77, 0.1);
        color: #ff4d4d;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      p {
        font-size: 1.15rem;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 300;
        line-height: 1.4;
      }
    }
  }

  .truth-cta {
    margin-top: 80px;
    display: flex;
    justify-content: center;
  }
}
</style>
