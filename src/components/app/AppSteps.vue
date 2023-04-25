<script setup lang="ts">
import { inputEmits, inputProps, themedColorProps, useInputValue, useThemedColor } from '@/composables';
import { ref, computed, type PropType, watch, toRef } from 'vue';
import { AppButton } from '.';

const props = defineProps({
  modelValue: {
    type: [Number, String] as PropType<number | string>,
    default: 1,
    required: false,
  },
  steps: {
    type: [String, Number, Array] as PropType<string | number | string[]>,
    required: true,
  },
  disabled: Boolean as PropType<boolean>,
  eager: Boolean as PropType<boolean>,
  containerClass: String,
  ...themedColorProps,
})

const emits = defineEmits([...inputEmits])

const { updateInputValue } = useInputValue(emits);

/** Themed Color composables */
const { color } = useThemedColor(props.color);


const currentStep = ref(+props.modelValue);
const stepsComputed = computed(()=>
  Array.isArray(props.steps) 
    ? props.steps 
    : new Array(+props.steps).fill('').map((_,i)=>`Step ${i+1}`)  
)

function gotoStep(step = currentStep.value + 1) {
  if (props.disabled) return;
  
  currentStep.value = step;
  updateInputValue(step);
}

watch(toRef(props, 'modelValue'), (val)=> {
  if (+val !== currentStep.value) {
    currentStep.value = +val;
  }
});
</script>

<template>
  <div class="flex flex-col">
    <!-- Current Step: Mobile -->
    <div
      role="presentation" 
      class="mb-3 flex items-center gap-2 sm:sr-only"
    >
      <div :class="`p-0.5 border rounded-full border-${color}`">
        <span
          aria-current="step"
          :class="`
            h-8 aspect-square
            rounded-full 
            flex justify-center items-center
            bg-${color} text-white
          `"
        >
          {{  currentStep  }}
        </span>
      </div>
      <p class="text-lg font-semibold">
        {{  stepsComputed[currentStep - 1]  }}
      </p>
    </div>
    <!-- Steps -->
    <ol
      class="flex flex-wrap"
    >
      <li
        v-for="step, i in stepsComputed.length"
        :key="stepsComputed[i]"
        :aria-current="step === currentStep ? 'step' : false"
        class="
          flex-grow 
          flex flex-col
          text-xs md:text-sm
        "
      >
        <!-- Step Number -->
        <div 
          class="
            relative
            flex-grow 
            flex items-center justify-center
          "
        >
          <div
            :class="[
              `
                z-10
                w-5 md:w-7
                aspect-square 
                cursor-pointer
                rounded-full
                hidden sm:flex items-center justify-center
                transition-colors
              `,
              `outline-${color} focus:outline-4`,
              {
                [`bg-${color} text-white`]: step <= currentStep,
                'bg-secondary-100 text-secondary-300': step > currentStep,
              },
            ]"
            tabindex="0"
            @click="gotoStep(step)"
            @keypress="gotoStep(step)"
          >
            {{ step }}   
          </div>

          <!-- Line 1 -->
          <div
            :class="[
              'w-1/2 h-1 absolute left-0 transition-colors',
              {
                'sm:sr-only': step === 1,
                [`bg-${color}`]: step <= currentStep, 
                'bg-secondary-300': step > currentStep, 
              }
            ]"
          ></div>
          
          <!-- Line 2 -->
          <div 
            :class="[
              'w-1/2 h-1 absolute right-0 transition-colors',
              {
                'sm:sr-only': step === stepsComputed.length,
                [`bg-${color}`]: step < currentStep,
                'bg-secondary-300': step > currentStep, 
                [`bg-${color} sm:bg-secondary-300`]: step === currentStep,  
              }
            ]"
          ></div>
        </div>
        <!-- Step text -->
        <div 
          class="min-h-[2rem] hidden sm:flex justify-center"
        >
          <span 
            :class="[
              `flex-grow text-center md:block`,
              { 
                'absolute md:relative': currentStep === step,  
                'hidden': currentStep !== step,  
              },
            ]"
          >
            {{ stepsComputed[i]  }}
          </span>
        </div>
      </li>
    </ol>
    <!-- Content -->
    <div 
      class="my-3 relative overflow-hidden"
      :class="containerClass"
    >
        <TransitionGroup
          enter-active-class="duration-200 ease-out"
          enter-from-class="-translate-x-full opacity-0"
          enter-to-class="-translate-x-0 opacity-100"
        >
          <div
            v-for="step in stepsComputed.length"
            :key="`slot-step-${step}`"
            v-show="currentStep === step"
          >
            <slot
              v-if="eager || currentStep === step"
              :name="`step-${step}`"
            ></slot>
          </div>
        </TransitionGroup>
    </div>

    <!-- Actions -->
    <div class="pt-2 flex sm:justify-end gap-4 border-t">

      <AppButton
        :disabled="props.disabled || currentStep === 1"
        variant="outline"
        aria-label="previous step button"
        class="flex-grow sm:flex-grow-0"
        v-bind="{ color }"
        @click="gotoStep(currentStep - 1)"
      >
        Previous
      </AppButton>

      <AppButton
        :disabled="props.disabled || currentStep === stepsComputed.length"
        aria-label="next step button"
        class="flex-grow sm:flex-grow-0"
        v-bind="{ color }"
        @click="gotoStep(currentStep + 1)"
      >
        Next
      </AppButton>

    </div>
  </div>
</template>