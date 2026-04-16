<template>
  <section class="sha-journeys" id="sha-journeys">
    <div class="sha-container">
      <div class="sha-journeys__inner">

        <div data-aos="fade-in">
          <blockquote class="sha-journeys__quote">
            "For me, SHA is where longevity becomes a strategy. It's the right environment to invest in your health for the long run."
          </blockquote>
          <div class="sha-journeys__author">
            <strong>Raphaël Varane</strong> — world-class football player — knows that performance is built
            on long-term vision. Now, he approaches his health with the same discipline and strategy
            that defined his career, focusing on longevity, prevention, and sustainable performance.
          </div>
          <a href="#" class="sha-journeys__cta-btn">Explore more SHA Journeys</a>
        </div>

        <div class="sha-journeys__video-thumb" data-aos="fade-in" data-aos-delay="200">
          <img
            src="https://shawellness.com/wp-content/uploads/2025/10/sha-journeys-varane.jpg"
            alt="SHA Journeys"
            loading="lazy"
          />
          <div class="sha-journeys__play-overlay">
            <div class="sha-journeys__play-label">SHA<br>JOURNEYS</div>
            <button class="sha-journeys__play-btn" aria-label="Play video">&#9654;</button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.sha-journeys {
  background: var(--sha-dark);
  color: var(--sha-white);
  padding: 160px 0;
  font-family: var(--sha-font);
}

.sha-container {
  width: 100%;
  max-width: var(--sha-container);
  margin: 0 auto;
  padding: 0 var(--sha-pad-x);
}

.sha-journeys__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  align-items: center;
}

.sha-journeys__quote {
  font-size: clamp(1.3rem, 2.5vw, 2rem);
  font-weight: var(--sha-fw-light);
  font-style: italic;
  line-height: 1.4;
}

.sha-journeys__author {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 20px;
  line-height: 1.5;

  strong {
    color: rgba(255, 255, 255, 0.8);
    font-weight: var(--sha-fw-regular);
  }
}

.sha-journeys__cta-btn {
  display: inline-block;
  margin-top: 32px;
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 12px 28px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: var(--sha-white);
  text-decoration: none;
  transition: all 0.25s;

  &:hover {
    background: var(--sha-white);
    color: var(--sha-text-dark);
  }
}

.sha-journeys__video-thumb {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(20%);
    transition: transform 0.5s;
  }

  &:hover img { transform: scale(1.03); }
}

.sha-journeys__play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 32px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, transparent 60%);
}

.sha-journeys__play-label {
  font-size: clamp(1.2rem, 2.5vw, 2rem);
  font-weight: var(--sha-fw-bold);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.sha-journeys__play-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sha-white);
  font-size: 20px;
  margin-top: 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover { background: rgba(255, 255, 255, 0.15); }
}

@media (max-width: 1024px) {
  .sha-journeys__inner { grid-template-columns: 1fr; }
}
</style>
