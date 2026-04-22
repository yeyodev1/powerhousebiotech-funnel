<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
import PhbProblemHeader from './PhbProblemHeader.vue'
import PhbProblemCard from './PhbProblemCard.vue'

const { t } = useLocale()
</script>

<template>
  <section class="phb-problem" id="problem">
    <div class="phb-container">
      <PhbProblemHeader 
        :line-title="t.problem.lineTitle"
        :title="t.problem.title"
        :sub="t.problem.sub"
      />

      <div class="phb-problem__grid">
        <PhbProblemCard 
          v-for="(card, index) in t.problem.cards"
          :key="index"
          :icon="card.icon"
          :title="card.title"
          :body="card.body"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.phb-problem {
  background-color: #ffffff;
  color: #1a1823;
  padding: clamp(100px, 15vw, 200px) 0;
  font-family: var(--phb-font, 'Inter', sans-serif);
  position: relative;
  overflow: hidden;
}

.phb-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(20px, 8vw, 120px);
}

.phb-problem__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
