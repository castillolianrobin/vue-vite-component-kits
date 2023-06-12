<script setup lang="ts">
import { TransitionGroup, type PropType, Transition } from 'vue';

const props = defineProps({
  group: { type: Boolean as PropType<boolean>, default: false, },
});

</script>

<template>
  <component 
    :is="props.group ? TransitionGroup : Transition"
    enter-active-class="duration-150 ease-out"
    enter-from-class="opacity-0 -translate-y-1/2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <slot></slot>
  </component>
</template>