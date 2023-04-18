<script setup lang="ts">
import { useDark } from '@vueuse/core';
import LayoutDashboardSideBar from './LayoutDashboard/LayoutDashboardSideBar.vue';
import { AppFormCheckbox } from '@/components/app';

const isDarkMode = useDark();

  
</script>

<template>
  <div 
    class="
      relative 
      w-screen h-screen 
      grid grid-rows-dashboard grid-cols-dashboard
      text-secondary-800 dark:text-secondary-200
      bg-secondary-100 dark:bg-secondary-900 
    "
  >
    <!-- Top Navigation -->
    <header 
      class="
        px-3 py-1
        flex items-center
        bg-primary-100 dark:bg-secondary-800
        text-black dark:text-white
        row-start-1 col-span-2
      "
    >
      <h1 class="my-1 font-semibold truncate">
        Component Kits (Vite + Vue 3 + Typescript)
      </h1>

      <AppFormCheckbox
        v-model="isDarkMode"
        label="Dark"
        class="ml-auto"
        toggle-input
      ></AppFormCheckbox>
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
