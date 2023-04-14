<script setup lang="ts">
import { computed, ref, toRef, type HtmlHTMLAttributes, type PropType } from 'vue';
import { AppButton } from '.';
import { createThemedColor, themedColorProps } from '@/composables';
import { vOnClickOutside } from '@vueuse/components';

export type DropProp = 'down'|'up'|'left'|'right';
export interface ItemProp { text: string; onClick?: ()=>void; }
const props = defineProps({
  ...themedColorProps,
  drop: { 
    type: String as PropType<DropProp>, 
    default: 'down', 
    required: false 
  },
  items: { 
    type: Array as PropType<ItemProp[]>,
    default: ()=>[], 
    required: false,
  },
  eager: {
    type: Boolean as PropType<boolean>,
    default: false,
    required: false,
  },
});

const emits = defineEmits(['itemClick'])

/** Themed color composables */
const { color } = createThemedColor(toRef(props, 'color'))




/** Dropdown Logic */
const isActive = ref(false);

function toggleMenu(active?:boolean) {
  isActive.value = typeof active === 'boolean' 
    ? active
    : !isActive.value;
}

function onDropdownItemClickHandler(item: ItemProp) {
  item?.onClick && item.onClick();
  emits('itemClick', item.text);
  toggleMenu(false);
}

/** Trigger attributes and event */
const triggerAttrs = computed(()=>({
  // OnClick Event
  onclick: toggleMenu,
  // Aria Attrs
  role: 'button',
  'aria-label': 'dropdown button',
  'aria-haspopup': true,
  'aria-expanded': isActive.value,
}));


/** Menu Classes */
const positionClass = computed(()=>{
  switch (props.drop) {
    case 'up': return 'bottom-full left-0'
    case 'left': return 'top-0 right-full'
    case 'right': return 'top-0 left-full'
    case 'down':default: return 'top-full left-0';
  }
});

</script>

<template>
  <div class="relative inline-block">
    <!-- Trigger -->
    <slot 
      name="trigger" 
      v-bind="{ props:triggerAttrs, toggleMenu }"
    >
      <AppButton
        v-bind="{ ...triggerAttrs }"
      >
        {{  isActive ? 'Hide' : 'Show'  }} Dropdown
      </AppButton>
    </slot>

    <!-- Menu -->
    <div 
      v-if="isActive || props.eager"
      v-show="isActive"
      :class="[ 'absolute min-w-full z-20', positionClass ]"
      v-on-click-outside="()=>toggleMenu(false)"
    >
      <slot>
        <ul 
          class="bg-white rounded shadow-lg"
          role="listbox"

        >
          <li
            v-for="item, i in props.items"
            :key="`${item.text}-${i}`"
            :class="[
              `
                px-2 py-1 
                cursor-pointer
                overflow-auto 
                whitespace-nowrap
                hover:text-white
                active:brightness-75
              `,
              `hover:bg-${color}`
            ]"
            tabindex="0"
            @click="onDropdownItemClickHandler(item)"
            @keydown.space.enter="onDropdownItemClickHandler(item)"
          >
            {{ item.text }}
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

