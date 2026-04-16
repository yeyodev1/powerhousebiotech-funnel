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
          <div class="phb-problem__card-icon" v-html="card.icon"></div>
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
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2">
      <rect x="8" y="8" width="32" height="36" rx="2"/>
      <path d="M16 20h16M16 28h10"/>
      <circle cx="35" cy="37" r="7" fill="white" stroke="currentColor" stroke-width="1.2"/>
      <path d="M32 37h6M35 34v6" stroke="currentColor" stroke-width="1.2"/>
    </svg>`,
    title: 'Estudios sin claridad',
    body: 'Te entregan resultados… pero no te explican qué significan juntos. Cada resultado va solo, sin que nadie conecte el panorama completo.',
  },
  {
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2">
      <circle cx="24" cy="24" r="16"/>
      <path d="M24 16v8l5 5"/>
      <path d="M14 36l-4 4M34 36l4 4"/>
    </svg>`,
    title: 'Acciones sin dirección',
    body: 'Pruebas tratamientos, suplementos o terapias… sin una estrategia clara. Cada intento es aislado, sin una hoja de ruta basada en tu biología.',
  },
  {
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2">
      <path d="M24 8C15.2 8 8 15.2 8 24s7.2 16 16 16 16-7.2 16-16S32.8 8 24 8z"/>
      <path d="M24 18v10M24 32v2"/>
    </svg>`,
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
  transition: border-color 0.2s;

  &:hover { border-color: var(--phb-blue); }
}

.phb-problem__card-icon {
  width: 48px;
  height: 48px;
  color: var(--phb-blue);
  opacity: 0.8;
  margin-bottom: 28px;

  svg { width: 100%; height: 100%; }
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
