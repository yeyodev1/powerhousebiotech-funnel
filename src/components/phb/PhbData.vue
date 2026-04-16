<template>
  <section class="phb-data">
    <div class="phb-container">

      <div class="phb-data__header" data-aos="fade-up">
        <div class="phb-line-title phb-line-title--light">
          <span class="phb-line-title__line"></span>
          Datos que explican el problema
        </div>
        <h2 class="phb-data__heading">
          La realidad del<br><em>sistema de salud actual</em>
        </h2>
      </div>

      <div class="phb-data__grid">
        <div
          v-for="(stat, i) in stats"
          :key="stat.number"
          class="phb-data__item"
          data-aos="fade-up"
          :data-aos-delay="(i % 3) * 80"
        >
          <div class="phb-data__number">{{ stat.number }}</div>
          <p class="phb-data__desc">{{ stat.desc }}</p>
        </div>
      </div>

      <!-- Closing statement -->
      <div class="phb-data__close" data-aos="fade-up">
        <p class="phb-data__close-text">
          El sistema médico convencional está <strong>fragmentado.</strong><br>
          Cada especialista ve una parte.<br>
          <em>Nadie se quiere hacer responsable.</em>
        </p>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { number: '+50%', desc: 'de los adultos arriba de los 45 años viven con al menos una enfermedad crónica.' },
  { number: '6 / 10', desc: 'personas tienen más de una condición que les provoca malestar en su cuerpo.' },
  { number: '70%', desc: 'de los tratamientos convencionales no logran los resultados esperados.' },
  { number: '∞', desc: 'especialistas que ven partes — ninguno que entienda el cuadro completo.' },
  { number: '90%', desc: 'de los médicos trabajan con información desactualizada sobre medicina regenerativa.' },
  { number: '0', desc: 'evaluaciones previas antes de iniciar un tratamiento. No se mide la capacidad real de respuesta.' },
]
</script>

<style lang="scss" scoped>
.phb-data {
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

.phb-line-title {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 24px;
}

.phb-line-title__line {
  display: block;
  width: 32px;
  height: 1px;
  background: var(--phb-cyan);
  flex-shrink: 0;
}

.phb-data__header {
  margin-bottom: clamp(60px, 8vw, 100px);
}

.phb-data__heading {
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.02em;
  max-width: 600px;

  em { font-style: italic; font-weight: 700; color: var(--phb-cyan); }
}

.phb-data__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: clamp(60px, 8vw, 100px);
}

.phb-data__item {
  border-radius: 12px;
  background: var(--phb-bg);
  padding: 40px 32px;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    background: rgba(18, 120, 243, 0.06);
    border-color: var(--phb-blue);
  }
}

.phb-data__number {
  font-size: clamp(2.5rem, 4.5vw, 4rem);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--phb-cyan);
  margin-bottom: 16px;
}

.phb-data__desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.6;
}

.phb-data__close {
  max-width: 700px;
}

.phb-data__close-text {
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  font-weight: 300;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);

  strong { color: var(--phb-white); font-weight: 600; }
  em { font-style: italic; color: var(--phb-cyan); }
}

@media (max-width: 900px) {
  .phb-data__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .phb-data__grid { grid-template-columns: 1fr; }
}
</style>
