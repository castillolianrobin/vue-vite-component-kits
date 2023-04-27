<script setup lang="ts">
import LayoutDashboardSideBar from './LayoutComponentDashboard/LayoutComponentDashboardSideBar.vue';
import { ToggleDarkMode } from '@/components';

</script>

<template>
  <div 
    class="
      relative 
      w-full h-full 
      grid grid-rows-dashboard grid-cols-dashboard
      text-secondary-800 dark:text-secondary-200
      bg-secondary-100 dark:bg-secondary-900
      transition-colors 
    "
  >
    <!-- Top Navigation -->
    <header 
      class="
        px-1 md:px-3 py-1
        flex items-center
        bg-secondary-50 dark:bg-secondary-800
        text-black dark:text-white
        row-start-1 col-span-2
        shadow-md 
        border-b dark:border-secondary-700
        transition-colors
      "
    >
      <!-- Github Link -->
      <a 
        href="https://github.com/castillolianrobin/vue-vite-component-kits/"
        class="p-1 rounded-full bg-secondary-50 hover:underline"
        target="_blank"
      >  
        <img 
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
          alt="GitHub Link"
          class="h-5 aspect-square"
        />
      </a>

      <!-- Title -->
      <h1 class="mx-3 my-2 flex-grow text-center font-semibold truncate hidden md:block ">
        Component Kits | Vite+Vue3+Typescript
      </h1>

      <ToggleDarkMode></ToggleDarkMode>
    </header>
    <!-- Side Bar -->
    <LayoutDashboardSideBar
      class="row-start-2"
    ></LayoutDashboardSideBar>
    
    <main
      class="
        scrollbar
        row-start-2 col-start-2 
        overflow-auto 
      "
    >
      <slot></slot>
    </main>
  </div>
</template>
