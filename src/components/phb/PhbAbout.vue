<template>
  <section class="phb-about">
    <div class="phb-container">

      <div class="phb-about__grid">
        <!-- Left: main statement -->
        <div class="phb-about__left" data-aos="fade-up">
          <div class="phb-line-title">
            <span class="phb-line-title__line"></span>
            Quiénes somos
          </div>
          <h2 class="phb-about__heading">
            Somos la primera<br>
            <em>Health Decision Platform</em><br>
            enfocada en Medicina Regenerativa.
          </h2>
          <p class="phb-about__body">
            Durante más de 15 años, hemos analizado <strong>+100,000 casos clínicos</strong>
            y aprendido una verdad incómoda:
          </p>
          <p class="phb-about__truth">
            No todos los cuerpos están listos para Regenerarse.
          </p>
          <p class="phb-about__body phb-about__body--small">
            Y esto es algo que el 90% de los doctores que no tienen nuestra
            misma experiencia, ignoran por completo.
          </p>
        </div>

        <!-- Right: bullets -->
        <div class="phb-about__right" data-aos="fade-up" data-aos-delay="150">
          <div class="phb-about__bullets-label">Lo que hacemos por ti</div>
          <ul class="phb-about__bullets">
            <li v-for="bullet in bullets" :key="bullet">
              <span class="phb-about__bullet-icon">
                <svg viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <span>{{ bullet }}</span>
            </li>
          </ul>

          <a href="#cta" class="phb-btn">
            Descubre hoy si tu cuerpo está listo
            <svg viewBox="0 0 20 20" fill="none" class="phb-btn__arrow"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>

      <!-- Image strip -->
      <div class="phb-about__images" data-aos="fade-up" data-aos-delay="200">
        <div class="phb-about__img-card">
          <img src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Análisis de laboratorio" loading="lazy" />
        </div>
        <div class="phb-about__img-card phb-about__img-card--tall">
          <img src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Consulta médica" loading="lazy" />
        </div>
        <div class="phb-about__img-card">
          <img src="https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Especialista en regenerativa" loading="lazy" />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const bullets = [
  'Evaluamos si todavía tu cuerpo puede repararse o ya es demasiado tarde.',
  'Te explicamos a detalle el nivel de gravedad que dicen tus estudios de laboratorio.',
  'Unimos las piezas y te explicamos los resultados para que puedas entender tu cuerpo con precisión.',
  'Identificamos por qué no estás mejorando a pesar de seguir las indicaciones del médico.',
  'Te guiamos en las siguientes decisiones que te acerquen más rápido a sentirte bien, libre del dolor y la preocupación.',
]
</script>

<style lang="scss" scoped>
.phb-about {
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

.phb-about__grid {
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

.phb-about__heading {
  font-size: clamp(1.8rem, 3vw, 3rem);
  font-weight: 300;
  line-height: 1.15;
  letter-spacing: -0.01em;

  em {
    font-style: italic;
    font-weight: 700;
    color: var(--phb-blue);
  }
}

.phb-about__body {
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  color: var(--phb-muted);
  line-height: 1.7;
  margin-top: 20px;

  strong {
    color: var(--phb-text);
    font-weight: 600;
  }

  &--small { font-size: 14px; }
}

.phb-about__truth {
  font-size: clamp(1.1rem, 1.6vw, 1.4rem);
  font-weight: 600;
  color: var(--phb-bg);
  line-height: 1.3;
  margin-top: 20px;
  padding: 20px 24px;
  border-left: 3px solid var(--phb-blue);
  background: var(--phb-surface);
}

.phb-about__bullets-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--phb-blue);
  margin-bottom: 20px;
}

.phb-about__bullets {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 36px;

  li {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    font-size: 14px;
    color: var(--phb-text);
    line-height: 1.6;
  }
}

.phb-about__bullet-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 1px;
  color: var(--phb-blue);

  svg { width: 100%; height: 100%; }
}

.phb-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--phb-font);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--phb-blue);
  text-decoration: none;
  padding: 12px 0;
  border-bottom: 1px solid var(--phb-blue);
  transition: gap 0.2s, opacity 0.2s;

  &:hover { gap: 16px; }

  &__arrow { width: 18px; height: 18px; flex-shrink: 0; }
}

.phb-about__images {
  display: grid;
  grid-template-columns: 1fr 1.3fr 1fr;
  gap: 3px;
  margin-top: clamp(60px, 8vw, 100px);
  height: 380px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    height: 280px;
  }
}

.phb-about__img-card {
  overflow: hidden;
  background: var(--phb-surface);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }

  &:hover img { transform: scale(1.04); }

  &--tall {
    @media (max-width: 768px) { display: none; }
  }
}

@media (max-width: 900px) {
  .phb-about__grid { grid-template-columns: 1fr; }
}
</style>
