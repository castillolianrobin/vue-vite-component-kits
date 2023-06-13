import type { NavigationItem } from "@/layout/layouts/LayoutDashboard/LayoutDashboardSideBarItem.vue";
import { RouterView, type RouteRecordRaw } from "vue-router";


export default [
  {
    path: 'orders',
    component: RouterView,
    name: 'Orders',
    label: 'Orders',
    icon: () => import('@heroicons/vue/24/solid/ReceiptPercentIcon'),
    meta: { title: 'Orders' },
    children: [
      {
        name: 'OrderList',
        path: 'list',
        label: 'Orders List',
        component: ()=> import('./views/OrderListView.vue'),
      },      
    ],
  }
] as Route[];


type Route = NavigationItem & RouteRecordRaw;