<script setup lang="ts">
import { inputContainerProps, inputEmits, inputProps, themedColorProps, useFormValidation, useInputValue, useThemedColor, validationProps } from '@/composables';
import { computed, toRef } from 'vue';
import { AppFormError, AppFormLabel } from '.';


const props = defineProps({
  ...inputProps,
  ...inputContainerProps,
  ...themedColorProps,
  ...validationProps,
  activeValue: { type: undefined, default: true, required: false },
  inactiveValue: { type: undefined, default: false, required: false },
});

const emits = defineEmits([...inputEmits])

/** Theme color composable */
const { color } = useThemedColor(toRef(props, 'color'));

/** Form Input composable */
const { updateInputValue } = useInputValue(emits);

/** Form Validation composable */
const { 
  errorMessage, 
  isRequired, 
  validateOnChange, 
} = useFormValidation(toRef(props, 'modelValue'), toRef(props, 'validations'), props.name)


// value to check whether the state is active or not
const activeValue = props.activeValue || props.label || true;
const inactiveValue = props.inactiveValue === undefined ? props.inactiveValue : false;

const isActive = computed(()=>props.modelValue === activeValue);

/** Handles The input event of main input element*/
function onChangeHandler() {
  if (props.disabled) return;
  
  const inputValue = props.modelValue !== activeValue 
    ? activeValue 
    : inactiveValue;

  validateOnChange.value = true;
  updateInputValue(inputValue);
}


</script>

<template>
  <div class="inline">
    <div 
      :class="{ 'group cursor-pointer': !props.disabled }"
      class="flex gap-1 flex-nowrap items-center"
      @click="onChangeHandler"
      v-bind="{ ...$attrs }"
    >
      <!-- Checkbox Button -->
      <slot name="button" v-bind="{ isActive, disabled, onChangeHandler }">
        <div 
          :tabindex="props.disabled ? undefined : 0"
          :class="[
            `
              h-[1rem] w-[1rem] 
              border border-${color}
              group-hover:outline focus:outline outline-2 outline-${color}/50
              transition-[outline] ease-in-out duration-75
            `,
            { 'border-secondary-400': props.disabled }
          ]"
          :aria-checked="isActive"
          role="checkbox"
          @keypress.space="onChangeHandler"
        >
          <div
            v-if="isActive" 
            class="
              relative
              h-full w-full
              text-white
              flex items-center justify-center
            "
            :class="[
              `bg-${color}`,
              { 'bg-secondary-400': props.disabled },
            ]"
          >
            <!-- Check Icon (Lazy) -->
            <span class="absolute font-bold">
              &#x2713;
            </span>
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
    <AppFormError :class="props.errorClass">
      {{ props.error || errorMessage }}
    </AppFormError>
  </div>
</template>
