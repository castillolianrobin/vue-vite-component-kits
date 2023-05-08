export default [
  {
    path: 'home',
    name: 'DashboardHome',
    label: 'Dashboard',
    component: () => import('@/views/dashboard/DashboardView.vue'),
    icon: () => import('@heroicons/vue/24/solid/HomeIcon'),
    meta: { layout: 'Dashboard' },
  },
  // {
  //   path: '/user',
  //   name: 'DashboardUser',
  //   label: 'User',
  //   component: () => import('@/views/dashboard/UsersView.vue'),
  //   icon: () => import('@heroicons/vue/24/solid/UserGroupIcon'),
  //   meta: { layout: 'Dashboard' },
  // },
  
]