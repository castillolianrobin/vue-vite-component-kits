<script setup lang="ts">
import { inputContainerProps, inputEmits, themedColorProps, useFormValidation, useInputValue, validationProps } from '@/composables';
import type {  } from '.';
import { AppFormLabel, AppFormCheckbox, AppFormError } from '.';
import { toRef, type PropType, watch } from 'vue';

export interface ItemProp {
  label: string;
  value: any;
  inactiveValue?: any;
}
const props = defineProps({
  ...inputContainerProps,
  // ...inputProps,
  ...validationProps,
  ...themedColorProps,
  /** Checkbox item details */
  modelValue: {
    type: Array as PropType<any[]>,
    default: ()=>[],
    required: false,
  },
  /** Checkbox item details */
  items: {
    type: Array as PropType<ItemProp[]>,
    required: true,
  },
  /** Class to pass on checkbox container */
  containerClass: { 
    type: String, 
    default: '', 
    required: false 
  },
  /** Flag to return the unchecked value in the array value */
  returnInactive: {
    type: Boolean as PropType<boolean>,
    default: false,
    required: false,
  },
});

const emits = defineEmits([...inputEmits]);

/** Form Input Composable */
const { updateInputValue } = useInputValue(emits)

/** Form Validation Composable */
const { errorMessage, isRequired, checkError } = useFormValidation(toRef(props, 'modelValue'), toRef(props, 'validations'), props.name);  
watch(toRef(props, 'modelValue'), checkError );


/** Checkbox Group Logic */

// updates the modelValue in case the wrong data was passed 
const isValueNotarray = Array.isArray(props.modelValue);
const isValueItemUnequal = isValueNotarray && props.modelValue.length !== props.items.length;
if (isValueNotarray || (props.returnInactive && isValueItemUnequal)) {
  console.info('%c Updating modelValue to match', 'color: gray')
  
  if (!props.returnInactive) {
    updateInputValue([]);
  } else {
    const itemInactive = props.items.map(item=>getInactiveValue(item))
    updateInputValue(itemInactive);
  }
}


/** Returns the active value for the checkbox */
function getValue(item: ItemProp) {
  if (!Array.isArray(props.modelValue)) 
    return getInactiveValue(item);

  return props.modelValue.includes(item.value)
    ? item.value
    : getInactiveValue(item);
}

/** Returns the inactive value for the checkbox */
function getInactiveValue(item: ItemProp) {
  return item?.inactiveValue || false;
}

/** Handler for update:modelValue emit */
function onInputHandler(item: ItemProp, i: number) {
  const newVal = [ ...props.modelValue ];
  if (props.returnInactive) {
    newVal[i] = newVal[i] === item.value 
      ? getInactiveValue(item)
      : item.value;
  } else {
    const isExisting = newVal.findIndex(val=>val===item.value);
    if (isExisting > -1) {
      newVal.splice(isExisting, 1);
    } else {
      newVal.splice(i, 0, item.value);
    }
  }
  
  updateInputValue(newVal)
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
      <AppFormCheckbox
        v-for="item, i in props.items"
        :key="i"
        :color="props.color"
        :active-value="item.value"
        :inactive-value="getInactiveValue(item)"
        :label="item.label"
        :disabled="props.disabled"
        :model-value="getValue(item)"
        @update:model-value="onInputHandler(item, i)"
      ></AppFormCheckbox>
    </div>
    
    <!-- Error Message -->
    <AppFormError :class="props.errorClass">
      {{ props.error || errorMessage  }}
    </AppFormError>
  </div>
</template>
