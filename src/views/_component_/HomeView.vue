<script setup lang="ts">
import { AppButton } from '@/components/app';
</script>

<template>
  <div class="p-3 md:p-10 h-full flex flex-col items-center justify-center">
    <h1 class="text-2xl md:text-4xl text-center font-bold text-primary-600 uppercase">
      Component Sets for Dashboard
    </h1>
    
    <p class="mt-5 text-sm md:text-lg text-center text-secondary-400 italic">
      "Themeable dashboard components made with Vue + Typescript + Tailwind CSS."
    </p>
    <p class="mt-7 text-center text-xs md:text-base">
      A set of vue components utilizing Tailwind css with the intention to improve the acceleration of development by providing reusable components similar to Vuetify but with the styling flexibility of Tailwind.
      <br />
      <br />
      The components are customizable and themeable, specially in colors. All the components uses custom colors declared in the tailwind config 
      (
        <span class="text-primary-500">primary</span>, 
        <span class="text-secondary-500">secondary</span>, 
        <span class="text-alert-500">alert</span>, 
        <span class="text-error-500">error</span>, 
        <span class="text-success-500">successt</span>, 
      ). 
      The components itself are also flexible via props which would lessen the need to customize the component codebase.
    </p>
    <div 
      class="
        mx-10 mt-10 pt-5 
        border-t-2 w-full 
        flex flex-col md:flex-row items-center justify-center gap-4 text-primary-800 dark:text-primary-300
      "
    >
      <!-- Github Link -->
      <a 
        href="https://github.com/castillolianrobin/vue-vite-component-kits/"
        class="flex items-center hover:text-primary-500 hover:underline"
        target="_blank"
      >
        <img 
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
          alt="GitHub Link"
          class="h-5 aspect-square"
        />

        <p class="ml-2">GITHUB</p>
      </a>

      <!-- Netlify Sample -->
      <router-link
        :to="{ name: 'Login'}"
        class="flex items-center hover:text-primary-500 hover:underline"
        target="_blank"
      >
        <img 
          src="https://static-00.iconduck.com/assets.00/netlify-icon-507x512-sppiy9gt.png" 
          alt="GitHub Link"
          class="h-5 aspect-square"
        />

        <p class="ml-2">SAMPLE DASHBOARD</p>
      </router-link>

      <!-- Netlify Sample -->
      <a 
        href="https://zen-wozniak-de473d.netlify.app/login"
        class="flex items-center hover:text-primary-500 hover:underline"
        target="_blank"
      >
        <img 
          src="https://static-00.iconduck.com/assets.00/netlify-icon-507x512-sppiy9gt.png" 
          alt="GitHub Link"
          class="h-5 aspect-square"
        />

        <p class="ml-2">SAMPLE DASHBOARD <span class="text-secondary-400">(LEGACY)</span></p>
      </a>
    </div>
  </div>
</template>
