<template>
  <section class="blogs-section">
    <!-- Welcome Header and Search Bar -->
    <div class="blog-search-header">
      <h1 class="blog-welcome">
        <span>{{ typedText }}</span><span v-if="showCursor" class="typing-cursor">|</span>
      </h1>
      <div class="search-bar-container">
        <input
          v-model="searchQuery"
          @input="onSearchInput"
          @keydown.down.prevent="moveSuggestion(1)"
          @keydown.up.prevent="moveSuggestion(-1)"
          @keydown.enter.prevent="selectSuggestion"
          type="text"
          placeholder="Search Blog"
          class="blog-search-input"
        />
        <button class="blog-search-btn" @click="searchBlog">
          <span class="search-icon">🔍</span>
        </button>
        <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestions-list">
          <li
            v-for="(suggestion, idx) in filteredSuggestions"
            :key="suggestion.id"
            :class="{ 'active-suggestion': idx === suggestionIndex }"
            @mousedown.prevent="goToBlog(suggestion.id)"
          >
            {{ suggestion.title }}
          </li>
        </ul>
      </div>
    </div>
    <!-- Category Filters BELOW search bar -->
    <div class="blog-filters">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="['filter-btn', { active: selectedCategory === cat }]"
        @click="selectCategory(cat)"
      >
        {{ cat }}
      </button>
      <button v-if="selectedCategory" class="filter-btn clear" @click="selectCategory('')">Clear</button>
    </div>
    <!-- Blog List -->
    <div class="blogs-list">
      <div class="blog-card" v-for="blog in paginatedBlogsFiltered" :key="blog.id">
        <div class="blog-image-block">
          <img :src="blog.image" :alt="blog.title" class="blog-image" />
          <span class="blog-badge" :class="blog.badgeClass">{{ blog.badge }}</span>
        </div>
        <div class="blog-content">
          <h3 class="blog-title">{{ blog.title }}</h3>
          <p class="blog-summary">{{ blog.summary }}</p>
          <router-link :to="{ name: 'BlogDetail', params: { id: blog.id } }" class="read-more">Read <span>&rarr;</span></router-link>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button v-for="page in totalPagesFiltered" :key="page" :class="['page-btn', { active: page === currentPage }]" @click="goToPage(page)">{{ page }}</button>
    </div>
    <MainFooter />
    <div v-show="showFloatBtn" class="float-back-btn">
      <button class="back-btn" @click="goBack" title="Back">
        <svg width="28" height="28" fill="none" stroke="#ffb300" stroke-width="2.2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Blogs',
  data() {
    return {
      blogs: [
        {
          id: 1,
          title: 'Having a website for your business is not a luxury but a necessity',
          summary: 'If you’re still on the fence about creating a website for your small business, it’s time to reconsider. In today’s digital age, having an online presence is essential.',
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
          badge: 'WEBSITE',
          badgeClass: 'badge-website',
          content: `
            <h2>Why Every Business Needs a Website in 2025</h2>
            <p>In today’s hyper-connected world, your website is your digital storefront. It’s the first impression you make on potential customers, partners, and even future employees. If you’re still on the fence about creating a website for your small business, it’s time to reconsider. Here’s why:</p>
            <ul>
              <li><strong>Credibility & Trust:</strong> 84% of consumers believe a business with a website is more credible than one with only social media. Your website is proof you’re real, professional, and invested in your brand.</li>
              <li><strong>24/7 Accessibility:</strong> Your website never sleeps. It works for you around the clock, answering questions, showcasing your work, and capturing leads—even while you rest.</li>
              <li><strong>Showcase Your Brand:</strong> A website is the only place you control 100%. You decide the story, the visuals, and the experience. It’s your chance to stand out and show what makes you unique.</li>
              <li><strong>Marketing Hub:</strong> All your marketing—social, ads, email—should point to your website. It’s where you convert visitors into customers.</li>
              <li><strong>Compete with Bigger Brands:</strong> A beautiful, functional website levels the playing field. Small businesses can look just as professional as the giants.</li>
            </ul>
            <blockquote style="background:#222;padding:1rem 1.5rem;border-left:4px solid #ffb300;color:#ffb300;margin:2rem 0;">“Your website is the only employee that works 24/7, never asks for a raise, and always represents your brand.”</blockquote>
            <h3>What Makes a Great Business Website?</h3>
            <ul>
              <li>Clear, compelling homepage</li>
              <li>Easy navigation</li>
              <li>Mobile-friendly design</li>
              <li>Fast loading speed</li>
              <li>Contact info and calls to action</li>
              <li>Authentic images and testimonials</li>
            </ul>
            <p>Don’t let your business get left behind. Invest in a professional website and watch your business grow. If you need help, our team specializes in building beautiful, high-converting sites for brands like yours.</p>
          `
        },
        {
          id: 2,
          title: 'Why Your Business Needs a Review Section: A Lesson from a Young Mother',
          summary: 'Getting a good review can be a game changer for your business. Learn why customer feedback is crucial and how to leverage it.',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
          badge: 'STORY',
          badgeClass: 'badge-story',
          content: `
            <h2>The Power of Reviews: A True Story</h2>
            <p>When Mrs. Ebele, a young mother, was searching for a school for her child, she didn’t start with Google ads or billboards. She started with reviews—real stories from other parents. This is the new normal: 93% of consumers say online reviews impact their buying decisions.</p>
            <h3>Why Reviews Matter</h3>
            <ul>
              <li><strong>Builds Trust:</strong> People trust people. A glowing review is more persuasive than any ad.</li>
              <li><strong>Boosts SEO:</strong> Google loves fresh, authentic reviews. They help you rank higher and get found by more customers.</li>
              <li><strong>Drives Sales:</strong> Products with reviews convert up to 270% more than those without.</li>
            </ul>
            <blockquote style="background:#222;padding:1rem 1.5rem;border-left:4px solid #ff6f61;color:#ff6f61;margin:2rem 0;">“A satisfied customer is the best business strategy of all.”</blockquote>
            <h3>How to Get More Reviews</h3>
            <ol>
              <li>Ask! Most happy customers are willing to leave a review if you make it easy.</li>
              <li>Respond to every review—good or bad. Show you care.</li>
              <li>Showcase your best reviews on your website and social media.</li>
            </ol>
            <p>Make reviews a core part of your business strategy. They’re free, powerful, and authentic marketing.</p>
          `
        },
        {
          id: 3,
          title: 'Is Branding Really Necessary?',
          summary: 'You probably have been told that it will help you make more sales and even dignify your business and make you stand out. Here’s why branding matters.',
          image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
          badge: 'HELPFUL TIPS',
          badgeClass: 'badge-tips',
          content: `
            <h2>Branding: The Secret Sauce of Every Successful Business</h2>
            <p>Branding is not just a logo or a color scheme. It’s the soul of your business—the story, the promise, the feeling people get when they think of you. Ask yourself: what do you want people to say about your business when you’re not in the room?</p>
            <h3>What Makes Branding So Powerful?</h3>
            <ul>
              <li><strong>Recognition:</strong> Consistent branding makes you memorable. Think of the Nike swoosh or Apple’s apple.</li>
              <li><strong>Trust:</strong> People buy from brands they trust. Branding builds that trust over time.</li>
              <li><strong>Emotional Connection:</strong> Great brands make us feel something—pride, excitement, belonging.</li>
              <li><strong>Premium Pricing:</strong> Strong brands can charge more because people believe in their value.</li>
            </ul>
            <blockquote style="background:#222;padding:1rem 1.5rem;border-left:4px solid #ff6f61;color:#ff6f61;margin:2rem 0;">“Your brand is what other people say about you when you’re not in the room.” – Jeff Bezos</blockquote>
            <h3>How to Build a Strong Brand</h3>
            <ol>
              <li>Define your mission, vision, and values.</li>
              <li>Design a visual identity that reflects your personality.</li>
              <li>Be consistent in every interaction—online and offline.</li>
              <li>Tell your story. People connect with stories, not products.</li>
            </ol>
            <p>Branding is an investment, not an expense. Start today and watch your business transform.</p>
          `
        },
        {
          id: 4,
          title: 'The Psychology of Color in Graphic Design',
          summary: 'Colors influence perception and emotions. Discover how to use color psychology to your advantage in branding and design.',
          image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
          badge: 'DESIGN',
          badgeClass: 'badge-design',
          content: `
            <h2>The Psychology of Color: How to Make Your Brand Unforgettable</h2>
            <p>Did you know that color increases brand recognition by up to 80%? The colors you choose for your brand and designs have a huge impact on how people feel about you.</p>
            <h3>What Do Colors Mean?</h3>
            <ul>
              <li><strong>Red:</strong> Energy, passion, excitement. Great for calls to action.</li>
              <li><strong>Blue:</strong> Trust, calm, professionalism. Popular in tech and finance.</li>
              <li><strong>Yellow:</strong> Optimism, warmth, clarity. Good for brands that want to appear friendly and approachable.</li>
              <li><strong>Green:</strong> Growth, health, tranquility. Common in wellness and eco-friendly brands.</li>
              <li><strong>Purple:</strong> Luxury, creativity, wisdom.</li>
              <li><strong>Black:</strong> Sophistication, power, elegance.</li>
            </ul>
            <blockquote style="background:#222;padding:1rem 1.5rem;border-left:4px solid #00bcd4;color:#00bcd4;margin:2rem 0;">“Color is a power which directly influences the soul.” – Wassily Kandinsky</blockquote>
            <h3>Tips for Using Color in Design</h3>
            <ol>
              <li>Pick a primary color that matches your brand’s personality.</li>
              <li>Use accent colors for buttons and highlights.</li>
              <li>Keep it simple—don’t use too many colors at once.</li>
              <li>Test your palette for accessibility and contrast.</li>
            </ol>
            <p>Color is a language. Use it wisely, and your brand will speak volumes.</p>
          `
        },
        {
          id: 5,
          title: 'How to Build a Memorable Brand Identity',
          summary: 'A strong brand identity is more than a logo. Learn the key elements that make a brand unforgettable.',
          image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
          badge: 'BRANDING',
          badgeClass: 'badge-branding',
          content: `
            <h2>Building a Brand Identity That Lasts</h2>
            <p>Your brand identity is the sum of every visual and emotional cue you send to your audience. It’s your logo, your colors, your voice, and your story—all working together to create a lasting impression.</p>
            <h3>Key Elements of Brand Identity</h3>
            <ul>
              <li><strong>Logo:</strong> The visual symbol of your brand. Make it simple, memorable, and versatile.</li>
              <li><strong>Color Palette:</strong> Choose colors that reflect your brand’s personality and values.</li>
              <li><strong>Typography:</strong> Fonts set the tone. Pick a style that matches your message.</li>
              <li><strong>Imagery:</strong> Use photos and graphics that tell your story and connect emotionally.</li>
              <li><strong>Voice:</strong> The language and tone you use in your communications. Be authentic and consistent.</li>
            </ul>
            <blockquote style="background:#222;padding:1rem 1.5rem;border-left:4px solid #ffb300;color:#ffb300;margin:2rem 0;">“People do not buy goods and services. They buy relations, stories, and magic.” – Seth Godin</blockquote>
            <h3>How to Create a Cohesive Brand</h3>
            <ol>
              <li>Document your brand guidelines.</li>
              <li>Use templates for marketing materials.</li>
              <li>Train your team to use your brand assets correctly.</li>
              <li>Review your brand regularly and update as needed.</li>
            </ol>
            <p>Remember, your brand identity is a promise. Make it count.</p>
          `
        },
        {
          id: 6,
          title: 'Web Design Trends for 2025',
          summary: 'Stay ahead of the curve with these top web design trends that will define the digital landscape in 2025.',
          image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
          badge: 'TRENDS',
          badgeClass: 'badge-trends',
          content: `
            <h2>Web Design Trends to Watch in 2025</h2>
            <p>Web design is always evolving. In 2025, expect to see a blend of bold creativity and user-focused simplicity. Here are the trends that will shape the digital landscape:</p>
            <ul>
              <li><strong>Dark Mode:</strong> Sleek, modern, and easy on the eyes. More sites are offering dark mode as a default.</li>
              <li><strong>Micro-Animations:</strong> Subtle animations that guide users and add delight.</li>
              <li><strong>3D Elements:</strong> Adding depth and realism to web interfaces.</li>
              <li><strong>Minimalism:</strong> Clean layouts, lots of white space, and simple navigation.</li>
              <li><strong>Personalization:</strong> Websites that adapt to user preferences and behavior.</li>
              <li><strong>Bold Typography:</strong> Big, expressive fonts that make a statement.</li>
            </ul>
            <blockquote style="background:#222;padding:1rem 1.5rem;border-left:4px solid #4caf50;color:#4caf50;margin:2rem 0;">“Good design is obvious. Great design is transparent.” – Joe Sparano</blockquote>
            <p>Stay ahead by embracing these trends and always putting your users first.</p>
          `
        },
        {
          id: 7,
          title: 'The Importance of Consistency in Branding',
          summary: 'Consistency builds trust and recognition. Here’s how to keep your brand message and visuals aligned everywhere.',
          image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
          badge: 'BRANDING',
          badgeClass: 'badge-branding',
          content: `
            <h2>Consistency: The Secret to a Strong Brand</h2>
            <p>Consistency is the glue that holds your brand together. It’s what makes you recognizable, trustworthy, and memorable. Every time someone interacts with your brand, they should have the same experience—whether it’s your website, your social media, or your packaging.</p>
            <h3>How to Stay Consistent</h3>
            <ul>
              <li><strong>Brand Guidelines:</strong> Document your colors, fonts, logo usage, and messaging.</li>
              <li><strong>Templates:</strong> Use templates for social media, presentations, and marketing materials.</li>
              <li><strong>Training:</strong> Educate your team on how to use your brand assets correctly.</li>
              <li><strong>Review Regularly:</strong> Audit your brand touchpoints and update as needed.</li>
            </ul>
            <blockquote style="background:#222;padding:1rem 1.5rem;border-left:4px solid #ffb300;color:#ffb300;margin:2rem 0;">“Your brand is a promise to your customer. Make sure you keep it—everywhere.”</blockquote>
            <p>Consistency isn’t boring—it’s powerful. It’s how you build a brand that lasts.</p>
          `
        },
        {
          id: 8,
          title: 'Graphic Design Basics for Small Businesses',
          summary: 'You don’t need to be a designer to create great graphics. Learn the basics to make your business look professional.',
          image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
          badge: 'GRAPHIC DESIGN',
          badgeClass: 'badge-design',
          content: `
            <h2>Graphic Design 101: Make Your Business Look Amazing</h2>
            <p>You don’t need to be a professional designer to create graphics that wow your audience. With a few basic principles, you can make your business look polished and trustworthy.</p>
            <h3>Design Basics for Non-Designers</h3>
            <ul>
              <li><strong>Keep it Simple:</strong> Don’t overcrowd your designs. Less is more.</li>
              <li><strong>Use Quality Images:</strong> High-resolution images make your brand look polished.</li>
              <li><strong>Consistent Colors:</strong> Stick to your brand’s color palette for a cohesive look.</li>
              <li><strong>Readable Fonts:</strong> Choose fonts that are easy to read on all devices.</li>
              <li><strong>Alignment:</strong> Make sure everything lines up for a clean, professional look.</li>
            </ul>
            <blockquote style="background:#222;padding:1rem 1.5rem;border-left:4px solid #00bcd4;color:#00bcd4;margin:2rem 0;">“Design is intelligence made visible.” – Alina Wheeler</blockquote>
            <p>With these basics, you can create graphics that enhance your brand’s image and attract more customers.</p>
          `
        },
        {
          id: 9,
          title: 'How to Write Compelling Website Copy',
          summary: 'Your website copy can make or break conversions. Discover tips for writing copy that sells.',
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
          badge: 'WEBSITE',
          badgeClass: 'badge-website',
          content: `
            <h2>Website Copywriting: Turn Visitors into Customers</h2>
            <p>Your website copy is your silent salesperson. It’s what convinces visitors to stay, trust you, and take action. Here’s how to write copy that sells:</p>
            <ul>
              <li><strong>Know Your Audience:</strong> Write in a way that speaks directly to your ideal customer.</li>
              <li><strong>Focus on Benefits:</strong> Show how your product or service solves a problem.</li>
              <li><strong>Use Calls to Action:</strong> Tell visitors exactly what you want them to do next.</li>
              <li><strong>Edit Ruthlessly:</strong> Cut out unnecessary words and keep your message clear.</li>
              <li><strong>Tell a Story:</strong> People remember stories, not facts.</li>
            </ul>
            <blockquote style="background:#222;padding:1rem 1.5rem;border-left:4px solid #ffb300;color:#ffb300;margin:2rem 0;">“The best marketing doesn’t feel like marketing.” – Tom Fishburne</blockquote>
            <p>With the right copy, your website can turn visitors into loyal customers. Don’t be afraid to be bold, be clear, and be you.</p>
          `
        },
        {
          id: 10,
          title: 'Logo Design: What Makes a Logo Great?',
          summary: 'A great logo is simple, memorable, and versatile. Learn the principles behind effective logo design.',
          image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
          badge: 'LOGO',
          badgeClass: 'badge-logo',
          content: `
            <h2>Logo Design: The Face of Your Brand</h2>
            <p>Your logo is often the first thing people notice about your brand. It’s your signature, your handshake, your flag. A great logo is simple, memorable, and versatile. Here’s what makes a logo truly great:</p>
            <ul>
              <li><strong>Simplicity:</strong> Simple logos are easier to recognize and remember.</li>
              <li><strong>Memorability:</strong> A unique logo stands out and sticks in people’s minds.</li>
              <li><strong>Versatility:</strong> Your logo should look good in black and white, color, and at any size.</li>
              <li><strong>Relevance:</strong> The design should reflect your brand’s values and industry.</li>
              <li><strong>Timelessness:</strong> Avoid trends that will look dated in a few years.</li>
            </ul>
            <blockquote style="background:#222;padding:1rem 1.5rem;border-left:4px solid #673ab7;color:#673ab7;margin:2rem 0;">“A logo doesn’t sell, it identifies.” – Paul Rand</blockquote>
            <p>Work with a professional designer to create a logo that truly represents your brand. It’s an investment that pays off for years to come.</p>
          `
        },
      ],
      currentPage: 1,
      perPage: 3,
      searchQuery: '',
      showSuggestions: false,
      suggestionIndex: -1,
      welcomeText: 'Welcome to Aesthetics Blog',
      typedText: '',
      typingIndex: 0,
      showCursor: true,
      typingInterval: null,
      cursorInterval: null,
      selectedCategory: '',
      showFloatBtn: false,
    };
  },
  mounted() {
    this.startTyping();
    this.cursorInterval = setInterval(() => {
      this.showCursor = !this.showCursor;
    }, 500);
    window.addEventListener('scroll', this.handleScrollFloatBtns);
  },
  beforeDestroy() {
    clearInterval(this.typingInterval);
    clearInterval(this.cursorInterval);
    window.removeEventListener('scroll', this.handleScrollFloatBtns);
  },
  computed: {
    categories() {
      const cats = new Set(this.blogs.map(b => b.badge));
      return Array.from(cats);
    },
    totalPages() {
      return Math.ceil(this.blogs.length / this.perPage);
    },
    paginatedBlogs() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.blogs.slice(start, start + this.perPage);
    },
    filteredBlogs() {
      let blogs = this.blogs;
      if (this.selectedCategory) {
        blogs = blogs.filter(b => b.badge === this.selectedCategory);
      }
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        blogs = blogs.filter(blog => blog.title.toLowerCase().includes(q));
      }
      return blogs;
    },
    paginatedBlogsFiltered() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredBlogs.slice(start, start + this.perPage);
    },
    totalPagesFiltered() {
      return Math.ceil(this.filteredBlogs.length / this.perPage) || 1;
    },
    filteredSuggestions() {
      if (!this.searchQuery) return [];
      const q = this.searchQuery.toLowerCase();
      return this.blogs.filter(blog => blog.title.toLowerCase().includes(q)).slice(0, 5);
    },
  },
  methods: {
    startTyping() {
      this.typedText = '';
      this.typingIndex = 0;
      this.typingInterval = setInterval(() => {
        if (this.typingIndex < this.welcomeText.length) {
          this.typedText += this.welcomeText[this.typingIndex];
          this.typingIndex++;
        } else {
          clearInterval(this.typingInterval);
        }
      }, 70);
    },
    onSearchInput() {
      this.showSuggestions = !!this.searchQuery && this.filteredSuggestions.length > 0;
      this.suggestionIndex = -1;
      this.currentPage = 1;
    },
    moveSuggestion(dir) {
      if (!this.showSuggestions) return;
      const max = this.filteredSuggestions.length - 1;
      this.suggestionIndex = Math.max(0, Math.min(max, this.suggestionIndex + dir));
    },
    selectSuggestion() {
      if (this.suggestionIndex >= 0 && this.filteredSuggestions[this.suggestionIndex]) {
        this.goToBlog(this.filteredSuggestions[this.suggestionIndex].id);
      } else if (this.filteredBlogs.length === 1) {
        this.goToBlog(this.filteredBlogs[0].id);
      } else {
        this.showSuggestions = false;
      }
    },
    goToBlog(id) {
      this.$router.push({ name: 'BlogDetail', params: { id } });
      this.showSuggestions = false;
    },
    searchBlog() {
      if (this.filteredBlogs.length === 1) {
        this.goToBlog(this.filteredBlogs[0].id);
      } else {
        this.showSuggestions = false;
        this.currentPage = 1;
      }
    },
    goToPage(page) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    selectCategory(cat) {
      this.selectedCategory = cat === this.selectedCategory ? '' : cat;
      this.currentPage = 1;
    },
    handleScrollFloatBtns() {
      this.showFloatBtn = window.scrollY > 200;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.blogs-section {
  min-height: 70vh;
  padding: 3rem 2vw 2rem 2vw;
  background: #101010;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.blog-search-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
}
.blog-welcome {
  color: #fff;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  min-height: 3.5rem;
  letter-spacing: 1px;
}
.typing-cursor {
  display: inline-block;
  width: 1ch;
  color: #e6002d;
  font-weight: bold;
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.search-bar-container {
  position: relative;
  width: 50vw;
  min-width: 320px;
  max-width: 600px;
  display: flex;
}
.blog-search-input {
  flex: 1;
  padding: 1.2rem 1.5rem;
  font-size: 1.3rem;
  border: none;
  border-radius: 0.3rem 0 0 0.3rem;
  background: #fff6fa;
  color: #222;
  outline: none;
}
.blog-search-btn {
  background: #e6002d;
  border: none;
  border-radius: 0 0.3rem 0.3rem 0;
  color: #fff;
  font-size: 1.7rem;
  padding: 0 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.suggestions-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff6fa;
  border-radius: 0 0 0.3rem 0.3rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  z-index: 10;
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  max-height: 220px;
  overflow-y: auto;
}
.suggestions-list li {
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  color: #222;
  font-size: 1.1rem;
  transition: background 0.2s;
}
.suggestions-list li.active-suggestion,
.suggestions-list li:hover {
  background: #e6002d;
  color: #fff;
}
.blog-filters {
  display: flex;
  gap: 0.7rem;
  margin: 1.2rem 0 2rem 0;
  flex-wrap: wrap;
  justify-content: center;
}
.filter-btn {
  background: #ffe3e3;
  color: #e6002d;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}
.filter-btn.active, .filter-btn:hover {
  background: #e6002d;
  color: #fff;
}
.filter-btn.clear {
  background: #fff6fa;
  color: #333;
}
.blogs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  justify-content: center;
  width: 100%;
  max-width: 1600px;
}
.blog-card {
  background: #181818;
  border-radius: 1.2rem;
  box-shadow: 0 4px 24px rgba(255,183,0,0.08);
  padding: 0 0 2.2rem 0;
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}
.blog-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 8px 32px #ffb30044;
}
.blog-image-block {
  position: relative;
  width: 100%;
  height: 240px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.blog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.blog-badge {
  position: absolute;
  top: 18px;
  right: 18px;
  background: #ffb300;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.4rem 1.1rem;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px #ffb30033;
  letter-spacing: 1px;
  z-index: 2;
}
.badge-website { background: #ffb300; }
.badge-story { background: #ff6f61; }
.badge-tips { background: #ff6f61; }
.badge-design { background: #00bcd4; }
.badge-branding { background: #222; color: #ffb300; }
.badge-trends { background: #4caf50; }
.badge-logo { background: #673ab7; }
.blog-content {
  padding: 2.2rem 2rem 0 2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.blog-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffb300;
  margin-bottom: 1rem;
  font-family: 'Montserrat', Arial, sans-serif;
}
.blog-summary {
  color: #e0e0e0;
  font-size: 1.08rem;
  margin-bottom: 1.5rem;
  flex: 1;
}
.read-more {
  color: #ff1744;
  font-weight: 700;
  font-size: 1.2rem;
  text-decoration: none;
  margin-top: 1.2rem;
  display: inline-block;
  transition: color 0.2s;
}
.read-more:hover {
  color: #ffb300;
}
.pagination {
  margin: 2.5rem 0 0 0;
  display: flex;
  gap: 0.7rem;
  justify-content: center;
  align-items: center;
}
.page-btn {
  background: none;
  border: none;
  color: #888;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 0.2rem 0.8rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}
.page-btn.active, .page-btn:hover {
  color: #ff1744;
  background: #ffe6e6;
}
.float-back-btn {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 100;
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
@media (max-width: 900px) {
  .blogs-list {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  .blog-card {
    max-width: 98vw;
  }
}
</style>
