<script setup lang="ts">
import type { PropType } from 'vue';


const props = defineProps({
  error: String as PropType<string>,
})

</script>

<template>
  <p 
    :class="`text-error-500 text-xs`"
    aria-label="error message"
  >
    <slot>{{ props.error }}</slot>
  </p>
</template>