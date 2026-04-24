<script setup lang="ts">
// Final statement slide
</script>

<template>
  <div class="benefit-slide slide-statement">
    <div class="statement-content">
      <p>
        Recuperar tu salud no es un lujo. <br />
        <strong>Es el cimiento sobre el cual construyes todo lo demás.</strong>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slide-statement {
  width: 700px; // Slightly wider for impact
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 80px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100vw;
    padding: 0 24px;
  }

  p {
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 200;
    line-height: 1.2;
    color: rgba(255, 255, 255, 0.8);

    strong {
      color: #ffffff;
      font-weight: 800;
      display: block;
      margin-top: 32px;
    }
  }
}
</style>
