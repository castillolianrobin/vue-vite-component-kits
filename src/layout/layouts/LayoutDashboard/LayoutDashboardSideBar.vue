<script setup lang="ts">
// Vue  
import { defineAsyncComponent, ref, type FunctionalComponent, type HTMLAttributes, type VNodeProps } from 'vue';
import type { RouteRecordName } from 'vue-router';
// Components
import { AppButton } from '@/components/app';
// icons
import { HomeIcon } from '@heroicons/vue/24/solid'
// Extra
import dashboardRoutes from '@/router/dashboardRoutes';

const navigations: Navigation[] = dashboardRoutes
  .map(({ name, label, icon })=>({
    routeName: name, 
    label,
    icon: icon ? defineAsyncComponent(icon) : HomeIcon,
  }));

const active = ref(false);

interface Navigation {
  routeName: RouteRecordName;
  label: string;
  icon: FunctionalComponent<HTMLAttributes & VNodeProps, {}>
}
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
    
        <ul class="mt-5">
          <li
            v-for="nav in navigations"
            :key="nav.label"
          >
            <router-link
              :to="{ name: nav.routeName }"
              class="
                w-full 
                flex items-center gap-2
                pl-3 my-2 
                outline-none            
                focus-with    in:text-primary-200
                hover:text-primary-300
                border-l-4 border-primary-500/0
                transition-colors
              "
              active-class="
                border-primary-500/100 
                font-semibold
              "
              @click="active = false"
            >
              <!-- Icon -->
              <component 
                :is="nav.icon" 
                class="h-5"
              ></component>
              <!-- Text -->
              <span>{{  nav.label  }}</span>
            </router-link>
          </li>
        </ul>
    </aside>
  </div>
</template>
