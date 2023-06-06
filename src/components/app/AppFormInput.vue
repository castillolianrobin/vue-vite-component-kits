<script setup lang="ts">
import { toRef, type PropType, type InputHTMLAttributes, ref } from 'vue';
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
import { EyeSlashIcon, EyeIcon } from '@heroicons/vue/24/solid';
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


/** Internal Logic */

const showPass = ref(false);
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
    <!-- Prepend -->
    <slot name="prepend"></slot>
    
    <!-- Input -->
    <input
      v-bind="{ ...props, ...$attrs }"
      class="
        -m-1 p-1 
        flex-grow 
        w-full
        rounded 
        outline-none 
        bg-transparent
        disabled:text-secondary-400
      "
      :aria-label="props.name || props.label"
      :value="props.modelValue"
      :type="showPass ? 'text' : props.type"
      @input="updateInputValue"
      @focus="validateOnChange = true"
    />

    <span 
      v-if="props.type === 'password'"
      class="cursor-pointer"
      @click="showPass = !showPass"
    >
      <component 
        :is=" showPass ? EyeSlashIcon : EyeIcon" 
        class="h-6"
      ></component>
    </span>
    
    <!-- Append -->
    <slot name="append"></slot>
  </AppFormInputContainer>
</template>