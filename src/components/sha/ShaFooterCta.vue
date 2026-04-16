<template>
  <section class="footer-cta" id="footer-cta">
    <div class="sha-container">
      <h2 class="footer-cta__heading">
        YOUR JOURNEY TO <em>OPTIMAL HEALTH</em><br>STARTS HERE.
      </h2>
      <div class="footer-cta__actions">
        <a href="#" class="sha-btn sha-btn--filled">BOOK NOW</a>
        <a href="#" class="footer-cta__contact">Contact</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.footer-cta {
  background: var(--sha-dark);
  color: var(--sha-white);
  padding: clamp(80px, 10vw, 140px) var(--sha-pad-x);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-family: var(--sha-font);
}

.sha-container {
  width: 100%;
  max-width: var(--sha-container);
  margin: 0 auto;
}

.footer-cta__heading {
  font-size: clamp(2rem, 5vw, 5.5rem);
  font-weight: var(--sha-fw-light);
  line-height: 1.05;

  em {
    font-style: italic;
    font-weight: var(--sha-fw-bold);
  }
}

.footer-cta__actions {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 32px;
}

.sha-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  font-family: var(--sha-font);
  font-size: 13px;
  font-weight: var(--sha-fw-regular);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid currentColor;
  background: transparent;
  color: var(--sha-white);
  text-decoration: none;
  cursor: pointer;
  transition: background 0.25s, color 0.25s;

  &:hover {
    background: var(--sha-white);
    color: var(--sha-text-dark);
  }

  &--filled {
    background: var(--sha-text-dark);
    color: var(--sha-white);
    border-color: var(--sha-text-dark);

    &:hover {
      background: transparent;
      color: var(--sha-text-dark);
    }
  }
}

.footer-cta__contact {
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  text-decoration: none;
  transition: color 0.2s, border-color 0.2s;

  &:hover {
    color: var(--sha-white);
    border-color: var(--sha-white);
  }
}
</style>
