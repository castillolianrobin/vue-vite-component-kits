export default [
  {
    path: '/',
    name: 'DashboardHome',
    label: 'Dashboard',
    component: () => import('@/views/dashboard/DashboardView.vue'),
    meta: { layout: 'Dashboard' },
  },
]