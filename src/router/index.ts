import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: 'base',
    meta: { title: 'home' },
    children: [
      {
        component: () => import('@/views/home/index.vue'),
        path: 'index',
        name: 'home',
        meta: { title: 'home' },
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHashHistory('/custom/'),
  routes: routes,
})
