<script setup lang="ts">
const props = defineProps({
  title: String
});
</script>

<template>
  <div class="flex flex-col">
    <h4 class="mt-6 mb-3 font-semibold">
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
