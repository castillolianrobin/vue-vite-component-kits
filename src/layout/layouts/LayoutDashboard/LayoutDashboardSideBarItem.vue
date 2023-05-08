<script setup lang="ts">
import { ChevronDownIcon, ChevronUpIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { FunctionalComponent, HTMLAttributes, PropType, VNodeProps  } from 'vue';

export interface NavigationItem {
  name: string;
  label?: string;
  icon?: FunctionalComponent<HTMLAttributes & VNodeProps, {}> | any;
  children?: NavigationItem[]
}
const props = defineProps({
  name: String as PropType<string>,
  label: String as PropType<string>,
  icon: [Object, Function] as PropType<FunctionalComponent<HTMLAttributes & VNodeProps, {}> | any>,
  children: Array as PropType<NavigationItem[]>,
});

const route = useRoute();

const showChildren = computed(()=> {
  return props.children &&  props.children.some(child=>child.name === route.name)
});

</script>

<template>
  <li class="my-1">
    <span class="flex item-center">
      <router-link
        :to="{ name: props.children ? props.children[0].name : props.name }"
        class="
          w-full 
          flex items-center gap-2
          outline-none            
          focus-within:text-primary-200
          hover:text-primary-300
          transition-colors
        "
        :class="{'font-semibold': showChildren }"
        active-class="font-semibold"
      >
        <!-- Icon -->
        <component 
          :is="props.icon || ChevronRightIcon" 
          class="h-5"
        ></component>
        <!-- Text -->
        <span>{{  props.label  }}</span>
      </router-link>
      <span
        v-if="props.children" 
        class="ml-auto mr-2 cursor-pointer select-none"
      >
        <component
          :is="showChildren ? ChevronDownIcon : ChevronUpIcon"
          class="h-5"
        ></component>
      </span>
    </span>
      
    <!-- Item Children -->
    <ul
      v-if="props.children && showChildren" 
      class="mt-3 ml-2 pl-4 border-l border-secondary-500"
    >
      <LayoutDashboardSideBarItem
        v-for="child in children"
        :key="child.label"
        class="mt-3"
        v-bind="{ ...child }"
      ></LayoutDashboardSideBarItem>
    </ul>
  </li>
</template>