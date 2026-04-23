<script setup lang="ts">
const items = [
  "Ya intentaron múltiples soluciones sin resultados sostenibles",
  "Están cansadas de “controlar” sin mejorar realmente",
  "Quieren entender qué está pasando de fondo en su cuerpo",
  "Están listas para tomar decisiones inteligentes, no solo obedecer inercias médicas",
  "Buscan una estrategia seria, integral y con criterio clínico"
];

const notItems = [
  "No es para quien busca un atajo barato.",
  "No es para quien quiere seguir pateando el problema.",
  "No es para quien prefiere anestesiar síntomas y llamarle a eso progreso."
];
</script>

<template>
  <section class="diabetes-target">
    <div class="container">
      <div class="target-grid">
        <div class="target-left" data-aos="fade-right">
          <h2 class="section-title">Este proceso es para personas que:</h2>
          <ul class="check-list">
            <li v-for="(item, index) in items" :key="index" data-aos="fade-up" :data-aos-delay="index * 100">
              <span class="icon">✔</span>
              <p>{{ item }}</p>
            </li>
          </ul>
        </div>

        <div class="target-right" data-aos="fade-left">
          <div class="negative-card">
            <h3 class="card-title">Este NO es un proceso para todos</h3>
            <ul class="cross-list">
              <li v-for="(item, index) in notItems" :key="index" data-aos="fade-up" :data-aos-delay="index * 100">
                <span class="icon">✕</span>
                <p>{{ item }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-target {
  background: rgba(255, 255, 255, 0.02);

  .target-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 80px;
    align-items: center;
  }

  .section-title {
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 700;
    margin-bottom: 48px;
    line-height: 1.2;
    color: var(--phb-white);
  }

  .check-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;

    li {
      display: flex;
      gap: 20px;
      align-items: flex-start;

      .icon {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        background: rgba(33, 188, 251, 0.15);
        color: var(--phb-accent);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 700;
        border: 1px solid var(--phb-border);
      }

      p {
        font-size: 18px;
        line-height: 1.4;
        color: var(--phb-white);
      }
    }
  }

  .negative-card {
    background: rgba(15, 16, 32, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 48px;
    border-radius: 32px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: #ff4d4d;
      opacity: 0.5;
    }

    .card-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 32px;
      color: #ff4d4d;
    }
  }

  .cross-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;

    li {
      display: flex;
      gap: 16px;
      align-items: flex-start;

      .icon {
        flex-shrink: 0;
        color: #ff4d4d;
        font-weight: 700;
        font-size: 18px;
        margin-top: 2px;
      }

      p {
        font-size: 16px;
        line-height: 1.5;
        color: var(--phb-muted);
      }
    }
  }
}

@media (max-width: 992px) {
  .target-grid {
    grid-template-columns: 1fr;
    gap: 60px;
  }
}

@media (max-width: 768px) {
  .diabetes-target {
    .section-title {
      text-align: center;
    }
    
    .negative-card {
      padding: 32px;
    }
  }
}
</style>
