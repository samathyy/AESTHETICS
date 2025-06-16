<template>
  <section class="services-section">
    <h2 class="section-title">
      <span class="typing-services-title">
        <span ref="typedServiceTitle"></span><span class="typing-cursor">|</span>
      </span>
    </h2>
    <div class="services-intro">
      <div class="intro-bar"></div>
      <h2 class="intro-title">Branding</h2>
      <p class="intro-desc intro-highlight">
        Branding is the heart of our services. It is about sending a message to your customers about what you represent, creating an impression, and ultimately giving them a perception of your uniqueness, values, vision, and ultimately; expectations.
      </p>
      <p class="intro-desc">
        We build brands that send the right message in a strong, more positive, and connecting manner, creating that aura of uniqueness and absolute excellence that facilitates easy bonding between you and your audience.
      </p>
      <div class="services-nav-list">
        <ul>
          <li v-for="(service, i) in services" :key="service.title">
            <a :href="'#service-' + i" class="services-nav-link">{{ service.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="services-list-vertical">
      <div class="service-row animated-service" v-for="(service, i) in services" :key="service.title" :id="'service-' + i" :class="{ 'reverse': i % 2 === 1 }">
        <div class="service-image-block">
          <img v-if="service.img" :src="service.img" :alt="service.title" class="service-img-large" loading="lazy" />
        </div>
        <div class="service-info-block">
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-desc service-detail-desc">{{ service.detailDesc }}</p>
          <button class="learn-more-btn" @click="openLearnMore(i)" title="Learn more about {{ service.title }}">Learn More</button>
          <button v-if="service.link" class="get-started-btn" @click="openGetStarted(service)" title="Get started with {{ service.title }}">Get Started</button>
        </div>
      </div>
    </div>
    <div v-if="showLearnMore" class="learn-more-modal">
      <div class="learn-more-content">
        <button class="close-btn" @click="closeLearnMore" title="Close">&times;</button>
        <h2>{{ services[activeService].title }} - More Details</h2>
        <p>{{ getLongerDescription(services[activeService]) }}</p>
      </div>
    </div>
    <div v-if="showGetStarted" class="get-started-modal">
      <div class="get-started-content">
        <button class="close-btn" @click="closeGetStarted" title="Close">&times;</button>
        <h2 style="color:#ffb300;">Start a Project</h2>
        <div class="step-indicator">
          <span>Step {{ formStep }} of 3</span>
          <div class="step-bar">
            <div class="step-bar-fill" :style="{ width: stepProgress + '%' }"></div>
          </div>
        </div>
        <form action="https://formspree.io/f/xzzggvgz" method="POST" @submit.prevent="handleNext">
          <div v-if="formStep === 1">
            <label>Name</label>
            <input type="text" v-model="formData.name" name="name" placeholder="Enter your name" required />
          </div>
          <div v-else-if="formStep === 2">
            <p>Which of these services will you be needing?</p>
            <div v-for="(service, idx) in services" :key="service.title" class="service-checkbox-row">
              <input type="checkbox" :id="'service-' + idx" :value="service.title" v-model="formData.selectedServices" name="selectedServices" />
              <label :for="'service-' + idx">{{ service.title }}</label>
            </div>
          </div>
          <div v-else-if="formStep === 3">
            <p>How will you prefer to be contacted?</p>
            <div class="contact-method-row">
              <input type="radio" id="contact-email" value="Email" v-model="formData.contactMethod" name="contactMethod" />
              <label for="contact-email" class="contact-label">Email</label>
              <input type="radio" id="contact-call" value="Call" v-model="formData.contactMethod" name="contactMethod" />
              <label for="contact-call" class="contact-label">Call</label>
              <input type="radio" id="contact-whatsapp" value="WhatsApp" v-model="formData.contactMethod" name="contactMethod" />
              <label for="contact-whatsapp" class="contact-label">WhatsApp</label>
            </div>
            <div v-if="formData.contactMethod === 'Call'">
              <label>Phone Number</label>
              <input type="tel" v-model="formData.phoneNumber" name="phoneNumber" placeholder="Enter your phone number" required />
            </div>
            <div v-else-if="formData.contactMethod === 'WhatsApp'">
              <label>WhatsApp Number</label>
              <input type="tel" v-model="formData.whatsappNumber" name="whatsappNumber" placeholder="Enter your WhatsApp number" required />
            </div>
            <div v-else-if="formData.contactMethod === 'Email'">
              <label>Email</label>
              <input type="email" :value="formData.email" name="email" readonly />
            </div>
          </div>
          <div class="form-navigation">
            <button v-if="formStep > 1 && formStep <= 3" type="button" class="get-started-btn prev-btn" @click="handlePrev" title="Previous step">Previous</button>
            <button v-if="formStep === 3" type="submit" class="get-started-btn next-btn" title="Submit form">Submit</button>
            <button v-else type="submit" class="get-started-btn next-btn" title="Next step">Next</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="showConfirmation" class="confirmation-banner animated">
      <div class="confirmation-icon">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle class="circle" cx="40" cy="40" r="36" />
          <polyline class="check" points="24,44 36,56 56,28" />
        </svg>
      </div>
      <div class="confirmation-text">
        <h3>Form is successfully submitted.</h3>
        <p>We will contact you asap. Thank you.</p>
      </div>
    </div>
    <section class="connect-section">
      <div class="connect-overlay">
        <div class="connect-content">
          <div class="connect-bar"></div>
          <h2 class="connect-title">Connect</h2>
          <p class="connect-desc">
            Creating compelling branding solutions is what we love doing. Influencing the growth of your business with compelling branding is our delight. Let’s connect and make a positive impact.
          </p>
          <router-link to="/contact" class="connect-btn">Contact Us</router-link>
        </div>
      </div>
    </section>
    <MainFooter />
  </section>
</template>

<script>
import MainFooter from './MainFooter.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
export default {
  name: 'Services',
  components: { MainFooter },
  data() {
    // Helper to resolve local images for Vite
    const localImage = (path) => new URL(path, import.meta.url).href;
    return {
      services: [
        {
          title: 'Consultation',
          desc: 'Expert advice for your brand’s growth and sustainability.',
          img: localImage('../assets/images/afro-american-man-suit-holding-documents-talking-female-boss.jpg'),
          detailDesc: 'With our years of experience and wealth of knowledge in branding, we are confident with the quality of results our clients have generated so far from our guide. We guide, and consult for companies, organisations and individuals on the best branding approach and strategies to adopt to influence the growth, reputation and sustainability of their enterprise.',
          link: '#contact',
        },
        {
          title: 'Visual Identity',
          desc: 'Crafting unique logos, color palettes, and brand visuals.',
          img: localImage('../assets/images/designed-stationery-business-visiting-card.jpg'),
          detailDesc: 'We create memorable visual identities that capture your brand’s essence and make a lasting impression. From logo design to color schemes and typography, we ensure every element reflects your vision and values.',
          link: '#contact',
        },
        {
          title: 'Product Package Design',
          desc: 'Attractive, functional packaging for your products.',
          img: localImage('../assets/images/3514341.jpg'),
          detailDesc: 'Our team designs packaging that not only protects your product but also stands out on the shelf. We blend creativity and practicality to deliver packaging that enhances your brand and attracts customers.',
          link: '#contact',
        },
        {
          title: 'Company Profile',
          desc: 'Professional company profiles that tell your story.',
          img: localImage('../assets/images/9313161.jpg'),
          detailDesc: 'We develop compelling company profiles that communicate your mission, vision, and achievements. Our profiles help you connect with stakeholders and build trust in your brand.',
          link: '#contact',
        },
        {
          title: 'Marketing & Brand Collateral',
          desc: 'Brochures, flyers, and all marketing materials you need.',
          img: localImage('../assets/images/map-lying-wooden-table.jpg'),
          detailDesc: 'From brochures to flyers and digital ads, we design marketing collateral that amplifies your message and drives engagement. Every piece is tailored to your brand and audience.',
          link: '#contact',
        },
        {
          title: 'Web Design & Management',
          desc: 'Modern, responsive websites for your business.',
          img: localImage('../assets/images/ui-ux-representations-with-laptop.jpg'),
          detailDesc: 'We build and manage websites that are visually stunning, user-friendly, and optimized for all devices. Our web solutions help you reach more customers and grow your online presence.',
          link: '#contact',
        },
        {
          title: 'Environmental Branding',
          desc: 'Transforming spaces to reflect your brand identity.',
          img: localImage('../assets/images/6022536.jpg'),
          detailDesc: 'We design branded environments that immerse your audience in your story. From office spaces to retail locations, we create experiences that leave a lasting impact.',
          link: '#contact',
        },
      ],
      showLearnMore: false,
      activeService: 0,
      showGetStarted: false,
      getStartedService: null,
      formStep: 1,
      formData: {
        name: '',
        email: '',
        selectedServices: [],
        contactMethod: '',
        phoneNumber: '',
        whatsappNumber: '',
      },
      showConfirmation: false,
      servicePhrases: [],
      servicePhraseIndex: 0,
      serviceCharIndex: 0,
      serviceTyping: true,
      serviceTypingInterval: null,
      showFloatBtns: false,
    };
  },
  computed: {
    stepProgress() {
      return this.formStep === 1 ? 33 : this.formStep === 2 ? 66 : 100;
    },
  },
  mounted() {
    // Typing effect for services title
    this.servicePhrases = [
      'Our Services'
    ];
    this.servicePhraseIndex = 0;
    this.serviceCharIndex = 0;
    this.serviceTyping = true;
    this.typeServiceTitle();

    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    clearTimeout(this.serviceTypingInterval);
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    openLearnMore(index) {
      this.activeService = index;
      this.showLearnMore = true;
    },
    closeLearnMore() {
      this.showLearnMore = false;
    },
    async handleNext(event) {
      if (this.formStep === 3) {
        // Gather form data
        const data = new FormData();
        data.append('name', this.formData.name);
        data.append('selectedServices', this.formData.selectedServices.join(', '));
        data.append('contactMethod', this.formData.contactMethod);
        if (this.formData.contactMethod === 'Call') {
          data.append('phoneNumber', this.formData.phoneNumber);
        } else if (this.formData.contactMethod === 'WhatsApp') {
          data.append('whatsappNumber', this.formData.whatsappNumber);
        } else if (this.formData.contactMethod === 'Email') {
          data.append('email', this.formData.email);
        }
        try {
          const response = await fetch('https://formspree.io/f/xzzggvgz', {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
          });
          if (response.ok) {
            this.showConfirmation = true;
            setTimeout(() => {
              this.showConfirmation = false;
              this.showGetStarted = false;
            }, 3500);
          } else {
            alert('Submission failed. Please try again.');
          }
        } catch (error) {
          alert('An error occurred. Please check your connection and try again.');
        }
      } else {
        this.formStep++;
      }
    },
    handlePrev() {
      if (this.formStep > 1) this.formStep--;
    },
    openGetStarted(service) {
      this.getStartedService = service;
      this.showGetStarted = true;
      this.formStep = 1;
      this.formData = { name: '', email: '', selectedServices: [] };
    },
    closeGetStarted() {
      this.showGetStarted = false;
    },
    getLongerDescription(service) {
      switch (service.title) {
        case 'Consultation':
          return `Our consultation service is designed to provide you with expert guidance tailored to your brand’s unique needs. We analyze your current brand positioning, identify opportunities for growth, and offer actionable strategies to help you achieve your business goals. Whether you’re a startup or an established company, our team brings years of experience to the table, ensuring you receive the best advice for sustainable success. We’re committed to being your trusted partner every step of the way.`;
        case 'Visual Identity':
          return `Visual identity is more than just a logo—it’s the complete visual language of your brand. We craft distinctive logos, color palettes, typography, and imagery that work together to create a cohesive and memorable brand presence. Our process involves understanding your vision, values, and target audience to ensure every visual element resonates and leaves a lasting impression. Let us help you stand out in a crowded marketplace with a visual identity that truly represents you.`;
        case 'Product Package Design':
          return `Packaging is the first physical touchpoint your customers have with your product. Our product package design service combines creativity and functionality to deliver packaging that not only protects your product but also attracts attention on the shelf. We consider materials, sustainability, usability, and aesthetics to create packaging that enhances your brand and elevates the customer experience. From concept to final design, we ensure your packaging tells your brand’s story.`;
        case 'Company Profile':
          return `A compelling company profile is essential for building trust and credibility with stakeholders. We develop professional profiles that highlight your mission, vision, values, and achievements. Our team works closely with you to capture your unique story and present it in a way that resonates with clients, investors, and partners. With a well-crafted company profile, you’ll be able to communicate your strengths and aspirations effectively, opening doors to new opportunities.`;
        case 'Marketing & Brand Collateral':
          return `Effective marketing collateral is key to spreading your message and engaging your audience. We design brochures, flyers, banners, and digital assets that are visually appealing and aligned with your brand identity. Our approach ensures consistency across all materials, reinforcing your brand at every touchpoint. Whether you need print or digital collateral, we deliver solutions that help you connect with your audience and drive results.`;
        case 'Web Design & Management':
          return `Your website is often the first impression customers have of your business. We create modern, responsive websites that are visually stunning, easy to navigate, and optimized for all devices. Our web design process focuses on user experience, performance, and SEO best practices. Beyond design, we offer ongoing management to keep your site secure, updated, and performing at its best—so you can focus on growing your business.`;
        case 'Environmental Branding':
          return `Environmental branding transforms physical spaces into immersive brand experiences. We design and implement branding elements for offices, retail locations, and event spaces that reflect your identity and values. From wall graphics to signage and interior decor, our solutions create environments that inspire employees, impress clients, and engage visitors. Let us help you turn any space into a powerful extension of your brand.`;
        default:
          return service.detailDesc;
      }
    },
    typeServiceTitle() {
      const el = this.$refs.typedServiceTitle;
      if (!el) return;
      if (this.serviceTyping) {
        if (this.serviceCharIndex < this.servicePhrases[this.servicePhraseIndex].length) {
          el.textContent += this.servicePhrases[this.servicePhraseIndex][this.serviceCharIndex];
          this.serviceCharIndex++;
          this.serviceTypingInterval = setTimeout(this.typeServiceTitle, 90);
        } else {
          this.serviceTyping = false;
          this.serviceTypingInterval = setTimeout(this.typeServiceTitle, 1200);
        }
      } else {
        if (this.serviceCharIndex > 0) {
          el.textContent = this.servicePhrases[this.servicePhraseIndex].substring(0, this.serviceCharIndex - 1);
          this.serviceCharIndex--;
          this.serviceTypingInterval = setTimeout(this.typeServiceTitle, 40);
        } else {
          this.serviceTyping = true;
          this.servicePhraseIndex = (this.servicePhraseIndex + 1) % this.servicePhrases.length;
          this.serviceTypingInterval = setTimeout(this.typeServiceTitle, 400);
        }
      }
    },
    handleScroll() {
      this.showFloatBtns = window.scrollY > 200;
    },
    scrollToTop() {
      // Use window.scrollTo for smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    goBack() {
      // Use router if available, fallback to window.history
      if (this.$router) {
        this.$router.back();
      } else {
        window.history.back();
      }
    },
  },
};
</script>

<style scoped>
.services-section {
  min-height: 80vh;
  padding: 3rem 2vw 2rem 2vw;
  background: #000;
  color: #fff;
}
.services-intro {
  max-width: 700px;
  margin: 0 auto 2.5rem auto;
  text-align: left;
  padding: 0 1rem;
}
.intro-bar {
  height: 6px;
  width: 90px;
  background: linear-gradient(90deg, #ff1744 0 40%, #ffb300 60% 100%);
  border-radius: 3px;
  margin-bottom: 1.2rem;
}
.intro-title {
  font-size: 2.7rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 1.2rem;
  font-family: 'Montserrat', 'Poppins', Arial, sans-serif;
  letter-spacing: -1px;
}
.intro-desc {
  font-size: 1.25rem;
  color: #e0e0e0;
  margin-bottom: 1.1rem;
  line-height: 1.6;
}
.intro-highlight {
  font-family: 'Poppins', 'Montserrat', Arial, sans-serif;
  font-size: 1.35rem;
  color: #fff;
  font-weight: 600;
  background: linear-gradient(90deg, #ff1744 0 40%, #ffb300 60% 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.2rem;
}
.section-title {
  font-size: 3rem;
  font-weight: 800;
  color: #ffb300;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}
.typing-services-title {
  display: inline-block;
  font-size: 3.5rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: -1px;
  min-height: 4.2rem;
  position: relative;
  text-shadow: none;
  background: none;
  -webkit-background-clip: initial;
  -webkit-text-fill-color: initial;
  background-clip: initial;
  filter: none;
  border-radius: 0;
  padding: 0;
}
.typing-cursor {
  color: #ff6f61;
  font-weight: 900;
  font-size: 3.5rem;
  margin-left: 0.1rem;
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.section-title::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -10px;
  left: 0;
  background: linear-gradient(90deg, #ff1744 0 40%, #ffb300 60% 100%);
}
.services-list-vertical {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  align-items: stretch;
}
.service-row {
  display: flex;
  align-items: center;
  gap: 3rem;
  background: #181818;
  border-radius: 2rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 2.5rem 2rem;
  transition: box-shadow 0.3s, background 0.3s;
}
.service-row.reverse {
  flex-direction: row-reverse;
}
.service-image-block {
  flex: 1 1 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.service-img-large {
  width: 350px;
  max-width: 90vw;
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px rgba(255,111,97,0.13);
  object-fit: cover;
  background: #fff;
  transition: transform 0.3s cubic-bezier(.4,2,.6,1);
}
.service-row:hover .service-img-large {
  transform: scale(1.04) rotate(-1deg);
  box-shadow: 0 8px 32px #ffb88c55;
}
.service-info-block {
  flex: 2 1 400px;
  padding: 0 1.5rem;
}
.service-title {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 1.1rem;
}
.service-desc {
  font-size: 1.15rem;
  color: #ffb88c;
  margin-bottom: 1.2rem;
}
.service-detail-desc {
  color: #e0e0e0;
  font-size: 1.18rem;
  margin-bottom: 1.2rem;
  font-family: 'Montserrat', 'Poppins', Arial, sans-serif;
  font-weight: 500;
  line-height: 1.7;
}
.service-details-list {
  margin-bottom: 1.1rem;
  color: #fff;
  opacity: 0.92;
  font-size: 1.05rem;
  padding-left: 1.2rem;
}
.get-started-btn {
  display: inline-block;
  margin-top: 2.5rem;
  padding: 0.9rem 2.5rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(90deg, #ff1744 0%, #ff1744 60%, #ffb300 100%);
  border: none;
  border-radius: 2.5rem;
  box-shadow: 0 0 32px #ff174488;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s, box-shadow 0.3s, transform 0.2s;
}
.get-started-btn:hover {
  background: linear-gradient(90deg, #ffb300 0%, #ff1744 100%);
  box-shadow: 0 0 48px #ff1744cc;
  transform: translateY(-2px) scale(1.04);
}
.services-nav-list {
  margin: 2.2rem 0 2.2rem 0;
  display: flex;
  justify-content: flex-start;
}
.services-nav-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.services-nav-list li {
  margin-bottom: 2.1rem;
  position: relative;
}
.services-nav-link {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  font-family: 'Montserrat', 'Poppins', Arial, sans-serif;
  text-decoration: none;
  padding-left: 2.5rem;
  display: block;
  transition: color 0.2s;
}
.services-nav-link:hover {
  color: #ff1744;
}
.services-nav-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.2rem;
  width: 8px;
  height: 2.1rem;
  background: #ff1744;
  border-radius: 4px;
}
.animated-service {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
  animation: fadeInUp 0.8s cubic-bezier(.4,2,.6,1) forwards;
}
.animated-service:nth-child(1) { animation-delay: 0.1s; }
.animated-service:nth-child(2) { animation-delay: 0.2s; }
.animated-service:nth-child(3) { animation-delay: 0.3s; }
.animated-service:nth-child(4) { animation-delay: 0.4s; }
.animated-service:nth-child(5) { animation-delay: 0.5s; }
.animated-service:nth-child(6) { animation-delay: 0.6s; }
.animated-service:nth-child(7) { animation-delay: 0.7s; }
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@media (max-width: 900px) {
  .services-intro {
    padding: 0 0.5rem;
    text-align: left;
  }
  .intro-title {
    font-size: 2rem;
  }
  .intro-desc {
    font-size: 1.05rem;
  }
  .intro-highlight {
    font-size: 1.1rem;
  }
  .intro-bar {
    width: 60px;
    height: 4px;
  }
  .services-list-vertical {
    gap: 2rem;
  }
  .service-row, .service-row.reverse {
    flex-direction: column !important;
    padding: 1.2rem 0.5rem;
    gap: 1.2rem;
  }
  .service-img-large {
    width: 95vw;
    max-width: 99vw;
    border-radius: 1rem;
  }
  .service-info-block {
    padding: 0 0.2rem;
  }
  .service-title {
    font-size: 1.3rem;
  }
  .service-desc {
    font-size: 1rem;
  }
  .service-detail-desc {
    font-size: 1rem;
  }
  .get-started-btn {
    font-size: 1rem;
    padding: 0.7rem 1.5rem;
    margin-top: 1.2rem;
  }
  .services-nav-link {
    font-size: 1.1rem;
    padding-left: 1.1rem;
  }
  .services-nav-list {
    margin: 1.2rem 0 1.2rem 0;
  }
  .services-nav-list li::before {
    width: 4px;
    height: 1.1rem;
  }
}
@media (min-width: 901px) {
  .service-row {
    min-height: 420px;
    padding: 3.5rem 3rem;
    gap: 4rem;
  }
  .service-img-large {
    width: 420px;
    max-width: 100%;
    border-radius: 2rem;
  }
  .service-info-block {
    padding: 0 2.5rem;
  }
  .service-title {
    font-size: 2.5rem;
  }
  .service-detail-desc {
    font-size: 1.25rem;
  }
  .animated-service {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }
}
.learn-more-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.learn-more-content {
  background: #181818;
  color: #fff;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 1.5rem;
  max-width: 540px;
  width: 90vw;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  position: relative;
  text-align: left;
}
.close-btn {
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 2.2rem;
  cursor: pointer;
  font-weight: bold;
  z-index: 10;
  transition: color 0.2s;
}
.close-btn:hover {
  color: #ff1744;
}
.learn-more-btn {
  display: inline-block;
  margin-top: 1.2rem;
  margin-right: 1.2rem;
  padding: 0.7rem 2.1rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(90deg, #ffb300 0%, #ff1744 100%);
  border: none;
  border-radius: 2.5rem;
  box-shadow: 0 0 24px #ff174488;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s, box-shadow 0.3s, transform 0.2s;
}
.learn-more-btn:hover {
  background: linear-gradient(90deg, #ff1744 0%, #ffb300 100%);
  box-shadow: 0 0 32px #ffb300cc;
  transform: translateY(-2px) scale(1.04);
}
.get-started-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(8px) saturate(180%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeInGlass 0.4s cubic-bezier(.4,2,.6,1);
}
@keyframes fadeInGlass {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
.get-started-content {
  background: rgba(255, 255, 255, 0.18);
  color: #f7f7fa;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 1.5rem;
  max-width: 540px;
  width: 90vw;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 1.5px 8px 0 rgba(255, 183, 0, 0.13), 0 0 0 4px rgba(255,255,255,0.08);
  border: 1.5px solid rgba(255,255,255,0.35);
  position: relative;
  overflow: hidden;
  animation: glassPop 0.5s cubic-bezier(.4,2,.6,1);
  transition: box-shadow 0.4s, border 0.4s, transform 0.3s;
}
.get-started-content:hover {
  box-shadow: 0 12px 48px 0 rgba(255, 183, 0, 0.18), 0 2.5px 16px 0 rgba(255, 23, 68, 0.13), 0 0 0 8px rgba(255,255,255,0.13);
  border: 2.5px solid #ffb300cc;
  transform: scale(1.025) rotate(-0.5deg);
}
.get-started-content::before {
  content: '';
  position: absolute;
  top: -40px;
  left: -40px;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, #ffb30055 0%, transparent 70%);
  z-index: 0;
  pointer-events: none;
  filter: blur(2px) brightness(1.2);
  opacity: 0.7;
  animation: floatGlow 3.5s ease-in-out infinite alternate;
}
.get-started-content::after {
  content: '';
  position: absolute;
  bottom: -30px;
  right: -30px;
  width: 90px;
  height: 90px;
  background: radial-gradient(circle, #ff174455 0%, transparent 70%);
  z-index: 0;
  pointer-events: none;
  filter: blur(1.5px) brightness(1.1);
  opacity: 0.6;
  animation: floatGlow2 4.2s ease-in-out infinite alternate;
}
@keyframes floatGlow {
  from { transform: scale(1) translateY(0); opacity: 0.7; }
  to { transform: scale(1.12) translateY(12px); opacity: 1; }
}
@keyframes floatGlow2 {
  from { transform: scale(1) translateY(0); opacity: 0.6; }
  to { transform: scale(1.08) translateY(-10px); opacity: 0.9; }
}
.get-started-content h2 {
  color: #222;
  margin-bottom: 1.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  font-size: 2.1rem;
  z-index: 1;
  position: relative;
  text-shadow: 0 2px 12px #ffb30044, 0 1px 2px #0002;
}
.get-started-content label {
  display: block;
  margin-top: 1rem;
  margin-bottom: 0.3rem;
  font-weight: 600;
  z-index: 1;
  position: relative;
  text-shadow: 0 1px 4px #ff174422, 0 1px 2px #0002;
}
.get-started-content input {
  width: 100%;
  padding: 0.7rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  background: rgba(255,255,255,0.7);
  z-index: 1;
  position: relative;
  background: linear-gradient(90deg, #ffb300 0%, #ff1744 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
  border: none;
  border-radius: 2.5rem;
  box-shadow: 0 0 32px #ff174488, 0 2px 8px #ffb30044;
  cursor: pointer;
  transition: background 0.3s, box-shadow 0.3s, transform 0.2s, filter 0.3s;
}
.get-started-content .get-started-btn:hover {
  background: linear-gradient(90deg, #ff1744 0%, #ffb300 100%);
  box-shadow: 0 0 32px #ffb300cc;
  transform: translateY(-2px) scale(1.04);
  filter: drop-shadow(0 0 16px #ff1744cc);
}
.get-started-content form {
  z-index: 1;
  position: relative;
}
.step-indicator {
  margin-bottom: 1.2rem;
}
.step-bar {
  width: 100%;
  height: 18px;
  background: #e9ecef;
  border-radius: 9px;
  overflow: hidden;
  margin-top: 0.3rem;
  margin-bottom: 1.2rem;
}
.step-bar-fill {
  height: 100%;
  background: repeating-linear-gradient(135deg, #ffb300 0 12px, #ff1744 12px 24px);
  border-radius: 9px;
  transition: width 0.4s cubic-bezier(.4,2,.6,1);
  color: #fff;
  font-weight: 700;
  text-align: center;
  line-height: 18px;
  font-size: 1rem;
}
.service-checkbox-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.7rem;
}
.service-checkbox-row input[type='checkbox'] {
  accent-color: #ff1744;
  width: 1.3rem;
  height: 1.3rem;
  margin-right: 0.7rem;
}
.form-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}
.prev-btn {
  background: #ffb3c6;
  color: #fff;
}
.next-btn {
  background: #ff1744;
  color: #fff;
}
.contact-method-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.2rem;
}
.contact-method-row input[type='radio'] {
  accent-color: #ff1744;
  width: 1.3rem;
  height: 1.3rem;
  margin-right: 0.5rem;
}
.contact-method-row label {
  font-size: 1.3rem;
  font-weight: 600;
  color: #555;
  margin-right: 1.2rem;
  cursor: pointer;
}
.contact-method-row input[type='radio']:checked + label {
  color: #ff1744;
  font-weight: 700;
}
.contact-label {
  color: #fff !important;
  font-size: 1.3rem;
  font-weight: 700;
  margin-right: 1.2rem;
  cursor: pointer;
  transition: color 0.2s;
}
.contact-method-row input[type='radio']:checked + .contact-label {
  color: #ffb300 !important;
  text-shadow: 0 0 8px #ffb30099;
}
.confirmation-banner.animated {
  position: fixed;
  top: 30vh;
  left: 50%;
  transform: translateX(-50%) scale(0.95);
  background: #eaffea;
  border: 1.5px solid #b6f5b6;
  border-radius: 1.2rem;
  box-shadow: 0 8px 32px #b6f5b655, 0 1.5px 8px #ffb30022;
  min-width: 500px;
  max-width: 90vw;
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3000;
  animation: popBanner 0.7s cubic-bezier(.4,2,.6,1), fadeOutBanner 1s 2.5s forwards;
}
@keyframes popBanner {
  0% { opacity: 0; transform: translateX(-50%) scale(0.7) rotate(-8deg); }
  60% { opacity: 1; transform: translateX(-50%) scale(1.08) rotate(2deg); }
  100% { opacity: 1; transform: translateX(-50%) scale(1) rotate(0); }
}
@keyframes fadeOutBanner {
  to { opacity: 0; transform: translateX(-50%) scale(0.95) translateY(-30px); }
}
.confirmation-icon {
  margin-bottom: 1.2rem;
  animation: bounceIcon 1.2s cubic-bezier(.4,2,.6,1);
}
@keyframes bounceIcon {
  0% { transform: scale(0.7); }
  60% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
.confirmation-icon .circle {
  fill: none;
  stroke: #4caf50;
  stroke-width: 5;
  stroke-dasharray: 226.2;
  stroke-dashoffset: 226.2;
  animation: drawCircle 1s ease-out forwards;
}
.confirmation-icon .check {
  fill: none;
  stroke: #222;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: drawCheck 0.7s 0.7s cubic-bezier(.4,2,.6,1) forwards;
}
.confirmation-text {
  text-align: center;
  color: #222;
  font-size: 1.3rem;
  font-weight: 500;
}
.confirmation-text h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #222;
}
.confirmation-text p {
  margin: 0;
  font-size: 1.1rem;
  color: #222;
}
.float-back-btn {
  position: fixed;
  right: 2vw;
  bottom: 3vh;
  z-index: 3000;
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
.connect-section {
  width: 100vw;
  min-height: 420px;
  background: url("/src/assets/images/g10.png") center center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 3rem;
  overflow: hidden;
}
.connect-overlay {
  width: 100%;
  min-height: 420px;
  background: rgba(0,0,0,0.68);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.connect-content {
  margin-left: 8vw;
  max-width: 540px;
  color: #fff;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.connect-bar {
  width: 38px;
  height: 6px;
  background: #ff6f61;
  border-radius: 3px;
  margin-bottom: 1.2rem;
}
.connect-title {
  font-size: 3.2rem;
  font-weight: 900;
  margin-bottom: 1.1rem;
  color: #fff;
  text-shadow: 0 4px 24px rgba(0,0,0,0.18);
}
.connect-desc {
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 2.2rem;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.18);
}
.connect-btn {
  display: inline-block;
  background: linear-gradient(90deg, #ff1744 0%, #ff6f61 100%);
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  padding: 0.95rem 2.5rem;
  border-radius: 2.5rem;
  box-shadow: 0 4px 32px #ff174488;
  text-decoration: none;
  transition: background 0.2s, box-shadow 0.2s, transform 0.18s;
  margin-top: 0.5rem;
}
.connect-btn:hover {
  background: linear-gradient(90deg, #ff6f61 0%, #ff1744 100%);
  box-shadow: 0 8px 40px #ff1744cc;
  transform: translateY(-2px) scale(1.06);
}
@media (max-width: 900px) {
  .connect-content {
    margin-left: 4vw;
    max-width: 90vw;
  }
  .connect-title {
    font-size: 2.2rem;
  }
  .connect-section, .connect-overlay {
    min-height: 320px;
  }
}
@media (max-width: 600px) {
  .connect-content {
    margin-left: 2vw;
    max-width: 98vw;
  }
  .connect-title {
    font-size: 1.5rem;
  }
  .connect-section, .connect-overlay {
    min-height: 220px;
  }
  .connect-desc {
    font-size: 1rem;
  }
  .connect-btn {
    font-size: 1rem;
    padding: 0.7rem 1.5rem;
  }
}
</style>
