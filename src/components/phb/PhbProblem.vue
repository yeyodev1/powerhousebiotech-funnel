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
  background-color: #05060f;
  background-image: radial-gradient(at 20% 20%, rgba(23, 24, 70, 0.8) 0%, transparent 80%),
                    radial-gradient(at 80% 15%, rgba(33, 188, 251, 0.15) 0%, transparent 65%),
                    radial-gradient(at 85% 85%, rgba(18, 120, 243, 0.15) 0%, transparent 70%),
                    radial-gradient(at 15% 85%, rgba(24, 231, 240, 0.12) 0%, transparent 70%);
  background-attachment: fixed;
  color: #ffffff;
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
