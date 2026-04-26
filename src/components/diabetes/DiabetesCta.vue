<script setup lang="ts">
const handleEvalClick = () => {
  window.location.href = '/cualificar';
};

const handleWhatsappClick = () => {
  window.open('https://wa.me/yournumber', '_blank');
};
</script>

<template>
  <section class="diabetes-cta">
    <!-- Pulse Animation Background -->
    <div class="cta-visuals">
      <div class="pulse-circle"></div>
      <div class="pulse-circle"></div>
      <div class="pulse-circle"></div>
    </div>

    <div class="container">
      <div class="cta-card" data-aos="zoom-in">
        
        <h2 class="cta-title">¿Estás listo para dejar de controlar y empezar a resolver?</h2>
        
        <p class="cta-desc">
          No todos los casos son aptos. Pero todos merecen una respuesta honesta. <br />
          <strong>Evalúa tu caso hoy mismo con nuestro equipo.</strong>
        </p>

        <div class="cta-actions">
          <button class="btn btn-primary" @click="handleEvalClick">
            <span class="btn-text">Quiero evaluar mi caso</span>
            <span class="btn-icon">→</span>
          </button>
          
          <button class="btn btn-outline" @click="handleWhatsappClick">
            <span class="btn-icon-wa">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.888 11.888-11.888 3.176 0 6.161 1.237 8.406 3.484 2.246 2.248 3.484 5.232 3.484 8.405 0 6.556-5.332 11.888-11.888 11.888-2.022 0-4.005-.515-5.756-1.49l-6.233 1.637zm6.3-1.637c1.553.93 3.111 1.417 4.63 1.417 5.968 0 10.826-4.859 10.826-10.825 0-2.891-1.125-5.608-3.167-7.651-2.043-2.042-4.761-3.168-7.658-3.168-5.968 0-10.826 4.858-10.826 10.825 0 1.905.496 3.766 1.436 5.385l-1.074 3.92 4.033-1.058zm11.365-7.426c-.302-.152-1.791-.883-2.068-.984-.277-.1-.479-.151-.68.151-.202.303-.781.984-.958 1.185-.177.202-.353.227-.655.076-.302-.151-1.274-.47-2.426-1.498-.897-.8-1.502-1.788-1.678-2.09-.177-.302-.019-.465.132-.615.136-.135.302-.353.454-.53.151-.177.202-.303.303-.505.101-.202.051-.378-.025-.53-.076-.151-.68-1.64-.931-2.245-.244-.59-.493-.51-.68-.519-.176-.009-.378-.011-.58-.011-.202 0-.53.076-.807.379-.277.303-1.059 1.035-1.059 2.524 0 1.489 1.084 2.928 1.235 3.13.151.202 2.133 3.256 5.166 4.561.721.311 1.284.497 1.723.637.724.23 1.384.197 1.905.12.581-.086 1.791-.732 2.042-1.438.253-.706.253-1.312.177-1.438-.076-.126-.277-.202-.579-.354z"/></svg>
            </span>
            <span class="btn-text">Consultar vía WhatsApp</span>
          </button>
        </div>

        <div class="cta-brand-footer">
          <p>POWERHOUSE BIOTECH — Medicina Regenerativa</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-cta {
  background: #05060f;
  position: relative;
  overflow: hidden;
  padding: clamp(100px, 15vw, 200px) 0;

  .cta-visuals {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;

    .pulse-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      height: 300px;
      border: 1px solid rgba(33, 188, 251, 0.1);
      border-radius: 50%;
      animation: pulse 4s infinite;

      &:nth-child(2) { animation-delay: 1.33s; }
      &:nth-child(3) { animation-delay: 2.66s; }
    }
  }

  @keyframes pulse {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
  }

  .cta-card {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
    padding: clamp(40px, 8vw, 100px);
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(40px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 64px;
    box-shadow: 0 50px 100px rgba(0, 0, 0, 0.6);
  }

  .cta-title {
    font-size: clamp(32px, 5vw, 64px);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 32px;
    color: #ffffff;
    letter-spacing: -0.04em;
  }

  .cta-desc {
    font-size: clamp(18px, 2.5vw, 22px);
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 56px;
    font-weight: 300;

    strong {
      color: var(--phb-cyan, #21bcfa);
      font-weight: 700;
    }
  }

  .cta-actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 64px;
  }

  .btn {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px 48px;
    border-radius: 100px;
    font-size: 16px;
    font-weight: 700;
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.1em;

    &-primary {
      background: #ffffff;
      color: #05060f;
      border: none;
      box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);

      &:hover {
        background: var(--phb-cyan, #21bcfa);
        color: #05060f;
        transform: translateY(-8px);
        box-shadow: 0 30px 60px rgba(33, 188, 251, 0.4);
      }
    }

    &-outline {
      background: transparent;
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);

      &:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: #ffffff;
        transform: translateY(-8px);
      }
    }
  }

  .cta-brand-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 40px;
    p {
      font-size: 12px;
      font-weight: 800;
      color: rgba(255, 255, 255, 0.2);
      letter-spacing: 0.4em;
      text-transform: uppercase;
    }
  }
}

@media (max-width: 768px) {
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
