<script setup lang="ts">
const props = defineProps({
  title: String
});
</script>

<template>
  <div>
    <h5 class="mt-6 mb-3 font-semibold">{{ props.title }}</h5>
    <div 
      class="
        py-6 p-3 
        bg-white
        border rounded
      "
    >
      <slot></slot>
    </div>
  </div>
</template>
