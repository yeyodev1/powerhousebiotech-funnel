<script setup lang="ts">
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
        <span class="eyebrow">LA VERDAD INCÓMODA</span>
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
          {{ factor.title }}
        </div>
      </div>

      <div class="truth-content">
        <div class="truth-text" data-aos="fade-right">
          <p class="main-p">
            Y eso no se revierte con control superficial. Tu fatiga, tu dificultad para bajar de peso, tu dependencia creciente de medicación, tus altibajos de energía y la sensación de que tu cuerpo ya no responde como antes, no son casualidad.
          </p>
          <div class="highlight-box">
            <p>La diabetes no solo altera tus análisis de laboratorios, sino que también altera tu libertad, tu tranquilidad y la dinámica de tu familia, ¿a poco no?</p>
          </div>
        </div>

        <div class="truth-signals" data-aos="fade-left">
          <h3 class="signals-title">Son señales de que:</h3>
          <ul class="signals-list">
            <li v-for="(signal, index) in signals" :key="index" data-aos="fade-up" :data-aos-delay="index * 100">
              <span class="bullet"></span>
              <p>{{ signal }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-truth {
  background: var(--sha-dark);
  color: var(--sha-white);
  padding: 100px 0;

  .truth-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 60px;

    .eyebrow {
      color: #ff4d4d;
      font-weight: 700;
      letter-spacing: 0.2em;
      font-size: 14px;
      margin-bottom: 24px;
      display: block;
    }

    .title {
      font-size: clamp(32px, 5vw, 56px);
      font-weight: 700;
      margin-bottom: 24px;
    }

    .subtitle {
      font-size: 20px;
      color: var(--phb-muted);
    }
  }

  .factors-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 80px;
  }

  .factor-tag {
    padding: 12px 24px;
    background: rgba(255, 77, 77, 0.1);
    border: 1px solid rgba(255, 77, 77, 0.2);
    border-radius: 100px;
    font-size: 16px;
    font-weight: 600;
    color: #ff4d4d;
  }

  .truth-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .main-p {
    font-size: 20px;
    line-height: 1.6;
    color: var(--phb-muted);
    margin-bottom: 40px;
  }

  .highlight-box {
    padding: 32px;
    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
    border-left: 4px solid var(--phb-accent);
    border-radius: 0 16px 16px 0;

    p {
      font-size: 22px;
      font-weight: 600;
      line-height: 1.4;
      color: var(--phb-white);
    }
  }

  .signals-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 32px;
    color: var(--phb-accent);
  }

  .signals-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;

    li {
      display: flex;
      gap: 16px;
      align-items: center;

      .bullet {
        width: 8px;
        height: 8px;
        background: var(--phb-accent);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--phb-accent);
      }

      p {
        font-size: 18px;
        color: var(--phb-white);
      }
    }
  }
}

@media (max-width: 992px) {
  .truth-content {
    grid-template-columns: 1fr;
    gap: 60px;
  }
}
</style>
