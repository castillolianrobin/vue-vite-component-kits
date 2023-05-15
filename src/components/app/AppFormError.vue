<script setup lang="ts">
import { computed, useSlots, type PropType } from 'vue';

/** Slot Composable */
const slots = useSlots();

const props = defineProps({
  error: String as PropType<string>,
});

const hasError = computed(()=>
 props.error || slots.default && slots.default()[0].children
);

</script>

<template>
  <Transition
    enter-active-class="duration-500 ease-out"
    enter-from-class="max-h-0 opacity-0"
    enter-to-class="max-h-12 opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="max-h-12 opacity-100"
    leave-to-class="max-h-0 opacity-0"
  >
    <p
      v-if="hasError" 
      :class="`text-error-500 text-xs`"
      aria-label="error"
      role="alert"
    >
      <slot>{{ props.error }}</slot>
    </p>
  </Transition>
</template>