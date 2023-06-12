import LayoutDefault from '@/layout/layouts/LayoutDefault.vue';

export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./views/RegisterView.vue'),
  },

  // {
  //   path: 'user',
  //   name: 'User',
  //   component: LayoutDefault,
  //   meta: { layout: 'Dashboard',  },
  //   label: 'Users',
  //   icon: () => import('@heroicons/vue/24/solid/UserGroupIcon'),
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'UserList',
  //       component: () => import('./views/UsersView.vue'),
  //       meta: { layout: 'Dashboard'},
  //       label: 'View All Users',
  //       icon: () => import('@heroicons/vue/24/solid/UserGroupIcon'),
  //     },
  //     {
  //       path: 'create',
  //       name: 'UserCreate',
  //       component: () => import('./views/UserCreateView.vue'),
  //       meta: { layout: 'Dashboard' },
  //       label: 'Create',
  //       icon: () => import('@heroicons/vue/24/solid/UserPlusIcon'),
  //     },
  //     {
  //       path: ':id/show',
  //       name: 'UserShow',
  //       component: () => import('./views/UserView.vue'),
  //       meta: { layout: 'Dashboard'},
  //       hidden: true,
  //       label: 'View All Users',
  //       icon: () => import('@heroicons/vue/24/solid/UserGroupIcon'),
  //     },

  //   ]
  // },
  
]