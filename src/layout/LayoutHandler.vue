<script setup lang="ts">
import { defineAsyncComponent, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const metaLayout = computed(()=> route.meta?.layout as string)
const layoutName = ref('LayoutDefault');

watch(metaLayout, (value) => {
  if (value !== layoutName.value) {
    layoutName.value = value || 'LayoutDefault';
  }

  console.log(layoutName.value)
});

const layout = computed(()=>{
  const _layoutName = layoutName.value;
  return defineAsyncComponent(()=>import(`./layouts/${_layoutName}.vue`))
});

</script>

<template>
  <component :is="layout">
    <slot></slot>
  </component>
</template>