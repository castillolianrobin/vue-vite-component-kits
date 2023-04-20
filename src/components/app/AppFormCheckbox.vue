<script setup lang="ts">
import { inputContainerProps, inputEmits, inputProps, themedColorProps, useFormValidation, useInputValue, useThemedColor, validationProps } from '@/composables';
import { computed, toRef, type PropType } from 'vue';
import { AppFormError, AppFormLabel } from '.';


const props = defineProps({
  ...inputProps,
  ...inputContainerProps,
  ...themedColorProps,
  ...validationProps,
  activeValue: { type: undefined, default: true, required: false },
  inactiveValue: { type: undefined, default: false, required: false },
  toggleInput: Boolean as PropType<boolean>, 
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
  <div class="inline dark:text-secondary-100">
    <div 
      :class="{ 'group cursor-pointer': !props.disabled }"
      class="flex gap-1 flex-nowrap"
      :aria-checked="isActive"
      :aria-disabled="props.disabled"
      role="checkbox"
      @click="onChangeHandler"
      v-bind="{ ...$attrs }"
    >
      <!-- Checkbox Button -->
      <slot name="checkbox" v-bind="{ isActive, disabled, onChangeHandler }">
        <div 
          v-if="props.toggleInput"
          :tabindex="props.disabled ? undefined : 0"
          class="relative mt-0.5 mx-2 w-8 h-4 border border-secondary-500 rounded-full"
          @keypress.space="onChangeHandler"
        >
          <div 
            class="absolute transition-[right] bg-primary-500 h-full aspect-square rounded-full"
            :class="isActive ? 'right-0' : 'right-4'"
          ></div>
        </div>
        
        <div 
          v-else
          :tabindex="props.disabled ? undefined : 0"
          :class="[
            `
              mt-0.5 
              h-[1rem] w-[1rem] 
              flex-shrink-0
              border border-${color}
              group-hover:outline focus:outline outline-2 outline-${color}/50
              transition-[outline] ease-in-out duration-75
            `,
            { 'border-secondary-400': props.disabled }
          ]"
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
