<script setup lang="ts">
import PhbPrimaryBtn from '@/components/phb/PhbPrimaryBtn.vue';
</script>

<template>
  <div class="container footer-container">
    <div class="system-footer" data-aos="fade-up">
      <div class="footer-box">
        <p>Cada fase está interconectada. No son pasos aislados, es un <strong>ecosistema de recuperación</strong>.</p>
      </div>
      <div class="system-cta" data-aos="fade-up" data-aos-delay="200">
        <PhbPrimaryBtn />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-container {
  z-index: 10;
}

.system-footer {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  .footer-box {
    background: rgba(33, 188, 251, 0.03);
    padding: 20px 40px;
    border-radius: 100px;
    border: 1px solid rgba(33, 188, 251, 0.1);

    p {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
      
      strong {
        color: var(--phb-cyan, #21bcfa);
        font-weight: 700;
      }
    }
  }

  .system-cta {
    display: flex;
    justify-content: center;
  }
}
</style>
