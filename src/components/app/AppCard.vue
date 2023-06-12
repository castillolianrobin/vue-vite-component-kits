<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();
</script>

<template>
  <div 
    role="dialog"
    aria-label="card" 
    class="
      card
      p-1 md:p-3
      flex flex-col 
      bg-white dark:bg-secondary-800
      text-secondary-800 dark:text-secondary-200
      border border-secondary-200 dark:border-secondary-600 
      shadow-md
      rounded
      transition-colors
    "
  >
    <!-- Card Title -->
    <h3 
      v-if="slots.title || $attrs.title" 
      class="text-lg md:text-xl font-semibold"
    >
      <slot name="title">{{  $attrs.title }}</slot>
    </h3>
    <!-- Card Subtitle -->
    <p
      v-if="slots.subtitle" 
      class="text-sm text-gray-500 dark:text-gray-400"
    >
      <slot name="subtitle"></slot>
    </p>
    <!-- Card Content -->
    <div class="my-2">
      <slot></slot>
    </div>

    <div v-if="slots.actions" class="mt-auto pt-4 flex gap-2 items-center justify-end">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
