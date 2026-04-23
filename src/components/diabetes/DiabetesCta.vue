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
    <div class="container">
      <div class="cta-card" data-aos="zoom-in">
        <div class="cta-content">
          <h2 class="title" data-aos="fade-up">Si ya entendiste que controlar no siempre es corregir, el siguiente paso no es adivinar.</h2>
          <p class="subtitle" data-aos="fade-up">Es evaluar con precisión.</p>

          <div class="cta-actions" data-aos="fade-up">
            <button class="btn btn-primary" @click="handleEvalClick">
              <span class="btn-text">Quiero saber si soy candidato</span>
              <span class="btn-icon">→</span>
            </button>
            <button class="btn btn-outline" @click="handleWhatsappClick">
              <span class="btn-text">Enviar mis estudios por WhatsApp</span>
            </button>
          </div>

          <footer class="cta-footer" data-aos="fade-up">
            <h3 class="closing-title">La diabetes no necesita más tiempo. <br /><span>Necesita una solución contundente de raíz.</span></h3>
            <p class="closing-p">Porque seguir controlando el deterioro no es lo mismo que resolverla una vez por todas.</p>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-cta {
  background: var(--sha-dark);
  padding: 120px 0;
  text-align: center;

  .cta-card {
    background: linear-gradient(135deg, var(--phb-navy) 0%, #090a11 100%);
    border: 1px solid var(--phb-border);
    padding: 80px 40px;
    border-radius: 48px;
    max-width: 1000px;
    margin: 0 auto;
    box-shadow: 0 40px 100px rgba(0,0,0,0.5);
  }

  .title {
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 700;
    color: var(--phb-white);
    margin-bottom: 24px;
    line-height: 1.2;
  }

  .subtitle {
    font-size: 24px;
    color: var(--phb-accent);
    font-weight: 600;
    margin-bottom: 48px;
  }

  .cta-actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 80px;
    flex-wrap: wrap;
  }

  .btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 40px;
    border-radius: 100px;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;

    &-primary {
      background: var(--phb-blue);
      color: white;
      border: none;
      box-shadow: 0 10px 20px rgba(18, 120, 243, 0.3);

      &:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 15px 30px rgba(18, 120, 243, 0.4);
      }
    }

    &-outline {
      background: transparent;
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);

      &:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: white;
      }
    }
  }

  .cta-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 60px;

    .closing-title {
      font-size: 28px;
      font-weight: 700;
      color: var(--phb-white);
      margin-bottom: 16px;
      line-height: 1.3;

      span { color: var(--phb-accent); }
    }

    .closing-p {
      font-size: 18px;
      color: var(--phb-muted);
      font-style: italic;
    }
  }
}

@media (max-width: 768px) {
  .cta-card {
    padding: 60px 24px;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
