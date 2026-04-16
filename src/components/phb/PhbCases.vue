<template>
  <section class="phb-cases" id="casos">
    <div class="phb-container">

      <div class="phb-cases__header" data-aos="fade-up">
        <div class="phb-line-title">
          <span class="phb-line-title__line"></span>
          Prueba social
        </div>
        <h2 class="phb-cases__heading">
          Cuando se decide bien…<br>
          <em>los resultados dejan de ser suerte</em>
        </h2>
      </div>

      <div class="phb-cases__grid">
        <div
          v-for="(c, i) in cases"
          :key="c.title"
          class="phb-cases__card"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
        >
          <div class="phb-cases__card-top">
            <div class="phb-cases__card-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="phb-cases__card-tag" :class="`phb-cases__card-tag--${c.tagColor}`">
              {{ c.tag }}
            </div>
          </div>
          <h3 class="phb-cases__card-title">{{ c.title }}</h3>
          <p class="phb-cases__card-context">{{ c.context }}</p>
          <div class="phb-cases__card-divider"></div>
          <p class="phb-cases__card-process">{{ c.process }}</p>
          <div class="phb-cases__card-results">
            <div class="phb-cases__card-results-label">Resultado:</div>
            <ul>
              <li v-for="r in c.results" :key="r">
                <span class="phb-cases__result-check">&#10003;</span>
                {{ r }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="phb-cases__close" data-aos="fade-up">
        <p class="phb-cases__close-text">
          Esto es lo que nos diferencia de todos los demás:
        </p>
        <p class="phb-cases__close-statement">
          No aplicamos tratamientos a todos.<br>
          Tomamos decisiones clínicas basadas en <em>probabilidad real de respuesta.</em>
        </p>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const cases = [
  {
    tag: 'Caso exitoso',
    tagColor: 'green',
    title: 'Fatiga crónica · Mujer, 42 años',
    context: 'Había probado múltiples terapias sin éxito durante más de 7 años.',
    process: 'Se detectó inflamación sistémica elevada y disfunción metabólica. Se priorizó preparación biológica antes de intervenir.',
    results: [
      'Recuperación progresiva de energía en 3 semanas.',
      'Mejora total en biomarcadores inflamatorios.',
    ],
  },
  {
    tag: 'Caso redirected',
    tagColor: 'blue',
    title: 'Dolor articular · Hombre, 55 años',
    context: 'Buscaba terapia regenerativa inmediata.',
    process: 'Nuestra evaluación mostró que no era candidato en ese momento. Se trabajó primero en optimizar terreno biológico.',
    results: [
      'Reducción de dolor sin intervención inicial.',
      'Posterior aplicación con mejor respuesta.',
    ],
  },
  {
    tag: 'Caso rechazado',
    tagColor: 'amber',
    title: 'Paciente con alta expectativa',
    context: 'Paciente con expectativa de terapia inmediata. Evaluación indicó baja probabilidad de respuesta.',
    process: 'No se recomendó intervención. Se redirigió a enfoque más adecuado para su caso.',
    results: [
      'Se evitó inversión innecesaria.',
      'Se redirigió a enfoque más adecuado.',
    ],
  },
]
</script>

<style lang="scss" scoped>
.phb-cases {
  background: var(--phb-surface);
  color: var(--phb-text);
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
  color: var(--phb-muted);
  margin-bottom: 24px;
}

.phb-line-title__line {
  display: block;
  width: 32px;
  height: 1px;
  background: var(--phb-blue);
  flex-shrink: 0;
}

.phb-cases__header {
  max-width: 700px;
  margin-bottom: clamp(48px, 7vw, 80px);
}

.phb-cases__heading {
  font-size: clamp(2rem, 3.5vw, 3.5rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.02em;

  em { font-style: italic; font-weight: 700; color: var(--phb-blue); }
}

.phb-cases__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-bottom: clamp(60px, 8vw, 100px);
}

.phb-cases__card {
  background: var(--phb-white);
  padding: 36px 28px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.phb-cases__card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.phb-cases__card-num {
  font-size: 2rem;
  font-weight: 300;
  color: rgba(23, 24, 70, 0.1);
  line-height: 1;
  letter-spacing: -0.04em;
}

.phb-cases__card-tag {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;

  &--green {
    background: rgba(59, 183, 126, 0.1);
    color: #2a9d60;
  }
  &--blue {
    background: rgba(18, 120, 243, 0.1);
    color: var(--phb-blue);
  }
  &--amber {
    background: rgba(230, 140, 40, 0.1);
    color: #c97c1a;
  }
}

.phb-cases__card-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--phb-text);
  margin-bottom: 12px;
  line-height: 1.3;
}

.phb-cases__card-context {
  font-size: 13px;
  color: var(--phb-muted);
  line-height: 1.6;
  margin-bottom: 20px;
}

.phb-cases__card-divider {
  height: 1px;
  background: rgba(23, 24, 70, 0.08);
  margin-bottom: 16px;
}

.phb-cases__card-process {
  font-size: 13px;
  color: var(--phb-text);
  line-height: 1.6;
  margin-bottom: 20px;
}

.phb-cases__card-results {
  margin-top: auto;
}

.phb-cases__card-results-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--phb-blue);
  margin-bottom: 10px;
}

.phb-cases__card-results ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    display: flex;
    gap: 8px;
    font-size: 13px;
    color: var(--phb-text);
    line-height: 1.5;
  }
}

.phb-cases__result-check {
  color: #2a9d60;
  font-size: 14px;
  flex-shrink: 0;
}

/* Close block */
.phb-cases__close {
  border-top: 1px solid rgba(23, 24, 70, 0.08);
  padding-top: 48px;
  max-width: 700px;
}

.phb-cases__close-text {
  font-size: 14px;
  color: var(--phb-muted);
  margin-bottom: 12px;
  letter-spacing: 0.02em;
}

.phb-cases__close-statement {
  font-size: clamp(1.1rem, 1.8vw, 1.4rem);
  font-weight: 300;
  line-height: 1.5;
  color: var(--phb-text);

  em { font-style: italic; font-weight: 600; color: var(--phb-blue); }
}

@media (max-width: 900px) {
  .phb-cases__grid { grid-template-columns: 1fr; }
}
</style>
