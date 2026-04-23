<script setup lang="ts">
const benefits = [
  "Más claridad sobre su condición",
  "Menos miedo al deterioro progresivo",
  "Menos carga física y emocional asociada a la diabetes",
  "Más control real sobre su salud",
  "Más posibilidades de recuperar energía, estabilidad y calidad de vida"
];
</script>

<template>
  <section class="diabetes-benefits">
    <div class="container">
      <div class="benefits-grid">
        <div class="benefits-visual" data-aos="fade-right">
          <div class="img-wrapper">
            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" alt="Regenerative Medicine" />
            <div class="overlay-card" data-aos="zoom-in" data-aos-delay="400">
              <span class="card-title">Objetivo Real</span>
              <p>Ayudarte a recuperar disfrutar la vida sin temor ni culpa.</p>
            </div>
          </div>
        </div>

        <div class="benefits-content" data-aos="fade-left">
          <header class="benefits-header">
            <span class="eyebrow">EL RESULTADO</span>
            <h2 class="title">Aspiramos a que el paciente correcto pueda vivir con:</h2>
          </header>

          <ul class="benefit-list">
            <li v-for="(benefit, index) in benefits" :key="index" data-aos="fade-up" :data-aos-delay="index * 100">
              <div class="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <p>{{ benefit }}</p>
            </li>
          </ul>

          <div class="benefits-footer" data-aos="fade-up">
            <p>No trabajamos para que te resignes a “sobrevivir controlando”.</p>
            <p class="highlight">Trabajamos para cambiar el terreno biológico sobre el que tu salud se ha ido deteriorando.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-benefits {
  background: white;
  color: var(--sha-dark);

  .benefits-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 100px;
    align-items: center;
  }

  .img-wrapper {
    position: relative;
    border-radius: 40px;
    overflow: visible;

    img {
      width: 100%;
      height: 600px;
      object-fit: cover;
      border-radius: 40px;
      box-shadow: 0 40px 80px rgba(0,0,0,0.1);
    }

    .overlay-card {
      position: absolute;
      bottom: -40px;
      right: -40px;
      background: var(--phb-blue);
      color: white;
      padding: 40px;
      border-radius: 32px;
      max-width: 320px;
      box-shadow: 0 30px 60px rgba(18, 120, 243, 0.3);

      .card-title {
        display: block;
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 12px;
        opacity: 0.8;
      }

      p {
        font-size: 20px;
        font-weight: 600;
        line-height: 1.3;
      }
    }
  }

  .eyebrow {
    color: var(--phb-blue);
    font-weight: 700;
    letter-spacing: 0.2em;
    font-size: 14px;
    margin-bottom: 24px;
    display: block;
  }

  .title {
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 48px;
  }

  .benefit-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 60px;

    li {
      display: flex;
      gap: 20px;
      align-items: center;

      .benefit-icon {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        background: rgba(18, 120, 243, 0.1);
        color: var(--phb-blue);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      p {
        font-size: 18px;
        font-weight: 500;
        color: #444;
      }
    }
  }

  .benefits-footer {
    p {
      font-size: 18px;
      color: #666;
      margin-bottom: 16px;
    }

    .highlight {
      font-size: 22px;
      font-weight: 700;
      color: var(--phb-blue);
      line-height: 1.4;
    }
  }
}

@media (max-width: 992px) {
  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 80px;
  }

  .img-wrapper {
    .overlay-card {
      right: 0;
      bottom: -20px;
      max-width: 100%;
    }
  }
}
</style>
