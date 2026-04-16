<template>
  <footer class="site-footer">
    <div class="sha-container">
      <div class="footer-cols">
        <div class="footer-col">
          <div class="footer-col__title">About SHA</div>
          <div class="footer-col__links">
            <a href="#">GDS Access Codes</a>
            <a href="#">Careers</a>
            <a href="#">Corporate Social Responsibility</a>
            <a href="#">FAQs</a>
            <a href="#">Promotions</a>
            <a href="#">Grants</a>
          </div>
        </div>
        <div class="footer-col">
          <div class="footer-col__title">Legal</div>
          <div class="footer-col__links">
            <a href="#">Policies</a>
            <a href="#">Legal Advice</a>
            <a href="#">Cookies Policy</a>
            <a href="#">Privacy Policy</a>
            <a href="#">SHA Spain Booking Policy</a>
            <a href="#">SHA Mexico Booking Policy</a>
          </div>
        </div>
        <div class="footer-col">
          <div class="footer-col__title">SHA Magazine</div>
          <div class="footer-col__links">
            <a href="#">Spanish Version</a>
            <a href="#">English Version</a>
          </div>
        </div>
        <div class="footer-col">
          <div class="footer-col__title">Good News</div>
          <div class="footer-col__links">
            <p class="footer-col__newsletter-desc">Receive news and benefits about health and wellness.</p>
            <div class="footer-col__newsletter-form">
              <input type="email" placeholder="Email" class="footer-col__newsletter-input" />
              <button class="sha-btn">SUB</button>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-logo">SHA</div>
        <div class="footer-copy">shawellness.com/en &middot; All rights reserved</div>
        <div class="footer-partners">
          <span>SRANDIPIANS</span>
          <span>VIRTUOSO</span>
          <span>SELECT</span>
          <span>FINE HOTELS &amp; RESORTS</span>
        </div>
        <div class="footer-social">
          <a href="https://www.facebook.com/shawellnessclinic/" target="_blank" rel="noopener" aria-label="Facebook">f</a>
          <a href="https://www.instagram.com/shawellness/" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
          <a href="https://www.linkedin.com/company/sha-wellness-clinic/" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.site-footer {
  background: var(--sha-dark);
  color: var(--sha-white);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 60px 0 32px;
  font-family: var(--sha-font);
}

.sha-container {
  width: 100%;
  max-width: var(--sha-container);
  margin: 0 auto;
  padding: 0 var(--sha-pad-x);
}

.footer-cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-bottom: 60px;
}

.footer-col__title {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 16px;
}

.footer-col__links {
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.55);
    text-decoration: none;
    transition: color 0.2s;

    &:hover { color: var(--sha-white); }
  }
}

.footer-col__newsletter-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
}

.footer-col__newsletter-form {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.footer-col__newsletter-input {
  flex: 1;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--sha-white);
  font-size: 13px;
  font-family: var(--sha-font);
  outline: none;
}

.sha-btn {
  padding: 8px 16px;
  font-size: 11px;
  font-family: var(--sha-font);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid currentColor;
  background: transparent;
  color: var(--sha-white);
  cursor: pointer;
  transition: background 0.25s, color 0.25s;

  &:hover {
    background: var(--sha-white);
    color: var(--sha-text-dark);
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-wrap: wrap;
  gap: 20px;
}

.footer-logo {
  font-size: 20px;
  font-weight: var(--sha-fw-bold);
  letter-spacing: 0.3em;
  color: var(--sha-white);
}

.footer-copy {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
}

.footer-partners {
  display: flex;
  gap: 24px;
  align-items: center;

  span {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.3);
  }
}

.footer-social {
  display: flex;
  gap: 16px;

  a {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.45);
    text-decoration: none;
    transition: color 0.2s;

    &:hover { color: var(--sha-white); }
  }
}

@media (max-width: 1024px) {
  .footer-cols { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .footer-cols { grid-template-columns: 1fr 1fr; }
}
</style>
