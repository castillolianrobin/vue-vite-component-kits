<script setup lang="ts">
import { inputContainerProps, inputEmits, inputProps, themedColorProps, useFormValidation, useInputValue, useThemedColor, validationProps } from '@/composables';
import { AppFormInputContainer } from '.';
import { ref, toRef, computed, type PropType, useAttrs } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

export interface SelectItemProp {
  value: any;
  label?: string;
}
const props = defineProps({
  ...themedColorProps,
  ...inputProps,
  ...inputContainerProps,
  ...validationProps,
  items: { type: Array as PropType<SelectItemProp[] | string[] | number[]>, required: true },
  multiselect: { type: Boolean as PropType<boolean>, default: false, requireD: false },
}); 

const emits = defineEmits([
  ...inputEmits,
])

/** Attribute composable */
const attrs = useAttrs();

/** Themed color composables */
const { color } = useThemedColor(props.color);

/** Input value compsosable */
const { updateInputValue } = useInputValue(emits)

/** Form validation composable */
const {
  errorMessage,
  isRequired, 
  checkError 
} = useFormValidation(toRef(props, 'modelValue'), toRef(props, 'validations'), props.name)


/** Select Input Display  */

// Variable to display on select (will display label if present)
const displayValue = computed(()=>{
  /** Gets the label by value from modelValue */
  function getValueLabel(value: any) {
    const itemIndex = props.items
      .findIndex((_item:SelectItem)=> value === getItemValue(_item));
    
    if (itemIndex < 0) return value;

    const item = props.items[itemIndex];
    return getItemLabel(item);
  }

  if (props.multiselect && Array.isArray(props.modelValue)) {
    // display labels per value if multiselect
    return props.modelValue.map(value=>getValueLabel(value));
  }  else {
    return getValueLabel(props.modelValue);
  }
});


/** Select Items */

// reactive state for select item container
const isOpen = ref(false);

// Checks if item is type of string 
function isItemString(item: SelectItem): item is string | number {
  return typeof item === 'string' || typeof item === 'number';
}

// Select item label handler 
function getItemLabel(item: SelectItem) {
  return isItemString(item) ? item : (item?.label || item.value);
}
// get the text to be displayed 
function getItemValue(item: SelectItem) {
  return isItemString(item) ? item : item.value;
}
// return the item's key value
function getItemKey(item: SelectItem, index: number) {
  return `item-${getItemLabel(item)}-${index}`
}
// Select item state Handler 
function toggleItems(state?: boolean) {
  if (props.disabled || attrs.readonly) return;

  isOpen.value = typeof state === 'boolean' 
    ? state
    : !isOpen.value; 
}
function isActive(item: SelectItem) {
  const itemValue = isItemString(item) ? item : item.value;
  
  return props.multiselect && Array.isArray(props.modelValue)
    ? props.modelValue.includes(itemValue)
    : itemValue === props.modelValue;
}
// Select item click/keypress handler 
function onItemSelect(item: SelectItem) {
  let value = isItemString(item) ? item : item.value;

  if (props.multiselect) {
    const modelValue = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const existIndex = modelValue
      .findIndex((item)=> JSON.stringify(item) === JSON.stringify(value))
    
    if (existIndex >= 0) {
      modelValue.splice(existIndex, 1);
      value = [ ...modelValue ];
    } else {
      value = [...modelValue, value];
    }
  }
  checkError(value);
  updateInputValue(value);
  !props.multiselect && toggleItems(false);
}

type SelectItem = SelectItemProp | string | number;
</script>

<template>
  <AppFormInputContainer
    :name="props.name"
    :required="isRequired"
    :label="props.label"
    :label-class="props.labelClass"
    :error="props.error || errorMessage"
    :error-class="props.errorClass"
    :disabled="disabled"
    v-bind="{ color }" 
    container-class="relative"
    v-on-click-outside="()=>toggleItems(false)"
  >
    <slot name="prepend"></slot>
    
    <!-- Select Display -->
    <div class="flex-shrink flex-grow">
      <slot name="display" v-bind="{ displayValue, disabled: props.disabled }">
        <input
          readonly
          :value="displayValue"
          :disabled="props.disabled"
          :class="{
            'cursor-pointer': !props.disabled && !$attrs.readonly
          }"
          tabindex="0"
          class="
            w-full 
            outline-none 
            focus 
            disabled:text-secondary-400 
            bg-transparent
          "
          @click="toggleItems()" 
          @keydown.space="toggleItems()" 
        />
      </slot>
    </div>

    <!-- Select Items -->
    <Transition
      enter-active-class="duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ul
        v-if="isOpen"
        class="
          z-10
          w-full max-h-[150px]
          overflow-auto scrollbar
          absolute top-[110%] right-0 
          bg-white dark:bg-secondary-800
          shadow rounded-lg outline outline-1 outline-secondary-200
        "
        role="listbox"
      >
        <!-- Select Item -->
        <li
          v-for="(item, index) in props.items"
          :key="getItemKey(item, index)"
          :class="[
            'p-1',
            'outline-none',
            'transition',
            'hover:text-white focus:text-white',
            `hover:bg-${color} focus:bg-${color}`,
            { 
              [`bg-${color}/75 text-white`]: isActive(item) 
            }
          ]"
          :aria-selected="isActive(item)"
          tabindex="0"
          role="option"
          @click="onItemSelect(item)"
          @keypress.space="onItemSelect(item)"
        >
          {{ getItemLabel(item) }}
        </li>
      </ul>
    </Transition>
    <slot name="append"></slot>
  </AppFormInputContainer>
</template>