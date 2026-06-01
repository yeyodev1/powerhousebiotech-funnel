<script setup lang="ts">
import { ref } from 'vue'

const miamiImg = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095172/assets-juan/c875b275-008f-42eb-8828-799b8d573ae1.jpg'
const guayaquilImg = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095159/assets-juan/138b7a57-1fd1-47d5-922f-bb4f7ed03ce4.jpg'
const videoUrl = 'https://res.cloudinary.com/drw5sn8qw/video/upload/v1780095169/assets-juan/WhatsApp_Video_2026-05-29_at_12_43_38_PM.mp4'

const quotes = [
  {
    text: "Ponemos la salud del ejecutivo, o la biología funcional del ejecutivo, como uno de los principales activos estratégicos del siglo XXI.",
    source: "CEO Talks - The Council"
  },
  {
    text: "La medicina regenerativa y nuestros protocolos con células madre y exosomas definitivamente están siendo un catalizador para ayudar a las personas a mantenerse en un estado óptimo de salud.",
    source: "Conferencia Entornos Estratégicos"
  }
]

const activeQuote = ref(0)
</script>

<template>
  <section class="juan-media" id="casos">
    <div class="container">
      <div class="media-grid">
        <div class="media-left" data-aos="fade-right">
          <span class="subtitle">CONFERENCIAS Y PRENSA</span>
          <h2>Estrategia en Escenarios Globales</h2>
          <p>
            Juan Román comparte su visión sobre el impacto de la biología funcional y la tecnología
            en foros empresariales líderes de Latinoamérica, incluyendo <strong>The Council</strong>
            (Miami y Guayaquil).
          </p>

          <!-- Interview Quote Box -->
          <div class="quote-slider">
            <transition name="fade-quote" mode="out-in">
              <blockquote :key="activeQuote">
                <p>"{{ quotes[activeQuote].text }}"</p>
                <cite>— {{ quotes[activeQuote].source }}</cite>
              </blockquote>
            </transition>
            <div class="dots">
              <span 
                v-for="(_, idx) in quotes" 
                :key="idx" 
                class="dot" 
                :class="{ active: activeQuote === idx }"
                @click="activeQuote = idx"
              ></span>
            </div>
          </div>
        </div>

        <div class="media-right" data-aos="fade-left">
          <div class="video-container">
            <video :src="videoUrl" controls class="presentation-video" poster="https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095156/assets-juan/076f4a92-7716-4a09-ab4b-0612fa4c7830.jpg">
              Tu navegador no soporta reproducción de video.
            </video>
            <span class="video-caption"><i class="fa-solid fa-play"></i> Fragmento Keynote: Intersección Salud y Real Estate</span>
          </div>

          <div class="gallery-mini">
            <div class="gallery-item">
              <img :src="miamiImg" alt="Miami Council Meeting Presentation" />
              <span class="lbl">Auditorio Miami</span>
            </div>
            <div class="gallery-item">
              <img :src="guayaquilImg" alt="Guayaquil Strategic Environment Flyer" />
              <span class="lbl">Conferencia Guayaquil</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.juan-media {
  background: #060713;
  padding: clamp(80px, 10vw, 140px) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.media-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;
  align-items: center;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1.1fr;
  }
}

.media-left {
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
    margin: 0 0 20px;
  }

  p {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 36px;
  }
}

.quote-slider {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: clamp(24px, 4vw, 36px);
  position: relative;

  blockquote {
    margin: 0 0 16px;

    p {
      font-family: 'Outfit', sans-serif;
      font-size: clamp(1.1rem, 1.8vw, 1.3rem);
      line-height: 1.45;
      font-weight: 400;
      color: #ffffff;
      margin: 0 0 12px;
      font-style: italic;
    }

    cite {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--phb-cyan, #21bcfa);
      font-style: normal;
    }
  }

  .dots {
    display: flex;
    gap: 8px;

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      cursor: pointer;
      transition: background 0.3s;

      &.active {
        background: var(--phb-cyan, #21bcfa);
        transform: scale(1.2);
      }
    }
  }
}

.media-right {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.video-container {
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #000;
  position: relative;

  .presentation-video {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    display: block;
  }

  .video-caption {
    display: block;
    padding: 12px 18px;
    background: rgba(9, 10, 23, 0.9);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 0.02em;

    i {
      color: var(--phb-cyan, #21bcfa);
      margin-right: 6px;
    }
  }
}

.gallery-mini {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  .gallery-item {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);

    img {
      width: 100%;
      height: 120px;
      object-fit: cover;
      transition: transform 0.4s;

      &:hover {
        transform: scale(1.05);
      }
    }

    .lbl {
      position: absolute;
      bottom: 8px;
      left: 12px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #ffffff;
      background: rgba(6, 7, 19, 0.85);
      padding: 4px 8px;
      border-radius: 4px;
    }
  }
}

.fade-quote-enter-active,
.fade-quote-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.fade-quote-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.fade-quote-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
