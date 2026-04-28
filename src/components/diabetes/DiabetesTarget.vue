<template>
  <section class="diabetes-target">
    <div class="container">
      <div class="target-grid">
        <!-- Left Side: For Who -->
        <div class="target-left" data-aos="fade-right">
          <h2 class="section-title">Este proceso es para personas que:</h2>
          
          <ul class="check-list">
            <li v-for="(item, index) in items" :key="index" data-aos="fade-up" :data-aos-delay="index * 100">
              <div class="icon-wrapper">
                <i class="fa-solid fa-check"></i>
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
                <i class="fa-solid fa-triangle-exclamation"></i>
              </div>
              <h3 class="card-title">Este NO es un proceso para todos</h3>
            </div>
            
            <ul class="cross-list">
              <li v-for="(item, index) in notItems" :key="index" data-aos="fade-up" :data-aos-delay="index * 100">
                <span class="cross-icon">
                  <i class="fa-solid fa-xmark"></i>
                </span>
                <p>{{ item }}</p>
              </li>
            </ul>

            <div class="negative-footer">
              <p>Buscamos pacientes comprometidos con su salud, <br><span>no solo con sus síntomas.</span></p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="target-cta" data-aos="fade-up" data-aos-delay="200">
        <PhbPrimaryBtn />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PhbPrimaryBtn from '@/components/phb/PhbPrimaryBtn.vue';

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

<style lang="scss" scoped>
.diabetes-target {
  background: transparent;
  position: relative;
  padding: clamp(60px, 8vw, 120px) 0;

  .target-grid {
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 80px;
    align-items: center;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 60px;
    }
  }

  .section-title {
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 850;
    margin-bottom: 48px;
    line-height: 1.1;
    color: #ffffff;
    letter-spacing: -0.04em;
  }

  .check-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li {
      display: flex;
      gap: 16px;
      align-items: center;
      padding: 1.25rem 1.75rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 24px;
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

      &:hover {
        background: rgba(33, 188, 251, 0.05);
        border-color: rgba(33, 188, 251, 0.2);
        transform: translateX(10px);
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
        font-size: 14px;
      }

      p {
        font-size: 1.05rem;
        line-height: 1.4;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 300;
      }
    }
  }

  .negative-glass {
    background: #0c1445;
    border: 1px solid rgba(33, 188, 251, 0.1);
    padding: clamp(40px, 8vw, 80px);
    border-radius: 56px;
    position: relative;
    box-shadow: 0 50px 100px rgba(0, 0, 0, 0.5),
                inset 0 0 30px rgba(33, 188, 251, 0.03);
    text-align: center;

    .negative-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      margin-bottom: 48px;

      .alert-icon {
        color: #ff4d4d;
        background: rgba(255, 77, 77, 0.1);
        width: 64px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        font-size: 24px;
      }

      .card-title {
        font-size: clamp(24px, 3vw, 32px);
        font-weight: 800;
        color: #ffffff;
        letter-spacing: -0.02em;
      }
    }
  }

  .cross-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 56px;
    text-align: left;
    max-width: 440px;
    margin-inline: auto;

    li {
      display: flex;
      gap: 16px;
      align-items: flex-start;

      .cross-icon {
        flex-shrink: 0;
        color: #ff4d4d;
        font-size: 16px;
        margin-top: 4px;
      }

      p {
        font-size: 1.1rem;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 300;
      }
    }
  }

  .negative-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 40px;
    
    p {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.4;
      font-weight: 300;

      span {
        display: block;
        color: #ff4d4d;
        font-weight: 800;
        font-style: italic;
        margin-top: 4px;
      }
    }
  }

  .target-cta {
    margin-top: 80px;
    display: flex;
    justify-content: center;
  }
}
</style>
