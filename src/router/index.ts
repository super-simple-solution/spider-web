import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    redirect: '/index',
    name: 'base',
    meta: { title: '基础信息管理' },
    children: [
      {
        component: () => import('@/views/first/index.vue'),
        path: 'index',
        name: 'first',
        meta: { title: 'first' },
      },
      {
        component: () => import('@/views/second/index.vue'),
        path: 'second',
        name: 'second',
        meta: { title: 'second' },
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHashHistory('/'),
  routes: routes,
})
