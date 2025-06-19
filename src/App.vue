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
        <div v-if="searchQuery && Object.keys(searchResults).length" class="search-popup-results">
          <div v-for="(results, category) in searchResults" :key="category" class="search-category">
            <h3 class="search-category-title">{{ category }}</h3>
            <ul>
              <li v-for="result in results" :key="result.title" @click="goToSuggestion(result)" class="search-result-item">
                <div class="search-result-header">
                  <span v-html="highlightMatch(result.title, searchQuery)" class="search-result-title"></span>
                  <span v-if="result.badge" class="search-result-badge" :class="'badge-' + result.badge.toLowerCase()">{{ result.badge }}</span>
                </div>
                <span v-if="result.snippet" class="search-popup-snippet" v-html="highlightMatch(result.snippet, searchQuery)"></span>
              </li>
            </ul>
          </div>
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
      <div v-if="navLoading && $route.path !== '/'" class="loading-screen minimal-loading">
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
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <div id="custom-cursor">
      <svg class="cursor-svg" width="48" height="48">
        <circle class="cursor-svg-ring" cx="24" cy="24" r="18" />
      </svg>
      <div class="cursor-dot"></div>
    </div>
  </div>
</template>

<script>
import { blogStore } from './store/blogs.js';

export default {
  data() {
    return {
      menuOpen: false,
      isMobile: false,
      showSearchPopup: false,
      searchQuery: '',
      searchResults: [],
      navLoading: false,
      navItems: [
        { to: '/home', label: 'Home' },
        { to: '/services', label: 'Services' },
        { to: '/blogs', label: 'Blogs' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
      ],
      searchCategories: {
        pages: ['home', 'services', 'about', 'contact'],
        services: [
          { title: 'Web Design', description: 'Beautiful and functional web design' },
          { title: 'SEO Services', description: 'Improve your website ranking' },
          { title: 'Digital Marketing', description: 'Grow your business online' },
        ],
        features: [
          { title: 'Responsive Design', description: 'Looks great on all devices' },
          { title: 'Fast Loading', description: 'Optimized for speed' },
          { title: 'Easy to Use', description: 'User-friendly interfaces' },
        ],
      }
    }
  },
  computed: {
    blogs() {
      return blogStore.blogs;
    }
  },
  watch: {
    $route(to, from) {
      // Only show loading for non-Welcome page transitions
      if (to.path !== '/' && from.path !== '/') {
        this.navLoading = true;
        setTimeout(() => {
          this.navLoading = false;
        }, 800);
      }
    }
  },
  mounted() {
    this.isMobile = window.innerWidth <= 700;
    window.addEventListener('resize', this.checkMobile);
    // Initialize custom cursor
    this.initCustomCursor();
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 700;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    openSearchPopup() {
      this.showSearchPopup = true;
      this.searchQuery = '';
      this.searchResults = [];
    },
    closeSearchPopup() {
      this.showSearchPopup = false;
      this.searchQuery = '';
      this.searchResults = [];
    },
    onSearchInput() {
      if (!this.searchQuery.trim()) {
        this.searchResults = {};
        return;
      }

      const query = this.searchQuery.toLowerCase();
      let results = [];

      // Search through pages
      this.searchCategories.pages.forEach(page => {
        if (page.toLowerCase().includes(query)) {
          results.push({
            type: 'page',
            title: page,
            path: '/' + page.toLowerCase(),
            category: 'Pages',
            matchScore: page.toLowerCase().startsWith(query) ? 10 : 5
          });
        }
      });

      // Search through services
      this.searchCategories.services.forEach(service => {
        if (service.title.toLowerCase().includes(query) || 
            service.description.toLowerCase().includes(query)) {
          results.push({
            type: 'service',
            title: service.title,
            path: '/services',
            category: 'Services',
            snippet: service.description,
            matchScore: service.title.toLowerCase().includes(query) ? 8 : 4
          });
        }
      });

      // Search through features
      this.searchCategories.features.forEach(feature => {
        if (feature.title.toLowerCase().includes(query) || 
            feature.description.toLowerCase().includes(query)) {
          results.push({
            type: 'feature',
            title: feature.title,
            path: '/services',
            category: 'Features',
            snippet: feature.description,
            matchScore: feature.title.toLowerCase().includes(query) ? 7 : 3
          });
        }
      });

      // Search through blogs
      this.blogs.forEach(blog => {
        const titleMatch = blog.title.toLowerCase().includes(query);
        const summaryMatch = blog.summary.toLowerCase().includes(query);
        const contentMatch = blog.content.toLowerCase().includes(query);
        
        if (titleMatch || summaryMatch || contentMatch) {
          let matchScore = 0;
          if (titleMatch) matchScore += 10;
          if (summaryMatch) matchScore += 5;
          if (contentMatch) matchScore += 3;

          results.push({
            type: 'blog',
            title: blog.title,
            path: `/blogs/${blog.id}`,
            category: 'Blog Posts',
            snippet: this.generateSnippet(blog, query),
            badge: blog.badge,
            matchScore
          });
        }
      });

      // Sort results by match score
      results.sort((a, b) => b.matchScore - a.matchScore);

      // Group results by category
      const groupedResults = {};
      results.forEach(result => {
        if (!groupedResults[result.category]) {
          groupedResults[result.category] = [];
        }
        groupedResults[result.category].push(result);
      });

      this.searchResults = groupedResults;
    },
    generateSnippet(item, query) {
      let textToSearch = item.summary;
      if (!textToSearch.toLowerCase().includes(query)) {
        // If query not found in summary, search in content
        textToSearch = item.content.replace(/<[^>]*>/g, '');
      }

      const queryIndex = textToSearch.toLowerCase().indexOf(query);
      if (queryIndex === -1) return item.summary;

      const start = Math.max(0, queryIndex - 50);
      const end = Math.min(textToSearch.length, queryIndex + query.length + 50);
      let snippet = textToSearch.slice(start, end);

      if (start > 0) snippet = '...' + snippet;
      if (end < textToSearch.length) snippet += '...';

      return snippet;
    },
    onSearchEnter() {
      if (this.searchResults.length > 0) {
        this.goToSuggestion(this.searchResults[0].label);
      }
    },
    goToSuggestion(label) {
      const result = this.searchResults.find(r => r.label === label);
      if (result) {
        this.closeSearchPopup();
        this.$router.push(result.path);
      }
    },
    highlightMatch(text, query) {
      if (!query) return text;
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    },
    handleNavLinkClick(path) {
      this.closeMenu();
      if (this.$route.path !== path) {
        // Show loading only when navigating between non-Welcome pages
        if (this.$route.path !== '/' && path !== '/') {
          this.navLoading = true;
          setTimeout(() => {
            this.navLoading = false;
          }, 800);
        }
        this.$router.push(path);
      }
    },
    initCustomCursor() {
      const cursor = document.getElementById('custom-cursor');
      const cursorDot = cursor.querySelector('.cursor-dot');
      const cursorRing = cursor.querySelector('.cursor-svg-ring');
      
      const moveCursor = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };

      document.addEventListener('mousemove', moveCursor);
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  }
}
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 10vh;
  z-index: 1000;
}
.search-popup {
  background: #1a1a1a;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  padding: 1.5rem;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
.search-popup-input {
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  background: #2a2a2a;
  color: #fff;
  outline: none;
}
.search-popup-input:focus {
  box-shadow: 0 0 0 2px #ffb88c;
}
.search-popup-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
}
.search-popup-results {
  margin-top: 1.5rem;
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 0.5rem;
}
.search-category {
  margin-bottom: 2rem;
}
.search-category-title {
  color: #ffb88c;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  font-weight: 600;
}
.search-result-item {
  padding: 1rem;
  margin: 0.5rem 0;
  background: #2a2a2a;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}
.search-result-item:hover {
  background: #333;
  transform: translateX(5px);
  border-color: #ffb88c33;
}
.search-result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.search-result-title {
  font-weight: 500;
  color: #fff;
}
.search-result-badge {
  font-size: 0.7rem;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-weight: 600;
  text-transform: uppercase;
}
.search-popup-snippet {
  display: block;
  font-size: 0.9rem;
  color: #888;
  margin-top: 0.3rem;
  line-height: 1.4;
}
mark {
  background: #ffb88c33;
  color: #ffb88c;
  padding: 0 0.2rem;
  border-radius: 2px;
}
/* Custom scrollbar for search results */
.search-popup-results::-webkit-scrollbar {
  width: 8px;
}

.search-popup-results::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 4px;
}

.search-popup-results::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

.search-popup-results::-webkit-scrollbar-thumb:hover {
  background: #444;
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
