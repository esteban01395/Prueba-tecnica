import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import PostDetail from '../views/PostDetail.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/post/:id', component: PostDetail }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

