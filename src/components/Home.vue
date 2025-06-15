<template>
  <div class="home-mobile-wrapper">
    <section class="home-section">
      <div class="hero">
        <div class="hero-text">
          <h1 class="main-title">
            <div class="typing-container">
              <span class="typing-text">{{ currentTypingText }}</span><span class="typing-cursor">|</span>
            </div>
          </h1>
          <p class="subtitle">We craft stunning visuals and creative solutions for your business.</p>
          <router-link to="/services">
            <button class="explore-btn">Explore Services</button>
          </router-link>
        </div>
        <div class="hero-img">
          <img src="/src/assets/images/aest.png" alt="AEST image" @click="openImageModal" style="cursor:pointer;" />
        </div>
      </div>
      <div class="scroll-down" @click="scrollToFeatured">
        <span>Scroll Down</span>
        <svg width="24" height="24" fill="none" stroke="#ff6f61" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
      </div>
    </section>

    <!-- Featured Work Section -->
    <section class="featured-work-section" id="featured-work" ref="featuredSection">
      <h2 class="section-title">Featured Work</h2>
      <div class="work-cards">
        <div v-for="(work, i) in featuredWorks" :key="work.title" class="work-card" :style="{ '--delay': i * 0.15 + 's' }">
          <img :src="work.img" :alt="work.title" />
          <div class="work-info">
            <h3>{{ work.title }}</h3>
            <p>{{ work.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="why-choose-section">
      <h2 class="section-title">Why Choose <span class="highlight">AESTHETICS</span>?</h2>
      <div class="why-cards">
        <div v-for="(item, i) in whyChoose" :key="item.title" class="why-card">
          <div class="why-icon" v-html="item.icon"></div>
          <h4>{{ item.title }}</h4>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section" style="background: url('/src/assets/images/backkk.png') center/cover no-repeat; position:relative;">
      <div class="testimonials-overlay"></div>
      <h2 class="testimonials-heading" style="position:relative; z-index:3; color:#fff; text-shadow:0 2px 8px #222, 0 0 2px #000;">WHAT OUR CLIENTS SAY</h2>
      <div class="testimonials-list">
        <div class="testimonial-card" v-for="t in newTestimonials" :key="t.name">
          <p class="testimonial-text">"{{ t.text }}"</p>
          <div class="testimonial-client">
            <span class="testimonial-name">- {{ t.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <transition name="modal-fade">
      <div v-if="showImageModal" class="modal-overlay" @click.self="closeImageModal" tabindex="-1">
        <button class="modal-close-btn" @click="closeImageModal" aria-label="Close image viewer" ref="closeBtn">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <transition name="modal-img-zoom">
          <img v-if="showImageModal" class="modal-image" src="/src/assets/images/aest.png" alt="AEST image enlarged" @click="closeImageModal" />
        </transition>
      </div>
    </transition>

    <MainFooter />
    <div v-show="showFloatBtn" class="float-back-btn">
      <button class="back-btn" @click="goBack" title="Back">
        <svg width="28" height="28" fill="none" stroke="#ffb300" stroke-width="2.2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
      </button>
    </div>
  </div>
</template>

<script>
import MainFooter from './MainFooter.vue';
export default {
  components: { MainFooter },
  data() {
    return {
      featuredWorks: [
        {
          title: 'Brand Identity',
          desc: 'Complete branding for a modern tech startup.',
          img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
        },
        {
          title: 'Creative Campaign',
          desc: 'Award-winning social media visuals.',
          img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
        },
        {
          title: 'Packaging Design',
          desc: 'Minimalist packaging for a luxury brand.',
          img: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80',
        },
      ],
      whyChoose: [
        {
          title: 'Creative Experts',
          desc: 'Our team brings years of experience and fresh ideas.',
          icon: `<svg width="38" height="38" fill="none" stroke="#ffb88c" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5-2 4-2 4 2 4 2"/></svg>`
        },
        {
          title: 'Client Focused',
          desc: 'We listen, adapt, and deliver beyond expectations.',
          icon: `<svg width="38" height="38" fill="none" stroke="#ffb88c" stroke-width="2.2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 12h8"/></svg>`
        },
        {
          title: 'On-Time Delivery',
          desc: 'We value your time and always meet deadlines.',
          icon: `<svg width="38" height="38" fill="none" stroke="#ffb88c" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`
        },
      ],
      newTestimonials: [
        { name: 'Ada E.', text: 'Absolutely stunning work! My brand has never looked better.' },
        { name: 'Kunle T.', text: 'Professional, creative, and reliable. Highly recommended!' },
        { name: 'Fatima S.', text: 'The team exceeded my expectations. I love my new website.' }
      ],
      typingTexts: [
        "Unleash Your Brand's Aesthetics",
        'Ignite Your Visual Story',
        'Inspire With Design',
        'Stand Out With Creativity'
      ],
      currentTypingText: '',
      typingIndex: 0,
      charIndex: 0,
      isDeleting: false,
      typingSpeed: 80,
      pauseDelay: 1200,
      typingTimeout: null,
      showFloatBtn: false,
      showImageModal: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.typeWriter();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    clearTimeout(this.typingTimeout);
  },
  methods: {
    scrollToFeatured() {
      const section = this.$refs.featuredSection;
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    },
    goBack() {
      if (this.$router) this.$router.back();
      else window.history.back();
    },
    handleScroll() {
      this.showFloatBtn = window.scrollY > 200;
    },
    typeWriter() {
      const currentText = this.typingTexts[this.typingIndex];
      if (!this.isDeleting) {
        this.currentTypingText = currentText.substring(0, this.charIndex + 1);
        this.charIndex++;
        if (this.charIndex === currentText.length) {
          this.isDeleting = true;
          this.typingTimeout = setTimeout(this.typeWriter, this.pauseDelay);
          return;
        }
      } else {
        this.currentTypingText = currentText.substring(0, this.charIndex - 1);
        this.charIndex--;
        if (this.charIndex === 0) {
          this.isDeleting = false;
          this.typingIndex = (this.typingIndex + 1) % this.typingTexts.length;
        }
      }
      this.typingTimeout = setTimeout(this.typeWriter, this.isDeleting ? 40 : this.typingSpeed);
    },
    openImageModal() {
      this.showImageModal = true;
      document.body.style.overflow = 'hidden';
      this.$nextTick(() => {
        if (this.$refs.closeBtn) this.$refs.closeBtn.focus();
      });
      window.addEventListener('keydown', this.handleModalKey);
    },
    closeImageModal() {
      this.showImageModal = false;
      document.body.style.overflow = '';
      window.removeEventListener('keydown', this.handleModalKey);
    },
    handleModalKey(e) {
      if (e.key === 'Escape') this.closeImageModal();
    }
  }
};
</script>

<style scoped>
@import '../featured-work-effects.css';
.home-mobile-wrapper {
  width: 100vw;
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  background: linear-gradient(120deg, #232526 0%, #414345 100%);
  /* Elegant dark-to-light gradient for a more professional look */
  display: flex;
  flex-direction: column;
}
.home-section {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(120deg, #232526 0%, #414345 100%);
  padding: 0 2vw;
}
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3vw;
  flex-wrap: wrap;
  margin-top: 2rem;
}
.hero-text {
  flex: 1 1 350px;
  color: #fff;
}
.main-title {
  font-size: 2.7rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.1;
}
.highlight {
  color: #ff6f61;
}
.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #ffb88c;
}
.explore-btn {
  padding: 0.8rem 2.2rem;
  font-size: 1.1rem;
  background: linear-gradient(90deg, #ff6f61, #ffb88c);
  color: #fff;
  border: none;
  border-radius: 30px;
  box-shadow: 0 4px 24px rgba(255,111,97,0.2);
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 1px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.explore-btn:hover {
  transform: scale(1.07);
  box-shadow: 0 8px 32px rgba(255,111,97,0.3);
}
.hero-img {
  flex: 1 1 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-img img {
  width: 100%;
  max-width: 350px;
  border-radius: 2rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  transition: transform 0.28s cubic-bezier(.4,0,.2,1), box-shadow 0.28s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 4px 32px 0 rgba(255,184,140,0.12), 0 2px 8px 0 rgba(0,0,0,0.18);
  border-radius: 18px;
}
.hero-img img:hover {
  transform: scale(1.055) rotate(-1deg);
  box-shadow: 0 8px 48px 0 #ffb88c55, 0 0 0 4px #fff7, 0 2px 16px 0 #ff6f6155;
  filter: brightness(1.08) saturate(1.1);
  cursor: pointer;
}
.scroll-down {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  color: #ffb88c;
  font-size: 1rem;
  animation: bounce 2s infinite;
  cursor: pointer;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}
.featured-work-section {
  background: #232526;
  padding: 4rem 0 2.5rem 0;
  text-align: center;
}
.section-title {
  font-size: 2.1rem;
  font-weight: 800;
  color: #ffb88c;
  margin-bottom: 2.2rem;
  letter-spacing: 1.5px;
}
.work-cards {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  flex-wrap: wrap;
}
.work-card {
  background: linear-gradient(120deg, #232526 60%, #ffb88c11 100%);
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px #ffb88c22;
  overflow: hidden;
  width: 320px;
  max-width: 90vw;
  transition: transform 0.22s, box-shadow 0.22s;
  cursor: pointer;
  position: relative;
  margin-bottom: 1.5rem;
  animation: fadeInUp 1s both;
  animation-delay: var(--delay, 0s);
}
.work-card:hover {
  transform: translateY(-8px) scale(1.04) rotate(-1deg);
  box-shadow: 0 8px 32px #ffb88c55;
}
.work-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
}
.work-info {
  padding: 1.2rem 1.1rem 1.5rem 1.1rem;
  color: #fff;
}
.work-info h3 {
  font-size: 1.18rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #ffb88c;
}
.work-info p {
  font-size: 1rem;
  color: #fff;
  opacity: 0.88;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: none; }
}
.why-choose-section {
  background: #181c20;
  padding: 4rem 0 2.5rem 0;
  text-align: center;
}
.why-cards {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  flex-wrap: wrap;
}
.why-card {
  background: linear-gradient(120deg, #232526 60%, #ffb88c11 100%);
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px #ffb88c22;
  width: 260px;
  max-width: 90vw;
  padding: 2.2rem 1.2rem 1.5rem 1.2rem;
  margin-bottom: 1.5rem;
  color: #fff;
  transition: transform 0.22s, box-shadow 0.22s;
  cursor: pointer;
  animation: fadeInUp 1s both;
}
.why-card:hover {
  transform: translateY(-6px) scale(1.03) rotate(-1deg);
  box-shadow: 0 8px 32px #ffb88c55;
}
.why-icon {
  margin-bottom: 1.1rem;
}
.why-card h4 {
  font-size: 1.13rem;
  font-weight: 700;
  color: #ffb88c;
  margin-bottom: 0.5rem;
}
.why-card p {
  font-size: 1rem;
  color: #fff;
  opacity: 0.88;
}
.testimonials-section {
  padding: 60px 0 40px 0;
  position: relative;
  color: #fff;
  min-height: 340px;
  margin-top: 2rem;
}
.testimonials-overlay {
  position: absolute;
  inset: 0;
  background: rgba(34, 34, 34, 0.7);
  z-index: 1;
  border-radius: 18px;
}
.testimonials-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  position: relative;
  z-index: 2;
}
.testimonial-card {
  background: rgba(255,255,255,0.10);
  border-radius: 14px;
  padding: 1.5rem 2rem;
  max-width: 340px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.10);
  margin: 1rem 0;
  color: #fff;
  font-size: 1.1rem;
  font-style: italic;
  border: 1.5px solid #ffb88c44;
  transition: transform 0.2s;
}
.testimonial-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 8px 32px 0 #ffb88c33;
}
.testimonial-name {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
  color: #ffb88c;
  font-size: 1rem;
  font-style: normal;
}
.testimonial-text, .testimonial-author {
  color: #fff !important;
  text-shadow: 0 4px 16px rgba(0,0,0,0.95), 0 1px 2px #000, 0 0 2px #222;
  font-weight: 600;
  letter-spacing: 0.5px;
  /* Optional: add a subtle outline for extra clarity */
  -webkit-text-stroke: 0.5px #222;
}

/* If you have a testimonial container, you can also add a semi-transparent background for extra contrast */
.testimonial-container {
  background: rgba(10, 10, 10, 0.65);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.45);
  border: 1.5px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(2px);
}
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.7rem;
  margin-top: 1.2rem;
}
.carousel-dots span {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ffb88c55;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.carousel-dots span.active {
  background: #ff6f61;
  transform: scale(1.2);
}
.typing-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  font-size: 1.6rem;
  color: #ffb98a;
  margin-bottom: 1.5rem;
}
.typing-text {
  letter-spacing: 0.5px;
}
.typing-cursor {
  display: inline-block;
  width: 1ch;
  color: #ffb98a;
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.float-back-btn {
  position: fixed;
  top: 2vh;
  left: 2vw;
  z-index: 2000;
}
.back-btn {
  background: #181818ee;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 12px #ffb88c44;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.18s;
}
.back-btn:hover {
  background: #ffb300;
  box-shadow: 0 4px 24px #ffb300aa;
  transform: translateY(-2px) scale(1.08);
}
.testimonials-heading {
  position: relative;
  z-index: 3;
  color: #fff;
  text-shadow: 0 2px 8px #222, 0 0 2px #000;
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  letter-spacing: 2px;
  text-align: center;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(120deg, rgba(30,30,30,0.85) 60%, rgba(60,60,60,0.7)), rgba(30, 30, 30, 0.7);
  backdrop-filter: blur(14px) saturate(1.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: modalFadeIn 0.35s cubic-bezier(.4,0,.2,1);
}
@keyframes modalFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.modal-close-btn {
  position: absolute;
  top: 32px;
  right: 38px;
  background: rgba(30,30,30,0.7);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10001;
  transition: background 0.2s;
  box-shadow: 0 2px 12px rgba(0,0,0,0.25);
}
.modal-close-btn:hover {
  background: rgba(255,111,97,0.85);
}
.modal-image {
  max-width: 92vw;
  max-height: 82vh;
  border-radius: 22px;
  box-shadow: 0 12px 48px 0 rgba(0,0,0,0.55), 0 0 0 4px #fff7, 0 0 32px 0 #ffb88c55;
  border: 2.5px solid #fff;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s;
  background: #222;
}
.modal-image:hover {
  transform: scale(1.035);
  box-shadow: 0 16px 64px 0 #ffb88c99, 0 0 0 4px #fff7;
}
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.35s cubic-bezier(.4,0,.2,1);
}
.modal-fade-enter, .modal-fade-leave-to {
  opacity: 0;
}
.modal-img-zoom-enter-active, .modal-img-zoom-leave-active {
  transition: transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.35s cubic-bezier(.4,0,.2,1);
}
.modal-img-zoom-enter, .modal-img-zoom-leave-to {
  transform: scale(0.92);
  opacity: 0;
}
@media (max-width: 900px) {
  .home-mobile-wrapper {
    min-height: 100vh;
    overflow-y: auto;
    padding-bottom: 2rem;
  }
  .hero {
    flex-direction: column-reverse;
    gap: 2rem;
    text-align: center;
  }
  .hero-img img {
    max-width: 220px;
    border-radius: 1.1rem;
  }
  .main-title {
    font-size: 1.25rem;
    margin-bottom: 0.7rem;
  }
  .subtitle {
    font-size: 1rem;
    margin-bottom: 1.1rem;
  }
  .explore-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.98rem;
    border-radius: 20px;
  }
  .scroll-down {
    margin-top: 1.2rem;
    font-size: 0.93rem;
  }
  .featured-work-section, .why-choose-section, .testimonials-section {
    padding: 1.2rem 0 0.5rem 0;
  }
  .section-title {
    font-size: 1.08rem;
    margin-bottom: 0.7rem;
  }
  .work-cards, .why-cards {
    flex-direction: column;
    gap: 0.7rem;
    align-items: center;
  }
  .work-card, .why-card {
    width: 97vw;
    max-width: 99vw;
    min-width: 0;
    margin-bottom: 0.5rem;
    padding: 0.7rem 0.5rem 0.9rem 0.5rem;
    border-radius: 0.8rem;
  }
  .work-card img {
    height: 90px;
    border-top-left-radius: 0.8rem;
    border-top-right-radius: 0.8rem;
  }
  .work-info h3, .why-card h4 {
    font-size: 0.98rem;
    margin-bottom: 0.3rem;
  }
  .work-info p, .why-card p {
    font-size: 0.89rem;
  }
  .why-icon svg {
    width: 22px !important;
    height: 22px !important;
  }
  .testimonial-carousel {
    max-width: 99vw;
    padding: 0 0.1rem;
  }
  .testimonial {
    padding: 0.7rem 0.5rem 0.7rem 0.5rem;
    min-height: 80px;
    border-radius: 0.8rem;
  }
  .testimonial-text {
    font-size: 0.93rem;
    margin-bottom: 0.5rem;
  }
  .testimonial-name {
    font-size: 0.93rem;
  }
  .carousel-dots span {
    width: 7px;
    height: 7px;
  }
  .typing-headline {
    font-size: 1.3rem;
    min-height: 2.1rem;
  }
  .typing-cursor {
    font-size: 1.3rem;
  }
}
</style>
