<script setup lang="ts">
import { 
  themedColorProps, 
  inputContainerProps,
type ThemeColors,
} from '@/composables';
import { AppFormLabel, AppFormError } from '.';
import { computed } from 'vue';

const props = defineProps({
  ...themedColorProps,
  ...inputContainerProps,
})

const colorInactive = computed(():ThemeColors => {
  if (props.error) return 'error-500';
  else if (props.disabled) return 'secondary-400';
  else return 'secondary-500';
} )

</script>

<template>
  <div class="group">
    <!-- Label -->
    <AppFormLabel 
      :required="props.required"
      :disabled="props.disabled"
      :name="props.name" 
      :class="[
        `group-focus-within:text-${props.color}`,
        `${props.labelClass}`,
      ]"
    >
      {{  props.label  }}
    </AppFormLabel>
    
    <!-- Input Container -->
    <div
      :class="[`
          p-1
          flex
          bg-white/50
          rounded
          border border-${colorInactive} group-focus-within:border-${props.color}
        `,
      ]"
    >
      <slot></slot>
    </div>
    
    <!-- Error -->
    <AppFormError :class="props.errorClass">
      {{ props.error }}
    </AppFormError>
  </div>
</template>