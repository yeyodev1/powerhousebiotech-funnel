<template>
  <section class="phb-cta" id="cta">
    <div class="phb-container">

      <div class="phb-cta__inner">
        <!-- Left: copy -->
        <div class="phb-cta__copy" data-aos="fade-up">
          <div class="phb-line-title phb-line-title--light">
            <span class="phb-line-title__line"></span>
            El cierre
          </div>
          <h2 class="phb-cta__heading">
            Puedes seguir intentando…<br>
            <em>o puedes empezar a entender.</em>
          </h2>
          <p class="phb-cta__body">
            Miles de dólares se invierten cada año en terapias sin resultados.
            La mayoría prueba múltiples opciones antes de encontrar una que funcione.
          </p>

          <div class="phb-cta__pains">
            <div class="phb-cta__pain" v-for="pain in pains" :key="pain">
              <span class="phb-cta__pain-x">&#10006;</span>
              {{ pain }}
            </div>
          </div>

          <p class="phb-cta__measurement">
            Lo que no se mide…<br>
            <strong>no se puede regenerar.</strong>
          </p>
        </div>

        <!-- Right: CTA card -->
        <div class="phb-cta__card" data-aos="fade-up" data-aos-delay="150">
          <div class="phb-cta__card-badge">
            Modelo de admisión selectivo
          </div>
          <p class="phb-cta__card-desc">
            No todos los pacientes son aceptados.<br>
            Seleccionamos aproximadamente <strong>solo el 20%.</strong>
          </p>

          <div class="phb-cta__card-benefits">
            <div v-for="b in benefits" :key="b" class="phb-cta__benefit">
              <span class="phb-cta__benefit-check">&#10003;</span>
              {{ b }}
            </div>
          </div>

          <a href="#" class="phb-cta__btn-primary">
            &#128073; Agendar Evaluación de Viabilidad Regenerativa™
          </a>
          <a href="#" class="phb-cta__btn-secondary">
            Hablar con un asesor ahora
          </a>

          <p class="phb-cta__microcopy">
            Somos una plataforma que prioriza criterio clínico sobre volumen.
            Solo aceptamos pacientes cuando existe una probabilidad real de respuesta.
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const pains = [
  'Dinero invertido en terapias que no funcionan.',
  'Decisiones basadas en prueba y error.',
  'Desgaste físico y emocional acumulado.',
]

const benefits = [
  'Trabajar solo con casos viables.',
  'Maximizar resultados.',
  'Evitar intervenciones innecesarias.',
]
</script>

<style lang="scss" scoped>
.phb-cta {
  background: var(--phb-bg);
  color: var(--phb-white);
  padding: clamp(80px, 10vw, 140px) 0;
  font-family: var(--phb-font);
}

.phb-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 80px);
}

.phb-cta__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 6vw, 100px);
  align-items: start;
}

.phb-line-title {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 24px;
}

.phb-line-title__line {
  display: block;
  width: 32px;
  height: 1px;
  background: var(--phb-cyan);
  flex-shrink: 0;
}

.phb-cta__heading {
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 24px;

  em { font-style: italic; font-weight: 700; color: var(--phb-cyan); }
}

.phb-cta__body {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin-bottom: 32px;
}

.phb-cta__pains {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 36px;
}

.phb-cta__pain {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.5;
}

.phb-cta__pain-x {
  color: rgba(230, 80, 80, 0.8);
  flex-shrink: 0;
  margin-top: 1px;
}

.phb-cta__measurement {
  font-size: clamp(1.1rem, 1.6vw, 1.3rem);
  font-weight: 300;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.75);

  strong { color: var(--phb-cyan); font-weight: 600; }
}

/* Card */
.phb-cta__card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px 36px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.phb-cta__card-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--phb-cyan);
  border: 1px solid rgba(33, 188, 251, 0.3);
  padding: 5px 12px;
  width: fit-content;
}

.phb-cta__card-desc {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;

  strong { color: var(--phb-white); font-weight: 600; }
}

.phb-cta__card-benefits {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.phb-cta__benefit {
  display: flex;
  gap: 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.phb-cta__benefit-check {
  color: var(--phb-cyan);
  flex-shrink: 0;
}

.phb-cta__btn-primary {
  display: block;
  width: 100%;
  padding: 18px 24px;
  background: var(--phb-blue);
  color: var(--phb-white);
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-family: var(--phb-font);
  transition: background 0.2s;

  &:hover { background: #0d65d9; }
}

.phb-cta__btn-secondary {
  display: block;
  width: 100%;
  padding: 14px 24px;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-family: var(--phb-font);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s;

  &:hover {
    color: var(--phb-white);
    border-color: rgba(255, 255, 255, 0.5);
  }
}

.phb-cta__microcopy {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  line-height: 1.6;
  text-align: center;
}

@media (max-width: 900px) {
  .phb-cta__inner { grid-template-columns: 1fr; }
}
</style>
