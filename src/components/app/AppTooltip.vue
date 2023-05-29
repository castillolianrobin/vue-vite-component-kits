<script setup lang="ts">
import { themedColorProps, useThemedColor } from '@/composables';
import { InformationCircleIcon } from '@heroicons/vue/20/solid';
import { ref, type PropType, computed } from 'vue';

const props = defineProps({
  /** Basic text to be displayed inside the tooltip */
  tooltipText: { type: String as PropType<string>, default: "" },
  /** direction of the tooltip (top, bottom, left, right) */
  direction: {
    type: String as PropType<"top" | "bottom" | "left" | "right">,
    default: "bottom",
    required: false,
  },
  showOnClick: Boolean as PropType<boolean>,
  ...themedColorProps,
});

/** Themed color composable */
const { color } = useThemedColor(props.color);

/** Tooltip Logic */

const hovered = ref<boolean>(false);

function toggleTooltip(event: Event) {
  if (props.showOnClick) {
    if (event.type === 'click') 
      hovered.value = !hovered.value;
  } else {
    if (event.type === 'mouseenter')
      hovered.value = true;
    else if (event.type === 'mouseleave')
      hovered.value = false;
  }
}

// Tooltip Classes
const directionClass = computed(()=>{
  switch (props.direction) {
    case 'left': return 'right-full top-0 bottom-0';
    case 'right': return 'left-full top-0 bottom-0';
    case 'top': return 'bottom-full';
    case 'bottom': default: return 'top-full';
  }
});

const arrowClass = computed(()=>{
  switch (props.direction) {
    case 'left': return 'app-tooltip-arrow-right';
    case 'right': return 'app-tooltip-arrow-left';
    case 'top': return 'app-tooltip-arrow-down';
    case 'bottom': default: return 'app-tooltip-arrow-up';
  }
});
</script>

<template>
  <div 
    class="relative inline-flex justify-center"
    @mouseenter="toggleTooltip"
    @mouseleave="toggleTooltip"
    @click="toggleTooltip"
  >
    <slot>
      <InformationCircleIcon
        :class="`mt-0.5 h-5 text-${color}`"
      ></InformationCircleIcon>
    </slot>
    <!-- Tooltip -->
    <Transition
      enter-active-class="duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="hovered"
        class="absolute"
        :class="[ directionClass ]"
        role="tooltip"
      >
        <div
          class="flex justify-center absolute"
          :class="{
            'right-0': ['top', 'bottom', 'left'].includes(props.direction),
            'left-0': ['top', 'bottom', 'right'].includes(props.direction),
            'top-0': ['bottom', 'left', 'right'].includes(props.direction),
            'top-1/3': ['left', 'right'].includes(props.direction),
            'bottom-0': ['left', 'top', 'right'].includes(props.direction),
          }"
        >
          <!-- Arrow -->
          <div
            :class="[ 
              'app-tooltip-arrow', 
              `border-${color}`, 
              arrowClass 
            ]"
          ></div>
        </div>  
        <!-- Text -->
        <label
          :class="`
            block
            p-1 m-1.5
            rounded
            min-w-max
            shadow 
            sticky left-0
            bg-${color}
            text-white text-xs
          `"
        >
          <!-- Tooltip Slot -->
          <slot name="tooltip-content">
            {{ props.tooltipText }}
          </slot>
        </label>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.app-tooltip {
  &-arrow {
    width: 0;
    height: 0;

    $arrow-size: 7px;

    &-up {
      border-left: $arrow-size solid transparent;
      border-right: $arrow-size solid transparent;
      border-bottom-width: $arrow-size;
    }
    &-down {
      border-left: $arrow-size solid transparent;
      border-right: $arrow-size solid transparent;
      border-top-width: $arrow-size;
    }

    &-left {
      border-top: $arrow-size solid transparent;
      border-bottom: $arrow-size solid transparent;
      border-right-width: $arrow-size;
    }

    &-right {
      border-top: $arrow-size solid transparent;
      border-bottom: $arrow-size solid transparent;
      border-left-width: $arrow-size;
    }
  }
}
</style>