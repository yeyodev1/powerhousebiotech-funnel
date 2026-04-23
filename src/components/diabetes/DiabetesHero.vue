<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const heroTitle = ref<HTMLElement | null>(null);
const heroSubtitle = ref<HTMLElement | null>(null);
const heroCtas = ref<HTMLElement | null>(null);

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });
  
  tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.8 }, 0.2)
    .from(heroTitle.value, { opacity: 0, y: 30 }, '-=0.6')
    .from(heroSubtitle.value, { opacity: 0, y: 20 }, '-=0.8')
    .from(heroCtas.value, { opacity: 0, y: 20 }, '-=0.8')
    .from('.hero-visual', { opacity: 0, scale: 0.95, duration: 2 }, 0);
});

const handleEvalClick = () => {
  window.location.href = '/cualificar';
};

const handleWhatsappClick = () => {
  window.open('https://wa.me/yournumber', '_blank');
};
</script>

<template>
  <section class="diabetes-hero">
    <div class="hero-visual"></div>
    
    <div class="container">
      <div class="hero-content">
        <div class="hero-badge" data-aos="fade-down">
          <span>LANDING PREMIUM — DIABETES</span>
        </div>
        
        <h1 ref="heroTitle" class="hero-title">
          Medicina Regenerativa con criterio, 
          <span>experiencia y protocolo integral</span>
        </h1>
        
        <p ref="heroSubtitle" class="hero-description">
          La mayoría vive controlando su diabetes. <br />
          Pero muy pocos entienden cómo <strong>resolver de raíz</strong> lo que realmente la está causando.
        </p>

        <div class="hero-box" data-aos="fade-up">
          <p>
            Si llevas años “controlando” tu condición, pero tu energía, tu metabolismo y tu cuerpo no responden como deberían, el problema no eres tú.
          </p>
          <p class="highlight">
            El problema es seguir tratando de silenciar síntomas con medicamentos sin corregir el terreno biológico que los está provocando.
          </p>
        </div>

        <p class="hero-disclaimer" data-aos="fade-in">
          Este no es un enfoque para todos. Es para quienes ya entendieron que seguir haciendo más de lo mismo solo prolonga el deterioro y extiende el dolor.
        </p>

        <div ref="heroCtas" class="hero-actions">
          <button class="btn btn-primary" @click="handleEvalClick">
            <span class="btn-text">Quiero evaluar mi caso</span>
            <span class="btn-icon">→</span>
          </button>
          <button class="btn btn-outline" @click="handleWhatsappClick">
            <span class="btn-icon-wa">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.888 11.888-11.888 3.176 0 6.161 1.237 8.406 3.484 2.246 2.248 3.484 5.232 3.484 8.405 0 6.556-5.332 11.888-11.888 11.888-2.022 0-4.005-.515-5.756-1.49l-6.233 1.637zm6.3-1.637c1.553.93 3.111 1.417 4.63 1.417 5.968 0 10.826-4.859 10.826-10.825 0-2.891-1.125-5.608-3.167-7.651-2.043-2.042-4.761-3.168-7.658-3.168-5.968 0-10.826 4.858-10.826 10.825 0 1.905.496 3.766 1.436 5.385l-1.074 3.92 4.033-1.058zm11.365-7.426c-.302-.152-1.791-.883-2.068-.984-.277-.1-.479-.151-.68.151-.202.303-.781.984-.958 1.185-.177.202-.353.227-.655.076-.302-.151-1.274-.47-2.426-1.498-.897-.8-1.502-1.788-1.678-2.09-.177-.302-.019-.465.132-.615.136-.135.302-.353.454-.53.151-.177.202-.303.303-.505.101-.202.051-.378-.025-.53-.076-.151-.68-1.64-.931-2.245-.244-.59-.493-.51-.68-.519-.176-.009-.378-.011-.58-.011-.202 0-.53.076-.807.379-.277.303-1.059 1.035-1.059 2.524 0 1.489 1.084 2.928 1.235 3.13.151.202 2.133 3.256 5.166 4.561.721.311 1.284.497 1.723.637.724.23 1.384.197 1.905.12.581-.086 1.791-.732 2.042-1.438.253-.706.253-1.312.177-1.438-.076-.126-.277-.202-.579-.354z"/></svg>
            </span>
            <span class="btn-text">Hablar con un asesor</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.diabetes-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 100px;
  overflow: hidden;
  background: radial-gradient(circle at 70% 30%, rgba(18, 120, 243, 0.15), transparent 50%);

  .hero-visual {
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: 100%;
    background-image: url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000');
    background-size: cover;
    background-position: center;
    mask-image: linear-gradient(to left, black 40%, transparent 100%);
    opacity: 0.4;
    z-index: -1;
  }

  .hero-content {
    max-width: 800px;
    z-index: 1;
  }

  .hero-badge {
    display: inline-block;
    padding: 6px 16px;
    background: rgba(33, 188, 251, 0.1);
    border: 1px solid var(--phb-border);
    border-radius: 100px;
    margin-bottom: 24px;

    span {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: var(--phb-accent);
      text-transform: uppercase;
    }
  }

  .hero-title {
    font-size: clamp(40px, 6vw, 72px);
    line-height: 1.1;
    font-weight: 700;
    margin-bottom: 24px;
    color: var(--phb-white);

    span {
      display: block;
      background: linear-gradient(135deg, var(--phb-cyan), var(--phb-blue));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .hero-description {
    font-size: clamp(18px, 2.5vw, 22px);
    line-height: 1.5;
    color: var(--phb-muted);
    margin-bottom: 40px;

    strong {
      color: var(--phb-white);
      font-weight: 600;
    }
  }

  .hero-box {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 32px;
    border-radius: 20px;
    margin-bottom: 32px;

    p {
      font-size: 18px;
      line-height: 1.6;
      margin-bottom: 16px;
      color: var(--phb-muted);

      &:last-child { margin-bottom: 0; }
    }

    .highlight {
      color: var(--phb-accent);
      font-weight: 500;
    }
  }

  .hero-disclaimer {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 48px;
    font-style: italic;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px;
    border-radius: 100px;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;

    &-primary {
      background: var(--phb-blue);
      color: white;
      border: none;
      box-shadow: 0 10px 20px rgba(18, 120, 243, 0.2);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 15px 30px rgba(18, 120, 243, 0.3);
      }
    }

    &-outline {
      background: transparent;
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.1);

      &:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.3);
      }
    }

    .btn-icon-wa svg {
      color: #25D366;
    }
  }
}

@media (max-width: 768px) {
  .diabetes-hero {
    padding-top: 80px;
    text-align: center;
    align-items: flex-start;

    .hero-visual {
      width: 100%;
      height: 50%;
      top: 0;
      mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
    }

    .hero-content {
      margin-top: 20%;
    }

    .hero-actions {
      justify-content: center;
    }

    .btn {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
