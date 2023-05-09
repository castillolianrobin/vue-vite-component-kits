import { computed, inject, isRef, provide, ref, unref, watch, type ComputedRef, type PropType, type Ref } from "vue";
import { parseValidationArray, parseValidationString, type Validation } from "./validations";
export { type Validation, type ValidationResults } from './validations';
export const formValidationEmits:['validate'] = [ 'validate' ]
/**
 * Initalizes the form component to be used for validating input components.
 * The useFormValidation() hook has script intended to utilize this hook
 * @param {Object} context context from component (needed for emitting events)
 * @returns {Object}
 */
export const createFormValidation: CreateFormValidation = function (emit) {
  /** Validation key: This will be injected to child component with usValidation composables */
  const validationKey = ref("");
  /** List of Errors */
  const errors = ref<string[]>([]);
  /** Number of inputs included in the checking */
  const inputCtr = ref(0);
  /** Number of inputs validated upon checking */
  const validInputCtr = ref(0);
  /** Increments the number of input to be linked to parent form */
  function addInput() {
    inputCtr.value += 1;
  }
  /** Increments the number of validated input when 'validate' event has been called */
  function addValidatedInput(error?: string) {
    validInputCtr.value += 1;
    error && addError(error);
  }
  
  function resetError() {
    errors.value = [];
    validInputCtr.value = 0;
  }

  function addError(error: string) {
    errors.value.push(error);
  }

  /** Provider for inputs using useInput(): */
  provide<FormProvider>('formProvider', { 
    validationKey, 
    addInput, 
    addValidatedInput 
  });
  
  /**
   * Emits validated event
   * @param {*} _errors - Errors to emit upon validation
   */
  function emitValidate(_errors: boolean | string[] = false) {
    emit("validate", _errors ? _errors as string[] : errors.value);
  }

  /**  if number of inputs validated is equal to inputs included, emit validated */
  watch(validInputCtr, () => {
    inputCtr.value === validInputCtr.value && emitValidate();  
  });
 
  function startFormValidation() {
    resetError();
    validationKey.value = `val-key-${Math.random() * 10}`;
  }

  return {
    errors,
    inputCtr,
    validInputCtr,
    validationKey,
    startFormValidation,
    emitValidate,
  };
}


/** Validation Props */
export const validationProps = {
  /** List of validation to be checked */
  validations: {
    type: [String, Array] as PropType<ValidationItem[] | string>,
    default: [],
    required: false,
  },
  /** Display name for error (only works for default validation or custom validation with second parameter) */
  name: { type: String as PropType<string>, default: "", required: false, },
};



/**
 * Hook for validating input values
 * @param value - Value to be validated
 * @param validations - List of validation to run on value
 * @param name - Field name to display on error (will be passed as second argument to any validation functions) 
 */
export const useFormValidation:UseFormValidation = function (value, validations, name) {

  /** Error message to be displayed */
  const errorMessage = ref('');

  /** LOCAL COMPUTED VARIABLE: returns all the set of validation functions based on validation props */
  const validationArr = computed<ValidationItemFunction[]>(() => {
    const _validations = unref(validations);
    
    if (typeof _validations === "string") {
      return parseValidationString(_validations)      
    } else if (Array.isArray(_validations)) {
      return parseValidationArray(_validations);
    } else { 
      return []; 
    }
  });

  /** Returns whether there is "required" validation on the validations property */
  const isRequired = computed<boolean>(() => {
    const _validations = unref(validations);
    if (typeof _validations === "string") {
      return _validations.includes("required");
    } else {
      return _isRequired(validationArr.value)
    }
  });

  /**
   * Validates the given value based on the set of validation props
   * @returns false (no error acquired) \ error message from validations 
   */
  function validateValue(val: unknown): string | false {
    const _value = val;
    const _validations = unref(validationArr);
    const fieldName = unref(name) || '';
    
    return _validateValue(_value, _validations, fieldName);
  }

  /**
   * Checks for error and update the errorMessage's value accordingly
   * @param {*} val - Value to be checked
   */
  function checkError(val: unknown | Ref<unknown> = false): string | boolean {
    let _val = unref(val) || unref(value);
    if (_val instanceof Event ) {
      _val = (<HTMLInputElement>_val.target).value;
    }
    errorMessage.value = validateValue(_val) || '';
    
    return errorMessage.value;
  }

  /**
   * This script will only work with parent using createFormValidation()
   * Adds validation via createFormValidation()'s providers
   */
  const formProvider = inject<FormProvider | undefined>('formProvider', undefined );
  if (formProvider?.validationKey) {
    formProvider.addInput();
    
    watch(formProvider.validationKey, () => {
      checkError(unref(value));
      formProvider.addValidatedInput(unref(errorMessage))
    });
  }
  /**
  * This script will only work if validateOnChange is toggled
  */
  const validateOnChange = ref(false);
  if (isRef(value)) {
    watch(value, ()=> {
      validateOnChange.value && checkError(unref(value));
    });
  }

  return {
    isRequired,
    checkError,
    errorMessage,
    validateOnChange,
  };
}

/** useValidation Local Functions */
function _isRequired(validations: (Validation|(()=>Validation))[] ) {
  return (
    validations.filter((rule) => {
      return rule("")
        .toString()
        .includes("shouldn't be empty.");
    }).length > 0
  );
}


function _validateValue(_value: unknown, validations: ValidationItemFunction[], fieldName?:string): string | false {
  for (const rule of validations) {
    let validate: string | boolean = false;
    const innerRule = rule();
    if (typeof innerRule === "function") {
      validate = innerRule(_value, fieldName);
    } else if (typeof innerRule === 'boolean' || typeof innerRule === 'string') {
      validate = rule(_value, fieldName) as (string | true)
    }
    if (validate !== true) {                                  
      return validate;
    }
  }
  return false;
}


/** __TYPE DEFINITION__ */

interface CreateFormValidation {
    (emit: FormEmits): {
      errors: Ref<string[]>;
      inputCtr: Ref<number>;
      validInputCtr: Ref<number>;
      validationKey: Ref<string>;
      startFormValidation: () => void;
      emitValidate: (_errors?: boolean | string[]) => void;
    }
}

/** Form Props Type */
/** emit type used by initForm hook */
export interface FormEmits {
  (e: "validate", flag: string[]): void;
}

/** Form Provide/Inject Type */
export interface FormProvider {
  validationKey: Ref<string>;
  addInput: () => void;
  addValidatedInput: (error?: string) => void;
}
      
/** useFormValidation interface */
export interface UseFormValidation {
  ( 
    value: Ref<unknown> | undefined,
    validations: Ref<Array<ValidationItem> | string> | Array<ValidationItem> | string,
    name?: Ref<string> | string
  ): useFormValidationReturn
}

interface useFormValidationReturn {
  isRequired: ComputedRef<boolean>;
  checkError: (val?: unknown) => string | boolean;
  errorMessage: Ref<string>;
  validateOnChange: Ref<boolean>;
  // updateValid: (flag: boolean) => void;
}

/** Used in validation props. Type for validation passed in useformValidation() second argument  */
export type ValidationItem = Validation | string;
export type ValidationItemFunction = (Validation|(()=>Validation))