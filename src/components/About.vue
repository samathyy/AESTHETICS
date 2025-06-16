<template>
  <div>
    <div class="about-typing">
      <span class="typing-text"></span>
      <span class="typing-cursor">|</span>
    </div>
    <section class="about-section">
      <div class="about-content">
        <div class="about-text">
          <div class="about-main-intro">
            <h1 class="about-main-title">AESTHETICS</h1>
            <p class="about-main-desc">
              AESTHETICS is a creative graphic design company dedicated to transforming your vision into stunning visuals. Our team of passionate designers delivers unique, professional, and interactive solutions for brands and businesses worldwide.
            </p>
          </div>
          <p class="about-belief">
            We believe in the power of design to inspire, engage, and elevate. From brand identity to digital graphics, we blend creativity with strategy to help you stand out in a crowded market.
          </p>
          <!-- What We Offer block -->
          <div class="about-services-block">
            <h3 class="about-services-title">What We Offer</h3>
            <p class="about-services-desc">Our expertise covers a wide range of creative solutions, including:</p>
            <ul class="about-services-list">
              <li>Brand Consulting & Strategy</li>
              <li>Visual Identity Systems</li>
              <li>Packaging & Product Design</li>
              <li>Corporate Profile Creation</li>
              <li>Marketing & Promotional Materials</li>
              <li>Website Design & Digital Management</li>
              <li>Environmental & Space Branding</li>
            </ul>
            <p class="about-services-cta">Discover how we can elevate your brand experience.</p>
            <router-link to="/services" class="about-services-btn">Explore Our Services</router-link>
          </div>
          <!-- Recreated Problem Section -->
          <div class="problem-section">
            <h2 class="problem-title">What Problem Are We Solving?</h2>
            <div class="problem-paragraphs">
              <p>Many brands and businesses struggle to communicate their value and vision in a way that truly resonates. The result? Missed opportunities and a message that gets lost in the noise.</p>
              <p>At <span class="highlight">Aesthetics</span>, we bridge this gap by crafting visually compelling stories and experiences. Our creative solutions help you connect, engage, and inspire your audience—making your brand unforgettable.</p>
              <p>We are driven by a passion to elevate your business perception, ensuring every design and interaction leaves a lasting impression.</p>
            </div>
          </div>
          <!-- Why Choose Us Section -->
          <section class="why-choose-section">
            <h2 class="why-choose-title">Why Choose Us?</h2>
            <div class="why-choose-list">
              <div class="why-choose-item">
                <h3>We Create Compelling Experience</h3>
                <p>We pride in our ability to help you answer the big question of your audience which is; “Why should I buy from you?”. We create compelling designs and contents that answer your big question with ease.</p>
              </div>
              <div class="why-choose-item">
                <h3>We Value Your Comfort & Time</h3>
                <p>Our virtual and physical presence makes for your comfort, we are always available to take your orders and also deliver in time whether virtually or physically to save you time to focus on other aspects of your business and organization. We have that value for time and comfort.</p>
              </div>
              <!-- Add more items here if needed -->
            </div>
          </section>
          <!-- FAQ Section -->
          <section class="faq-section">
            <h2 class="faq-title">Frequently Asked Questions</h2>
            <div class="faq-list">
              <div v-for="(faq, idx) in showAllFaqs ? faqs : faqs.slice(0, 2)" :key="idx" class="faq-item" :class="{ 'highlight-faq': faq.highlight }">
                <h3 class="faq-question" @click="toggleFaq(idx)" style="cursor:pointer;">
                  <span v-if="faq.icon" class="faq-icon">{{ faq.icon }}</span>{{ faq.question }}
                  <span style="margin-left:auto; font-size:1.2rem;">{{ openFaq === idx ? '▲' : '▼' }}</span>
                </h3>
                <transition name="faq-fade">
                  <p v-if="openFaq === idx" class="faq-answer">{{ faq.answer }}</p>
                </transition>
              </div>
            </div>
            <button v-if="faqs.length > 2" class="see-more-btn" @click="showAllFaqs = !showAllFaqs" title="Toggle FAQ visibility">
              {{ showAllFaqs ? 'See Less' : 'See More' }}
            </button>
          </section>
        </div>
      </div>
    </section>
    <MainFooter />
  </div>
</template>

<script>
import MainFooter from './MainFooter.vue';
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRouter } from 'vue-router';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'About',
  components: { MainFooter },
  setup() {
    const problemSection = ref(null);
    const router = useRouter();
    const showFloatBtn = ref(false);
    const handleScroll = () => {
      showFloatBtn.value = window.scrollY > 200;
    };
    const goBack = () => {
      router.back();
    };
    const faqs = [
      { question: 'What services does AESTHETICS offer?', answer: 'We offer brand consulting, visual identity, packaging, corporate profiles, marketing materials, website design, and environmental branding.' },
      { question: 'How do I start a project with AESTHETICS?', answer: 'Simply contact us through our website or email, and our team will guide you through the process from consultation to delivery.' },
      { question: 'Do you work with clients outside Nigeria?', answer: 'Yes, we work with clients worldwide and can collaborate virtually to deliver your project wherever you are.' },
      { question: 'How long does a typical project take?', answer: 'Project timelines vary based on scope, but we always strive to deliver on time and keep you updated throughout the process.' },
      { question: 'Can you help rebrand my existing business?', answer: 'Absolutely! We specialize in both new brand creation and rebranding for businesses looking to refresh their image.' },
      { question: 'Why choose AESTHETICS over others?', answer: 'We blend creativity, strategy, and a deep understanding of the Nigerian and global market to deliver results that truly stand out. Our team is passionate, responsive, and dedicated to your success.', icon: '🌟', highlight: true },
      { question: 'Can I get a free consultation?', answer: 'Yes! We offer a free initial consultation to understand your needs and recommend the best solutions for your brand.', icon: '💬' },
      { question: 'Is my information safe with you?', answer: 'Your privacy is our priority. All client information and project details are kept strictly confidential.', icon: '🔒' },
    ];
    const openFaq = ref(null);
    const showAllFaqs = ref(false);
    function toggleFaq(idx) {
      openFaq.value = openFaq.value === idx ? null : idx;
    }
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      // Typing effect for services
      const services = [
        'Consultation',
        'Visual Identity',
        'Product Package Design',
        'Company Profile',
        'Marketing & Brand Collateral',
        'Web Design & Management',
        'Environmental Branding'
      ];
      const typingText = document.querySelector('.typing-text');
      const cursor = document.querySelector('.typing-cursor');
      let serviceIndex = 0;
      let charIndex = 0;
      let typing = true;

      function typeService() {
        if (!typingText) return;
        if (typing) {
          if (charIndex < services[serviceIndex].length) {
            typingText.textContent += services[serviceIndex][charIndex];
            charIndex++;
            setTimeout(typeService, 90);
          } else {
            typing = false;
            setTimeout(typeService, 1200);
          }
        } else {
          if (charIndex > 0) {
            typingText.textContent = services[serviceIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeService, 40);
          } else {
            typing = true;
            serviceIndex = (serviceIndex + 1) % services.length;
            setTimeout(typeService, 400);
          }
        }
      }
      typeService();

      gsap.from('.about-img img', { x: -60, opacity: 0, duration: 1, ease: 'power2.out' });
      gsap.from('.about-text', { x: 60, opacity: 0, duration: 1, delay: 0.3, ease: 'power2.out' });
      // Parallax effect for about image on scroll
      gsap.to('.about-img img', {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
      // Animate problem section on scroll
      gsap.from('.problem-title', {
        scrollTrigger: {
          trigger: problemSection.value,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      });
      gsap.from('.problem-paragraphs p', {
        scrollTrigger: {
          trigger: problemSection.value,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: 'power2.out',
      });
    });
    return { problemSection, showFloatBtn, goBack, faqs, openFaq, toggleFaq, showAllFaqs };
  },
};
</script>

<style scoped>
.about-typing {
  width: 100%;
  max-width: 900px;
  margin: 0 auto 2.5rem auto;
  text-align: center;
  font-size: 4rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: -1px;
  min-height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.typing-text {
  color: #fff;
  font-family: inherit;
  font-size: 4rem;
  font-weight: 900;
  transition: color 0.2s;
}
.typing-cursor {
  color: #ff6f61;
  font-weight: 900;
  font-size: 4rem;
  margin-left: 0.2rem;
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.about-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
}
.about-text {
  flex: none;
  color: #fff;
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.about-main-intro {
  margin: 0 auto 2.5rem auto;
  max-width: 700px;
  text-align: center;
  background: linear-gradient(120deg, #232526 0%, #414345 100%);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 2.5rem 2rem 2.5rem 2rem;
  position: relative;
  z-index: 2;
}
.about-main-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: #ff6f61;
  letter-spacing: 0.1em;
  margin-bottom: 1.2rem;
  text-shadow: 0 4px 24px rgba(230,0,45,0.18);
}
.about-main-desc {
  font-size: 1.45rem;
  color: #ffb88c;
  font-weight: 500;
  margin-bottom: 0;
  line-height: 1.6;
  text-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.about-text .about-belief {
  color: #fff !important;
  font-size: 1rem;
  text-align: center;
  margin: 1.5rem 0;
}
@media (max-width: 600px) {
  .about-text .about-belief {
    font-size: 0.88rem;
  }
}
.about-text h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.highlight {
  color: #ff6f61;
}
.about-text p {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #ffb88c;
}
.about-services-block {
  background: rgba(255,255,255,0.07);
  border-radius: 1.2rem;
  margin-top: 2.5rem;
  padding: 2.8rem 2.5rem 3.2rem 2.5rem; /* increased padding */
  box-shadow: 0 4px 24px rgba(230,0,45,0.08);
  color: #fff;
  max-width: 700px; /* increased from 500px */
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.about-services-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
  color: #ff6f61;
}
.about-services-desc {
  font-size: 1.15rem;
  margin-bottom: 1.1rem;
  color: #ffb88c;
}
.about-services-list {
  margin: 0 0 1.2rem 0;
  padding-left: 1.2rem;
  color: #fff;
  font-size: 1.1rem;
}
.about-services-list li {
  margin-bottom: 0.4rem;
  list-style: disc;
}
.about-services-cta {
  margin: 1.2rem 0 1.5rem 0;
  color: #ffb88c;
  font-size: 1.1rem;
}
.about-services-btn {
  display: inline-block;
  background: #e6002d;
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
  border: none;
  border-radius: 2.5rem;
  padding: 0.8rem 2.2rem;
  box-shadow: 0 4px 24px rgba(230,0,45,0.18);
  text-decoration: none;
  transition: background 0.18s, box-shadow 0.18s;
}
.about-services-btn:hover {
  background: #ff6f61;
  box-shadow: 0 8px 32px rgba(230,0,45,0.23);
}
.problem-section {
  background: rgba(35, 41, 73, 0.97);
  color: #fff;
  padding: 2.8rem 2.5rem 3.2rem 2.5rem; /* increased padding */
  margin-top: 2.5rem;
  border-radius: 1.2rem;
  box-shadow: 0 4px 24px rgba(230,0,45,0.08);
  max-width: 700px; /* increased from 500px */
  margin-left: auto;
  margin-right: auto;
  display: block;
  z-index: 2;
  position: relative;
}
.problem-title, .problem-paragraphs p {
  color: #fff !important;
}
.problem-title {
  font-size: 2.2rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2.2rem;
  color: #fff;
  letter-spacing: -1px;
}
.problem-paragraphs {
  max-width: 600px;
  margin: 0 auto;
}
.problem-paragraphs p {
  font-size: 1.15rem;
  color: #ffb88c;
  margin-bottom: 2.2rem;
  text-align: center;
  line-height: 1.5;
}
.problem-paragraphs .highlight {
  color: #e6002d;
  font-weight: bold;
}
.why-choose-section {
  background: rgba(255,255,255,0.07);
  color: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 4px 24px rgba(230,0,45,0.08);
  max-width: 700px; /* increased from 500px */
  margin: 2.5rem auto 0 auto;
  padding: 2.8rem 2.5rem 3.2rem 2.5rem; /* increased padding */
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.why-choose-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2.2rem;
  color: #ff6f61;
  letter-spacing: -1px;
}
.why-choose-list {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
}
.why-choose-item {
  max-width: 100%;
  background: transparent;
  border-radius: 1rem;
  box-shadow: none;
  padding: 0;
  text-align: left;
}
.why-choose-item h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
  color: #fff;
}
.why-choose-item p {
  font-size: 1.1rem;
  color: #ffb88c;
}
.faq-section {
  background: linear-gradient(90deg, #181c20 80%, #ffb88c11 100%);
  border-radius: 1.5rem;
  box-shadow: 0 4px 32px 0 rgba(255,111,97,0.08), 0 1.5px 0 #ffb88c22;
  padding: 2.5rem 1.5rem 2.5rem 1.5rem;
  margin: 3rem 0 2rem 0;
  animation: fadeInFaq 1.2s cubic-bezier(.68,-0.55,.27,1.55);
}
@keyframes fadeInFaq {
  from { opacity: 0; transform: translateY(60px) scale(0.95); }
  to { opacity: 1; transform: none; }
}
.faq-title {
  color: #ffb88c;
  font-size: 2.2rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 2.2rem;
  letter-spacing: 2px;
  text-shadow: 0 2px 12px #ffb88c44;
}
.faq-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.7rem;
  max-width: 800px;
  margin: 0 auto;
  justify-content: center;
}
.faq-item {
  background: #232526;
  border-radius: 1rem;
  box-shadow: 0 2px 12px #ffb88c22;
  padding: 1.5rem 1.7rem;
  transition: box-shadow 0.2s, transform 0.2s;
  border-left: 5px solid #ffb88c;
  position: relative;
  animation: faqPop 0.8s cubic-bezier(.68,-0.55,.27,1.55);
  flex: 1 1 340px;
  min-width: 300px;
  max-width: 370px;
  margin: 0;
}
@keyframes faqPop {
  from { opacity: 0; transform: translateY(40px) scale(0.97); }
  to { opacity: 1; transform: none; }
}
.faq-item.highlight-faq {
  border-left: 5px solid #ff6f61;
  background: linear-gradient(90deg, #ffb88c22 0%, #ff6f6111 100%);
  box-shadow: 0 4px 24px #ff6f6133;
}
.faq-question {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
}
.faq-fade-enter-active, .faq-fade-leave-active {
  transition: max-height 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s cubic-bezier(.4,0,.2,1);
}
.faq-fade-enter-from, .faq-fade-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
.faq-fade-enter-to, .faq-fade-leave-from {
  max-height: 200px;
  opacity: 1;
  overflow: hidden;
}
.faq-icon {
  font-size: 1.5rem;
  margin-right: 0.3rem;
}
.faq-answer {
  color: #fff;
  font-size: 1.08rem;
  line-height: 1.7;
  margin: 0;
}
.see-more-btn {
  display: block;
  margin: 1.5rem auto 0 auto;
  padding: 0.7rem 2.2rem;
  background: #ff6f61;
  color: #fff;
  border: none;
  border-radius: 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}
.see-more-btn:hover {
  background: #e65c50;
}
@media (max-width: 900px) {
  .about-content {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
  .about-img img {
    max-width: 220px;
  }
  .about-main-intro {
    padding: 1.2rem 0.7rem;
  }
  .about-main-title {
    font-size: 2.1rem;
  }
  .about-main-desc {
    font-size: 1.05rem;
  }
  .about-text h2 {
    font-size: 1.4rem;
  }
  .problem-title {
    font-size: 1.4rem;
  }
  .problem-section {
    padding: 2rem 0.5rem;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .problem-paragraphs p {
    font-size: 1rem;
  }
  .why-choose-section {
    padding: 1.5rem 0.5rem;
    max-width: 100%;
  }
  .why-choose-title {
    font-size: 1.5rem;
  }
  .why-choose-item {
    padding: 0;
    max-width: 100%;
  }
  .faq-section {
    padding: 1.5rem 0.5rem;
    max-width: 100%;
  }
  .faq-title {
    font-size: 1.5rem;
  }
  .faq-item {
    padding: 1rem;
    width: 100%;
  }
  .about-main-intro,
  .about-services-block,
  .problem-section,
  .why-choose-section {
    max-width: 92vw; /* smaller on mobile */
    padding: 0.7rem 0.3rem !important;
    font-size: 0.97rem;
  }
  .faq-item {
    max-width: 96vw;
    min-width: unset;
    padding: 0.5rem 0.3rem;
    font-size: 0.97rem;
  }
  .see-more-btn {
    width: 90%;
    font-size: 1rem;
    padding: 0.7rem 0;
  }
}
@media (max-width: 600px) {
  .about-typing {
    font-size: 2rem;
    min-height: 2.5rem;
  }
  .typing-text,
  .typing-cursor {
    font-size: 2rem;
  }
}
</style>
