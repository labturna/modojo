
import Challenges from '@/pages/challenges.vue';
import Overview from '@/pages/overview.vue'
import Practice from '@/pages/practice.vue';
import Solutions from '@/pages/solutions.vue';
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
    path: '/challenges',
    name: 'Challenges',
    component: Challenges,
  },
  {
    path: '/solutions',
    name: 'Solutions',
    component: Solutions,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
