<script setup lang="ts">

const props = defineProps({
  title: String,
  containerClass: String,
})

</script>


<template>
  <div 
    class=" transition-all"
  >
    <!-- Title -->
    <h3 
      class="
        p-1 mb-3
        text-white/80
        uppercase 
        bg-black/20
        flex items-center
      "
    >
      <slot name="title">{{  props.title  }}</slot>
    </h3>
    <div :class="`p-1 px-3 ${props.containerClass}`">
      <slot></slot>
    </div>
  </div>
</template>