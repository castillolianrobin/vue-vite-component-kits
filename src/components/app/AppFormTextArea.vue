<script setup lang="ts">
import { toRef, type PropType, watch, ref } from 'vue';
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
  /** Flag to remove resize button on text area  */
  disableResize: { 
    type: Boolean as PropType<boolean>, 
      default: false, 
      required: false 
  },
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
  checkError 
} = useFormValidation(toRef(props, 'modelValue'), toRef(props, 'validations'), props.name)
watch(toRef(props, 'modelValue'), checkError );


/** Text Area Resize Function */

// textarea min height
const minHeight = ref('0')
// template ref for a hidden text area to base the min height of actual textarea tag 
const shadowTextAreaRef = ref<HTMLTextAreaElement>();
// Set the new height of the text area based on inputted lines
function resizeTextArea() {
  const allowance = 30;
  minHeight.value = `${(shadowTextAreaRef.value?.scrollHeight || 0) + allowance}px`;
}

watch(toRef(props, 'modelValue'), resizeTextArea, { immediate: true });
</script>

<template>
  <AppFormInputContainer
    :name="props.name"
    :required="isRequired"
    :label="props.label"
    :label-class="props.labelClass"
    :error="props.error || errorMessage"
    :error-class="props.errorClass"
    v-bind="{ color }"
  >
    <textarea
      :value="props.modelValue"
      :style="{ minHeight }"
      :class="{ 'resize-none': props.disableResize }"
      class="flex-grow outline-none bg-transparent scrollbar"
      v-bind="{ ...props }"
      @input="updateInputValue"
    />
    
    <textarea
      :value="props.modelValue"
      ref="shadowTextAreaRef"
      tabindex="-1"
      class="absolute max-h-0 w-full pointer-events-none opacity-0 margin-0"
    />
  </AppFormInputContainer>
</template>