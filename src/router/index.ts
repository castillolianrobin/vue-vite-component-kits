import LayoutDefault from '@/layout/layouts/LayoutDefault.vue'
import { createRouter, createWebHistory } from 'vue-router'
import dashboardRoutes from './dashboardRoutes';
import componentRoutes from './componentRoutes';
import HomeViewVue from '@/views/public/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeViewVue  ,
      meta: { layout: 'Default' },
    },
    {
      path: '/login',
      name: 'Login',
      component: import('@/views/public/LoginView.vue'),
      meta: { layout: 'Default' },
    },

    // Dashboard Routes
    // {
    //   path: '/dashboard',
    //   component: LayoutDefault,
    //   children: [
    //     ...dashboardRoutes.map((route)=>({
    //       path: route.path.substring(1),
    //       name: route.name,
    //       component: route.component,
    //       meta: { ...route.meta, layout: 'Dashboard' },
    //     })),
    //   ],
    // },

    // Component Kit Routes
    {
      path: '/_component',
      component: LayoutDefault,
      children: [
        ...componentRoutes.map((route)=>({
          path: route.path.substring(1),
          name: route.name,
          component: route.component,
          meta: { ...route.meta, layout: 'ComponentDashboard' },
        })),
      ],
    },
  ]
})

export default router
