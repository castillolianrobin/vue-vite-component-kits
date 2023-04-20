import { createRouter, createWebHistory } from 'vue-router'
import dashboardRoutes from './dashboardRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Dashboard Routes
    ...dashboardRoutes.map((route)=>({
      path: route.path,
      name: route.name,
      component: route.component,
      meta: { ...route.meta },
    })),
  ]
})

export default router
