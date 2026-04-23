<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const heroTitle = ref<HTMLElement | null>(null);
const heroSubtitle = ref<HTMLElement | null>(null);
const heroCtas = ref<HTMLElement | null>(null);

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.4 } });
  
  tl.from('.hero-badge', { opacity: 0, y: 30, duration: 1 }, 0.4)
    .from(heroTitle.value, { opacity: 0, y: 50, stagger: 0.2 }, '-=0.8')
    .from(heroSubtitle.value, { opacity: 0, y: 30 }, '-=1')
    .from('.hero-box', { opacity: 0, x: -30, duration: 1.2 }, '-=0.8')
    .from(heroCtas.value, { opacity: 0, y: 30 }, '-=1')
    .from('.hero-visual-video', { opacity: 0, duration: 2.5 }, 0);

  // Floating background text animation
  gsap.to('.hero-bg-text', {
    y: -30,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // Parallax effect for video
  gsap.to('.hero-visual-video', {
    scrollTrigger: {
      trigger: '.diabetes-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 100,
    scale: 1.1
  });
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
    <!-- DNA Background Video -->
    <div class="hero-visual-container">
      <video 
        autoplay 
        muted 
        loop 
        playsinline 
        class="hero-visual-video"
      >
        <source src="https://icdlabs.in/immune-internal/wp-content/themes/immuneel/assets/videos/DNA.mp4" type="video/mp4" />
      </video>
      <div class="hero-visual-overlay"></div>
      <div class="hero-bg-text">diabetes</div>
    </div>
    
    <div class="container">
      <div class="hero-content">
        <div class="hero-badge">
          <span>LANDING PREMIUM — REGENERATIVE MEDICINE</span>
        </div>
        
        <h1 ref="heroTitle" class="hero-title">
          Medicina Regenerativa con criterio, 
          <span>experiencia y protocolo integral</span>
        </h1>
        
        <p ref="heroSubtitle" class="hero-description">
          La mayoría vive controlando su diabetes. <br />
          Pero muy pocos entienden cómo <strong>resolver de raíz</strong> lo que realmente la está causando.
        </p>

        <div class="hero-box">
          <p>
            Si llevas años “controlando” tu condición, pero tu energía, tu metabolismo y tu cuerpo no responden como deberían, el problema no eres tú.
          </p>
          <p class="highlight">
            El problema es seguir tratando de silenciar síntomas con medicamentos sin corregir el terreno biológico que los está provocando.
          </p>
        </div>

        <p class="hero-disclaimer" data-aos="fade-in" data-aos-delay="1200">
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
  position: relative;
  background-color: #05060f;

  .hero-visual-container {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .hero-visual-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.6;
    transform-origin: center;
  }

  .hero-visual-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(5, 6, 15, 0.4) 50%, #05060f 100%);
  }

  .hero-bg-text {
    position: absolute;
    bottom: -5%;
    right: 5%;
    font-size: clamp(10rem, 20vw, 30rem);
    font-weight: 900;
    color: rgba(255, 255, 255, 0.03);
    text-transform: lowercase;
    pointer-events: none;
    user-select: none;
    z-index: 1;
    letter-spacing: -0.05em;
  }

  .hero-content {
    max-width: 900px;
    position: relative;
    z-index: 2;
  }

  .hero-badge {
    display: inline-block;
    padding: 8px 20px;
    background: rgba(33, 188, 251, 0.08);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(33, 188, 251, 0.2);
    border-radius: 100px;
    margin-bottom: 32px;

    span {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.2em;
      color: var(--phb-cyan, #21bcfa);
      text-transform: uppercase;
    }
  }

  .hero-title {
    font-size: clamp(44px, 7vw, 84px);
    line-height: 1.05;
    font-weight: 800;
    margin-bottom: 28px;
    color: #ffffff;
    letter-spacing: -0.04em;

    span {
      display: block;
      background: linear-gradient(135deg, #21bcfa 0%, #1278f3 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .hero-description {
    font-size: clamp(20px, 2.8vw, 24px);
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 48px;
    font-weight: 300;

    strong {
      color: #ffffff;
      font-weight: 700;
    }
  }

  .hero-box {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: clamp(30px, 5vw, 40px);
    border-radius: 32px;
    margin-bottom: 40px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);

    p {
      font-size: 20px;
      line-height: 1.6;
      margin-bottom: 20px;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 300;

      &:last-child { margin-bottom: 0; }
    }

    .highlight {
      color: var(--phb-cyan, #21bcfa);
      font-weight: 600;
    }
  }

  .hero-disclaimer {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.3);
    margin-bottom: 56px;
    font-style: italic;
    max-width: 600px;
    line-height: 1.6;
  }

  .hero-actions {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .btn {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 40px;
    border-radius: 12px; // Medical sharp look
    font-size: 16px;
    font-weight: 700;
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.1em;

    &-primary {
      background: #ffffff;
      color: #05060f;
      border: none;
      box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);

      &:hover {
        background: var(--phb-blue, #1278f3);
        color: #ffffff;
        transform: translateY(-8px);
        box-shadow: 0 30px 60px rgba(18, 120, 243, 0.4);
      }
    }

    &-outline {
      background: rgba(255, 255, 255, 0.05);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: #ffffff;
        transform: translateY(-8px);
      }
    }

    .btn-icon-wa svg {
      color: #25D366;
    }
  }
}

@media (max-width: 768px) {
  .diabetes-hero {
    padding-top: 120px;
    text-align: left;

    .hero-bg-text {
      font-size: 10rem;
      bottom: 5%;
      right: -10%;
    }

    .hero-content {
      width: 100%;
    }

    .hero-actions {
      flex-direction: column;
    }

    .btn {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
