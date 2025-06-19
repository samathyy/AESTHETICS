<template>
  <section class="blog-detail-section" v-if="blog">
    <div class="blog-detail-card">
      <div class="blog-detail-image-block">
        <img :src="blog.image" :alt="blog.title" class="blog-detail-image" loading="lazy" />
        <span class="blog-badge" :class="blog.badgeClass">{{ blog.badge }}</span>
      </div>
      <div class="blog-detail-content">
        <h1 class="blog-detail-title">{{ blog.title }}</h1>
        <div class="blog-detail-body" v-html="blog.content"></div>
        <router-link to="/blogs" class="back-link">&larr; Back to Blogs</router-link>
      </div>
    </div>
  </section>
  <section v-else class="blog-detail-section">
    <div class="blog-detail-card">
      <h2>Blog not found</h2>
      <router-link to="/blogs" class="back-link">&larr; Back to Blogs</router-link>
    </div>
  </section>
</template>

<script>
import { blogStore } from '../store/blogs.js'

export default {
  name: 'BlogDetail',
  data() {
    return {
      blog: null,
    }
  },
  created() {
    const blogId = parseInt(this.$route.params.id)
    this.blog = blogStore.getBlog(blogId)
  }
}
</script>

<style scoped>
.blog-detail-section {
  min-height: 70vh;
  padding: 3rem 2vw 2rem 2vw;
  background: #101010;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.blog-detail-card {
  background: #181818;
  border-radius: 1.2rem;
  box-shadow: 0 4px 24px rgba(255,183,0,0.08);
  max-width: 700px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding-bottom: 2.5rem;
}
.blog-detail-image-block {
  position: relative;
  width: 100%;
  height: 320px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.blog-detail-image {
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
.blog-detail-content {
  padding: 2.2rem 2rem 0 2rem;
  width: 100%;
}
.blog-detail-title {
  font-size: 2.1rem;
  font-weight: 700;
  color: #ffb300;
  margin-bottom: 1.5rem;
  font-family: 'Montserrat', Arial, sans-serif;
}
.blog-detail-body {
  color: #e0e0e0;
  font-size: 1.15rem;
  margin-bottom: 2.2rem;
  line-height: 1.7;
}
.back-link {
  color: #ff1744;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  margin-top: 1.2rem;
  display: inline-block;
  transition: color 0.2s;
}
.back-link:hover {
  color: #ffb300;
}
</style>
