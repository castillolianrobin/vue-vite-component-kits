// import LayoutDefault from '@/layout/layouts/LayoutDefault.vue';

export default [
  {
    path: 'home',
    name: 'DashboardHome',
    // component: ()=> import('@/views/dashboard/DashboardView.vue'),
    component: ()=> import('./views/DashboardView.vue'),
    label: 'Dashboard',
    icon: () => import('@heroicons/vue/24/solid/UserGroupIcon'),
    meta: { title: 'Dashboard' },
  },
  
]