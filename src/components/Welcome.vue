<template>
  <div class="loading-screen" v-if="loading">
    <div class="loader-bg">
      <svg class="bg-shape" width="420" height="420" viewBox="0 0 420 420">
        <defs>
          <radialGradient id="bg-gradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="#ffb88c" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#ff6f61" stop-opacity="0.9"/>
          </radialGradient>
        </defs>
        <circle cx="210" cy="210" r="180" fill="url(#bg-gradient)"/>
        <ellipse cx="210" cy="210" rx="120" ry="60" fill="#fff" opacity="0.04"/>
      </svg>
      <div class="floating-shapes">
        <div class="float float1"></div>
        <div class="float float2"></div>
        <div class="float float3"></div>
      </div>
    </div>
    <div class="loader-content">
      <div class="svg-loader">
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
          <circle cx="50" cy="50" r="28" stroke="#fff" stroke-width="2" fill="none" opacity="0.18"/>
          <text x="50%" y="56%" text-anchor="middle" fill="#ff6f61" font-size="2.1rem" font-family="Montserrat, Arial, sans-serif" font-weight="bold">A</text>
        </svg>
      </div>
      <h1 class="brand-title animate-text">AESTHETICS</h1>
      <p class="slogan animate-text">Your Vision, Our Design</p>
      <div class="loader-bar">
        <div class="bar-progress" :style="{ width: barWidth + '%' }"></div>
      </div>
      <div class="loader-quote animate-fadein">
        <svg width="24" height="24" fill="none" stroke="#ffb88c" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:6px;"><path d="M9 17H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h2"/><path d="M17 17h2a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4h-2"/></svg>
        <span>{{ randomQuote }}</span>
      </div>
    </div>
  </div>
  <div v-else class="welcome-page">
    <transition name="advanced-fade">
      <div v-show="!loading" class="welcome-content no-box">
        <div class="welcome-graphic">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <defs>
              <radialGradient id="circle-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#ffb88c" stop-opacity="0.7"/>
                <stop offset="100%" stop-color="#ff6f61" stop-opacity="0.9"/>
              </radialGradient>
              <linearGradient id="shine-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fff" stop-opacity="0.7"/>
                <stop offset="100%" stop-color="#ffb88c" stop-opacity="0.1"/>
              </linearGradient>
            </defs>
            <circle cx="70" cy="70" r="60" fill="url(#circle-gradient)"/>
            <ellipse cx="70" cy="70" rx="40" ry="18" fill="url(#shine-gradient)" opacity="0.18">
              <animate attributeName="rx" values="40;60;40" dur="2.5s" repeatCount="indefinite"/>
            </ellipse>
            <text x="50%" y="56%" text-anchor="middle" fill="#fff" font-size="2.8rem" font-family="Montserrat, Arial, sans-serif" font-weight="bold">A</text>
            <circle cx="70" cy="70" r="60" fill="none" stroke="#fff" stroke-width="2" opacity="0.08">
              <animate attributeName="stroke-dasharray" values="0,377;377,0;0,377" dur="3s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
        <h1 class="welcome-title animate-welcome">
          Welcome to
          <span class="brand standout">AESTHETICS
            <svg class="brand-underline" width="140" height="18" viewBox="0 0 140 18">
              <path d="M10 14 Q70 22 130 10" stroke="#ffb88c" stroke-width="4" fill="none" opacity="0.7">
                <animate attributeName="d" values="M10 14 Q70 22 130 10;M10 10 Q70 18 130 14;M10 14 Q70 22 130 10" dur="2.2s" repeatCount="indefinite"/>
              </path>
              <circle cx="135" cy="12" r="3" fill="#ff6f61">
                <animate attributeName="r" values="3;6;3" dur="1.2s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </span>
        </h1>
        <p class="slogan animate-welcome">Your Vision, Our Design</p>
        <div class="catchy-row">
          <div class="catchy-item">
            <svg width="28" height="28" fill="none" stroke="#ffb88c" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
            <span>Creative Excellence</span>
          </div>
          <div class="catchy-item">
            <svg width="28" height="28" fill="none" stroke="#ffb88c" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M7 7h.01M7 17h.01M17 7h.01M17 17h.01"/></svg>
            <span>Modern & Unique</span>
          </div>
          <div class="catchy-item">
            <svg width="28" height="28" fill="none" stroke="#ffb88c" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20v-6M12 4v2m0 0a8 8 0 1 1 0 16a8 8 0 0 1 0-16z"/></svg>
            <span>Interactive Design</span>
          </div>
        </div>
        <p class="desc animate-welcome">We turn your ideas into stunning visuals. Explore our creative world and let’s design something extraordinary together.</p>
        <button class="get-started advanced-btn creative-btn" @click="goToHome">
          <span class="btn-text">Get Started</span>
          <span class="btn-glow"></span>
          <span class="btn-arrow">
            <svg width="28" height="28" fill="none" stroke="#fff" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
          <span class="btn-sparkle">
            <svg width="18" height="18" viewBox="0 0 18 18"><g fill="#ffb88c"><circle cx="9" cy="9" r="2.5" opacity="0.7"><animate attributeName="r" values="2.5;4;2.5" dur="1.2s" repeatCount="indefinite"/></circle><circle cx="14" cy="4" r="1.2" opacity="0.5"><animate attributeName="r" values="1.2;2;1.2" dur="1.1s" repeatCount="indefinite"/></circle><circle cx="4" cy="14" r="1.2" opacity="0.5"><animate attributeName="r" values="1.2;2;1.2" dur="1.1s" repeatCount="indefinite"/></circle></g></svg>
          </span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
const quotes = [
  'Design is intelligence made visible.',
  'Creativity takes courage.',
  'Good design is good business.',
  'Simplicity is the ultimate sophistication.',
  'Great design is a multi-layered relationship.',
  'Your brand deserves to stand out.',
  'Every pixel counts.',
  'Inspiration starts here.'
];

export default {
  name: 'Welcome',
  data() {
    return {
      loading: true,
      barWidth: 0,
      randomQuote: ''
    }
  },
  created() {
    this.startLoading();
  },
  methods: {
    startLoading() {
      this.loading = true;
      this.barWidth = 0;
      this.randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      
      const increment = () => {
        if (this.barWidth < 100) {
          this.barWidth += Math.random() * 15;
          if (this.barWidth > 100) this.barWidth = 100;
          setTimeout(increment, 100);
        } else {
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      }
      
      increment();
    },
    goToHome() {
      this.$router.replace('/home');
    }
  }
}
</script>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #0f2027, #2c5364 80%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 1s;
  overflow: hidden;
}
.loader-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
}
.bg-shape {
  filter: blur(8px) brightness(1.1);
  opacity: 0.7;
  animation: floatBg 5s ease-in-out infinite alternate;
}
.floating-shapes {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  z-index: 2;
}
.float {
  position: absolute;
  border-radius: 50%;
  opacity: 0.18;
  filter: blur(2px);
  animation: floatMove 6s infinite alternate;
}
.float1 {
  width: 60px; height: 60px; background: #ffb88c;
  left: 10%; top: 20%; animation-delay: 0s;
}
.float2 {
  width: 40px; height: 40px; background: #ff6f61;
  right: 12%; top: 35%; animation-delay: 1.2s;
}
.float3 {
  width: 30px; height: 30px; background: #fff;
  left: 25%; bottom: 18%; animation-delay: 2.1s;
}
@keyframes floatBg {
  0% { transform: translate(-50%, -50%) scale(1); }
  100% { transform: translate(-50%, -50%) scale(1.08); }
}
@keyframes floatMove {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-30px) scale(1.12); }
}
.loader-content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: #fff;
  animation: popIn 1.2s cubic-bezier(.68,-0.55,.27,1.55);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}
.svg-loader {
  margin-bottom: 0.5rem;
  animation: rotate 1.5s linear infinite;
}
@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.brand-title, .slogan {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s, transform 0.7s;
}
.animate-text {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s, transform 0.7s;
}
.animate-fadein {
  opacity: 0;
  transition: opacity 1.2s;
}
.brand-title {
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: 4px;
  color: #ff6f61;
  margin-bottom: 0.2rem;
  font-family: 'Montserrat', Arial, sans-serif;
}
.slogan {
  font-size: 1.2rem;
  color: #ffb88c;
  font-style: italic;
  margin-bottom: 0.5rem;
}
.loader-bar {
  width: 180px;
  height: 8px;
  background: rgba(255,255,255,0.08);
  border-radius: 6px;
  overflow: hidden;
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px rgba(255,111,97,0.08);
}
.bar-progress {
  height: 100%;
  background: linear-gradient(90deg, #ff6f61, #ffb88c);
  border-radius: 6px;
  transition: width 0.3s cubic-bezier(.68,-0.55,.27,1.55);
}
.loader-quote {
  margin-top: 1.2rem;
  color: #ffb88c;
  font-size: 1.08rem;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(24,28,32,0.18);
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  box-shadow: 0 2px 8px rgba(255,111,97,0.08);
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0;
  transition: opacity 1.2s;
}
@media (max-width: 700px) {
  .advanced-welcome {
    padding: 1rem 0.2rem;
    border-radius: 1rem;
    width: 98vw;
    min-width: 0;
    max-width: 100vw;
    box-sizing: border-box;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .welcome-graphic {
    margin-bottom: 1.5rem;
    width: 80px !important;
    height: 80px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }
  .welcome-title {
    font-size: 2.5rem !important;
    line-height: 1.2;
    max-width: 92vw;
    word-break: break-word;
    margin-bottom: 0.5rem;
    margin-top: 1.7rem;
    text-align: center;
  }
  .slogan {
    font-size: 0.98rem !important;
    margin-bottom: 0.7rem;
  }
  .catchy-row {
    gap: 0.4rem;
    flex-direction: column;
    align-items: center;
  }
  .catchy-item {
    font-size: 0.98rem !important;
    padding: 0.4rem 0.8rem;
  }
  .desc {
    font-size: 0.95rem !important;
    max-width: 92vw;
    margin-bottom: 1.2rem;
  }
  .creative-btn, .get-started, .advanced-btn {
    width: 92vw;
    max-width: 100vw;
    min-width: 0;
    box-sizing: border-box;
    font-size: 1rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    overflow-x: auto;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes popIn {
  0% { transform: scale(0.7); opacity: 0; }
  80% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); }
}
.no-box {
  position: relative;
  overflow: visible;
  animation: fadeIn 1.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  background: none !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  margin-top: 0 !important;
}
.welcome-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f2027, #2c5364 80%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.welcome-graphic {
  margin-bottom: 1.2rem;
  animation: popIn 1.2s cubic-bezier(.68,-0.55,.27,1.55);
  filter: drop-shadow(0 4px 24px #ffb88c44);
}
.animate-welcome {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeSlideIn 1.1s 0.2s forwards;
}
@keyframes fadeSlideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.catchy-row {
  display: flex;
  gap: 2.2rem;
  margin: 1.2rem 0 0.5rem 0;
  justify-content: center;
  flex-wrap: wrap;
}
.catchy-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,184,140,0.08);
  border-radius: 1.2rem;
  padding: 0.6rem 1.2rem;
  font-size: 1.08rem;
  color: #ffb88c;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(255,111,97,0.08);
  transition: background 0.2s, color 0.2s;
  cursor: pointer;
}
.catchy-item:hover {
  background: linear-gradient(90deg, #ffb88c33, #ff6f6133);
  color: #ff6f61;
}
.creative-btn {
  position: relative;
  padding: 1.1rem 3.2rem 1.1rem 2.2rem;
  font-size: 1.18rem;
  background: linear-gradient(90deg, #ff6f61, #ffb88c 90%);
  color: #fff;
  border: none;
  border-radius: 40px;
  font-weight: bold;
  letter-spacing: 1.5px;
  box-shadow: 0 4px 24px rgba(255,111,97,0.18);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  overflow: visible;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  z-index: 1;
}
.creative-btn:hover {
  transform: scale(1.08) rotate(-1deg);
  box-shadow: 0 8px 32px rgba(255,111,97,0.28);
  background: linear-gradient(90deg, #ffb88c, #ff6f61 90%);
}
.btn-glow {
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  border-radius: 40px;
  z-index: -1;
  box-shadow: 0 0 32px 8px #ffb88c55, 0 0 0 0 #ff6f6100;
  opacity: 0.7;
  pointer-events: none;
  transition: box-shadow 0.3s;
}
.creative-btn:hover .btn-glow {
  box-shadow: 0 0 48px 16px #ff6f61cc, 0 0 0 0 #ffb88c00;
  opacity: 1;
}
.btn-arrow {
  display: flex;
  align-items: center;
  margin-left: 0.2rem;
  animation: arrowMove 1.2s infinite alternate;
}
@keyframes arrowMove {
  0% { transform: translateX(0); }
  100% { transform: translateX(8px); }
}
.btn-sparkle {
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  animation: sparkleFade 1.5s infinite alternate;
}
@keyframes sparkleFade {
  0% { opacity: 0.7; }
  100% { opacity: 1; }
}
.btn-text {
  z-index: 2;
  font-family: 'Montserrat', Arial, sans-serif;
  font-weight: 700;
  letter-spacing: 2px;
}
.standout {
  color: #ff6f61;
  font-weight: 900;
  letter-spacing: 3px;
  position: relative;
  display: inline-block;
  background: linear-gradient(90deg, #ffb88c 10%, #ff6f61 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 12px #ffb88c66);
  animation: standoutPulse 2.2s infinite alternate;
}
@keyframes standoutPulse {
  0% { filter: drop-shadow(0 2px 12px #ffb88c66); }
  100% { filter: drop-shadow(0 4px 24px #ff6f61cc); }
}
.brand-underline {
  position: absolute;
  left: 0; right: 0; bottom: -8px;
  width: 100%;
  pointer-events: none;
  z-index: 2;
}
.advanced-fade-enter-active, .advanced-fade-leave-active {
  transition: opacity 1.2s cubic-bezier(.68,-0.55,.27,1.55),
              transform 1.2s cubic-bezier(.68,-0.55,.27,1.55),
              filter 1.2s cubic-bezier(.68,-0.55,.27,1.55);
}
.advanced-fade-enter, .advanced-fade-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(60px) skewY(2deg);
  filter: blur(18px) brightness(1.2);
}
.advanced-fade-leave-active {
  z-index: 2;
}
.advanced-fade-enter-active {
  z-index: 3;
}
</style>
