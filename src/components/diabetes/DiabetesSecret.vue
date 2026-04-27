<script setup lang="ts">
// Logic can be added here if needed
</script>

<template>
  <section class="diabetes-secret">
    <div class="container">
      <div class="secret-card" data-aos="zoom-in-up">
        <div class="secret-card__header">
          <p class="secret-card__lead">
            Somos los creadores de la
            <span class="highlight-cyan">Evaluación de Viabilidad Regenerativa™</span>
          </p>
          <p class="secret-card__sub">
            Un enfoque diseñado para responder una sola pregunta:
          </p>
        </div>

        <h2 class="secret-title">
          ¿Tu cuerpo realmente <br />
          <span>puede mejorar... o no?</span>
        </h2>

        <div class="secret-footer">
          <div class="footer-label">TE OFRECEMOS EXCLUSIVAMENTE:</div>
          <div class="secret-grid">
            <div class="secret-item" data-aos="fade-up" data-aos-delay="200">
              <div class="secret-num">01</div>
              <p>Análisis de <strong>fallo en señalización celular</strong> (no solo glucosa).</p>
            </div>
            <div class="secret-item" data-aos="fade-up" data-aos-delay="400">
              <div class="secret-num">02</div>
              <p>Protocolo de <strong>Recalibración Metabólica</strong> profunda.</p>
            </div>
            <div class="secret-item" data-aos="fade-up" data-aos-delay="600">
              <div class="secret-num">03</div>
              <p>Estrategia de <strong>continuidad biológica</strong> sostenida.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-secret {
  background: transparent;
  padding: clamp(80px, 10vw, 140px) 0;

  .secret-card {
    background: #0c1445;
    border: 1px solid rgba(33, 188, 251, 0.1);
    padding: clamp(60px, 10vw, 100px) clamp(30px, 5vw, 60px);
    border-radius: clamp(40px, 6vw, 80px);
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 60px 120px rgba(0, 0, 0, 0.6), 
                inset 0 0 40px rgba(33, 188, 251, 0.05);

    &::before {
      content: '';
      position: absolute;
      top: -10%;
      left: -10%;
      width: 50%;
      height: 50%;
      background: radial-gradient(circle, rgba(33, 188, 251, 0.15) 0%, transparent 70%);
      pointer-events: none;
    }
  }

  .secret-card__lead {
    font-size: clamp(24px, 3.5vw, 36px);
    font-weight: 300;
    line-height: 1.3;
    color: #ffffff;
    margin-bottom: 24px;
    max-width: 800px;
    margin-inline: auto;

    .highlight-cyan {
      display: block;
      color: var(--phb-cyan, #21bcfa);
      font-weight: 800;
      font-style: italic;
    }
  }

  .secret-card__sub {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 56px;
    font-weight: 300;
  }

  .secret-title {
    font-size: clamp(38px, 6vw, 76px);
    font-weight: 950;
    line-height: 1;
    margin-bottom: 80px;
    color: #ffffff;
    letter-spacing: -0.05em;

    span {
      display: block;
      opacity: 0.9;
    }
  }

  .secret-footer {
    background: rgba(255, 255, 255, 0.02);
    margin-top: 40px;
    padding: 60px 40px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 40px;

    @media (max-width: 768px) {
      padding: 40px 20px 0;
    }

    .footer-label {
      font-size: 12px;
      font-weight: 900;
      color: rgba(255, 255, 255, 0.2);
      letter-spacing: 0.3em;
      margin-bottom: 48px;
    }
  }

  .secret-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  .secret-item {
    text-align: left;
    
    .secret-num {
      font-size: 12px;
      font-weight: 900;
      color: var(--phb-cyan, #21bcfa);
      margin-bottom: 12px;
      opacity: 0.6;
    }

    p {
      font-size: 16px;
      line-height: 1.5;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 300;

      strong {
        color: #ffffff;
        font-weight: 700;
      }
    }
  }
}
</style>
