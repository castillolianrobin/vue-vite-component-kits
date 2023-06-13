<script setup lang="ts">
import type { PropType } from 'vue';
// Components
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { AppButton } from '.';
import { themedColorProps } from '@/composables';

const props = defineProps({
  closable: Boolean as PropType<boolean>,
  ...themedColorProps,
})

const emits = defineEmits(['close'])
</script>

<template>
  <div :class="`
    px-1 
    rounded-full 
    text-sm 
    flex 
    items-center
    ${ props.color.includes('white') 
      ? 'text-black' 
      : 'text-white' 
    }
    bg-${props.color} 
  `">
    <slot></slot>
    <AppButton 
      v-if="closable" 
      class="ml-auto p-0 inline" 
      size="sm" 
      color="white"
      variant="text"
    >
      <XMarkIcon
        @click="emits('close', true)"
        class="h-3 aspect-square"
      ></XMarkIcon>
    </AppButton>
  </div>
</template>