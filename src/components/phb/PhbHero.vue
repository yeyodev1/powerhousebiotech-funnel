<template>
  <section class="phb-hero">
    <!-- Background Image -->
    <div class="phb-hero__bg">
      <img
        src="/hero-bg.png"
        alt="PowerHouse Biotech Background"
        aria-hidden="true"
      />
      <!-- Soft dark gradient to make text readable on the left -->
      <div class="phb-hero__overlay"></div>
    </div>

    <div class="phb-container">
      <div class="phb-hero__inner">

        <!-- Left: copy -->
        <div class="phb-hero__content">
          <div class="phb-hero__logo" data-aos="fade-up">
            <!-- Using text as placeholder, the actual nav has the logo usually -->
          </div>
          
          <h1 class="phb-hero__heading" data-aos="fade-up" data-aos-delay="100">
            Puedes tener<br />
            el mejor tratamiento...<br />
            <span class="phb-hero__heading-highlight">y aun así no mejorar.</span>
          </h1>
          
          <div class="phb-hero__ctas" data-aos="fade-up" data-aos-delay="220">
            <a href="#cta" class="phb-hero__btn-glass">
              <i class="fa-solid fa-arrow-right"></i>
              Quiero evaluar mi biologia
            </a>
          </div>

          <ul class="phb-hero__checklist" data-aos="fade-up" data-aos-delay="340">
            <li>
              <i class="fa-solid fa-check"></i>
              Evaluación basada en biomarcadores
            </li>
            <li>
              <i class="fa-solid fa-check"></i>
              Interpretación clínica avanzada
            </li>
            <li>
              <i class="fa-solid fa-check"></i>
              Decisión antes de intervenir
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Fade out softly to the new dark sections below -->
    <div class="phb-hero__bottom-fade"></div>
  </section>
</template>

<script setup lang="ts">
// static hero
</script>

<style lang="scss" scoped>
.phb-hero {
  position: relative;
  min-height: 100vh;
  background: #0d0f28; // fallback dark background
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
    object-position: center right;
  }
}

.phb-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(13, 15, 40, 0.95) 0%,
    rgba(13, 15, 40, 0.8) 40%,
    rgba(13, 15, 40, 0.2) 70%,
    rgba(13, 15, 40, 0) 100%
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 120px 0 100px;
}

.phb-hero__content {
  max-width: 650px;
}

.phb-hero__heading {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  line-height: 1.15;
  color: var(--phb-white);
  margin-bottom: 40px;
  
  &-highlight {
    color: var(--phb-cyan);
    font-weight: 400;
  }
}

.phb-hero__ctas {
  margin-bottom: 30px;
}

.phb-hero__btn-glass {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 36px;
  background: rgba(33, 188, 251, 0.1);
  color: var(--phb-white);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 50px; /* pill shape */
  border: 1px solid rgba(33, 188, 251, 0.4);
  box-shadow: 0 0 20px rgba(33, 188, 251, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  i {
    font-size: 14px;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: rgba(33, 188, 251, 0.25);
    border-color: rgba(33, 188, 251, 0.7);
    box-shadow: 0 0 30px rgba(33, 188, 251, 0.4);
    
    i {
      transform: translateX(4px);
    }
  }
}

.phb-hero__checklist {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.95rem;
    font-weight: 300;

    i {
      color: var(--phb-white);
      font-size: 0.8rem;
    }
  }
}

.phb-hero__bottom-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to bottom, transparent, var(--phb-bg, #0d0f28));
  z-index: 2;
  pointer-events: none;
}

@media (max-width: 900px) {
  .phb-hero__overlay {
    background: linear-gradient(
      180deg,
      rgba(13, 15, 40, 0.85) 0%,
      rgba(13, 15, 40, 0.95) 100%
    );
  }
  
  .phb-hero__heading {
    br {
      display: none;
    }
  }
}
</style>
