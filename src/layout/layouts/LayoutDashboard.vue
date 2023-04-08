<script setup lang="ts">
import LayoutDashboardSideBar from './LayoutDashboard/LayoutDashboardSideBar.vue';

  
</script>

<template>
  <div 
    class="
      w-screen h-screen 
      grid grid-rows-dashboard grid-cols-dashboard
    "
  >
    <!-- Top Navigation -->
    <header class="bg-primary-100 row-start-1 col-span-2">
      <h1 class="my-1 text-center text-xl font-semibold">
        Component Kits (Vite + Vue 3 + Typescript)
      </h1>
    </header>
    <!-- Side Bar -->
    <div class="row-start-2 max-w-[230px]">
      <LayoutDashboardSideBar></LayoutDashboardSideBar>
    </div>
    <main
      class="
        row-start-2 col-start-2 
        overflow-auto 
        bg-secondary-100 
        scrollbar
      "
    >
      <slot></slot>
    </main>
  </div>
</template>
