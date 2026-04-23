<script setup lang="ts">
const stats = [
  { value: "15+", label: "Años de experiencia" },
  { value: "15,000+", label: "Pacientes atendidos" },
  { value: "50,000+", label: "Casos analizados" }
];
</script>

<template>
  <section class="diabetes-positioning">
    <div class="container">
      <div class="pos-grid">
        <div class="pos-content" data-aos="fade-right">
          <header class="pos-header">
            <span class="eyebrow">NUESTRA IDENTIDAD</span>
            <h2 class="title">Somos una plataforma de decisión en medicina regenerativa.</h2>
            <p class="tagline">No una clínica más.</p>
          </header>

          <div class="pos-body">
            <p>Nuestro trabajo no es convencerte. Nuestro trabajo es darte claridad. El problema no es la falta de opciones. Es la falta de criterio para elegirlas.</p>
          </div>

          <div class="stats-grid">
            <div v-for="stat in stats" :key="stat.label" class="stat-item" data-aos="fade-up">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <div class="pos-statement" data-aos="fade-left">
          <div class="statement-card">
            <div class="quote-icon">"</div>
            <p class="statement-text">
              No gana el paciente que prueba más cosas, <strong>Gana el paciente que entiende qué necesita</strong>, cuándo lo necesita y su cuerpo sigue siendo capaz de regenerarse.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-positioning {
  background: var(--phb-navy);
  padding: 120px 0;
  position: relative;
  overflow: hidden;

  .pos-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
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
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 16px;
    color: var(--phb-white);
  }

  .tagline {
    font-size: 24px;
    color: var(--phb-accent);
    font-weight: 600;
    margin-bottom: 32px;
  }

  .pos-body {
    font-size: 18px;
    line-height: 1.6;
    color: var(--phb-muted);
    margin-bottom: 48px;
    max-width: 500px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .stat-item {
    display: flex;
    flex-direction: column;

    .stat-value {
      font-size: 32px;
      font-weight: 800;
      color: var(--phb-white);
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 14px;
      color: var(--phb-accent);
      font-weight: 500;
      text-transform: uppercase;
    }
  }

  .statement-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 60px;
    border-radius: 40px;
    position: relative;
    backdrop-filter: blur(20px);

    .quote-icon {
      position: absolute;
      top: 40px;
      left: 40px;
      font-size: 80px;
      line-height: 1;
      font-family: serif;
      color: var(--phb-accent);
      opacity: 0.2;
    }

    .statement-text {
      font-size: 28px;
      line-height: 1.4;
      color: var(--phb-white);
      position: relative;
      z-index: 1;

      strong {
        color: var(--phb-accent);
        font-weight: 700;
      }
    }
  }
}

@media (max-width: 992px) {
  .pos-grid {
    grid-template-columns: 1fr;
    gap: 60px;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .statement-card {
    padding: 40px;
    
    .statement-text {
      font-size: 22px;
    }
  }
}
</style>
