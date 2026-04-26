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
      <div class="positioning-content">
        <div class="text-side" data-aos="fade-right">
          <h2 class="title">No experimentamos con tu salud.</h2>
          <p class="description">
            Hemos perfeccionado un protocolo que combina la ciencia de vanguardia con la experiencia de miles de casos reales. 
            No se trata de teoría, se trata de <strong>evidencia biológica</strong>.
          </p>

          <div class="badge-row">
            <div class="cert-badge">
              <i class="fa-solid fa-shield-halved badge-icon"></i>
              <span>Protocolo Certificado</span>
            </div>
            <div class="cert-badge">
              <i class="fa-solid fa-vial-circle-check badge-icon"></i>
              <span>Base Científica</span>
            </div>
          </div>
        </div>

        <div class="stats-side">
          <div 
            v-for="(stat, index) in stats" 
            :key="stat.label" 
            class="stat-box" 
            data-aos="fade-left" 
            :data-aos-delay="index * 200"
          >
            <div class="stat-inner">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
            <div class="stat-bar"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-positioning {
  background: #ffffff;
  color: #05060f;
  position: relative;
  overflow: hidden;
  padding: clamp(80px, 12vw, 160px) 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 45%;
    height: 100%;
    background: #fcfdfe;
    z-index: 0;

    @media (max-width: 1024px) {
      width: 100%;
      height: 40%;
      bottom: 0;
      top: auto;
    }
  }

  .container {
    position: relative;
    z-index: 1;
  }

  .positioning-content {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: clamp(40px, 8vw, 120px);
    align-items: center;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 64px;
    }
  }

  .text-side {
    max-width: 650px;
  }

  .title {
    font-size: clamp(38px, 6vw, 72px);
    font-weight: 900;
    margin-bottom: 32px;
    letter-spacing: -0.05em;
    line-height: 1;
    color: #05060f;
  }

  .description {
    font-size: clamp(18px, 2.2vw, 24px);
    line-height: 1.5;
    color: rgba(5, 6, 15, 0.7);
    margin-bottom: 56px;
    font-weight: 300;

    strong {
      color: #05060f;
      font-weight: 700;
      position: relative;
      display: inline-block;

      &::after {
        content: '';
        position: absolute;
        bottom: 4px;
        left: 0;
        width: 100%;
        height: 8px;
        background: rgba(33, 188, 251, 0.1);
        z-index: -1;
      }
    }
  }

  .badge-row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .cert-badge {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 28px;
    background: #f8fafc;
    border: 1px solid rgba(18, 120, 243, 0.05);
    border-radius: 16px;
    font-size: 13px;
    font-weight: 800;
    color: var(--phb-blue, #1278f3);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);

    &:hover {
      transform: translateY(-4px);
      background: #ffffff;
      box-shadow: 0 12px 24px rgba(18, 120, 243, 0.08);
      border-color: rgba(18, 120, 243, 0.2);
    }

    .badge-icon {
      font-size: 18px;
    }
  }

  .stats-side {
    display: flex;
    flex-direction: column;
    gap: clamp(32px, 5vw, 56px);
  }

  .stat-box {
    position: relative;
    display: flex;
    align-items: flex-end;
    gap: 32px;
    transition: transform 0.4s ease;

    &:hover {
      transform: translateX(10px);

      .stat-bar {
        height: 100%;
        background: var(--phb-blue, #1278f3);
      }
    }

    .stat-inner {
      flex: 1;
    }

    .stat-value {
      font-size: clamp(56px, 8vw, 110px);
      font-weight: 950;
      line-height: 0.9;
      color: #05060f;
      margin-bottom: 12px;
      letter-spacing: -0.06em;
      font-variant-numeric: tabular-nums;
    }

    .stat-label {
      font-size: clamp(12px, 1.5vw, 14px);
      color: rgba(5, 6, 15, 0.4);
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.3em;
    }

    .stat-bar {
      width: 4px;
      height: 60%;
      background: rgba(5, 6, 15, 0.05);
      border-radius: 100px;
      transition: all 0.4s ease;
      position: absolute;
      left: -24px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

@media (max-width: 1024px) {
  .stat-box {
    padding-left: 32px;

    .stat-bar {
      left: 0;
    }
  }
}
</style>
