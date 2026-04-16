<template>
  <section class="phb-hero">
    <!-- Background video -->
    <div class="phb-hero__media">
      <video
        class="phb-hero__video"
        autoplay muted loop playsinline preload="auto"
        poster="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1920"
      >
        <source src="https://videos.pexels.com/video-files/5327882/5327882-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>
      <div class="phb-hero__overlay"></div>
    </div>

    <!-- Content -->
    <div class="phb-container phb-hero__content">
      <div class="phb-hero__label" data-aos="fade-up" data-aos-delay="0">
        Health Decision Platform · Medicina Regenerativa
      </div>

      <h1 class="phb-hero__heading" data-aos="fade-up" data-aos-delay="100">
        Puedes recibir el mejor<br>
        tratamiento del mundo…<br>
        <em>y aún así tu cuerpo<br>seguir igual de enfermo.</em>
      </h1>

      <p class="phb-hero__sub" data-aos="fade-up" data-aos-delay="250">
        No se trata del tratamiento.<br>
        Se trata de la <strong>incapacidad de tu cuerpo de aprovecharlo.</strong>
      </p>

      <div class="phb-hero__actions" data-aos="fade-up" data-aos-delay="400">
        <a href="#cta" class="phb-btn phb-btn--primary">
          Descubre si tu cuerpo está listo para repararse
        </a>
        <a href="#solucion" class="phb-btn phb-btn--ghost">
          ¿Cómo funciona?
        </a>
      </div>

      <!-- Trust badges -->
      <div class="phb-hero__trust" data-aos="fade-up" data-aos-delay="550">
        <div class="phb-trust-badge">
          <span class="phb-trust-badge__num">+15</span>
          <span class="phb-trust-badge__label">años liderando<br>medicina regenerativa</span>
        </div>
        <div class="phb-trust-divider"></div>
        <div class="phb-trust-badge">
          <span class="phb-trust-badge__num">+100K</span>
          <span class="phb-trust-badge__label">casos clínicos<br>analizados</span>
        </div>
        <div class="phb-trust-divider"></div>
        <div class="phb-trust-badge">
          <span class="phb-trust-badge__num">+5M</span>
          <span class="phb-trust-badge__label">personas<br>educadas</span>
        </div>
      </div>
    </div>

    <!-- Bottom blend -->
    <div class="phb-hero__blend" aria-hidden="true"></div>
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.phb-hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  font-family: var(--phb-font);
}

.phb-hero__media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.phb-hero__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

.phb-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(23, 24, 70, 0.82) 0%,
    rgba(18, 120, 243, 0.15) 60%,
    rgba(23, 24, 70, 0.9) 100%
  );
}

.phb-hero__blend {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: clamp(100px, 20vh, 200px);
  background: linear-gradient(to top, var(--phb-white) 0%, transparent 100%);
  z-index: 2;
  pointer-events: none;
}

.phb-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 80px);
}

.phb-hero__content {
  position: relative;
  z-index: 3;
  padding-top: 140px;
  padding-bottom: clamp(100px, 18vh, 180px);
}

.phb-hero__label {
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--phb-cyan);
  margin-bottom: 24px;
}

.phb-hero__heading {
  font-size: clamp(2.4rem, 5vw, 5.5rem);
  font-weight: 300;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--phb-white);
  max-width: 820px;

  em {
    font-style: italic;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.9);
  }
}

.phb-hero__sub {
  font-size: clamp(1rem, 1.6vw, 1.25rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin-top: 28px;
  max-width: 560px;

  strong {
    color: rgba(255, 255, 255, 0.95);
    font-weight: 500;
  }
}

.phb-hero__actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 40px;
}

.phb-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--phb-font);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 14px 32px;
  cursor: pointer;
  transition: all 0.2s;

  &--primary {
    background: var(--phb-blue);
    color: var(--phb-white);
    border: none;

    &:hover { background: #0d65d9; }
  }

  &--ghost {
    background: transparent;
    color: var(--phb-white);
    border: 1px solid rgba(255, 255, 255, 0.4);

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.7);
    }
  }
}

.phb-hero__trust {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-top: 60px;
  flex-wrap: wrap;
}

.phb-trust-badge {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.phb-trust-badge__num {
  font-size: clamp(1.6rem, 2.5vw, 2.2rem);
  font-weight: 300;
  color: var(--phb-white);
  line-height: 1;
  letter-spacing: -0.02em;
}

.phb-trust-badge__label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.phb-trust-divider {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .phb-hero__trust { gap: 20px; }
  .phb-trust-divider { display: none; }
}
</style>
