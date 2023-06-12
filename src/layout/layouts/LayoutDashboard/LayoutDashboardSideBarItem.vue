<script setup lang="ts">
import { ChevronDownIcon, ChevronUpIcon, ArrowRightCircleIcon as PlaceholderIcon } from '@heroicons/vue/20/solid';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { AsyncComponentLoader, FunctionalComponent, HTMLAttributes, PropType, VNodeProps  } from 'vue';

export interface NavigationItem {
  name: string;
  label?: string;
  icon?: AsyncComponentLoader<any>;
  children?: NavigationItem[];
  hidden?: boolean;
  isChild?: boolean;
}
const props = defineProps({
  name: String as PropType<string>,
  label: String as PropType<string>,
  hideLabel: Boolean as PropType<boolean>,
  icon: [Object, Function] as PropType<FunctionalComponent<HTMLAttributes & VNodeProps, {}> | any>,
  children: Array as PropType<NavigationItem[]>,
  hidden: Boolean as PropType<boolean>,
  isChild: Boolean as PropType<boolean>,
});

const route = useRoute();

const showChildren = computed(()=> {
  return props.children?.some(child=>child.name === route.name)
});

</script>

<template>
  <li v-if="!props.hidden" class="my-1">
    <span class="flex item-center">
      <router-link
        :to="{ name: props.children ? props.children[0].name : props.name }"
        class="
          py-1
          w-full 
          flex items-center gap-2
          outline-none            
          focus-within:text-primary-400
          hover:text-primary-100
          transition-colors
        "
        :class="{ 'bg-primary-500/80 rounded-l': showChildren }"
        :active-class="`
          ${ props.isChild ? 'text-primary-500' : 'bg-primary-500/80'} 
          md:rounded-l
        `"
      >
        <!-- Icon -->
        <component 
          :is="props.icon || PlaceholderIcon" 
          class="h-5"
        ></component>
        <!-- Text -->
        <span
          class="md:inline-block"
          :class="{ 'hidden': hideLabel }"
        >
          {{  props.label  }}
      </span>
      </router-link>
      <!-- <span
        v-if="props.children" 
        class="ml-auto mr-2 cursor-pointer select-none"
      >
        <component
          :is="showChildren ? ChevronUpIcon : ChevronDownIcon"
          class="h-5"
        ></component>
      </span> -->
    </span>
      
    <!-- Item Children -->
    <ul
      v-if="props.children && showChildren" 
      class="mt-3 ml-1 md:ml-2 pl-1 md:pl-2 border-l border-secondary-500/50"
    >
      <LayoutDashboardSideBarItem
        v-for="child in children"
        :key="child.label"
        class="mt-3"
        is-child
        v-bind="{ ...child, hideLabel }"
      ></LayoutDashboardSideBarItem>
    </ul>
  </li>
</template>