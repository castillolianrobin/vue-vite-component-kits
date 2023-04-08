<script setup lang="ts">
import { 
  createThemedColor, type ThemeColors, 
  createFormValidation, formValidationEmits,
} from '@/composables';
import { toRefs, type PropType } from 'vue';

const props = defineProps({
  color: { type: String as PropType<ThemeColors>, default: ''},
});

const emits = defineEmits([
  ...formValidationEmits,
]);
createThemedColor(toRefs(props).color);

const { errors, startFormValidation } = createFormValidation(emits)


</script>

<template>
  <form
    enctype="multipart/form-data"
    @submit.prevent="startFormValidation"
  >
    <!-- {{ errors  }} -->
    <slot></slot>
  </form>
</template>
