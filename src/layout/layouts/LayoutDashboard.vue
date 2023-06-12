<script setup lang="ts">
import { TransitionFade } from '@/components/transitions';
import LayoutDashboardSideBar from './LayoutDashboard/LayoutDashboardSideBar.vue';
import LayoutDashboardTopBar from './LayoutDashboard/LayoutDashboardTopBar.vue';
  
</script>

<template>
  <div 
    id="layout-dashboard"
    class="w-full h-full"
  >
    <div 
      class="
        relative
        w-full h-full
        grid grid-rows-dashboard grid-cols-dashboard
        text-secondary-800 dark:text-secondary-200
        bg-secondary-100 dark:bg-secondary-900 
      "
    >
      <!-- Top Navigation -->
      <LayoutDashboardTopBar
        class="row-start-1 col-start-2"
      ></LayoutDashboardTopBar>
      <!-- Side Bar -->
      <LayoutDashboardSideBar
        class="row-start-1 row-span-2"
      ></LayoutDashboardSideBar>
      
      <main
        class="
          p-2 md:p-5  
          row-start-2 col-start-2 
          overflow-auto 
          scrollbar
        "
      >
        <slot></slot>
      </main>
    </div>
  </div>
</template>
