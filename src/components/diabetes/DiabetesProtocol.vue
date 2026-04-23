<script setup lang="ts">
const routes = [
  {
    id: "iv",
    title: "Vía intravenosa (IV)",
    desc: "Busca una acción sistémica más amplia, orientada a apoyar procesos de modulación biológica, inflamación y recuperación general."
  },
  {
    id: "nebulized",
    title: "Vía nebulizada",
    desc: "Pensada como una ruta complementaria de absorción y soporte, dentro de una estrategia integral de intervención."
  },
  {
    id: "oral",
    title: "Vía oral",
    desc: "Orientada a dar continuidad al proceso y sostener parte del trabajo biológico desde un formato práctico y constante."
  }
];
</script>

<template>
  <section class="diabetes-protocol">
    <div class="container">
      <div class="protocol-header" data-aos="fade-up">
        <h2 class="title">El Protocolo</h2>
        <p class="subtitle">Cuando el paciente es el correcto, la medicina regenerativa cambia el escenario.</p>
      </div>

      <div class="routes-grid">
        <div 
          v-for="route in routes" 
          :key="route.id" 
          class="route-card" 
          data-aos="fade-up"
        >
          <div class="route-icon">
            <!-- Dynamic icon based on id -->
            <div v-if="route.id === 'iv'" class="icon-blob iv"></div>
            <div v-if="route.id === 'nebulized'" class="icon-blob neb"></div>
            <div v-if="route.id === 'oral'" class="icon-blob oral"></div>
          </div>
          <h3 class="route-title">{{ route.title }}</h3>
          <p class="route-desc">{{ route.desc }}</p>
        </div>
      </div>

      <div class="priming-section" data-aos="zoom-in">
        <div class="priming-card">
          <div class="priming-content">
            <h3 class="priming-title">Priming Biológico</h3>
            <p class="priming-p">Antes de intervenir, preparamos el terreno.</p>
            <div class="priming-box">
              <p>Porque un cuerpo inflamado, saturado, metabólicamente alterado y biológicamente agotado no responde igual.</p>
              <p>El <strong>Priming Biológico</strong> busca optimizar las condiciones del paciente para que su organismo tenga una mejor capacidad de respuesta, adaptación y aprovechamiento del protocolo.</p>
            </div>
            <div class="priming-footer">
              <span>Primero preparamos.</span>
              <span class="sep">→</span>
              <span>Luego intervenimos.</span>
              <span class="sep">→</span>
              <span>Después medimos.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-protocol {
  background: var(--sha-dark-2);
  padding: 120px 0;

  .protocol-header {
    text-align: center;
    margin-bottom: 80px;

    .title {
      font-size: clamp(32px, 5vw, 56px);
      font-weight: 700;
      color: var(--phb-white);
      margin-bottom: 16px;
    }

    .subtitle {
      font-size: 20px;
      color: var(--phb-muted);
      max-width: 700px;
      margin: 0 auto;
    }
  }

  .routes-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin-bottom: 100px;
  }

  .route-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 48px 32px;
    border-radius: 32px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    .route-icon {
      margin-bottom: 32px;
      .icon-blob {
        width: 64px;
        height: 64px;
        border-radius: 20px;
        filter: blur(20px);
        opacity: 0.6;
      }
      .iv { background: var(--phb-blue); }
      .neb { background: var(--phb-accent); }
      .oral { background: var(--phb-cyan); }
    }

    .route-title {
      font-size: 24px;
      font-weight: 700;
      color: var(--phb-white);
      margin-bottom: 20px;
    }

    .route-desc {
      font-size: 16px;
      line-height: 1.6;
      color: var(--phb-muted);
    }
  }

  .priming-section {
    max-width: 1000px;
    margin: 0 auto;
  }

  .priming-card {
    background: linear-gradient(135deg, rgba(33, 188, 251, 0.1) 0%, rgba(18, 120, 243, 0.1) 100%);
    border: 1px solid var(--phb-border);
    padding: 60px;
    border-radius: 40px;
    text-align: center;
  }

  .priming-title {
    font-size: 32px;
    font-weight: 800;
    color: var(--phb-accent);
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .priming-p {
    font-size: 22px;
    font-weight: 600;
    color: var(--phb-white);
    margin-bottom: 32px;
  }

  .priming-box {
    background: rgba(0, 0, 0, 0.2);
    padding: 32px;
    border-radius: 20px;
    margin-bottom: 40px;
    text-align: left;

    p {
      font-size: 18px;
      line-height: 1.6;
      color: var(--phb-muted);
      margin-bottom: 16px;
      &:last-child { margin-bottom: 0; }
    }

    strong { color: var(--phb-white); }
  }

  .priming-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 20px;
    font-weight: 700;
    color: var(--phb-white);

    .sep { color: var(--phb-accent); }
  }
}

@media (max-width: 992px) {
  .routes-grid {
    grid-template-columns: 1fr;
  }

  .priming-card {
    padding: 40px 24px;
  }

  .priming-footer {
    flex-direction: column;
    gap: 8px;
    .sep { display: none; }
  }
}
</style>
