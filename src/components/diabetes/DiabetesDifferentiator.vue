<script setup lang="ts">
const diffs = [
  {
    title: "Enfoque en la Causa Raíz",
    desc: "No silenciamos síntomas. Resolvemos el desequilibrio biológico que los genera."
  },
  {
    title: "Protocolo Personalizado",
    desc: "Cada cuerpo es único. Tu tratamiento se basa en tu propio terreno biológico."
  },
  {
    title: "Tecnología de Vanguardia",
    desc: "Utilizamos las terapias regenerativas más avanzadas con respaldo clínico."
  },
  {
    title: "Acompañamiento Experto",
    desc: "Un equipo de especialistas monitorea cada paso de tu recuperación."
  }
];
</script>

<template>
  <section class="diabetes-diff">
    <div class="container">
      <div class="diff-grid">
        <div class="diff-left" data-aos="fade-right">
          <div class="phb-line-title">
            <span class="phb-line-title__line"></span>
            POR QUÉ POWERHOUSE
          </div>
          <h2 class="title">La diferencia está en el criterio clínico.</h2>
          <p class="description">
            En un mundo saturado de "soluciones rápidas", nosotros apostamos por la precisión, la ciencia y la honestidad biológica.
          </p>
        </div>

        <div class="diff-right">
          <div 
            v-for="(item, index) in diffs" 
            :key="item.title" 
            class="diff-item" 
            data-aos="fade-up" 
            :data-aos-delay="index * 100"
          >
            <div class="diff-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div class="diff-info">
              <h3 class="item-title">{{ item.title }}</h3>
              <p class="item-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-diff {
  background: #ffffff;
  color: #05060f;
  padding: 120px 0;

  .diff-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 100px;
    align-items: center;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 60px;
    }
  }

  .phb-line-title {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    color: #05060f;

    &__line {
      width: 40px;
      height: 2px;
      background: #05060f;
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
    font-size: 20px;
    line-height: 1.6;
    color: rgba(5, 6, 15, 0.6);
    font-weight: 300;
  }

  .diff-right {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .diff-item {
    display: flex;
    gap: 24px;
    align-items: flex-start;
    padding: 32px;
    background: #f8f9fa;
    border-radius: 24px;
    transition: all 0.4s ease;

    &:hover {
      background: #f1f3f5;
      transform: translateX(15px);
      
      .diff-icon {
        background: #05060f;
        color: #ffffff;
      }
    }

    .diff-icon {
      flex-shrink: 0;
      width: 44px;
      height: 44px;
      background: rgba(5, 6, 15, 0.05);
      color: #05060f;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s ease;
    }

    .item-title {
      font-size: 22px;
      font-weight: 800;
      margin-bottom: 12px;
    }

    .item-desc {
      font-size: 16px;
      line-height: 1.5;
      color: rgba(5, 6, 15, 0.5);
      font-weight: 300;
    }
  }
}
</style>
