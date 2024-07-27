
import Protocols from '@/pages/protocols.vue';
import Dashboard from '@/pages/dashboard.vue';
import OpenGrants from '@/pages/open-grants.vue';
import AppliedGrants from '@/pages/applied-grants.vue';
import Overview from '@/pages/overview.vue'

import { createRouter, createWebHistory } from 'vue-router/auto'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/open-grants',
    name: 'OpenGrants',
    component: OpenGrants
  },
  {
    path: '/applied-grants',
    name: 'AppliedGrants',
    component: AppliedGrants
  },
  {
    path: '/protocols',
    name: 'Protocols',
    component: Protocols
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
