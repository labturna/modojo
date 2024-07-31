
import Dashboard from '@/pages/dashboard.vue';
import Overview from '@/pages/overview.vue'
import Practice from '@/pages/practice.vue';
import { createRouter, createWebHistory } from 'vue-router/auto'

const routes = [
  {
    path: '/',
    redirect: '/overview',
    component: () => import('../pages/overview.vue'),
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview,
  },
  {
    path: '/practice',
    name: 'Practice',
    component: Practice,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
