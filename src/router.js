import { createRouter, createWebHashHistory } from 'vue-router';
import Welcome from './components/Welcome.vue';
import Home from './components/Home.vue';
import Services from './components/Services.vue';
import About from './components/About.vue';
import Contact from './components/Contact.vue';
import Blogs from './components/Blogs.vue';
import BlogDetail from './components/BlogDetail.vue';

const routes = [
  { path: '/', name: 'Welcome', component: Welcome },
  { path: '/home', name: 'Home', component: Home },
  { path: '/services', name: 'Services', component: Services },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/blogs', name: 'Blogs', component: Blogs },
  { path: '/blogs/:id', name: 'BlogDetail', component: BlogDetail },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
