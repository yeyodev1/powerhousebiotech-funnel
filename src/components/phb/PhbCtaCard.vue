<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { t } = useLocale()
</script>

<template>
  <div class="phb-cta-card" data-aos="fade-up" data-aos-delay="150">
    <div class="phb-cta-card__badge">
      {{ t.close.badge }}
    </div>
    <p class="phb-cta-card__desc" v-html="t.close.cardDesc"></p>

    <div class="phb-cta-card__benefits">
      <div v-for="(b, index) in t.close.benefits" :key="index" class="phb-cta-card__benefit">
        <span class="phb-cta-card__benefit-check">&#10003;</span>
        {{ b }}
      </div>
    </div>

    <div class="phb-cta-card__buttons">
      <router-link to="/cualificar" class="phb-cta-card__btn-primary">
        {{ t.close.cta }}
      </router-link>
      <router-link to="/cualificar" class="phb-cta-card__btn-secondary">
        {{ t.close.ctaSecondary }}
      </router-link>
    </div>

    <p class="phb-cta-card__microcopy">
      {{ t.close.microcopy }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.phb-cta-card {
  background: #0c1445;
  border: 1px solid rgba(33, 188, 251, 0.1);
  padding: 4rem 3.5rem;
  border-radius: 56px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.4),
              inset 0 0 40px rgba(33, 188, 251, 0.05);
  color: #ffffff;

  &__badge {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--phb-cyan, #21bcfa);
    border: 1px solid rgba(33, 188, 251, 0.3);
    padding: 0.6rem 1.5rem;
    width: fit-content;
    border-radius: 100px;
    background: rgba(33, 188, 251, 0.05);
  }

  &__desc {
    font-size: 1.35rem;
    color: #ffffff;
    line-height: 1.4;
    font-weight: 300;

    :deep(strong) {
      font-weight: 700;
      color: var(--phb-cyan, #21bcfa);
    }
  }

  &__benefits {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  &__benefit {
    display: flex;
    gap: 1.2rem;
    font-size: 1.15rem;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 300;
  }

  &__benefit-check {
    color: var(--phb-cyan, #21bcfa);
    font-weight: 900;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  &__btn-primary {
    display: block;
    width: 100%;
    padding: 1.5rem 2rem;
    background: #ffffff;
    color: #0c1445;
    text-align: center;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 900;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    border-radius: 100px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);

    &:hover {
      background: var(--phb-cyan, #21bcfa);
      color: #fff;
      transform: translateY(-5px);
      box-shadow: 0 20px 50px rgba(33, 188, 251, 0.4);
    }
  }

  &__btn-secondary {
    display: block;
    width: 100%;
    padding: 1.4rem 2rem;
    background: transparent;
    color: #ffffff;
    text-align: center;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 100px;
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--phb-cyan, #21bcfa);
      background: rgba(33, 188, 251, 0.05);
    }
  }

  &__microcopy {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.4);
    line-height: 1.5;
    text-align: center;
    font-weight: 300;
  }
}
</style>
