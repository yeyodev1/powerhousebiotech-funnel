<script setup lang="ts">
const therapies = [
  {
    title: "Vía Intravenosa (IV)",
    subtitle: "SISTÉMICA",
    desc: "Busca una acción sistémica profunda, orientada a modular la inflamación y potenciar la recuperación general.",
    icon: "M12 2v20M2 12h20"
  },
  {
    title: "Vía Nebulizada",
    subtitle: "ABSORCIÓN RÁPIDA",
    desc: "Ruta complementaria de alta biodisponibilidad para un soporte metabólico directo.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  },
  {
    title: "Vía Oral",
    subtitle: "CONTINUIDAD",
    desc: "Mantenimiento y soporte biológico constante para sostener los resultados en el tiempo.",
    icon: "M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
  }
];
</script>

<template>
  <section class="diabetes-protocol">
    <div class="container">
      <div class="protocol-grid">
        <div class="protocol-left" data-aos="fade-right">
          <div class="phb-line-title">
            <span class="phb-line-title__line"></span>
            EL PROTOCOLO INTEGRAL
          </div>
          <h2 class="title">Abordaje en 3 Vías de Acceso</h2>
          <p class="description">
            No creemos en soluciones de una sola vía. La complejidad de la diabetes requiere un abordaje multifactorial y preciso.
          </p>

          <div class="priming-box" data-aos="fade-up" data-aos-delay="200">
            <div class="priming-header">
              <div class="priming-dot"></div>
              <h3>Fase 0: Priming Biológico</h3>
            </div>
            <p>
              Antes de cualquier intervención, preparamos tu terreno metabólico. Sin un terreno receptivo, cualquier tratamiento es desperdiciado.
            </p>
          </div>
        </div>

        <div class="protocol-right">
          <div 
            v-for="(therapy, index) in therapies" 
            :key="therapy.title" 
            class="therapy-card" 
            data-aos="fade-left" 
            :data-aos-delay="index * 200"
          >
            <div class="therapy-info">
              <span class="therapy-sub">{{ therapy.subtitle }}</span>
              <h3 class="therapy-title">{{ therapy.title }}</h3>
              <p class="therapy-desc">{{ therapy.desc }}</p>
            </div>
            <div class="therapy-icon">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path :d="therapy.icon"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-protocol {
  background: #ffffff;
  color: #05060f;
  position: relative;
  padding: 120px 0;

  .protocol-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: flex-start;

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
    font-size: 20px;
    line-height: 1.6;
    color: rgba(5, 6, 15, 0.6);
    margin-bottom: 48px;
    font-weight: 300;
  }

  .priming-box {
    background: #05060f;
    color: #ffffff;
    padding: 40px;
    border-radius: 32px;
    
    .priming-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;

      .priming-dot {
        width: 12px;
        height: 12px;
        background: var(--phb-cyan, #21bcfa);
        border-radius: 50%;
        box-shadow: 0 0 15px rgba(33, 188, 251, 0.6);
      }

      h3 {
        font-size: 18px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
    }

    p {
      font-size: 16px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 300;
    }
  }

  .protocol-right {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .therapy-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px;
    background: #f8f9fa;
    border-radius: 24px;
    transition: all 0.4s ease;

    &:hover {
      background: #f1f3f5;
      transform: translateX(-15px);
      
      .therapy-icon {
        background: #05060f;
        color: #ffffff;
      }
    }

    .therapy-sub {
      font-size: 12px;
      font-weight: 800;
      color: var(--phb-blue, #1278f3);
      letter-spacing: 0.2em;
      margin-bottom: 12px;
      display: block;
    }

    .therapy-title {
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 12px;
    }

    .therapy-desc {
      font-size: 15px;
      line-height: 1.5;
      color: rgba(5, 6, 15, 0.5);
      font-weight: 300;
      max-width: 400px;
    }

    .therapy-icon {
      width: 56px;
      height: 56px;
      background: rgba(5, 6, 15, 0.05);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s ease;
    }
  }
}
</style>
