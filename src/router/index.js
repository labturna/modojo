
import Users from '@/pages/dashboard.vue';
import Todos from '@/pages/todos.vue';
import Posts from '@/pages/posts.vue'
import Albums from '@/pages/albums.vue'
import Photos from '@/pages/photos.vue'

import { createRouter, createWebHistory } from 'vue-router/auto'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/programs'
  },
  {
    path: '/programs',
    name: 'Programs',
    component: Users
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todos
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/albums',
    name: 'Albums',
    component: Albums,
  },
  {
    path: 'photos',
    name: 'Photos',
    component: Photos,
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
