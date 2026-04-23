<script setup lang="ts">
const benefitsList = [
  {
    title: "Claridad y Energía",
    desc: "Recupera la vitalidad que el desorden metabólico te había robado.",
    icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z"
  },
  {
    title: "Estabilidad Biológica",
    desc: "Un sistema que funciona en equilibrio, sin picos ni caídas drásticas.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  },
  {
    title: "Libertad de Acción",
    desc: "Deja de vivir en función de tu condición y empieza a vivir en función de tus metas.",
    icon: "M12 2v20M2 12h20"
  }
];
</script>

<template>
  <section class="diabetes-benefits">
    <div class="benefits-bg-parallax"></div>
    <div class="container">
      <div class="benefits-header" data-aos="fade-up">
        <div class="phb-line-title">
          <span class="phb-line-title__line"></span>
          EL RESULTADO FINAL
        </div>
        <h2 class="title">No solo mejores niveles. <br />Una mejor vida.</h2>
      </div>

      <div class="benefits-grid">
        <div 
          v-for="(benefit, index) in benefitsList" 
          :key="benefit.title" 
          class="benefit-item" 
          data-aos="fade-up" 
          :data-aos-delay="index * 200"
        >
          <div class="benefit-glass">
            <div class="benefit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path :d="benefit.icon"></path>
              </svg>
            </div>
            <h3 class="benefit-title">{{ benefit.title }}</h3>
            <p class="benefit-desc">{{ benefit.desc }}</p>
          </div>
        </div>
      </div>

      <div class="benefits-statement" data-aos="zoom-in" data-aos-delay="400">
        <p>
          Recuperar tu salud no es un lujo. <br />
          <strong>Es el cimiento sobre el cual construyes todo lo demás.</strong>
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-benefits {
  background: #05060f;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  padding: 160px 0;

  .benefits-bg-parallax {
    position: absolute;
    inset: 0;
    background-image: url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000');
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    z-index: 0;
    transform: scale(1.1);
    transition: transform 1s ease-out;
  }

  .container {
    position: relative;
    z-index: 1;
  }

  .phb-line-title {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 24px;
    color: var(--phb-cyan, #21bcfa);

    &__line {
      width: 40px;
      height: 2px;
      background: var(--phb-cyan, #21bcfa);
    }
  }

  .benefits-header {
    text-align: center;
    margin-bottom: 80px;

    .title {
      font-size: clamp(32px, 6vw, 72px);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.04em;
    }
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin-bottom: 100px;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  }

  .benefit-glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 60px 40px;
    border-radius: 40px;
    height: 100%;
    text-align: center;
    transition: all 0.5s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: var(--phb-cyan, #21bcfa);
      transform: translateY(-15px);

      .benefit-icon {
        background: var(--phb-cyan, #21bcfa);
        color: #05060f;
        box-shadow: 0 0 30px rgba(33, 188, 251, 0.4);
      }
    }

    .benefit-icon {
      width: 64px;
      height: 64px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 32px;
      color: var(--phb-cyan, #21bcfa);
      transition: all 0.5s ease;
    }

    .benefit-title {
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 20px;
    }

    .benefit-desc {
      font-size: 17px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.5);
      font-weight: 300;
    }
  }

  .benefits-statement {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;

    p {
      font-size: clamp(24px, 3.5vw, 40px);
      font-weight: 300;
      line-height: 1.3;
      color: rgba(255, 255, 255, 0.8);

      strong {
        color: #ffffff;
        font-weight: 800;
        display: block;
        margin-top: 20px;
      }
    }
  }
}
</style>
