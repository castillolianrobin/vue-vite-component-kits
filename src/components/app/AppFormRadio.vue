<script setup lang="ts">
import { inputContainerProps, inputEmits, inputProps, themedColorProps, useFormValidation, useInputValue, useThemedColor, validationProps } from '@/composables';
import { computed, toRef, watch, type PropType } from 'vue';
import { AppFormError, AppFormLabel } from '.';


const props = defineProps({
  ...inputProps,
  ...inputContainerProps,
  ...themedColorProps,
  ...validationProps,
  activeValue: { 
    type: [String, Number, Object, Array, Boolean] as PropType<any>, 
      default: undefined, 
      required: false 
    },
});

const emits = defineEmits([...inputEmits])

/** Theme color composable */
const { color } = useThemedColor(toRef(props, 'color'));

/** Form composable */
const { updateInputValue } = useInputValue(emits);

/** Form Validation composable */
const { 
  errorMessage, 
  isRequired, 
  checkError 
} = useFormValidation(toRef(props, 'modelValue'), toRef(props, 'validations'), props.name)
watch(toRef(props, 'modelValue'), checkError );

// value to check whether the state is active or not
const activeValue = props.activeValue || props.label || props.label;

const isActive = computed(()=>props.modelValue === activeValue);

/** Handles The input event of main input element*/
function onChangeHandler(){
  !props.disabled && updateInputValue(activeValue);
}

/** Trigger attributes and event */
const radioAttrs = computed(()=>({
  // OnClick Event
  onclick: onChangeHandler,
  // @keypress.space.enter=""
  // Aria Attrs
  role: 'radio',
  'aria-label': props.label,
  'aria-checked': isActive.value,
  'aria-disabled': props.disabled,
  'data-value': activeValue,
}));


</script>

<template>
  <div class="inline">
    <div 
      :class="{ 'group cursor-pointer': !props.disabled }"
      class="flex flex-nowrap flex-row gap-1 items-center"
      @click="onChangeHandler"
      v-bind="{ ...$attrs }"
    >
      <!-- Radio Button -->
      <slot v-bind="{ props: radioAttrs }">
        <div
          :tabindex="props.disabled ? undefined : 0"
          :class="[
            `
              p-0.5
              h-[1rem] w-[1rem] 
              rounded-full
              border border-${color}
              group-hover:outline focus:outline outline-2 outline-${color}/50
              transition-[outline] ease-in-out duration-75
            `,
            { 'border-secondary-400': props.disabled },
          ]"
          :aria-disabled="props.disabled"
          :aria-label="props.label"
          :aria-checked="isActive"
          :data-value="activeValue"
          role="radio"
          @keypress.space.enter="onChangeHandler"
    
        >
          <div
            v-if="isActive" 
            :class="`
              relative
              rounded-full
              flex items-center justify-center 
              h-full w-full 
              text-white
              bg-${color}
            `"
          >
          </div>
        </div>
      </slot>
      <AppFormLabel
        size="sm"
        :required="isRequired"
        :disabled="props.disabled"  
        :class="[
          `group-hover:text-${color}`,
          {
            'cursor-pointer': !props.disabled,
            [`text-${color}`]: isActive,
          }
         ]"
      >
        {{ props.label }}
      </AppFormLabel>
    </div>
    <AppFormError>
      {{ props.error || errorMessage}}
    </AppFormError>
  </div>
  
</template>
