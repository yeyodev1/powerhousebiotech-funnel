<script setup lang="ts">
const scienceImg = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095163/assets-juan/5dfa62f2-170e-42eb-867b-f98a1c816781.jpg'
</script>

<template>
  <section class="juan-science" id="ciencia">
    <div class="container">
      <div class="science-grid">
        <div class="science-content" data-aos="fade-right">
          <span class="subtitle">FUNDAMENTO CIENTÍFICO</span>
          <h2>Reprogramación Celular y Alta Dirección</h2>
          <p class="highlight">
            "La medicina regenerativa nos recuerda la capacidad más disruptiva de nuestra biología: la autorregeneración."
          </p>
          
          <div class="science-block">
            <h3>El Hito del Premio Nobel (2012)</h3>
            <p>
              En 2012, el científico Shinya Yamanaka demostró que las células adultas pueden ser reprogramadas
              para regresar a un estado pluripotencial, abriendo las puertas a la inmortalidad celular y a terapias
              de rejuvenecimiento biológico con una altísima tasa de seguridad y efectividad.
            </p>
          </div>

          <div class="science-block">
            <h3>La Epidemia del Estrés Ejecutivo</h3>
            <p>
              El estrés crónico sostenido en presidentes y ejecutivos de alto rendimiento genera inflamación celular silenciosa, falta de descanso y pérdida de enfoque. Esto reduce su rendimiento cognitivo y físico, llevándolos de un estado proactivo y propositivo a un estado meramente reactivo.
            </p>
          </div>
        </div>

        <div class="science-media" data-aos="fade-left">
          <div class="image-frame">
            <img :src="scienceImg" alt="Ponencia Juan Román Garza" class="science-img" />
            <div class="glow-effect"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.juan-science {
  background: #060713;
  padding: clamp(80px, 10vw, 140px) 0;
  overflow: hidden;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.science-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;

  @media (min-width: 992px) {
    grid-template-columns: 1.1fr 0.9fr;
  }
}

.science-content {
  .subtitle {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.25em;
    color: var(--phb-cyan, #21bcfa);
    display: block;
    margin-bottom: 12px;
  }

  h2 {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0 0 24px;
  }

  .highlight {
    font-family: 'Outfit', sans-serif;
    font-size: 1.25rem;
    font-weight: 550;
    line-height: 1.5;
    color: #ffffff;
    margin-bottom: 32px;
  }
}

.science-block {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  h3 {
    font-family: 'Outfit', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 10px;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--phb-cyan, #21bcfa);
    }
  }

  p {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }
}

.science-media {
  display: flex;
  justify-content: center;
  position: relative;

  .image-frame {
    position: relative;
    max-width: 420px;
    width: 100%;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .science-img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .glow-effect {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(6, 7, 19, 0.8) 0%, transparent 60%);
    pointer-events: none;
  }
}
</style>
