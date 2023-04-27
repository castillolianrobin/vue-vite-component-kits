<script setup lang="ts">
import { useDark } from '@vueuse/core';
import type { PropType } from 'vue';
import { AppFormCheckbox } from './app';

const props = defineProps({
  options: {
    type: Object as PropType<Parameters<typeof useDark>[0]>,
    default: () => ({}),
    required: false,
  }
})


const isDarkMode = useDark({ ...props?.options });

</script>

<template>
  <AppFormCheckbox
    v-model="isDarkMode"
    class="ml-auto"
    toggle-input
  >
    <template #checkbox="{ isActive, onChangeHandler }">
      <div 
        tabindex="0"
        class="
          p-[1px] 
          mx-2 
          w-9 h-5 
          border border-secondary-500 
          rounded-full
          outline-secondary-300
        "
        @keypress.space="onChangeHandler"
      >
        <div class=" relative w-full h-full">
          <div 
            class="
              absolute 
              transition  
              h-full 
              aspect-square 
              rounded-full
              flex items-center justify-center
              text-[0.7rem]
              select-none
            "
            :class="[
              {
                'bg-secondary-600': isActive, 
                'bg-secondary-100': !isActive, 
                'translate-x-full': isActive 
              },
            ]"
          >
            <span v-if="isActive">
              &#x263e;
            </span>
            <span v-else>
              &#9788;
            </span>
          </div>
        </div>
      </div>
    </template>
  </AppFormCheckbox>
</template>
