<script setup lang="ts">
import { toRef, type PropType, type InputHTMLAttributes, ref } from 'vue';
import VueTailwindDatepicker from 'vue-tailwind-datepicker';
import type { DatepickerProps } from 'vue-tailwind-datepicker/dist/types';
// Composables
import { 
  themedColorProps, 
  useThemedColor,
  useInputValue, 
  inputProps, 
  inputContainerProps,
  inputEmits,
  useFormValidation,
  validationProps,
} from '@/composables';
// App Components
import { AppFormInputContainer } from '.';

const props = defineProps({
  /** Default input property "type" */
  // type: { 
  //   type: String as PropType<'text'|'number'|'password'>, 
  //   default: 'text' 
  // },
  readonly: Boolean as PropType<InputHTMLAttributes['readonly']>,
  modelValue: {
    type: [Object, String, Array] as PropType<DatepickerProps['modelValue']>,
    required: true,
  },
  ...themedColorProps,
  ...inputContainerProps,
  ...validationProps,
  // Date Picker Props
  overlay: Boolean as PropType<boolean>,
  asSingle: Boolean as PropType<boolean>,
  useRange: Boolean as PropType<boolean>,
  placeholder: [Boolean, String] as PropType<boolean | string>,
  i18n: String,
  inputClasses: String,
  disableInRange: Boolean as PropType<boolean>,
  disableDate: [Boolean, Function] as PropType<false | ((date: Date) => boolean)>, 
  autoApply: Boolean as PropType<boolean>,
  shortcuts: Function as PropType<() => { label: string; atClick: () => Date[] }[]>,
  separator: String,
  formatter: Object as PropType<DatepickerProps['formatter']>,
  startFrom: [String, Object] as PropType<Date | string>,
  options: Object as PropType<DatepickerProps['options']>,
});

const emit = defineEmits([ 
  ...inputEmits
 ]);

/** Theme color composable */
const { color } = useThemedColor(props.color);

/** Form composable */
const { updateInputValue } = useInputValue(emit);

/** Validation composable */
const { 
  errorMessage, 
  isRequired, 
  validateOnChange, 
} = useFormValidation(toRef(props, 'modelValue'), toRef(props, 'validations'), props.name)

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
  >
    <slot name="prepend"></slot>
    <VueTailwindDatepicker
      v-bind="{ ...props, ...$attrs }"
      :class="`
        flex-grow 
        w-full 
        outline-none 
        bg-transparent 
        disabled:text-secondary-400
        peer-first:[&>*_button]:sr-only
      `"
      :aria-label="props.label"
      :model-value="props.modelValue"
      input-classes="outline-none border-none"
      @update:model-value="updateInputValue"
    />
      <!-- @input="updateInputValue"
      @focus="validateOnChange = true" -->
    <slot name="append"></slot>
  </AppFormInputContainer>
</template>