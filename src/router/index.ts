import LayoutDefault from '@/layout/layouts/LayoutDefault.vue'
import { createRouter, createWebHistory } from 'vue-router'
import dashboardRoutes from './dashboardRoutes';
import componentRoutes from './componentRoutes';
import userRoutes from '@/modules/User/routes';

import HomeViewVue from '@/views/public/HomeView.vue';
import { executeMiddlewares } from '@/middlewares';
import authentication from '@/middlewares/authentication';

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
      component: ()=>import('@/views/public/LoginView.vue'),
      meta: { layout: 'Default' },
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: ()=>import('@/views/public/SignUpView.vue'),
      meta: { layout: 'Default' },
    },
    {
      path: '/verify',
      name: 'VerifyUser',
      component: ()=>import('@/views/public/VerifyAccountView.vue'),
      meta: { layout: 'Default' },
    },

    // Dashboard Routes
    {
      path: '/dashboard',
      component: LayoutDefault,
      meta: { 
        layout: 'Default', 
        middleware: [ authentication ] 
      },
      children: [
        ...dashboardRoutes,
        ...userRoutes,
      ],
    },

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
});



router.beforeEach((to, from, next)=> {
  if (!to.meta.middleware) return next();

  // Run middlewares
  const context = {from, next, router, to };
  return executeMiddlewares(context);
})

export default router


