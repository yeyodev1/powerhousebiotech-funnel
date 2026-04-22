<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { t } = useLocale()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="phb-footer">
    <div class="phb-container">
      <div class="phb-footer__grid">
        <!-- Brand Info -->
        <div class="phb-footer__brand">
          <div class="phb-footer__logo">
            POWERHOUSE<br>BIOTECH
          </div>
          <p class="phb-footer__tagline">
            {{ t.footer.tagline }}
          </p>
        </div>
        
        <!-- Navigation Groups -->
        <div class="phb-footer__nav-groups">
          <div class="phb-footer__group">
            <span class="phb-footer__group-title">Navegación</span>
            <ul class="phb-footer__links">
              <li><a href="#about">{{ t.nav.menu.about }}</a></li>
              <li><a href="#method">{{ t.nav.menu.method }}</a></li>
              <li><a href="#science">{{ t.nav.menu.science }}</a></li>
              <li><a href="#cases">{{ t.nav.menu.cases }}</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="phb-footer__bottom">
        <div class="phb-footer__disclaimer">
          {{ t.footer.disclaimer }}
        </div>
        <div class="phb-footer__meta">
          <span class="phb-footer__copyright">
            © {{ currentYear }} PowerHouse Biotech. {{ t.footer.rights }}
          </span>
          <div class="phb-footer__social">
             <i class="fa-brands fa-instagram"></i>
             <i class="fa-brands fa-linkedin"></i>
          </div>
        </div>
        
        <div class="phb-footer__credits">
          Hecho por 
          <a href="https://bakano.ec/" target="_blank">Bakano</a> 
          y 
          <a href="https://yeyo.dev/" target="_blank">yeyodev</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.phb-footer {
  background-color: #171846; // Premium dark navy
  color: #ffffff;
  padding: 8rem 0 4rem;
  font-family: var(--phb-font, 'Inter', sans-serif);
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  .phb-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 clamp(20px, 8vw, 120px);
  }

  &__grid {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 4rem;
    margin-bottom: 6rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 3rem;
    }
  }

  &__brand {
    max-width: 350px;
  }

  &__logo {
    font-size: 1.8rem;
    font-weight: 950;
    line-height: 0.9;
    letter-spacing: 0.05em;
    color: #ffffff;
    margin-bottom: 2rem;
  }

  &__tagline {
    font-size: 1.15rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 300;
  }

  &__nav-groups {
    display: flex;
    gap: 6rem;

    @media (max-width: 600px) {
      gap: 3rem;
      width: 100%;
      justify-content: space-between;
    }
  }

  &__group-title {
    display: block;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.25em;
    color: var(--phb-cyan, #21bcfa);
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }

  &__links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    a {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: all 0.3s ease;
      font-weight: 300;

      &:hover {
        color: #ffffff;
        padding-left: 5px;
      }
    }
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding-top: 4rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  &__disclaimer {
    font-size: 0.9rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.35); // Improved visibility on dark background
    font-weight: 300;
    font-style: italic;
    max-width: 1100px;
  }

  &__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 300;

    @media (max-width: 600px) {
      flex-direction: column;
      gap: 1.5rem;
      align-items: flex-start;
    }
  }

  &__social {
    display: flex;
    gap: 1.5rem;
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.5);

    i {
      cursor: pointer;
      transition: color 0.3s ease;
      &:hover { color: var(--phb-cyan, #21bcfa); }
    }
  }

  &__credits {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.25); // Improved visibility
    text-align: center;
    margin-top: 1rem;

    a {
      color: inherit;
      text-decoration: underline;
      transition: color 0.3s ease;
      &:hover { color: var(--phb-cyan, #21bcfa); }
    }
  }
}
</style>
