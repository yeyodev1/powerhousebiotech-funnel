<script setup lang="ts">
const items = [
  "Criterio clínico",
  "Experiencia real",
  "Selección correcta del paciente",
  "Protocolo integral",
  "Estrategia diseñada para intervenir desde la raíz"
];
</script>

<template>
  <section class="diabetes-differentiator">
    <div class="container">
      <div class="diff-card" data-aos="flip-up">
        <div class="diff-header" data-aos="fade-up">
          <span class="eyebrow">EL DIFERENCIAL</span>
          <h2 class="title">Muchos hablan de células madre. Muy pocos saben cuándo, cómo y en quién pueden funcionar.</h2>
        </div>

        <div class="diff-content">
          <p class="intro" data-aos="fade-up">La diferencia no está solo en tener acceso a terapias avanzadas. La diferencia está en tener:</p>
          
          <div class="diff-items">
            <div v-for="(item, index) in items" :key="index" class="diff-item" data-aos="fade-left" :data-aos-delay="index * 100">
              <span class="dot"></span>
              <p>{{ item }}</p>
            </div>
          </div>

          <div class="final-statement" data-aos="zoom-in">
            <p>Eso es lo que hacemos.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-differentiator {
  background: var(--phb-bg);
  padding: 100px 0;

  .diff-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 80px;
    border-radius: 40px;
    text-align: center;
  }

  .eyebrow {
    color: var(--phb-accent);
    font-weight: 700;
    letter-spacing: 0.2em;
    font-size: 14px;
    margin-bottom: 24px;
    display: block;
  }

  .title {
    font-size: clamp(28px, 3.5vw, 44px);
    font-weight: 700;
    line-height: 1.3;
    color: var(--phb-white);
    max-width: 800px;
    margin: 0 auto 48px;
  }

  .intro {
    font-size: 20px;
    color: var(--phb-muted);
    margin-bottom: 40px;
  }

  .diff-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    margin-bottom: 60px;
  }

  .diff-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.05);
    padding: 12px 24px;
    border-radius: 100px;
    border: 1px solid rgba(255, 255, 255, 0.05);

    .dot {
      width: 8px;
      height: 8px;
      background: var(--phb-accent);
      border-radius: 50%;
    }

    p {
      font-size: 16px;
      font-weight: 600;
      color: var(--phb-white);
    }
  }

  .final-statement {
    p {
      font-size: 32px;
      font-weight: 800;
      color: var(--phb-white);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }
}

@media (max-width: 768px) {
  .diff-card {
    padding: 40px 24px;
  }

  .diff-items {
    flex-direction: column;
    align-items: center;
  }

  .diff-item {
    width: 100%;
    justify-content: center;
  }
}
</style>
