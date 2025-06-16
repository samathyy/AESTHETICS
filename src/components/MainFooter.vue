<template>
  <footer class="main-footer">
    <div class="footer-content">
      <div class="footer-brand">AESTHETICS</div>
      <div class="footer-links">
        <router-link to="/home" class="footer-link">Home</router-link>
        <router-link to="/about" class="footer-link">About</router-link>
        <router-link to="/services" class="footer-link">Services</router-link>
        <router-link to="/contact" class="footer-link">Contact</router-link>
      </div>
      <div class="footer-socials">
        <a href="#" class="footer-social" title="Visit our Yellow Social"><svg width="22" height="22"><circle cx="11" cy="11" r="10" fill="#ffb300"/></svg></a>
        <a href="#" class="footer-social" title="Visit our Red Social"><svg width="22" height="22"><rect x="3" y="3" width="16" height="16" fill="#ff1744"/></svg></a>
      </div>
      <div class="footer-copyright">&copy; 2025 Aesthetics. All rights reserved.</div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter'
}
</script>

<style scoped>
.main-footer {
  background: #181818;
  color: #fff;
  padding: 2.5rem 0 1.2rem 0;
  text-align: center;
  font-family: 'Montserrat', Arial, sans-serif;
  margin-top: 3rem;
}
.footer-content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}
.footer-brand {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: #ffb300;
}
.footer-links {
  display: flex;
  gap: 2rem;
}
.footer-link {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}
.footer-link:hover {
  color: #ff1744;
}
.footer-socials {
  display: flex;
  gap: 1.2rem;
  margin: 0.7rem 0;
}
.footer-social svg {
  vertical-align: middle;
}
.footer-copyright {
  font-size: 1rem;
  color: #ffb88c;
  margin-top: 0.7rem;
}
</style>
