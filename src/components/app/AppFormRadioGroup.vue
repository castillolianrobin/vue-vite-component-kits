<script setup lang="ts">
import { inputContainerProps, inputEmits, inputProps, themedColorProps, useFormValidation, useInputValue, validationProps } from '@/composables';
import type {  } from '.';
import { AppFormLabel, AppFormRadio, AppFormError } from '.';
import { toRef, type PropType, watch } from 'vue';

export interface ItemProp {
  label: string;
  value: any;
}
const props = defineProps({
  ...inputContainerProps,
  ...inputProps,
  ...validationProps,
  ...themedColorProps,
  items: {
    type: Array as PropType<ItemProp[]>,
    required: true,
  },
  containerClass: { 
    type: String, 
    default: '', 
    required: false 
  },
});

const emits = defineEmits([...inputEmits]);

/** Form Input Composable */
const { updateInputValue } = useInputValue(emits)

/** Form Validation Composable */
const { errorMessage, isRequired, checkError } = useFormValidation(toRef(props, 'modelValue'), toRef(props, 'validations'), props.name);  
watch(toRef(props, 'modelValue'), checkError );


/** Radio Group Logic */

function onInputHandler(value:any) {
  if (props.modelValue === value) return;
  updateInputValue(value)
}

</script>

<template>
  <div class="block">
    <!-- Label -->
    <AppFormLabel 
      :required="isRequired"
      :name="props.name"
      :disabled="props.disabled"
      :class="props.labelClass"
    >
      {{  props.label  }}
    </AppFormLabel>
    
    <!-- Radio Group -->
    <div 
      :class="['my-2 flex gap-3', [props.containerClass]]"
      role="radiogroup"
    >
      <AppFormRadio
        v-for="item, i in props.items"
        :key="i"
        :color="props.color"
        :active-value="item.value"
        :label="item.label"
        :disabled="props.disabled"
        :model-value="props.modelValue"
        @update:model-value="onInputHandler"
      ></AppFormRadio>
    </div>
    
    <!-- Error Message -->
    <AppFormError :class="props.errorClass">
      {{ props.error || errorMessage  }}
    </AppFormError>
  </div>
</template>
