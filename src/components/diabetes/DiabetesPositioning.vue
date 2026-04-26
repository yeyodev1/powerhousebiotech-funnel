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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span>Protocolo Certificado</span>
            </div>
            <div class="cert-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
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
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
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
  padding: 120px 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background: #f8f9fa;
    z-index: 0;
    
    @media (max-width: 1024px) {
      width: 100%;
      height: 50%;
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
    grid-template-columns: 1.2fr 0.8fr;
    gap: 80px;
    align-items: center;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 60px;
    }
  }

  .title {
    font-size: clamp(32px, 5vw, 64px);
    font-weight: 800;
    margin-bottom: 32px;
    letter-spacing: -0.04em;
    line-height: 1.1;
  }

  .description {
    font-size: 22px;
    line-height: 1.6;
    color: rgba(5, 6, 15, 0.6);
    margin-bottom: 48px;
    font-weight: 300;

    strong {
      color: #05060f;
      font-weight: 700;
    }
  }

  .badge-row {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }

  .cert-badge {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 24px;
    background: #f0f4f8;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    color: var(--phb-blue, #1278f3);
    text-transform: uppercase;
    letter-spacing: 0.05em;

    svg {
      color: var(--phb-blue, #1278f3);
    }
  }

  .stats-side {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .stat-box {
    text-align: left;
    padding-left: 40px;
    border-left: 4px solid #05060f;

    .stat-value {
      font-size: clamp(48px, 6vw, 84px);
      font-weight: 900;
      line-height: 1;
      color: #05060f;
      margin-bottom: 8px;
      letter-spacing: -0.04em;
    }

    .stat-label {
      font-size: 14px;
      color: rgba(5, 6, 15, 0.4);
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.2em;
    }
  }
}
</style>
