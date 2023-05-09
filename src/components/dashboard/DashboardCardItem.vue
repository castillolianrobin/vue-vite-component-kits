
<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  label: String as PropType<string>,
  content: String,
})
</script>

<template>
  <div class="my-1">
    <p class="mb-1 text-sm text-secondary-500">
      <slot name="label">{{ props.label }}</slot>
    </p>
    <p><slot>{{  props?.content  }}</slot></p>
  </div>
</template>