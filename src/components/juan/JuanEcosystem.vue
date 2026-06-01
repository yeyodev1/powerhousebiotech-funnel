<script setup lang="ts">
import { ref } from 'vue'

const services = [
  {
    id: 'phb',
    badge: 'Aplicación Clínica',
    title: 'Powerhouse Biotech',
    subtitle: 'Evaluación de Viabilidad Regenerativa™',
    desc: 'Nuestra Health Decision Platform para pacientes diagnosticados con patologías crónico-degenerativas o autoinmunes (Diabetes, Lupus, Artritis, etc.) que buscan una evaluación rigurosa y honesta antes de iniciar cualquier terapia.',
    link: '/servicios/powerhouse',
    btnText: 'Explorar Viabilidad'
  },
  {
    id: 'sha',
    badge: 'Rendimiento Ejecutivo',
    title: 'SHA Longevity',
    subtitle: 'Masters of Longevity',
    desc: 'Programas científicos diseñados para restaurar la biología de directores y líderes empresariales expuestos a altos niveles de estrés, inflamación celular y fatiga acumulada.',
    link: '/sha',
    btnText: 'Descubrir Programas'
  }
]
</script>

<template>
  <section class="juan-ecosystem" id="metodo">
    <div class="container">
      <header class="ecosystem-header" data-aos="fade-up">
        <span class="subtitle">NUESTRAS PLATAFORMAS</span>
        <h2>Ecosistema de Soluciones</h2>
        <p>
          Canalizamos la investigación científica y la gestión de datos en dos grandes enfoques
          adaptados a las necesidades específicas de tu salud y desempeño.
        </p>
      </header>

      <div class="ecosystem-grid">
        <article
          v-for="(service, idx) in services"
          :key="service.id"
          class="ecosystem-card"
          :class="service.id"
          data-aos="fade-up"
          :data-aos-delay="idx * 100"
        >
          <span class="badge">{{ service.badge }}</span>
          <h3>{{ service.title }}</h3>
          <h4>{{ service.subtitle }}</h4>
          <p>{{ service.desc }}</p>
          <router-link :to="service.link" class="card-btn">
            {{ service.btnText }} <i class="fa-solid fa-arrow-right"></i>
          </router-link>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.juan-ecosystem {
  background: #090a17;
  padding: clamp(80px, 10vw, 140px) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.ecosystem-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto clamp(40px, 6vw, 60px);

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
    margin: 0 0 16px;
  }

  p {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }
}

.ecosystem-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.ecosystem-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  padding: clamp(32px, 5vw, 48px);
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);

    &.phb {
      box-shadow: 0 30px 60px rgba(33, 188, 250, 0.08);
    }
    &.sha {
      box-shadow: 0 30px 60px rgba(255, 255, 255, 0.04);
    }
  }

  .badge {
    align-self: flex-start;
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 99px;
    color: #ffffff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  &.phb .badge {
    background: rgba(33, 188, 250, 0.08);
    border-color: rgba(33, 188, 250, 0.15);
    color: var(--phb-cyan, #21bcfa);
  }

  h3 {
    font-family: 'Outfit', sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    margin: 0 0 6px;
  }

  h4 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.55);
    margin: 0 0 20px;
  }

  p {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 32px;
    flex-grow: 1;
  }

  .card-btn {
    display: inline-flex;
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
      color: #000000;
      transform: translateY(-2px);
    }
  }

  &.sha .card-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #ffffff;

    &:hover {
      background: #ffffff;
      color: #060713;
      border-color: #ffffff;
    }
  }
}
</style>
