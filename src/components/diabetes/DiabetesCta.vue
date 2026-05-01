<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleEvalClick = () => {
  sessionStorage.setItem('phb_source', 'Diabetes PHB')
  router.push('/cualificar');
};

const handleWhatsappClick = () => {
  window.open('https://wa.me/5218261295279', '_blank', 'noopener,noreferrer');
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
              <i class="fa-brands fa-whatsapp"></i>
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
    background: #0c1445;
    border: 1px solid rgba(33, 188, 251, 0.1);
    border-radius: 56px;
    box-shadow: 0 50px 100px rgba(0, 0, 0, 0.6),
                inset 0 0 40px rgba(33, 188, 251, 0.05);
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
