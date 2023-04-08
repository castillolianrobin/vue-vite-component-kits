import type { InputHTMLAttributes, PropType } from "vue";


/**
 * COMPOSABLE TO HANDLE 
 */


/** Input Props */
export const inputProps = {
  modelValue: { 
    type: [String, Number, Boolean, Array, Object, undefined] as PropType<any>, 
    required: false, 
    default: null 
  },
};

/** Input Events */
export const inputEmits: ['update:modelValue'] = ["update:modelValue"];

/**
 * Hook for binding the input event of input tag to update:modelValue
 */
export function useInputValue(emit: InputEmits) {
  /**
   * Emits an event to update the modelValue props (intended for v-model)
   */
  function updateInputValue(value: Event | any) {
    let newVal: any;
    if (value instanceof Event) {
      const valueTarget = value.target as HTMLInputElement;
      newVal = valueTarget.value;
    } else {
      newVal = value;
    }
    emit(inputEmits[0], newVal);
  }

  return { updateInputValue };
}

/** Input Base Props */
export const inputContainerProps = {
  /** Default input property "required" */
  required: { type: Boolean as PropType<boolean>, default: false, required: false },
  /** Default input disabled attrisbute  */
  disabled: { type: Boolean as PropType<InputHTMLAttributes['disabled']>, default: false, required: false },
  /** Default input property "name" */
  name: { type: String as PropType<string>, default: '', required: false },
  /** Label of the input field */
  label: { type: String as PropType<string>, default: '', required: false },
  /** Additional class for label */
  labelClass: { type: String as PropType<string>, default: '', required: false },
  /** Error Message */
  error: { type: String as PropType<string>, default: '', required: false },
  /** Error Message */
  errorClass: { type: String as PropType<string>, default: '', required: false },
  /** Class for input container */
  containerClass: { type: String as PropType<string>, default: '', required: false },
};


/** TYPE DEFINITIONS */

/** Input Events Interface */
export interface InputEmits {
  (e: `${typeof inputEmits[0]}`, value: unknown): void;
}