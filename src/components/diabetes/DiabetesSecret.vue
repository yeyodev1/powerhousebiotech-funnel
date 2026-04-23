<script setup lang="ts">
const evaluationPoints = [
  "El estado metabólico real",
  "La inflamación de fondo",
  "La capacidad regenerativa del paciente",
  "Su nivel de deterioro biológico"
];
</script>

<template>
  <section class="diabetes-secret">
    <div class="container">
      <div class="secret-card" data-aos="zoom-in">
        <div class="secret-content">
          <header class="secret-header" data-aos="fade-up">
            <span class="eyebrow">EL SECRETO CLÍNICO</span>
            <h2 class="title">Lo que casi nadie te dice</h2>
          </header>

          <p class="intro-p" data-aos="fade-up">
            La medicina regenerativa ha abierto nuevas posibilidades. <br />
            <strong>Pero hay algo que casi nadie te dice:</strong>
          </p>

          <div class="warning-box" data-aos="fade-up">
            <p>No todos los pacientes están en condiciones de beneficiarse igual.</p>
          </div>

          <p class="secondary-p" data-aos="fade-up">
            Aplicar terapias avanzadas sin evaluar antes los siguientes factores es costoso, frustrante y muchas veces ineficiente:
          </p>

          <ul class="eval-list">
            <li v-for="(point, index) in evaluationPoints" :key="index" data-aos="fade-left" :data-aos-delay="index * 100">
              <span class="num">0{{ index + 1 }}</span>
              <p>{{ point }}</p>
            </li>
          </ul>

          <footer class="secret-footer" data-aos="fade-up">
            <p>Por eso nuestro enfoque no empieza con el tratamiento.</p>
            <div class="decision-highlight">Empieza con la decisión correcta.</div>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-secret {
  background: linear-gradient(180deg, var(--sha-dark) 0%, var(--phb-bg) 100%);
  
  .secret-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 40px;
    padding: 80px;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(18, 120, 243, 0.1) 0%, transparent 70%);
      z-index: 0;
    }
  }

  .secret-content {
    position: relative;
    z-index: 1;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }

  .eyebrow {
    color: var(--phb-accent);
    font-weight: 700;
    letter-spacing: 0.3em;
    font-size: 14px;
    margin-bottom: 24px;
    display: block;
  }

  .title {
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 700;
    margin-bottom: 40px;
    color: var(--phb-white);
  }

  .intro-p {
    font-size: 24px;
    line-height: 1.4;
    margin-bottom: 40px;
    color: var(--phb-muted);

    strong {
      color: var(--phb-white);
    }
  }

  .warning-box {
    display: inline-block;
    padding: 16px 40px;
    background: rgba(255, 77, 77, 0.1);
    border: 1px solid rgba(255, 77, 77, 0.3);
    border-radius: 100px;
    margin-bottom: 40px;

    p {
      color: #ff4d4d;
      font-size: 20px;
      font-weight: 700;
    }
  }

  .secondary-p {
    font-size: 18px;
    color: var(--phb-muted);
    margin-bottom: 48px;
  }

  .eval-list {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 64px;
    text-align: left;

    li {
      display: flex;
      align-items: center;
      gap: 20px;
      background: rgba(255, 255, 255, 0.05);
      padding: 24px;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.05);

      .num {
        font-size: 24px;
        font-weight: 800;
        color: var(--phb-accent);
        opacity: 0.5;
      }

      p {
        font-size: 18px;
        font-weight: 600;
        color: var(--phb-white);
      }
    }
  }

  .secret-footer {
    p {
      font-size: 20px;
      color: var(--phb-muted);
      margin-bottom: 16px;
    }

    .decision-highlight {
      font-size: 32px;
      font-weight: 800;
      color: var(--phb-white);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
}

@media (max-width: 768px) {
  .diabetes-secret {
    .secret-card {
      padding: 40px 24px;
    }

    .eval-list {
      grid-template-columns: 1fr;
    }

    .decision-highlight {
      font-size: 24px;
    }
  }
}
</style>
