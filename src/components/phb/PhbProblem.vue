<template>
  <section class="phb-problem">
    <div class="phb-container">

      <div class="phb-problem__intro" data-aos="fade-up">
        <div class="phb-line-title">
          <span class="phb-line-title__line"></span>
          El problema real
        </div>
        <h2 class="phb-problem__heading">
          Tu cuerpo no falla<br>por falta de tratamientos…
        </h2>
        <p class="phb-problem__sub">
          Falla porque nadie te ha explicado lo que realmente está pasando.<br>
          Y porque el sistema médico está diseñado para tratar partes,<br>
          no para entender el panorama completo.
        </p>
      </div>

      <!-- 3 cards -->
      <div class="phb-problem__cards">
        <div
          v-for="(card, i) in cards"
          :key="card.title"
          class="phb-problem__card"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
        >
          <div class="phb-problem__card-icon"><i :class="card.icon"></i></div>
          <h3 class="phb-problem__card-title">{{ card.title }}</h3>
          <p class="phb-problem__card-body">{{ card.body }}</p>
        </div>
      </div>

      <!-- Key insight -->
      <div class="phb-problem__insight" data-aos="fade-up" data-aos-delay="100">
        <div class="phb-problem__insight-left">
          <p class="phb-problem__insight-quote">
            Vas de médico en médico…<br>
            de tratamiento en tratamiento…<br>
            <strong>sin un criterio que conecte todo.</strong>
          </p>
        </div>
        <div class="phb-problem__insight-right">
          <p class="phb-problem__insight-detail">
            El problema no es lo que haces…<br>
            es que estás actuando <em>sin entender tu biología.</em>
          </p>
          <p class="phb-problem__insight-close">
            Y mientras no entiendas eso…<br>
            vas a seguir intentando… sin ver resultados.
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const cards = [
  {
    icon: 'fa-solid fa-flask',
    title: 'Estudios sin claridad',
    body: 'Te entregan resultados… pero no te explican qué significan juntos. Cada resultado va solo, sin que nadie conecte el panorama completo.',
  },
  {
    icon: 'fa-solid fa-compass',
    title: 'Acciones sin dirección',
    body: 'Pruebas tratamientos, suplementos o terapias… sin una estrategia clara. Cada intento es aislado, sin una hoja de ruta basada en tu biología.',
  },
  {
    icon: 'fa-solid fa-triangle-exclamation',
    title: 'El cuerpo no responde',
    body: 'No porque no funcione… sino porque no está listo. Iniciar un tratamiento sin verificar la capacidad de respuesta es desperdiciar tiempo y dinero.',
  },
]
</script>

<style lang="scss" scoped>
.phb-problem {
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

.phb-problem__intro { max-width: 760px; margin-bottom: clamp(48px, 7vw, 80px); }

.phb-problem__heading {
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.phb-problem__sub {
  font-size: clamp(1rem, 1.3vw, 1.1rem);
  color: var(--phb-muted);
  line-height: 1.7;
  margin-top: 20px;
}

/* Cards */
.phb-problem__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-bottom: clamp(60px, 8vw, 100px);
}

.phb-problem__card {
  background: var(--phb-white);
  padding: 40px 32px;
  border-top: 2px solid transparent;
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s, transform 0.2s;

  &:hover {
    border-color: var(--phb-blue);
    transform: translateY(-4px);
  }
}

.phb-problem__card-icon {
  width: 52px;
  height: 52px;
  color: var(--phb-blue);
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(18, 120, 243, 0.08);
  border-radius: 12px;

  i { font-size: 22px; }
}

.phb-problem__card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--phb-text);
  margin-bottom: 14px;
  letter-spacing: -0.01em;
}

.phb-problem__card-body {
  font-size: 14px;
  color: var(--phb-muted);
  line-height: 1.65;
}

/* Insight block */
.phb-problem__insight {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  background: var(--phb-bg);
  color: var(--phb-white);
  padding: clamp(40px, 5vw, 72px);
}

.phb-problem__insight-quote {
  font-size: clamp(1.3rem, 2.2vw, 1.8rem);
  font-weight: 300;
  line-height: 1.5;

  strong { font-weight: 600; color: var(--phb-cyan); }
}

.phb-problem__insight-detail {
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  margin-bottom: 24px;

  em { font-style: italic; color: var(--phb-cyan); font-weight: 400; }
}

.phb-problem__insight-close {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
}

@media (max-width: 900px) {
  .phb-problem__cards { grid-template-columns: 1fr; }
  .phb-problem__insight { grid-template-columns: 1fr; gap: 32px; }
}
</style>
