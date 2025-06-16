<template>
  <div class="contact-container">
    <div class="contact-left">
      <div class="social-icons">
        <a href="#" aria-label="Facebook" title="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="#" aria-label="Instagram" title="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="#" aria-label="Pinterest" title="Pinterest"><i class="fab fa-pinterest-p"></i></a>
      </div>
      <div class="contact-content">
        <div class="contact-bar">
          <span class="bar red"></span>
          <span class="bar yellow"></span>
        </div>
        <h1>Contact Us</h1>
        <p class="contact-desc">
          We are incredibly responsive to your requests and value your questions.
        </p>
      </div>
    </div>
    <div class="contact-right">
      <img :src="contactImg" alt="Contact" class="contact-image" loading="lazy" />
    </div>
  </div>
  <div class="connect-section">
    <div class="connect-left">
      <div class="contact-bar">
        <span class="bar red"></span>
        <span class="bar yellow"></span>
      </div>
      <h2>Let's Connect</h2>
    </div>
    <div class="connect-details">
      <div class="connect-item">
        <span class="connect-label">01.</span>
        <span class="connect-title">Phone</span>
        <span class="connect-value">07045784224</span>
      </div>
      <div class="connect-item">
        <span class="connect-label">02.</span>
        <span class="connect-title">WhatsApp</span>
        <span class="connect-value">09047206906</span>
      </div>
      <div class="connect-item">
        <span class="connect-label">03.</span>
        <span class="connect-title">Email</span>
        <span class="connect-value">aesthetics9649@gmail.com</span>
      </div>
    </div>
  </div>
  <div class="worktime-section">
    <h2>Work Time</h2>
    <p>Monday - Saturday : 9 am - 6 pm</p>
  </div>
  <div class="contact-form-section">
    <h2>Send Us a Message</h2>
    <form class="contact-form" @submit="handleContactSubmit">
      <div class="form-row">
        <input type="text" v-model="form.name" name="name" placeholder="Your Name" required />
        <input type="email" v-model="form.email" name="email" placeholder="Your Email" required />
      </div>
      <div class="form-row">
        <select v-model="form.subject" name="subject" class="subject-select" required>
          <option value="" disabled>Select a Service</option>
          <option>Consultation</option>
          <option>Visual Identity</option>
          <option>Product Package Design</option>
          <option>Company Profile</option>
          <option>Marketing & Brand Collateral</option>
          <option>Web Design & Management</option>
          <option>Environmental Branding</option>
        </select>
      </div>
      <div class="form-row">
        <textarea v-model="form.message" name="message" placeholder="Your Message" rows="5" required></textarea>
      </div>
      <button type="submit" class="send-btn" title="Send Message">Send Message</button>
    </form>
    <div v-if="submitted" class="form-success">Thank you for reaching out! We'll get back to you soon.</div>
  </div>
  <div style="position: fixed; right: 24px; bottom: 24px; z-index: 1001; display: flex; flex-direction: column; align-items: flex-end; gap: 16px;">
    <a
      href="#"
      class="email-float"
      @click.prevent="showEmailConfirm = true"
      aria-label="Email Aesthetics"
      title="Email Aesthetics"
      style="margin-bottom: 0; transform: translateX(-10px);"
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="28" fill="#ffb300"/>
        <path d="M16 20h24v16H16V20zm0 0l12 10 12-10" stroke="#fff" stroke-width="2" fill="none"/>
      </svg>
    </a>
    <a
      href="#"
      class="whatsapp-float"
      @click.prevent="showWhatsAppConfirm = true"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="28" fill="#25D366"/>
        <path d="M38.6 34.2c-1.1-.5-2.2-.9-3.2-1.4-.5-.2-.8-.2-1.1.3-.3.5-1.1 1.5-1.4 1.8-.3.3-.6.4-1.1.1-.5-.2-2-1-3.8-2.4-1.4-1.1-2.4-2.7-2.7-3.2-.3-.5-.1-.8.2-1.1.2-.2.5-.6.7-.8.2-.3.3-.5.5-.8.1-.3.1-.6-.1-.9-.1-.2-1.1-2.6-1.5-3.5-.4-.9-.8-.8-1.1-.8-.3 0-.6 0-.9 0-.3 0-.8.1-1.2.5-.4.4-1.6 1.6-1.6 3.8 0 2.2 1.7 4.4 1.9 4.7.2.3 3.2 4.9 7.8 6.7 1.1.4 1.9.6 2.6.8 1.1.3 2.1.2 2.9.1.9-.1 2.8-1.1 3.2-2.2.4-1.1.4-2 .3-2.2-.1-.2-.4-.3-.9-.6z" fill="#fff"/>
        <path d="M28 12C19.2 12 12 19.2 12 28c0 2.7.7 5.3 2 7.6L12 44l8.6-2.3c2.2 1.2 4.7 1.9 7.4 1.9 8.8 0 16-7.2 16-16s-7.2-15.6-16-15.6zm0 28.8c-2.4 0-4.7-.6-6.7-1.7l-.5-.3-5.1 1.4 1.4-5-.3-.5c-1.2-2-1.8-4.3-1.8-6.7 0-7.5 6.1-13.6 13.6-13.6s13.6 6.1 13.6 13.6-6.1 13.6-13.6 13.6z" fill="#fff"/>
      </svg>
    </a>
  </div>
  <div v-if="showEmailConfirm" class="whatsapp-confirm-modal">
    <div class="whatsapp-confirm-content">
      <p>Email aesthetics?</p>
      <button @click="goToEmail" class="yes-btn" title="Confirm Email">Yes</button>
      <button @click="showEmailConfirm = false" class="no-btn" title="Cancel Email">No</button>
    </div>
  </div>
  <div v-if="showWhatsAppConfirm" class="whatsapp-confirm-modal">
    <div class="whatsapp-confirm-content">
      <p>Message aesthetics?</p>
      <button @click="goToWhatsApp" class="yes-btn" title="Confirm WhatsApp">Yes</button>
      <button @click="showWhatsAppConfirm = false" class="no-btn" title="Cancel WhatsApp">No</button>
    </div>
  </div>
  <MainFooter />
  <div v-show="showFloatBtn" class="float-back-btn">
    <button class="back-btn" @click="goBack" title="Back">
      <svg width="28" height="28" fill="none" stroke="#ffb300" stroke-width="2.2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
    </button>
  </div>
</template>

<script>
import MainFooter from './MainFooter.vue';
import contactImg from '../assets/images/headway-5QgIuuBxKwM-unsplash.jpg';
export default {
  name: 'Contact',
  components: { MainFooter },
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      submitted: false,
      showWhatsAppConfirm: false,
      showEmailConfirm: false,
      showFloatBtn: false,
      contactImg
    };
  },
  methods: {
    async handleContactSubmit(event) {
      event.preventDefault();
      const data = new FormData();
      data.append('name', this.form.name);
      data.append('email', this.form.email);
      data.append('subject', this.form.subject);
      data.append('message', this.form.message);
      try {
        const response = await fetch('https://formspree.io/f/xzzggvgz', {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          this.submitted = true;
          this.form = { name: '', email: '', subject: '', message: '' };
        } else {
          alert('Submission failed. Please try again.');
        }
      } catch (error) {
        alert('An error occurred. Please check your connection and try again.');
      }
    },
    goToWhatsApp() {
      window.open('https://wa.link/1h5786', '_blank');
      this.showWhatsAppConfirm = false;
    },
    goToEmail() {
      window.open('mailto:aesthetics964977@gmail.com', '_blank');
      this.showEmailConfirm = false;
    },
    goBack() {
      if (this.$router) {
        this.$router.back();
      } else {
        window.history.back();
      }
    },
    handleScroll() {
      this.showFloatBtn = window.scrollY > 200;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
.contact-container {
  display: flex;
  min-height: 100vh;
  background: #000;
  color: #fff;
}
.contact-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 6vw;
}
.social-icons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.social-icons a {
  color: #fff;
  font-size: 1.5rem;
  transition: color 0.2s;
}
.social-icons a:hover {
  color: #e63946;
}
.contact-content {
  margin-top: 2rem;
}
.contact-bar {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}
.bar {
  display: inline-block;
  height: 6px;
  border-radius: 2px;
}
.bar.red {
  width: 180px;
  background: #e63946;
  margin-right: 8px;
}
.bar.yellow {
  width: 30px;
  background: #ffb703;
}
h1 {
  font-size: 4rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  letter-spacing: 1px;
}
.contact-desc {
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.3;
  max-width: 500px;
}
.contact-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contact-image {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
.connect-section {
  background: #333;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  padding: 4rem 0 3rem 0;
  margin-top: 0;
}
.connect-left {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}
.connect-left h2 {
  font-size: 3rem;
  font-weight: 700;
  margin: 1.5rem 0 0 0;
  text-align: center;
}
.connect-details {
  flex: 2 1 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem 6rem;
}
.connect-item {
  min-width: 220px;
  margin-bottom: 2rem;
}
.connect-label {
  font-size: 2.5rem;
  font-weight: 700;
  color: #888;
  display: block;
}
.connect-title {
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
  display: block;
  margin-bottom: 0.5rem;
}
.connect-value {
  font-size: 1.3rem;
  color: #fff;
  display: block;
}
.worktime-section {
  background: #000;
  color: #fff;
  text-align: center;
  padding: 3rem 0 3rem 0;
}
.worktime-section h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}
.worktime-section p {
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
}
.contact-form-section {
  background: #222;
  color: #fff;
  padding: 3rem 0 4rem 0;
  text-align: center;
}
.contact-form-section h2 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  letter-spacing: 1px;
}
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: rgba(0,0,0,0.7);
  padding: 2rem 2.5rem;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
}
.form-row {
  display: flex;
  gap: 1.2rem;
}
.form-row input,
.form-row textarea {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  background: #333;
  color: #fff;
  outline: none;
  transition: box-shadow 0.2s;
}
.form-row input:focus,
.form-row textarea:focus {
  box-shadow: 0 0 0 2px #e63946;
}
.form-row textarea {
  resize: vertical;
  min-height: 100px;
}
.subject-select {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  background: #333;
  color: #fff;
  outline: none;
  transition: box-shadow 0.2s;
  margin-bottom: 0.5rem;
}
.subject-select:focus {
  box-shadow: 0 0 0 2px #e63946;
}
.send-btn {
  background: linear-gradient(90deg, #e63946 60%, #ffb703 100%);
  color: #fff;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  margin-top: 1rem;
  box-shadow: 0 2px 12px rgba(230,57,70,0.12);
}
.send-btn:hover {
  background: linear-gradient(90deg, #ffb703 0%, #e63946 100%);
}
.form-success {
  margin-top: 1.5rem;
  color: #ffb703;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}
.whatsapp-float {
  position: fixed;
  right: 2.2rem;
  bottom: 2.2rem;
  z-index: 9999;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: 0 4px 24px rgba(37, 211, 102, 0.18);
  border-radius: 50%;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.whatsapp-float:hover {
  box-shadow: 0 8px 32px rgba(37, 211, 102, 0.32);
  transform: scale(1.08);
}
.email-float {
  position: fixed;
  right: 2.2rem;
  bottom: 80px;
  z-index: 1001;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: 0 4px 24px rgba(255, 179, 0, 0.18);
  border-radius: 50%;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.email-float:hover {
  box-shadow: 0 8px 32px rgba(255, 179, 0, 0.32);
  transform: scale(1.08);
}
.whatsapp-confirm-modal {
  position: fixed;
  right: 2.2rem;
  bottom: 6.5rem;
  z-index: 10000;
  background: rgba(0,0,0,0.85);
  border-radius: 1rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 1.2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.whatsapp-confirm-content {
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.yes-btn, .no-btn {
  margin: 0 0.5rem;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.yes-btn {
  background: #25D366;
  color: #fff;
}
.no-btn {
  background: #e63946;
  color: #fff;
}
.yes-btn:hover {
  background: #1ebe57;
}
.no-btn:hover {
  background: #b71c1c;
}
.float-back-btn {
  position: fixed;
  right: 2vw;
  top: 3vh;
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
@media (max-width: 900px) {
  .contact-container {
    flex-direction: column;
  }
  .contact-right {
    margin-top: 2rem;
  }
  .connect-section {
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
  }
  .connect-details {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
}
@media (max-width: 700px) {
  .contact-form {
    padding: 1.2rem 0.5rem;
  }
  .form-row {
    flex-direction: column;
    gap: 0.7rem;
  }
}
</style>
