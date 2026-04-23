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
        <!-- Left Side: For Who -->
        <div class="target-left" data-aos="fade-right">
          <div class="phb-line-title">
            <span class="phb-line-title__line"></span>
            PERFIL DEL PACIENTE
          </div>
          <h2 class="section-title">Este proceso es para personas que:</h2>
          
          <ul class="check-list">
            <li v-for="(item, index) in items" :key="index" data-aos="fade-up" :data-aos-delay="index * 100">
              <div class="icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <p>{{ item }}</p>
            </li>
          </ul>
        </div>

        <!-- Right Side: Not For Who -->
        <div class="target-right" data-aos="fade-left">
          <div class="negative-glass">
            <div class="negative-header">
              <div class="alert-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
              <h3 class="card-title">Este NO es un proceso para todos</h3>
            </div>
            
            <ul class="cross-list">
              <li v-for="(item, index) in notItems" :key="index" data-aos="fade-up" :data-aos-delay="index * 100">
                <span class="cross-icon">✕</span>
                <p>{{ item }}</p>
              </li>
            </ul>

            <div class="negative-footer">
              <p>Buscamos pacientes comprometidos con su salud, no solo con sus síntomas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-target {
  background: transparent;
  position: relative;

  .target-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 100px;
    align-items: center;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 60px;
    }
  }

  .section-title {
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 800;
    margin-bottom: 56px;
    line-height: 1.1;
    color: #ffffff;
    letter-spacing: -0.02em;
  }

  .check-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    li {
      display: flex;
      gap: 20px;
      align-items: center;
      padding: 1.25rem 1.75rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      transition: all 0.4s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.04);
        border-color: rgba(33, 188, 251, 0.3);
        transform: translateX(12px);
      }

      .icon-wrapper {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        background: rgba(33, 188, 251, 0.1);
        color: var(--phb-cyan, #21bcfa);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      p {
        font-size: 1.1rem;
        line-height: 1.4;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 300;
      }
    }
  }

  .negative-glass {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(40px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: clamp(40px, 8vw, 80px);
    border-radius: 48px;
    position: relative;
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.4);

    .negative-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 40px;

      .alert-icon {
        color: #ff4d4d;
        background: rgba(255, 77, 77, 0.1);
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
      }

      .card-title {
        font-size: 28px;
        font-weight: 800;
        color: #ffffff;
      }
    }
  }

  .cross-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;

    li {
      display: flex;
      gap: 16px;
      align-items: flex-start;

      .cross-icon {
        flex-shrink: 0;
        color: #ff4d4d;
        font-weight: 900;
        font-size: 18px;
      }

      p {
        font-size: 1.1rem;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.5);
        font-weight: 300;
      }
    }
  }

  .negative-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 32px;
    p {
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.3);
      font-style: italic;
      line-height: 1.6;
    }
  }
}
</style>
