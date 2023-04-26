<script setup lang="ts">
</script>

<template>
  <div class="p-3 md:p-10 h-full flex flex-col items-center justify-center">
    <h1 class="text-3xl text-center font-semibold">
      Component Sets for Dashboard
    </h1>
    <p class="mt-7 text-center text-xs md:text-base">
      A set of vue components utilizing Tailwind css with the intention to improve the acceleration of development by providing reusable components similar to Vuetify but with the flexibility of Tailwind.

      The components are customizable and themeable, specially in colors. All the components uses custom colors declared in the tailwind config (primary, secondary, info, alert, error, success). The components itself are also flexible via props which would lessen the need to customize the component codebase.
    </p>
    <div 
      class="
        mx-10 mt-10 pt-5 
        border-t-2 w-full 
        flex flex-col md:flex-row items-center justify-center gap-4 text-primary-800
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

        <p class="ml-2">SAMPLE DASHBOARD</p>
      </a>
    </div>
  </div>
</template>
