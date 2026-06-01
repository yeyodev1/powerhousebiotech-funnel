<script setup lang="ts">
const headshotImg = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095160/assets-juan/1fdb1f14-5799-4c12-ba46-8590a824770b.jpg'
</script>

<template>
  <section class="juan-about" id="nosotros">
    <div class="container">
      <div class="about-grid">
        <div class="about-media" data-aos="fade-right">
          <div class="image-wrapper">
            <img :src="headshotImg" alt="Juan Román Garza" class="about-img" />
            <div class="floating-badge">
              <span class="num">+250K</span>
              <span class="lbl">Casos Clínicos Analizados</span>
            </div>
          </div>
        </div>
        
        <div class="about-content" data-aos="fade-left">
          <span class="subtitle">TRAYECTORIA Y ENFOQUE</span>
          <h2>El Puente entre Ciencia y Estrategia</h2>
          <p class="highlight">
            "Desde muy joven aprendí de mi padre que ayudar a las personas comienza por hacer las preguntas correctas."
          </p>
          <p>
            Hijo del <strong>Dr. Juan Antonio Garza Quintanilla</strong>, geriatra, gerontólogo y pionero con más de
            20 años de trayectoria internacional en medicina regenerativa. Mientras su padre lideraba la investigación clínica y el desarrollo de protocolos celulares en las clínicas <strong>Eternal</strong>, Juan Román se especializó en la estrategia y tecnología de datos aplicada a la salud.
          </p>
          <p>
            Su formación en Psicología Organizacional por el <strong>Tecnológico de Monterrey</strong> le dio una perspectiva única del impacto fisiológico en el rendimiento productivo. En los últimos años ha coordinado la recopilación, análisis de patrones y fidelización de bases de datos clínicas, estructurando un ecosistema de comunicación que educa y empodera a los pacientes a tomar el control de su salud biológica.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.juan-about {
  background: #090a17;
  padding: clamp(80px, 10vw, 140px) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;

  @media (min-width: 992px) {
    grid-template-columns: 0.9fr 1.1fr;
  }
}

.about-media {
  display: flex;
  justify-content: center;

  .image-wrapper {
    position: relative;
    max-width: 400px;
    width: 100%;
  }

  .about-img {
    width: 100%;
    height: auto;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .floating-badge {
    position: absolute;
    bottom: -20px;
    right: -10px;
    background: rgba(9, 10, 23, 0.9);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(33, 188, 250, 0.3);
    border-radius: 16px;
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);

    @media (max-width: 480px) {
      right: 10px;
    }

    .num {
      font-family: 'Outfit', sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--phb-cyan, #21bcfa);
      line-height: 1;
    }

    .lbl {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: rgba(255, 255, 255, 0.6);
      margin-top: 4px;
    }
  }
}

.about-content {
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
    margin-bottom: 24px;
  }

  p {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 1rem;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 20px;

    &:last-child {
      margin: 0;
    }
  }
}
</style>
