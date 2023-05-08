<script setup lang="ts">
// Vue  
import { defineAsyncComponent, ref, type FunctionalComponent, type HTMLAttributes, type VNodeProps } from 'vue';
// Components
import { AppButton } from '@/components/app';
// icons
// Extra
import dashboardRoutes from '@/router/dashboardRoutes';
import userRoutes from '@/modules/User/routes';
import {
  default as LayoutDashboardSideBarItem,
  type NavigationItem
} from './LayoutDashboardSideBarItem.vue';

const active = ref(false);

const mapRouteToSidebar:<T extends NavigationItem>(nav:T)=>NavigationItem = ({ name, label, icon, children })=>({
  name: name, 
  label,
  icon: icon ? defineAsyncComponent(icon) : undefined,
  children: children ? children.map(mapRouteToSidebar) : undefined,
});

const navigations: NavigationItem[] = [
  ...dashboardRoutes,
  ...userRoutes,
].map(mapRouteToSidebar);


console.log(navigations);

</script>

<template>
  <div
    class="
      flex
      relative
      h-full
      bg-primary-900 text-secondary-200
      shadow-xl
      z-20
    "
  >
    <div class="p-1 flex-shrink-0 md:sr-only z-20 shadow-md">
      <AppButton 
        variant="outline"
        size="sm"
        class="px-0.5"
        color="white"
        @click="active = !active"
      >
        {{ active ? '&lsaquo;' : '&rsaquo;'  }}
      </AppButton>
    </div>
    <aside 
        class="
          transition-all
          md:w-screen max-w-[250px] h-full 
          overflow-auto
          absolute md:relative left-full md:left-0  
          bg-inherit
        "
        :class="{
          'w-0': !active,
          'w-screen': active,
        }"
      >
        <ul 
          class="mt-5"
        >
          <LayoutDashboardSideBarItem
            v-for="{ 
              label, name, icon, children, 
            } in navigations"
            :key="label"
            class="my-4 border-l-4 border-primary-500/0"
            v-bind="{ label, name, icon, children }"
          ></LayoutDashboardSideBarItem>
        </ul>
    </aside>
  </div>
</template>
