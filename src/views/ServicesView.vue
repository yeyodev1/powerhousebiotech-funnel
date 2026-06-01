<script setup lang="ts">
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import JuanHeader from '@/components/juan/JuanHeader.vue'

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
  })
})
</script>

<template>
  <div class="services-view">
    <JuanHeader />
    
    <main class="services-main">
      <div class="container">
        <!-- Hero intro -->
        <header class="services-hero" data-aos="fade-up">
          <span class="sub">Ecosistema de Soluciones</span>
          <h1>Longevidad & Medicina Regenerativa</h1>
          <p>
            Plataformas y programas avanzados diseñados para activar el potencial de autorregeneración
            fisiológica, optimizar la capacidad biológica y prolongar la vida productiva.
          </p>
        </header>

        <!-- Services grid -->
        <div class="services-grid">
          <!-- Card 1: Powerhouse Biotech -->
          <article class="service-card phb" data-aos="fade-up" data-aos-delay="100">
            <div class="card-bg"></div>
            <div class="card-content">
              <span class="badge">Salud Clínica</span>
              <h3>Powerhouse Biotech</h3>
              <h4>Evaluación de Viabilidad Regenerativa™</h4>
              <p>
                Health Decision Platform enfocada en evaluar con honestidad y rigor científico si
                tu biología está lista para responder a tratamientos celulares en casos de enfermedades
                crónico-degenerativas o autoinmunes.
              </p>
              <ul class="features">
                <li><i class="fa-solid fa-circle-check"></i> +100,000 casos analizados</li>
                <li><i class="fa-solid fa-circle-check"></i> Evaluación clínica inicial rigurosa</li>
                <li><i class="fa-solid fa-circle-check"></i> Enfoque preventivo y regenerativo</li>
              </ul>
              <router-link to="/servicios/powerhouse" class="card-btn">
                Explorar Viabilidad <i class="fa-solid fa-arrow-right"></i>
              </router-link>
            </div>
          </article>

          <!-- Card 2: Diabetes Regenerativa -->
          <article class="service-card diabetes" data-aos="fade-up" data-aos-delay="200">
            <div class="card-bg"></div>
            <div class="card-content">
              <span class="badge secondary">Enfoque Especializado</span>
              <h3>Diabetes Regenerativa</h3>
              <h4>Medicina Regenerativa de Precisión</h4>
              <p>
                Protocolo integral para abordar la diabetes de raíz, revirtiendo el daño sistémico y 
                mejorando la función metabólica y calidad de vida de los pacientes mediante biotecnología avanzada.
              </p>
              <ul class="features">
                <li><i class="fa-solid fa-circle-check"></i> Manejo de la inflamación sistémica</li>
                <li><i class="fa-solid fa-circle-check"></i> Optimización metabólica</li>
                <li><i class="fa-solid fa-circle-check"></i> Casos documentados de éxito</li>
              </ul>
              <router-link to="/diabetes-regenerativa" class="card-btn secondary">
                Ver Protocolo <i class="fa-solid fa-arrow-right"></i>
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.services-view {
  background: #060713;
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.services-main {
  flex: 1;
  padding: clamp(120px, 15vw, 180px) 0 clamp(80px, 10vw, 120px);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.services-hero {
  text-align: center;
  max-width: 780px;
  margin: 0 auto clamp(50px, 8vw, 80px);

  .sub {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--phb-cyan, #21bcfa);
    display: block;
    margin-bottom: 12px;
  }

  h1 {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0 0 20px;
    background: linear-gradient(135deg, #ffffff 30%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(1rem, 1.8vw, 1.2rem);
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.service-card {
  position: relative;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: clamp(32px, 5vw, 48px);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);

    &.phb {
      box-shadow: 0 30px 60px rgba(33, 188, 250, 0.1);
    }
    &.sha {
      box-shadow: 0 30px 60px rgba(255, 255, 255, 0.05);
    }
  }

  .badge {
    align-self: flex-start;
    padding: 6px 14px;
    background: rgba(33, 188, 250, 0.1);
    border: 1px solid rgba(33, 188, 250, 0.2);
    border-radius: 99px;
    color: var(--phb-cyan, #21bcfa);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 24px;

    &.secondary {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }
  }

  h3 {
    font-family: 'Outfit', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 6px;
    letter-spacing: -0.01em;
  }

  h4 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    margin: 0 0 20px;
  }

  p {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 28px;
    flex-grow: 1;
  }

  .features {
    list-style: none;
    padding: 0;
    margin: 0 0 36px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    li {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.85);

      i {
        color: var(--phb-cyan, #21bcfa);
        font-size: 1.1rem;
      }
    }
  }

  &.sha .features li i {
    color: #ffffff;
  }

  .card-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    background: #ffffff;
    color: #060713;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: all 0.3s;

    &:hover {
      background: var(--phb-cyan, #21bcfa);
      color: #000;
      transform: translateY(-2px);
    }

    &.secondary {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;

      &:hover {
        background: #ffffff;
        color: #060713;
        border-color: #ffffff;
      }
    }
  }
}
</style>
