<script setup lang="ts">
import { toRef, type PropType, watch, type InputHTMLAttributes } from 'vue';
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
  type: { 
    type: String as PropType<'text'|'number'|'password'>, 
    default: 'text' 
  },
  readonly: Boolean as PropType<InputHTMLAttributes['readonly']>,
  ...themedColorProps,
  ...inputProps,
  ...inputContainerProps,
  ...validationProps,
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
    :color="props.color"
  >
    <slot name="prepend"></slot>
    <input
      class="
        flex-grow 
        w-full 
        outline-none 
        bg-transparent 
        disabled:text-secondary-400
      "
      :aria-label="name"
      :value="props.modelValue"
      @input="updateInputValue"
      @focus="validateOnChange = true"
      v-bind="{ ...props, ...$attrs }"
    />
    <slot name="append"></slot>
  </AppFormInputContainer>
</template>