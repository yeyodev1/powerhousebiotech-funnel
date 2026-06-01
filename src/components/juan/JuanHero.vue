<script setup lang="ts">
import { ref } from 'vue'

const forbesImg = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095167/assets-juan/WhatsApp_Image_2026-05-27_at_7_08_51_PM.jpg'
</script>

<template>
  <section class="juan-hero">
    <div class="hero-container">
      <div class="hero-info" data-aos="fade-right">
        <span class="eyebrow">BIOTECH STRATEGIST & FOUNDER</span>
        <h1>Juan Román Garza</h1>
        <p class="tagline">
          "La biología funcional del líder es el activo estratégico más importante del siglo XXI."
        </p>
        <p class="desc">
          Psicólogo organizacional (Tec de Monterrey) y estratega de biotecnología. Especializado en
          democratizar la medicina regenerativa de precisión a través de canales digitales, conectando
          liderazgo ejecutivo con la ciencia de la longevidad celular.
        </p>
        <div class="actions">
          <router-link to="/servicios" class="btn-primary">
            Explorar Soluciones <i class="fa-solid fa-arrow-right"></i>
          </router-link>
          <a href="#ciencia" class="btn-secondary">Saber Más</a>
        </div>
      </div>
      
      <div class="hero-media" data-aos="fade-left">
        <div class="media-frame">
          <img :src="forbesImg" alt="Juan Román Garza - Forbes Founders" class="hero-img" />
          <div class="frame-accent"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.juan-hero {
  position: relative;
  background: radial-gradient(circle at 10% 20%, rgba(9, 10, 17, 0.98) 0%, #060713 100%);
  padding: clamp(100px, 12vh, 160px) 0 clamp(60px, 8vh, 100px);
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;

  @media (min-width: 992px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
}

.hero-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .eyebrow {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.25em;
    color: var(--phb-cyan, #21bcfa);
    margin-bottom: 16px;
    text-transform: uppercase;
  }

  h1 {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(2.8rem, 6vw, 4.5rem);
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin: 0 0 20px;
    background: linear-gradient(135deg, #ffffff 40%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .tagline {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(1.2rem, 2.2vw, 1.6rem);
    font-weight: 500;
    line-height: 1.4;
    color: #ffffff;
    border-left: 3px solid var(--phb-cyan, #21bcfa);
    padding-left: 18px;
    margin: 0 0 24px;
    font-style: italic;
  }

  .desc {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(0.95rem, 1.6vw, 1.1rem);
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.75);
    margin: 0 0 36px;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 16px 32px;
    background: #ffffff;
    color: #060713;
    border-radius: 100px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: all 0.3s ease;

    &:hover {
      background: var(--phb-cyan, #21bcfa);
      color: #000000;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(33, 188, 250, 0.3);
    }
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    padding: 16px 32px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    border-radius: 100px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: #ffffff;
      transform: translateY(-2px);
    }
  }
}

.hero-media {
  display: flex;
  justify-content: center;
  position: relative;

  .media-frame {
    position: relative;
    max-width: 380px;
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .hero-img {
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

    &:hover {
      transform: scale(1.03);
    }
  }

  .frame-accent {
    position: absolute;
    inset: 0;
    border: 2px solid var(--phb-cyan, #21bcfa);
    border-radius: 20px;
    margin: -10px;
    z-index: -1;
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
