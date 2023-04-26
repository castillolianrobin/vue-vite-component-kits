<script setup lang="ts">
import { defineAsyncComponent, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

/** $route Composable */
const route = useRoute();
// layout meta tag listed in the route definition
const metaLayout = computed(()=> route.meta?.layout as string)
// Name of the layout to be displayed
const layoutName = ref('Default');
// Layout to be displayed 
const layout = computed(()=>{
  const _layoutName = layoutName.value;
  return defineAsyncComponent(()=>import(`./layouts/Layout${_layoutName}.vue`))
});

watch(metaLayout, (value) => {
  if (value !== layoutName.value) {
    layoutName.value = value || 'Default';
  }
});

</script>

<template>
  <component :is="layout">
    <slot></slot>
  </component>
</template>