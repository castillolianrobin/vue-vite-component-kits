<script setup lang="ts">
import { themedColorProps, useThemedColor } from '@/composables';
import { computed, type ButtonHTMLAttributes, type PropType, toRef, unref } from 'vue';
import { AppLoading } from './';

const props = defineProps({
  type: { type: String as PropType<ButtonHTMLAttributes['type']>, default: 'button', required: false, },
  disabled: { type: Boolean as PropType<ButtonHTMLAttributes['disabled']>, default: false, required: false },
  loading: { type: Boolean as PropType<boolean>, default: false, required: false },
  size: { type: String as PropType<'lg' | 'md' | 'sm'>, default: 'md', required: false,  },
  variant: { type: String as PropType<'solid' | 'outline' | 'text'>, default: 'solid', required: false },
  ...themedColorProps,
});

/** Theme color composable */
const { color } = useThemedColor(toRef(props, 'color'));


/** CSS Classes */

const sizeClass = computed(()=>{
  switch (props.size) {
    case 'lg': return 'text-lg py-1.5 px-2.5';  
    case 'sm': return 'text-sm px-1 py-0.5';  
    case 'md': default: return 'py-1 px-2';
  }
});
const bgClass = computed(()=>{
  switch (props.variant) {
    case 'text': return `bg-transparent`;   
    case 'outline': return `bg-transparent hover:bg-${unref(color)} active:bg-transparent disabled:bg-transparent`;   
    case 'solid': default: return `bg-${unref(color)}`;
  }
});
const borderClass = computed(()=>{
  switch (props.variant) {
    case 'text': return `border-transparent`;   
    case 'outline': return `border-${unref(color)}`;   
    case 'solid': default: return `border-${unref(color)}`;
  }
})
const textClass = computed(()=>{
  switch (props.variant) {
    case 'text': return `text-${unref(color)} disabled:text-opacity-50 hover:brightness-150`;    
    case 'outline': return `text-${unref(color)} hover:text-white active:text-${unref(color)} disabled:text-${unref(color)}`;   
    case 'solid': default: return `text-white`;
  }
})

</script>

<template>
  <button 
    :class="[ 
      ...[ sizeClass, bgClass, textClass, borderClass ],
      `focus:outline-${color}/25 outline-2`,
      {
        ['cursor-default']: props.disabled || props.loading,
        ['hover:shadow']: 
          props.variant !== 'text' && !props.disabled && !props.loading,
        ['hover:brightness-110 active:brightness-75']: 
          props.variant !== 'outline' && !props.disabled && !props.loading,
      }
    ]"
    class="
      relative
      flex items-center justify-center
      rounded border-2
      transition
      disabled:brightness-75 
      disabled:opacity-80
    "
    v-bind="{ ...props }"
  >
    <AppLoading 
      v-if="props.loading"
      class="absolute"
      v-bind="{ color }"
    ></AppLoading>
    <span :class="{ 'opacity-0': props.loading }">
      <slot></slot>
    </span>
  </button>
</template>