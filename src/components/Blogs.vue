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
        <button class="blog-search-btn" @click="searchBlog" title="Search Blog">
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
          <img :src="blog.image" :alt="blog.title" class="blog-image" loading="lazy" />
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
import { blogStore } from '../store/blogs.js'

export default {
  name: 'Blogs',
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      currentPage: 1,
      perPage: 6,
      showFloatBtn: false,
      typedText: '',
      fullText: 'Welcome to Our Blog',
      showCursor: true,
      suggestionIndex: -1,
      showSuggestions: false,
    }
  },
  computed: {
    blogs() {
      return blogStore.blogs
    },
    filteredBlogs() {
      let filtered = this.blogs
      
      if (this.selectedCategory) {
        filtered = filtered.filter(blog => blog.badge === this.selectedCategory.toUpperCase())
      }
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(blog => 
          blog.title.toLowerCase().includes(query) || 
          blog.summary.toLowerCase().includes(query)
        )
      }
      
      return filtered
    },
    categories() {
      const categories = new Set(this.blogs.map(blog => blog.badge))
      return ['All', ...Array.from(categories)]
    },
    totalPagesFiltered() {
      return Math.ceil(this.filteredBlogs.length / this.perPage)
    },
    paginatedBlogsFiltered() {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.filteredBlogs.slice(start, end)
    },
    filteredSuggestions() {
      if (!this.searchQuery) return []
      const query = this.searchQuery.toLowerCase()
      return this.blogs.filter(blog => 
        blog.title.toLowerCase().includes(query)
      ).slice(0, 5)
    }
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
  methods: {
    startTyping() {
      this.typedText = '';
      this.typingIndex = 0;
      this.typingInterval = setInterval(() => {
        if (this.typingIndex < this.fullText.length) {
          this.typedText += this.fullText[this.typingIndex];
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
