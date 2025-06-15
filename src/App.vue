<template>
  <div class="main-layout">
    <div v-if="showSearchPopup" class="search-popup-overlay" @click.self="closeSearchPopup">
      <div class="search-popup">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="search-popup-input"
          @input="onSearchInput"
          @keydown.enter="onSearchEnter"
          autofocus
        />
        <button class="search-popup-close" @click="closeSearchPopup">&times;</button>
        <div v-if="searchQuery && searchResults.length" class="search-popup-results">
          <div class="search-popup-result-title">Found {{ searchResults.length }} result<span v-if="searchResults.length > 1">s</span></div>
          <ul>
            <li v-for="result in searchResults" :key="result.label" @click="goToSuggestion(result.label)">
              <span v-html="highlightMatch(result.label, searchQuery)"></span>
              <span v-if="result.snippet" class="search-popup-snippet">{{ result.snippet }}</span>
            </li>
          </ul>
        </div>
        <div v-else-if="searchQuery && !searchResults.length" class="search-popup-no-results">No results found.</div>
      </div>
    </div>
    <nav v-if="$route.path !== '/'" class="navbar advanced-navbar">
      <div class="logo-area">
        <div class="logo-icon">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <defs>
              <radialGradient id="logo-grad" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stop-color="#ffb88c" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="#ff6f61" stop-opacity="1"/>
              </radialGradient>
            </defs>
            <circle cx="20" cy="20" r="17" fill="url(#logo-grad)"/>
            <text x="50%" y="58%" text-anchor="middle" fill="#fff" font-size="1.4rem" font-family="Montserrat, Arial, sans-serif" font-weight="bold">A</text>
            <ellipse cx="20" cy="32" rx="11" ry="2.7" fill="#fff" opacity="0.09"/>
          </svg>
        </div>
        <div class="logo-text">
          <span class="brand-gradient">AESTHETICS</span>
          <svg class="brand-underline" width="120" height="16" viewBox="0 0 120 16">
            <path d="M10 12 Q60 22 110 8" stroke="#ffb88c" stroke-width="3.5" fill="none" opacity="0.7">
              <animate attributeName="d" values="M10 12 Q60 22 110 8;M10 8 Q60 18 110 12;M10 12 Q60 22 110 8" dur="2.2s" repeatCount="indefinite"/>
            </path>
            <circle cx="115" cy="10" r="2.7" fill="#ff6f61">
              <animate attributeName="r" values="2.7;5;2.7" dur="1.2s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      </div>
      <div class="nav-cta-area" v-if="!isMobile">
        <span class="header-quote">Design. Inspire. Elevate.</span>
        <!-- Start Project button removed as requested -->
      </div>
      <!-- Remove all mobile-header-icons and any mobile search/hamburger icons completely -->
      <!-- Recreate: Only one search and one hamburger icon for mobile, spaced and styled -->
      <div v-if="isMobile" class="mobile-header-icons-fixed">
        <button class="mobile-search-btn" @click="openSearchPopup">
          <svg width="24" height="24" fill="none" stroke="#ffb88c" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
        </button>
        <button class="mobile-hamburger" @click="toggleMenu">
          <svg v-if="!menuOpen" width="28" height="28" fill="none" stroke="#ffb88c" stroke-width="2.2" viewBox="0 0 24 24"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
          <svg v-else width="28" height="28" fill="none" stroke="#ffb88c" stroke-width="2.2" viewBox="0 0 24 24"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>
        </button>
      </div>
      <ul class="nav-links" :class="{ 'mobile-open': menuOpen && isMobile }" v-show="!isMobile || menuOpen">
        <!-- Add close button for mobile menu -->
        <li v-if="isMobile && menuOpen" class="mobile-menu-close-li">
          <button class="mobile-menu-close-btn" @click="closeMenu">
            <svg width="32" height="32" fill="none" stroke="#ffb88c" stroke-width="2.2" viewBox="0 0 24 24">
              <line x1="5" y1="5" x2="19" y2="19"/>
              <line x1="19" y1="5" x2="5" y2="19"/>
            </svg>
          </button>
        </li>
        <li v-for="(item, idx) in navItems" :key="item.to">
          <a
            href="#"
            class="nav-animated-link"
            :class="{ 'router-link-exact-active': $route.path === item.to }"
            @click.prevent="handleNavLinkClick(item.to)"
          >
            <span class="nav-link-bg"></span>
            <span class="nav-link-text">{{ item.label }}</span>
            <span class="nav-link-underline"></span>
          </a>
        </li>
        <li v-if="!isMobile" class="search-nav-item">
          <button class="search-btn" @click="openSearchPopup">
            <svg width="22" height="22" fill="none" stroke="#fff" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
          </button>
        </li>
      </ul>
    </nav>
    <transition name="advanced-fade">
      <div v-if="navLoading" class="loading-screen minimal-loading">
        <div class="svg-loader minimal-svg-loader">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="aesthetic-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ff6f61"/>
                <stop offset="100%" stop-color="#ffb88c"/>
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" stroke="url(#aesthetic-gradient)" stroke-width="8" fill="none" stroke-linecap="round">
              <animate attributeName="stroke-dasharray" values="0,251.2;251.2,0;0,251.2" dur="1.2s" repeatCount="indefinite"/>
            </circle>
            <text x="50%" y="56%" text-anchor="middle" fill="#ff6f61" font-size="2.1rem" font-family="Montserrat, Arial, sans-serif" font-weight="bold">A</text>
          </svg>
          <div class="loading-text">Loading...</div>
        </div>
      </div>
    </transition>
    <main>
      <router-view v-slot="{ Component, route }">
        <component :is="Component" v-if="Component" />
        <div v-else class="route-fallback">Sorry, this page could not be loaded.</div>
      </router-view>
    </main>
    <!-- Custom Cursor Markup -->
    <div id="custom-cursor">
      <svg class="cursor-svg" width="48" height="48">
        <circle class="cursor-svg-ring" cx="24" cy="24" r="18" />
      </svg>
      <div class="cursor-dot"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import loadingMixin from './mixins/loadingMixin';

const menuOpen = ref(false);
const isMobile = ref(window.innerWidth <= 700);
const navLoading = ref(false);
const showSearch = ref(false);
const showSearchPopup = ref(false);
const searchQuery = ref('');
const searchResults = ref([]);
const navItems = [
  { to: '/home', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];
const allSearchable = [
  ...navItems.map(i => ({ label: i.label, snippet: '' })),
  // About page content
  { label: 'AESTHETICS', snippet: 'A creative graphic design company dedicated to transforming your vision into stunning visuals.' },
  { label: 'What We Offer', snippet: 'Brand Consulting, Visual Identity, Packaging, Corporate Profiles, Marketing Materials, Website Design, Space Branding.' },
  { label: 'What Problem Are We Solving?', snippet: 'We help brands communicate their value and vision through compelling design.' },
  { label: 'Why Choose Us?', snippet: 'We create compelling experiences and value your comfort & time.' },
  // More About page highlights
  { label: 'Consultation', snippet: 'Expert advice for your brand’s growth and sustainability.' },
  { label: 'Visual Identity', snippet: 'Crafting unique logos, color palettes, and brand visuals.' },
  { label: 'Product Package Design', snippet: 'Attractive, functional packaging for your products.' },
  { label: 'Company Profile', snippet: 'Professional company profiles that tell your story.' },
  { label: 'Marketing & Brand Collateral', snippet: 'Brochures, flyers, and all marketing materials you need.' },
  { label: 'Web Design & Management', snippet: 'Modern, responsive websites for your business.' },
  { label: 'Environmental Branding', snippet: 'Transforming spaces to reflect your brand identity.' },
  // Services page content
  { label: 'Branding', snippet: 'Branding is the heart of our services. We build brands that send the right message.' },
  { label: 'Brand Consulting & Strategy', snippet: 'Consulting and strategy for your brand.' },
  { label: 'Visual Identity Systems', snippet: 'Creating unique visual identities.' },
  { label: 'Packaging & Product Design', snippet: 'Designing packaging and products.' },
  { label: 'Corporate Profile Creation', snippet: 'Professional corporate profiles.' },
  { label: 'Marketing & Promotional Materials', snippet: 'Marketing and promotional design.' },
  { label: 'Website Design & Digital Management', snippet: 'Web design and digital management.' },
  { label: 'Environmental & Space Branding', snippet: 'Branding for spaces and environments.' },
  // Blogs page content (sample, you can add more dynamically)
  { label: 'Blog: Welcome', snippet: 'Welcome to our blog section.' },
  { label: 'Blog: Branding Tips', snippet: 'Tips and insights on branding.' },
  { label: 'Blog: Design Trends', snippet: 'Latest trends in design.' },
  // More Blog entries
  { label: 'Having a website for your business is not a luxury but a necessity', snippet: 'Why every business needs a website in 2025. Credibility, accessibility, and marketing hub.' },
  { label: 'Why Your Business Needs a Review Section: A Lesson from a Young Mother', snippet: 'The power of reviews for trust, SEO, and sales. Real story and actionable tips.' },
  { label: 'Is Branding Really Necessary?', snippet: 'Branding is the soul of your business. Recognition, trust, and emotional connection.' },
  { label: 'The Psychology of Color in Graphic Design', snippet: 'How color influences perception and emotions in branding and design.' },
  // Add more as needed
];

const router = useRouter();

function toggleMenu() { menuOpen.value = !menuOpen.value; }
function closeMenu() { menuOpen.value = false; }
function handleResize() { isMobile.value = window.innerWidth <= 700; if (!isMobile.value) menuOpen.value = false; }

function handleNavLinkClick(to) {
  navLoading.value = true;
  const minLoadingTime = 700; // ms
  const start = Date.now();
  if (isMobile.value) closeMenu();
  router.push(to).catch(() => {})
    .finally(() => {
      const elapsed = Date.now() - start;
      const remaining = minLoadingTime - elapsed;
      if (remaining > 0) {
        setTimeout(() => { navLoading.value = false; }, remaining);
      } else {
        navLoading.value = false;
      }
    });
}

function openSearchPopup() {
  showSearchPopup.value = true;
  searchQuery.value = '';
  searchResults.value = [];
  nextTick(() => {
    const input = document.querySelector('.search-popup-input');
    if (input) input.focus();
  });
}

function closeSearchPopup() {
  showSearchPopup.value = false;
  searchQuery.value = '';
  searchResults.value = [];
}

function onSearchInput() {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) {
    searchResults.value = [];
    return;
  }
  searchResults.value = allSearchable.filter(item => item.label.toLowerCase().includes(q) || (item.snippet && item.snippet.toLowerCase().includes(q)));
}

function onSearchEnter() {
  if (searchResults.value.length) goToSuggestion(searchResults.value[0].label);
}

function goToSuggestion(suggestion) {
  const nav = navItems.find(i => i.label === suggestion);
  if (nav) {
    router.push(nav.to);
    closeSearchPopup();
    return;
  }
  if (suggestion === 'Home') router.push('/home');
  else if (suggestion === 'Services') router.push('/services');
  else if (suggestion === 'Contact') router.push('/contact');
  else if (suggestion === 'Blogs') router.push('/blogs');
  else if (suggestion === 'About') router.push('/about');
  closeSearchPopup();
}

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
  // Always redirect to Welcome page on reload if not already there
  if (window.location.pathname !== '/') {
    window.location.replace('/');
  }
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// Custom Cursor Logic
onMounted(() => {
  // Smooth Custom Cursor v3
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;
  const dot = cursor.querySelector('.cursor-dot');
  const svg = cursor.querySelector('.cursor-svg');
  const ring = cursor.querySelector('.cursor-svg-ring');
  let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0, ringX = 0, ringY = 0;
  let dotSpeed = 0.32, ringSpeed = 0.14;
  const lerp = (a, b, n) => (1 - n) * a + n * b;
  function animateCursor() {
    dotX = lerp(dotX, mouseX, dotSpeed);
    dotY = lerp(dotY, mouseY, dotSpeed);
    ringX = lerp(ringX, mouseX, ringSpeed);
    ringY = lerp(ringY, mouseY, ringSpeed);
    dot.style.transform = `translate3d(${dotX - 6}px, ${dotY - 6}px, 0)`;
    svg.style.transform = `translate3d(${ringX - 24}px, ${ringY - 24}px, 0)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  // Cursor hover effect for links and buttons
  const addCursorHover = (el) => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('active');
      dot.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('active');
      dot.classList.remove('active');
    });
  };
  document.querySelectorAll('a, button, .nav-links li, .service-card, .catchy-item').forEach(addCursorHover);
  // Hide on mobile
  if (window.innerWidth < 700) cursor.style.display = 'none';
});
</script>

<style scoped>
html, body, #app, .main-layout {
  overflow-x: hidden !important;
  width: 100vw;
  max-width: 100vw;
  min-width: 100vw;
  min-height: 100vh;
  height: 100vh;
}
body {
  overflow-x: hidden !important;
  width: 100vw;
  max-width: 100vw;
  min-width: 100vw;
  min-height: 100vh;
  height: 100vh;
}
#app {
  overflow-x: hidden !important;
  width: 100vw;
  max-width: 100vw;
  min-width: 100vw;
  min-height: 100vh;
  height: 100vh;
}
.main-layout {
  min-height: 100vh;
  height: 100vh;
  background: #181c20;
  min-width: 100vw;
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2rem;
  background: rgba(24,28,32,0.95);
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}
.advanced-navbar {
  background: linear-gradient(90deg, #181c20 80%, #ffb88c11 100%);
  box-shadow: 0 4px 32px 0 rgba(255,111,97,0.08), 0 1.5px 0 #ffb88c22;
  border-bottom: 1.5px solid #ffb88c22;
  backdrop-filter: blur(8px);
  transition: background 0.3s, box-shadow 0.3s;
}
.logo-area {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  position: relative;
}
.logo-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.06);
  border-radius: 50%;
  box-shadow: 0 2px 16px #ffb88c33;
  transition: box-shadow 0.2s;
  border: 1.5px solid #ffb88c33;
}
.logo-icon:hover {
  box-shadow: 0 4px 32px #ff6f61aa;
}
.logo-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}
.brand-gradient {
  font-size: 1.6rem;
  font-weight: 900;
  letter-spacing: 2.5px;
  background: linear-gradient(90deg, #ffb88c 10%, #ff6f61 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 12px #ffb88c66);
  animation: standoutPulse 2.2s infinite alternate;
}
.brand-underline {
  position: absolute;
  left: 0; right: 0; bottom: -8px;
  width: 100%;
  pointer-events: none;
  z-index: 2;
}
.nav-cta-area {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}
.header-quote {
  color: #ffb88c;
  font-size: 1.08rem;
  font-style: italic;
  font-weight: 500;
  letter-spacing: 1px;
  margin-right: 0.7rem;
  opacity: 0.85;
  display: none;
}
.header-cta-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(90deg, #ff6f61, #ffb88c 90%);
  color: #fff;
  border: none;
  border-radius: 30px;
  font-size: 1.05rem;
  font-weight: bold;
  padding: 0.6rem 1.5rem;
  box-shadow: 0 2px 12px #ffb88c33;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}
.header-cta-btn::after {
  content: '';
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  background: linear-gradient(90deg, #ffb88c44, #ff6f6133);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 0;
}
.header-cta-btn:hover {
  background: linear-gradient(90deg, #ffb88c, #ff6f61 90%);
  box-shadow: 0 4px 24px #ff6f61aa;
  transform: scale(1.07);
}
.header-cta-btn:hover::after {
  opacity: 1;
}
@media (min-width: 900px) {
  .header-quote { display: inline-block; }
}
.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  position: relative;
  z-index: 10;
}
.nav-animated-link {
  position: relative;
  display: inline-block;
  overflow: visible;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  transition: color 0.18s;
  box-shadow: none;
  background: none;
}
.nav-link-bg {
  display: none;
}
.nav-animated-link .nav-link-text {
  position: relative;
  z-index: 2;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
  color: #fff;
  transition: color 0.18s, transform 0.22s cubic-bezier(.4,1.6,.6,1), text-shadow 0.22s, filter 0.22s;
  filter: drop-shadow(0 0 0 #ffb88c00);
}
.nav-animated-link:hover .nav-link-text,
.nav-animated-link.router-link-exact-active .nav-link-text {
  color: #ff6f61;
  background: none;
  text-shadow: 0 2px 12px #ffb88c44;
  transform: none;
  filter: none;
}
.nav-animated-link:hover .nav-link-underline,
.nav-animated-link.router-link-exact-active .nav-link-underline {
  opacity: 1;
  transform: scaleX(1.1) scaleY(1.2) skewX(-8deg);
  box-shadow: 0 2px 12px #ffb88c55;
  animation: underlinePop 0.5s cubic-bezier(.4,1.6,.6,1);
}
@keyframes underlinePop {
  0% { transform: scaleX(0.3) scaleY(1) skewX(-8deg); opacity: 0; }
  60% { transform: scaleX(1.2) scaleY(1.3) skewX(-8deg); opacity: 1; }
  100% { transform: scaleX(1.1) scaleY(1.2) skewX(-8deg); opacity: 1; }
}
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 120;
  margin-left: 1rem;
  position: relative;
}
.hamburger span {
  display: block;
  width: 28px;
  height: 4px;
  margin: 4px 0;
  background: #ff6f61; /* Use the same color as the AESTHETICS logo */
  border-radius: 2px;
  transition: 0.4s;
  position: absolute;
  left: 5px;
}
.hamburger span:nth-child(1) {
  top: 8px;
}
.hamburger span:nth-child(2) {
  top: 17px;
}
.hamburger span:nth-child(3) {
  top: 26px;
}
.hamburger span.open:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}
.hamburger span.open:nth-child(2) {
  opacity: 0;
}
.hamburger span.open:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}
@media (max-width: 700px) {
  .header-quote { display: none !important; }
  .nav-cta-area {
    display: none !important;
  }
  .hamburger {
    display: flex;
    width: 32px;
    height: 32px;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    position: relative;
    z-index: 200;
    background: none;
    border: none;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-shadow: none;
  }
  .hamburger span {
    width: 22px;
    height: 3.2px;
    left: 2px;
    margin: 2.5px 0;
    border-radius: 2px;
    background: #ff6f61;
    transition: 0.4s;
    position: absolute;
  }
  .hamburger span:nth-child(1) { top: 6px; }
  .hamburger span:nth-child(2) { top: 14px; }
  .hamburger span:nth-child(3) { top: 22px; }
  .hamburger span.open:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  .hamburger span.open:nth-child(2) {
    opacity: 0;
  }
  .hamburger span.open:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
  .navbar {
    padding: 0.6rem 0.5rem 0.6rem 0.8rem;
    gap: 0.3rem;
    min-height: 54px;
  }
  .logo-area {
    gap: 0.5rem;
  }
  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(24,28,32,0.98);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.2rem;
    padding: 0;
    margin: 0;
    border-radius: 0;
    font-size: 1.2rem;
    z-index: 150;
    display: none;
    transition: opacity 0.3s, visibility 0.3s;
    opacity: 0;
    pointer-events: none;
  }
  .nav-links.mobile-open {
    display: flex;
    opacity: 1;
    pointer-events: auto;
    animation: mobileMenuFadeIn 0.3s;
  }
  @keyframes mobileMenuFadeIn {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .nav-links li {
    width: 100%;
    text-align: center;
  }
  .nav-animated-link {
    width: 100%;
    display: block;
    padding: 1.1rem 0;
    font-size: 1.2rem;
    border-radius: 0;
    background: none;
    box-shadow: none;
    margin: 0 auto;
    transition: background 0.18s;
  }
  .nav-animated-link .nav-link-text {
    font-size: 1.2rem;
    color: #fff;
    transition: color 0.18s;
  }
  .nav-animated-link:hover .nav-link-text,
  .nav-animated-link.router-link-exact-active .nav-link-text {
    color: #ff6f61;
    background: none;
    text-shadow: 0 2px 12px #ffb88c44;
    transform: none;
    filter: none;
  }
  .nav-link-underline {
    display: none;
  }
}
.search-nav-item {
  display: flex;
  align-items: center;
  margin-left: 0.7rem;
}
.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}
.search-btn:hover {
  background: rgba(255, 184, 140, 0.08);
  border-radius: 50%;
}
.desktop-search-dropdown {
  position: absolute;
  right: 2.5rem;
  top: 3.5rem;
  background: #232526;
  border-radius: 1rem;
  box-shadow: 0 4px 24px #ffb88c22;
  padding: 1rem 1.2rem 0.7rem 1.2rem;
  z-index: 100;
  min-width: 220px;
}
.desktop-search-dropdown input {
  width: 100%;
  padding: 0.5rem 0.7rem;
  border-radius: 0.7rem;
  border: none;
  background: #181c20;
  color: #fff;
  margin-bottom: 0.5rem;
}
.search-suggestions {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 180px;
  overflow-y: auto;
}
.search-suggestions li {
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  border-radius: 0.5rem;
  color: #ffb88c;
  transition: background 0.18s;
}
.search-suggestions li:hover {
  background: #414345;
}
.mobile-search-bar {
  padding: 0.7rem 1.2rem 0.2rem 1.2rem;
  background: #232526;
}
.mobile-search-bar input {
  width: 100%;
  padding: 0.5rem 0.7rem;
  border-radius: 0.7rem;
  border: none;
  background: #181c20;
  color: #fff;
  margin-bottom: 0.5rem;
}
.search-popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 9999;
  background: rgba(30, 32, 36, 0.65);
  backdrop-filter: blur(7px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-popup {
  background: #fff6f3;
  border-radius: 1rem;
  box-shadow: 0 8px 48px #ffb88c33;
  padding: 2.2rem 2.5rem 1.5rem 2.5rem;
  min-width: 340px;
  max-width: 90vw;
  min-height: 80px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-popup-input {
  width: 100%;
  font-size: 2.2rem;
  padding: 0.7rem 1.2rem;
  border-radius: 0.7rem;
  border: none;
  background: #fff0ed;
  color: #414345;
  margin-bottom: 1.2rem;
  text-align: center;
  font-family: inherit;
  box-shadow: 0 2px 12px #ffb88c11;
}
.search-popup-close {
  position: absolute;
  top: 1.1rem;
  right: 1.3rem;
  background: none;
  border: none;
  font-size: 2.2rem;
  color: #ff6f61;
  cursor: pointer;
  z-index: 2;
}
.search-popup-results {
  width: 100%;
  margin-top: 0.5rem;
}
.search-popup-result-title {
  color: #ff6f61;
  font-weight: 700;
  margin-bottom: 0.7rem;
  font-size: 1.1rem;
}
.search-popup-results ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.search-popup-results li {
  padding: 0.7rem 0.5rem;
  border-radius: 0.6rem;
  cursor: pointer;
  color: #232526;
  font-size: 1.15rem;
  margin-bottom: 0.2rem;
  background: #fff0ed;
  transition: background 0.18s;
}
.search-popup-results li:hover {
  background: #ffb88c22;
}
.search-popup-snippet {
  display: block;
  color: #888;
  font-size: 0.98rem;
  margin-top: 0.1rem;
}
.search-popup-no-results {
  color: #ff6f61;
  font-size: 1.1rem;
  margin-top: 1.2rem;
  text-align: center;
}
.search-popup mark {
  background: #ffb88c;
  color: #232526;
  border-radius: 0.3rem;
  padding: 0 0.15em;
}
@media (max-width: 700px) {
  .search-popup {
    min-width: 90vw;
    padding: 1.2rem 0.5rem 1rem 0.5rem;
  }
  .search-popup-input {
    font-size: 1.2rem;
    padding: 0.5rem 0.7rem;
  }
}
.mobile-header-icons-fixed {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  position: absolute;
  right: 1.2rem;
  top: 1.1rem;
  z-index: 20;
}
.mobile-search-btn, .mobile-hamburger {
  background: none;
  border: none;
  padding: 0.2rem 0.4rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.18s;
}
.mobile-search-btn:hover, .mobile-hamburger:hover {
  background: rgba(255, 184, 140, 0.10);
}
.mobile-menu-close-li {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1.2rem 1.5rem 0.2rem 0;
}
.mobile-menu-close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}
.mobile-menu-close-btn:hover {
  background: rgba(255, 184, 140, 0.08);
  border-radius: 50%;
}
.float-back-btn {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 200;
}
.back-btn {
  background: #181818;
  border: none;
  border-radius: 0.5rem;
  color: #fff;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}
.back-btn:hover {
  background: #ffb300;
}
</style>

<style>
#custom-cursor {
  position: fixed;
  left: 0; top: 0;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
}
.cursor-dot {
  width: 12px; height: 12px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  left: 0; top: 0;
  box-shadow: 0 0 8px #ffb88c88, 0 0 0 2px #fff2 inset;
  transition: background 0.18s, transform 0.18s cubic-bezier(.4,1.6,.6,1);
  will-change: transform;
}
.cursor-dot.active {
  background: #ff6f61;
  transform: scale(1.3);
}
.cursor-svg {
  position: absolute;
  left: 0; top: 0;
  width: 48px; height: 48px;
  pointer-events: none;
  transition: filter 0.18s;
  filter: drop-shadow(0 0 8px #ffb88c88);
  will-change: transform;
}
.cursor-svg-ring {
  fill: none;
  stroke: #ffb88c;
  stroke-width: 2.5;
  opacity: 0.85;
  transition: stroke 0.18s, opacity 0.18s, r 0.18s cubic-bezier(.4,1.6,.6,1);
}
.cursor-svg-ring.active {
  stroke: #ff6f61;
  opacity: 1;
  r: 22;
}
@media (max-width: 700px) {
  #custom-cursor { display: none !important; }
}
</style>

<style>
.minimal-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px) saturate(1.5) brightness(1.08);
  -webkit-backdrop-filter: blur(18px) saturate(1.5) brightness(1.08);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  border-radius: 0;
  position: fixed;
  inset: 0;
  z-index: 9999;
}
.minimal-svg-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
}
.loading-text {
  color: #ffb88c;
  font-size: 1.1rem;
  font-family: 'Montserrat', Arial, sans-serif;
  letter-spacing: 2px;
  margin-top: 0.7rem;
  text-shadow: 0 2px 12px #0f2027;
  animation: fadeIn 1.2s;
}
</style>
