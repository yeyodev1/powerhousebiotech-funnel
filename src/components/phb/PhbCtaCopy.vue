<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { t } = useLocale()
</script>

<template>
  <div class="phb-cta-copy" data-aos="fade-up">
    <div class="phb-line-title">
      <span class="phb-line-title__line"></span>
      {{ t.close.lineTitle }}
    </div>
    <h2 class="phb-cta-copy__heading">
      {{ t.close.title }} <br><em>{{ t.close.titleAccent }}</em>
    </h2>
    <p class="phb-cta-copy__body">
      {{ t.close.body }}
    </p>

    <div class="phb-cta-copy__pains">
      <div class="phb-cta-copy__pain" v-for="(pain, index) in t.close.pains" :key="index">
        <span class="phb-cta-copy__pain-x">&#10006;</span>
        {{ pain }}
      </div>
    </div>

    <p class="phb-cta-copy__measurement" v-html="t.close.measurement"></p>
  </div>
</template>

<style lang="scss" scoped>
.phb-line-title {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--phb-cyan, #21bcfa);
  margin-bottom: 40px;
}

.phb-line-title__line {
  display: block;
  width: 50px;
  height: 1.5px;
  background: var(--phb-cyan, #21bcfa);
  flex-shrink: 0;
}

.phb-cta-copy {
  &__heading {
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.05em;
    margin-bottom: 40px;
    text-transform: uppercase;

    em { 
      font-style: italic; 
      font-weight: 200; 
      color: #fff; 
      opacity: 0.6;
      display: block;
    }
  }

  &__body {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin-bottom: 48px;
    font-weight: 300;
    max-width: 600px;
  }

  &__pains {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 56px;
  }

  &__pain {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.4;
  }

  &__pain-x {
    color: #ff4d4d;
    font-size: 0.9rem;
    flex-shrink: 0;
    margin-top: 3px;
  }

  &__measurement {
    font-size: clamp(1.4rem, 2.2vw, 2rem);
    font-weight: 300;
    line-height: 1.3;
    color: #fff;
    letter-spacing: -0.03em;

    :deep(strong) { color: var(--phb-cyan, #21bcfa); font-weight: 800; }
  }
}
</style>
