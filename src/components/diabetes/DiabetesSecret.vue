<script setup lang="ts">
// Logic can be added here if needed
</script>

<template>
  <section class="diabetes-secret">
    <div class="container">
      <div class="secret-card" data-aos="zoom-in-up">
        
        <h2 class="secret-title">El mayor error no es la diabetes...</h2>
        
        <div class="secret-reveal">
          <p class="reveal-text">
            Es seguir dándole tiempo para avanzar en silencio mientras destruye tu salud poco a poco.
          </p>
        </div>

        <div class="secret-grid">
          <div class="secret-item" data-aos="fade-up" data-aos-delay="200">
            <div class="secret-num">01</div>
            <p>La medicina convencional se enfoca en el <strong>qué</strong> (glucosa alta).</p>
          </div>
          <div class="secret-item" data-aos="fade-up" data-aos-delay="400">
            <div class="secret-num">02</div>
            <p>Nosotros nos enfocamos en el <strong>por qué</strong> (fallo en la señalización celular).</p>
          </div>
          <div class="secret-item" data-aos="fade-up" data-aos-delay="600">
            <div class="secret-num">03</div>
            <p>Corregir el terreno biológico es la única forma de <strong>recuperar el equilibrio</strong>.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-secret {
  background: transparent;
  padding: 100px 0;

  .secret-card {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(40px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: clamp(40px, 8vw, 100px);
    border-radius: 64px;
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 50px 100px rgba(0, 0, 0, 0.5);

    &::after {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(33, 188, 251, 0.08) 0%, transparent 70%);
      pointer-events: none;
    }
  }

  .secret-title {
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 40px;
    color: #ffffff;
    letter-spacing: -0.04em;
  }

  .secret-reveal {
    background: linear-gradient(90deg, rgba(33, 188, 251, 0.1), rgba(18, 120, 243, 0.1));
    padding: 32px;
    border-radius: 24px;
    margin-bottom: 64px;
    border: 1px solid rgba(33, 188, 251, 0.2);

    .reveal-text {
      font-size: 24px;
      font-weight: 300;
      line-height: 1.4;
      color: #ffffff;

      strong {
        color: var(--phb-cyan, #21bcfa);
        font-weight: 700;
      }
    }
  }

  .secret-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  }

  .secret-item {
    text-align: left;
    background: rgba(255, 255, 255, 0.03);
    padding: 32px;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.05);

    .secret-num {
      font-size: 14px;
      font-weight: 900;
      color: var(--phb-cyan, #21bcfa);
      margin-bottom: 16px;
      opacity: 0.6;
    }

    p {
      font-size: 16px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.7);
      font-weight: 300;

      strong {
        color: #ffffff;
        font-weight: 700;
      }
    }
  }
}
</style>
