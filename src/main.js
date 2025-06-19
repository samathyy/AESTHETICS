import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VueLazyload from 'vue-lazyload'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const app = createApp(App)

// Use Vue Router
app.use(router)

// Use Vue Lazyload for better image loading
app.use(VueLazyload, {
  preLoad: 1.3,
  error: '/src/assets/images/error.svg',
  loading: '/src/assets/images/loading.svg',
  attempt: 1
})

// Make GSAP available globally
app.config.globalProperties.$gsap = gsap

app.mount('#app')
