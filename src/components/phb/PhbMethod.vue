<template>
  <section class="phb-method" id="metodo">
    <div class="phb-method__bg-image">
      <img
        src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <div class="phb-method__overlay"></div>
    </div>

    <div class="phb-container phb-method__content">

      <div class="phb-method__header" data-aos="fade-up">
        <div class="phb-line-title phb-line-title--light">
          <span class="phb-line-title__line"></span>
          Nuestro proceso
        </div>
        <h2 class="phb-method__heading">
          Método <em>DECIDE™</em>
        </h2>
        <p class="phb-method__sub">
          Así logramos resultados reales:
          Primero entendemos · Luego medimos · Después preparamos · Y solo entonces… Iniciamos tratamiento.
        </p>
      </div>

      <div class="phb-method__steps">
        <div
          v-for="(step, i) in steps"
          :key="step.letter"
          class="phb-method__step"
          data-aos="fade-up"
          :data-aos-delay="i * 80"
        >
          <div class="phb-method__step-letter">{{ step.letter }}</div>
          <div class="phb-method__step-body">
            <div class="phb-method__step-name">{{ step.name }}</div>
            <p class="phb-method__step-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  { letter: 'D', name: 'Detectar', desc: 'Entendemos qué está pasando en tu cuerpo a través de tus estudios y síntomas actuales.' },
  { letter: 'E', name: 'Evaluar', desc: 'Analizamos tu estado real, no solo los síntomas. Miramos el panorama completo.' },
  { letter: 'C', name: 'Aclarar', desc: 'Definimos qué se puede mejorar… y qué no. Honestidad clínica antes de cualquier promesa.' },
  { letter: 'I', name: 'Identificar', desc: 'Determinamos si eres candidato o no para un tratamiento regenerativo en este momento.' },
  { letter: 'D', name: 'Diseñar', desc: 'Creamos una ruta clara, paso a paso, adaptada a tu biología y estado actual.' },
  { letter: 'E', name: 'Encaminar', desc: 'Te acompañamos durante todo el proceso para que nunca estés solo en tu decisión.' },
]
</script>

<style lang="scss" scoped>
.phb-method {
  position: relative;
  color: var(--phb-white);
  padding: clamp(80px, 10vw, 140px) 0;
  font-family: var(--phb-font);
  overflow: hidden;
}

.phb-method__bg-image {
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

.phb-method__overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(at 15% 15%, rgba(33, 188, 251, 0.25) 0%, transparent 70%),
              radial-gradient(at 85% 85%, rgba(23, 24, 70, 0.8) 0%, transparent 75%);
  background-color: rgba(40, 54, 69, 0.85); // Match $PHB-BG but slightly more transparent
  backdrop-filter: blur(2px);
}

.phb-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 80px);
}

.phb-method__content {
  position: relative;
  z-index: 1;
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

.phb-method__header {
  max-width: 700px;
  margin-bottom: clamp(60px, 8vw, 100px);
}

.phb-method__heading {
  font-size: clamp(2.5rem, 5vw, 5rem);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.02em;

  em { font-style: italic; font-weight: 700; color: var(--phb-cyan); }
}

.phb-method__sub {
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.7;
  margin-top: 20px;
}

.phb-method__steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(255, 255, 255, 0.08);
}

.phb-method__step {
  background: rgba(23, 24, 70, 0.6);
  backdrop-filter: blur(8px);
  padding: 36px 28px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  border-bottom: 2px solid transparent;
  border-radius: 12px;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    background: rgba(18, 120, 243, 0.12);
    border-color: var(--phb-cyan);
  }
}

.phb-method__step-letter {
  font-size: 3rem;
  font-weight: 700;
  color: var(--phb-cyan);
  line-height: 1;
  letter-spacing: -0.04em;
  opacity: 0.6;
  flex-shrink: 0;
}

.phb-method__step-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--phb-white);
  margin-bottom: 8px;
  letter-spacing: 0.02em;
}

.phb-method__step-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.6;
}

@media (max-width: 900px) {
  .phb-method__steps { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .phb-method__steps { grid-template-columns: 1fr; }
}
</style>
