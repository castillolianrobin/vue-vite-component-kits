<script setup lang="ts">
const props = defineProps({
  title: String
});
</script>

<template>
  <div class="pb-5">
    <div 
      class="
        flex 
        flex-col 
        border dark:border-secondary-600
        rounded
        max-w-screen
        h-full 
        transition-colors
      "
    >
      <h4 
        class="
          p-2
          rounded-t
          font-semibold 
          bg-gradient-to-r 
          from-primary-200 dark:from-primary-700 
          to-secondary-100 dark:to-secondary-700 
          bg-primary-200 dark:bg-primary-700
          text-primary-900 dark:text-primary-100
          truncate
          capitalize
        "
      >
        {{ props.title }}
      </h4>
      <div 
        class="
          py-6 p-1 md:p-3 
          flex-grow
          rounded-b
          w-full
          bg-white dark:bg-secondary-800
        "
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
