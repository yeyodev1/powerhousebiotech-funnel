<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="phb-footer">
    <div class="phb-container">
      <div class="phb-footer__inner">
        <div class="phb-footer__brand">
          <div class="phb-footer__logo">
            <span class="phb-footer__logo-mark">PHB</span>
            <span class="phb-footer__logo-text">PowerHouse Biotech</span>
          </div>
          <p class="phb-footer__tagline">
            {{ t.footer.tagline }}
          </p>
        </div>

        <div class="phb-footer__links">
          <a href="/politicas-privacidad" class="phb-footer__link">{{ t.footer.privacy }}</a>
          <a href="/aviso-legal" class="phb-footer__link">{{ t.footer.legal }}</a>
          <a href="#cta" class="phb-footer__link">{{ t.footer.contact }}</a>
        </div>
      </div>

      <div class="phb-footer__bottom">
        <p class="phb-footer__copy">
          © {{ year }} PowerHouse Biotech · NEGOCIOS DEL PACIFICO · {{ t.footer.rights }}
        </p>
        <p class="phb-footer__disclaimer">
          {{ t.footer.disclaimer }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.phb-footer {
  background: var(--phb-white);
  color: var(--phb-text);
  border-top: 1px solid rgba(23, 24, 70, 0.08);
  padding: 48px 0 32px;
  font-family: var(--phb-font);
}

.phb-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 80px);
}

.phb-footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.phb-footer__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.phb-footer__logo-mark {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--phb-blue);
}

.phb-footer__logo-text {
  font-size: 13px;
  font-weight: 500;
  color: var(--phb-text);
}

.phb-footer__tagline {
  font-size: 13px;
  color: var(--phb-muted);
  line-height: 1.6;
}

.phb-footer__links {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}

.phb-footer__link {
  font-size: 12px;
  color: var(--phb-muted);
  text-decoration: none;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: color 0.2s;

  &:hover { color: var(--phb-text); }
}

.phb-footer__bottom {
  border-top: 1px solid rgba(23, 24, 70, 0.06);
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.phb-footer__copy {
  font-size: 12px;
  color: var(--phb-muted);
}

.phb-footer__disclaimer {
  font-size: 11px;
  color: rgba(23, 24, 70, 0.35);
  line-height: 1.6;
  max-width: 700px;
}
</style>
