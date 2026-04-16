<template>
  <section class="phb-solution" id="solucion">
    <div class="phb-container">

      <div class="phb-solution__grid">
        <!-- Left: content -->
        <div class="phb-solution__left" data-aos="fade-up">
          <div class="phb-line-title">
            <span class="phb-line-title__line"></span>
            Nuestra solución
          </div>
          <h2 class="phb-solution__heading">
            Somos los creadores de la<br>
            <em>Evaluación de Viabilidad Regenerativa™</em>
          </h2>
          <p class="phb-solution__question">
            Un enfoque diseñado para responder una sola pregunta:
          </p>
          <p class="phb-solution__big-q">
            ¿Tu cuerpo realmente puede mejorar… o no?
          </p>
          <p class="phb-solution__body">
            Te ofrecemos exclusivamente:
          </p>
          <p class="phb-solution__offer">
            Evaluación honesta y transparente de tu estado de salud +
            Interpretación de biomarcadores + Orientación Regenerativa
            antes de sugerirte cualquier tratamiento.
          </p>

          <div class="phb-solution__alert">
            <svg viewBox="0 0 20 20" fill="none" class="phb-solution__alert-icon"><path d="M10 3l8 14H2L10 3z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M10 9v4M10 15v.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
            <span><strong>Importante:</strong> No es para todos. Abrimos acceso sin costo solo a las primeras 100 personas para identificar casos que realmente pueden beneficiarse. <strong>Solo aceptamos el 20% de los casos que nos llegan.</strong></span>
          </div>
        </div>

        <!-- Right: what you'll discover + CTA -->
        <div class="phb-solution__right" data-aos="fade-up" data-aos-delay="150">
          <div class="phb-solution__discover-card">
            <div class="phb-solution__discover-label">
              En esta evaluación descubrirás:
            </div>
            <ul class="phb-solution__discover-list">
              <li v-for="item in discovers" :key="item">
                <span class="phb-solution__check">&#10003;</span>
                <span>{{ item }}</span>
              </li>
            </ul>

            <div class="phb-solution__cta">
              <a href="#cta" class="phb-solution__btn">
                Quiero saber si mi cuerpo puede mejorar
              </a>
              <p class="phb-solution__cta-note">
                No iniciamos tratamiento con todos. Solo trabajamos con quienes
                realmente estamos seguros que podemos ayudar.
              </p>
            </div>
          </div>

          <!-- Image -->
          <div class="phb-solution__image" data-aos="fade-up" data-aos-delay="200">
            <img
              src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Evaluación de viabilidad regenerativa"
              loading="lazy"
            />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const discovers = [
  'Si tu cuerpo puede responder al tratamiento regenerativo.',
  'Qué está bloqueando tu recuperación.',
  'Si vale la pena que te inicies tratamiento regenerativo.',
  'O qué necesitas hacer primero para preparar a tu cuerpo a recibir terapias avanzadas.',
]
</script>

<style lang="scss" scoped>
.phb-solution {
  background: var(--phb-white);
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

.phb-solution__grid {
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

.phb-solution__heading {
  font-size: clamp(1.6rem, 2.8vw, 2.6rem);
  font-weight: 300;
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin-bottom: 24px;

  em {
    font-style: italic;
    font-weight: 700;
    color: var(--phb-blue);
  }
}

.phb-solution__question {
  font-size: 14px;
  color: var(--phb-muted);
  line-height: 1.6;
  margin-bottom: 12px;
}

.phb-solution__big-q {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  font-weight: 600;
  color: var(--phb-bg);
  line-height: 1.3;
  margin-bottom: 24px;
  padding-left: 16px;
  border-left: 3px solid var(--phb-cyan);
}

.phb-solution__body {
  font-size: 14px;
  color: var(--phb-muted);
  margin-bottom: 8px;
}

.phb-solution__offer {
  font-size: 15px;
  font-weight: 500;
  color: var(--phb-text);
  line-height: 1.6;
  margin-bottom: 28px;
}

.phb-solution__alert {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: rgba(18, 120, 243, 0.06);
  border: 1px solid rgba(18, 120, 243, 0.15);
  padding: 20px 22px;
  font-size: 13px;
  color: var(--phb-text);
  line-height: 1.6;

  strong { font-weight: 600; }
}

.phb-solution__alert-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--phb-blue);
  margin-top: 2px;
}

/* Right */
.phb-solution__right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.phb-solution__discover-card {
  background: var(--phb-surface);
  padding: 36px 32px;
  border-top: 3px solid var(--phb-blue);
}

.phb-solution__discover-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--phb-blue);
  margin-bottom: 24px;
}

.phb-solution__discover-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 32px;

  li {
    display: flex;
    gap: 12px;
    font-size: 14px;
    color: var(--phb-text);
    line-height: 1.5;
  }
}

.phb-solution__check {
  color: var(--phb-blue);
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 1px;
}

.phb-solution__btn {
  display: block;
  width: 100%;
  padding: 16px 24px;
  background: var(--phb-blue);
  color: var(--phb-white);
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-family: var(--phb-font);
  transition: background 0.2s;
  margin-bottom: 16px;

  &:hover { background: #0d65d9; }
}

.phb-solution__cta-note {
  font-size: 12px;
  color: var(--phb-muted);
  line-height: 1.5;
  text-align: center;
}

.phb-solution__image {
  overflow: hidden;
  aspect-ratio: 4/3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }

  &:hover img { transform: scale(1.03); }
}

@media (max-width: 900px) {
  .phb-solution__grid { grid-template-columns: 1fr; }
}
</style>
