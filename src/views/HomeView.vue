<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div class="p-5 h-full flex flex-col items-center justify-center">
    <h1 class="text-3xl text-center font-semibold">
      Component Sets for Dashboard
    </h1>
    <div class="mx-10 mt-10 pt-5 border-t-2 w-full flex flex-col items-center">
      <!-- Github Link -->
      <a 
        href="https://github.com/castillolianrobin/vue-vite-component-kits/"
        class="flex items-center hover:text-primary-500 hover:underline"
        target="_blank"
      >
        <img 
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
          alt="GitHub Link"
          class="h-5 aspec-square"
        />

        <p class="ml-2">GITHUB</p>
      </a>
    </div>
  </div>
</template>
