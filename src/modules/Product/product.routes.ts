import type { NavigationItem } from "@/layout/layouts/LayoutDashboard/LayoutDashboardSideBarItem.vue";
import { RouterView, type RouteRecordRaw } from "vue-router";


export default [
  {
    path: 'product',
    component: RouterView,
    name: 'Product',
    label: 'Product',
    icon: () => import('@heroicons/vue/24/solid/ShoppingCartIcon'),
    meta: { title: 'Products' },
    children: [
      {
        name: 'ProductList',
        path: 'list',
        label: 'Product List',
        component: ()=> import('./views/ProductListView.vue'),
      },
      {
        name: 'ProductAdd',
        path: 'add',
        label: 'Add Product',
        component: ()=> import('./views/ProductAddView.vue'),
      },
      
    ],
  }
] as Route[];


type Route = NavigationItem & RouteRecordRaw;