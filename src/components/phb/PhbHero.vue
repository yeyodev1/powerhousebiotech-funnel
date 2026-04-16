<template>
  <section class="phb-hero">
    <div class="phb-hero__bg">
      <img
        src="https://images.pexels.com/photos/3825529/pexels-photo-3825529.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt=""
        aria-hidden="true"
      />
      <div class="phb-hero__overlay"></div>
    </div>

    <div class="phb-container">
      <div class="phb-hero__inner">

        <!-- Left: copy -->
        <div class="phb-hero__content">
          <div class="phb-hero__eyebrow" data-aos="fade-up">
            <i class="fa-solid fa-dna"></i>
            Health Decision Platform · Medicina Regenerativa
          </div>
          <h1 class="phb-hero__heading" data-aos="fade-up" data-aos-delay="100">
            Puedes recibir el mejor tratamiento del mundo…
            <em>y aún así tu cuerpo seguir igual de enfermo.</em>
          </h1>
          <p class="phb-hero__sub" data-aos="fade-up" data-aos-delay="220">
            Porque el problema no es el tratamiento.<br>
            Es que nadie ha evaluado si tu cuerpo está listo para responder.
          </p>
          <div class="phb-hero__ctas" data-aos="fade-up" data-aos-delay="340">
            <a href="#cta" class="phb-hero__btn-primary">
              <i class="fa-solid fa-calendar-check"></i>
              Agendar Evaluación
            </a>
            <a href="#solucion" class="phb-hero__btn-ghost">
              Conocer el método
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
          <div class="phb-hero__badges" data-aos="fade-up" data-aos-delay="460">
            <div class="phb-hero__badge">
              <i class="fa-solid fa-clock-rotate-left phb-hero__badge-icon"></i>
              <span class="phb-hero__badge-num">+15</span>
              <span class="phb-hero__badge-label">años</span>
            </div>
            <div class="phb-hero__badge-divider"></div>
            <div class="phb-hero__badge">
              <i class="fa-solid fa-microscope phb-hero__badge-icon"></i>
              <span class="phb-hero__badge-num">+100K</span>
              <span class="phb-hero__badge-label">casos</span>
            </div>
            <div class="phb-hero__badge-divider"></div>
            <div class="phb-hero__badge">
              <i class="fa-solid fa-heart-pulse phb-hero__badge-icon"></i>
              <span class="phb-hero__badge-num">+5M</span>
              <span class="phb-hero__badge-label">vidas</span>
            </div>
          </div>
        </div>

        <!-- Right: visual -->
        <div class="phb-hero__visual" data-aos="fade-left" data-aos-delay="300">
          <div class="phb-hero__visual-frame">
            <img
              src="https://images.pexels.com/photos/3825529/pexels-photo-3825529.jpeg?auto=compress&cs=tinysrgb&w=800&h=960&fit=crop"
              alt="Medicina Regenerativa"
            />
            <div class="phb-hero__visual-badge">
              <i class="fa-solid fa-dna"></i>
              <div>
                <strong>EVR™</strong>
                <span>Evaluación de Viabilidad Regenerativa</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="phb-hero__bottom-fade"></div>
  </section>
</template>

<script setup lang="ts">
// static hero
</script>

<style lang="scss" scoped>
.phb-hero {
  position: relative;
  min-height: 100dvh;
  background: var(--phb-bg);
  display: flex;
  align-items: center;
  overflow: hidden;
  font-family: var(--phb-font);
}

.phb-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: right center;
  }
}

.phb-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    rgba(23, 24, 70, 0.97) 0%,
    rgba(23, 24, 70, 0.92) 45%,
    rgba(18, 120, 243, 0.12) 68%,
    rgba(23, 24, 70, 0.78) 100%
  );
}

.phb-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 80px);
}

.phb-hero__inner {
  display: grid;
  grid-template-columns: 1fr 0.82fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: center;
  min-height: 100dvh;
  padding: 120px 0 100px;
}

/* Left column */
.phb-hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--phb-cyan);
  margin-bottom: 28px;

  i { font-size: 12px; opacity: 0.8; }
}

.phb-hero__heading {
  font-size: clamp(2.2rem, 4.5vw, 5rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--phb-white);
  margin-bottom: 28px;

  em {
    display: block;
    font-style: italic;
    font-weight: 700;
    color: var(--phb-cyan);
    margin-top: 4px;
  }
}

.phb-hero__sub {
  font-size: clamp(0.95rem, 1.4vw, 1.1rem);
  color: rgba(255, 255, 255, 0.58);
  line-height: 1.75;
  margin-bottom: 44px;
}

.phb-hero__ctas {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 52px;
}

.phb-hero__btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: var(--phb-blue);
  color: var(--phb-white);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 8px;
  font-family: var(--phb-font);
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: #0d65d9;
    transform: translateY(-2px);
  }
}

.phb-hero__btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 28px;
  background: transparent;
  color: rgba(255, 255, 255, 0.72);
  text-decoration: none;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-family: var(--phb-font);
  transition: color 0.2s, border-color 0.2s, gap 0.2s;

  &:hover {
    color: var(--phb-white);
    border-color: rgba(255, 255, 255, 0.5);
    gap: 16px;
  }
}

.phb-hero__badges {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-top: 36px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.phb-hero__badge {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.phb-hero__badge-icon {
  font-size: 11px;
  color: var(--phb-cyan);
  opacity: 0.65;
  margin-right: 2px;
}

.phb-hero__badge-num {
  font-size: clamp(1.1rem, 1.8vw, 1.4rem);
  font-weight: 700;
  color: var(--phb-white);
  letter-spacing: -0.02em;
}

.phb-hero__badge-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.42);
  letter-spacing: 0.04em;
}

.phb-hero__badge-divider {
  width: 1px;
  height: 28px;
  background: rgba(255, 255, 255, 0.12);
}

/* Right column */
.phb-hero__visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.phb-hero__visual-frame {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  max-width: 460px;
  aspect-ratio: 4/5;
  border: 1px solid rgba(255, 255, 255, 0.08);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(23, 24, 70, 0.1) 30%,
      rgba(23, 24, 70, 0.88) 100%
    );
    z-index: 1;
  }
}

.phb-hero__visual-badge {
  position: absolute;
  bottom: 24px;
  left: 20px;
  right: 20px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(23, 24, 70, 0.75);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(33, 188, 251, 0.22);
  border-radius: 12px;
  padding: 16px 20px;

  i {
    font-size: 24px;
    color: var(--phb-cyan);
    flex-shrink: 0;
  }

  strong {
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: var(--phb-white);
    letter-spacing: 0.05em;
  }

  span {
    display: block;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.48);
    line-height: 1.4;
    letter-spacing: 0.03em;
  }
}

/* Bottom fade */
.phb-hero__bottom-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 180px;
  background: linear-gradient(to bottom, transparent, var(--phb-white));
  z-index: 2;
  pointer-events: none;
}

@media (max-width: 900px) {
  .phb-hero__inner {
    grid-template-columns: 1fr;
    padding: 100px 0 80px;
  }

  .phb-hero__visual { display: none; }
}
</style>
