import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: 'base',
    meta: { title: '基础信息管理' },
    children: [
      {
        component: () => import('@/views/company/index.vue'),
        path: 'index',
        name: 'company',
        meta: { title: '企业基本信息' },
      },
      {
        component: () => import('@/views/passenger/index.vue'),
        path: 'passenger',
        name: 'passenger',
        meta: { title: '乘车人员管理' },
      },
    ],
  },
  {
    path: '/trip',
    component: Layout,
    name: 'trip',
    meta: { title: '车次管理' },
    children: [
      {
        component: () => import('@/views/plan_trip/index.vue'),
        path: 'index',
        name: 'trip',
        meta: { title: '车次管理' },
      },
    ],
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order',
    name: 'order',
    meta: { title: '订单管理' },
    children: [
      {
        component: () => import('@/views/order/index.vue'),
        path: 'index',
        name: 'order',
        meta: { title: '订单管理' },
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHashHistory('/custom/'),
  routes: routes,
})
