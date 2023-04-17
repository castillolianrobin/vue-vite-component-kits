<script setup lang="ts">
const props = defineProps({
  title: String
});
</script>

<template>
  <div class="flex flex-col my-5 rounded overflow-hidden">
    <h4 class="p-2 font-semibold bg-primary-200 text-primary-900">
      {{ props.title }}
    </h4>
    <div 
      class="
        py-6 p-3 
        flex-grow
        bg-white
        border rounded
      "
    >
      <slot></slot>
    </div>
  </div>
</template>
