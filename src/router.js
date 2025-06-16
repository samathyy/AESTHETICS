import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Welcome', component: () => import('./components/Welcome.vue') },
  { path: '/home', name: 'Home', component: () => import('./components/Home.vue') },
  { path: '/services', name: 'Services', component: () => import('./components/Services.vue') },
  { path: '/about', name: 'About', component: () => import('./components/About.vue') },
  { path: '/contact', name: 'Contact', component: () => import('./components/Contact.vue') },
  { path: '/blogs', name: 'Blogs', component: () => import('./components/Blogs.vue') },
  { path: '/blogs/:id', name: 'BlogDetail', component: () => import('./components/BlogDetail.vue') },
  // Add a catch-all route to redirect to Welcome
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// Handle page refresh
window.addEventListener('beforeunload', () => {
  if (router.currentRoute.value.path !== '/') {
    localStorage.setItem('pageRefreshed', 'true');
  }
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('pageRefreshed') === 'true') {
    localStorage.removeItem('pageRefreshed');
    next('/');
  } else {
    next();
  }
});

export default router;
