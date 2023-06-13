<script setup lang="ts">
import { themedColorProps, useThemedColor } from '@/composables';
import { ref, type PropType, computed } from 'vue';

export interface ItemProp {
  text: string;
  key?: string;
  class?: string | object | Array<string | object>;
}
const props = defineProps({
  items: { 
    type: Array as PropType<ItemProp[]>,
    required: true,
  },
  itemClass: [String, Object, Array] as PropType<ItemProp['class']>,
  tabClass: [String, Object, Array] as PropType<ItemProp['class']>,
  currentTab: [String, Number] as PropType<ItemProp['key']>,
  eager: Boolean as PropType<boolean>,
  ...themedColorProps,
})

// const emit = defineEmits()


const { color } = useThemedColor(props.color);


/** Tab Logic */


const itemComputed = computed<ItemProp[]>(()=>props.items
  .map((item, i)=>({
    text: item.text,
    key: item?.key || `tab-${i}`,
  }))
);

const itemSlot = computed(()=>itemComputed
  .value
  .filter((item)=>isActiveTab(item) || props.eager)
);

const currentTab = ref(props.currentTab || itemComputed.value?.[0].key || '');

function isActiveTab(item: ItemProp) {
  return currentTab.value === `${item.key}`; 
}

function setActiveTab(item: ItemProp) {
  currentTab.value = `${item.key}`;
}

</script>

<template>
  <div role="tablist" class="dark:text-secondary-100">
    <!-- TABS -->
    <slot
      name="tabs" 
      v-bind="{ 
        currentTab, 
        items: itemComputed,
        setActiveTab,
      }"
    >
      <div 
        class="
          mb-2
          flex flex-wrap gap-2 
          border-b border-secondary-200 dark:border-secondary-700
        "
      >
        <button 
          v-for="item in itemComputed"
          :key="item.key"
          :class="[
            item.class,
            props.itemClass,
            'transition-colors cursor-pointer',
            `hover:text-${color}`,
            {
              [`border-b-2 border-${color}`]: isActiveTab(item),
            }
          ]"
          :aria-label="`${item.key} tab`"
          role="tab" 
          v-bind="{ item }"
          @click="setActiveTab(item)"
        >
          {{ item.text }}
        </button>
      </div>
    </slot>
    
    <!-- CONTENT -->
    <div class="relative overflow-hidden">
      <slot name="panel">
        <TransitionGroup
          enter-active-class="duration-200 ease-in-out delay-300"
          enter-from-class="translate-x-[100px] opacity-0"
          enter-to-class="translate-x-0 opacity-100"
          leave-active-class="absolute top-0 left-0 duration-200 ease-in-out"
          leave-from-class="-translate-x-0 md:translate-x-0 opacity-50"
          leave-to-class="-translate-x-[100px] opacity-0"
        >
          <div
            v-for="item in itemSlot"
            :key="item.key"
            v-show="isActiveTab(item)"
            role="tabpanel"
            :aria-label="`${item.key} tabpanel`"
            :class="props.tabClass"
          >
            <slot :name="`${item.key}`">
              <p class="text-secondary-400">No Content</p>
            </slot>
          </div>
        </TransitionGroup>
      </slot>
    </div>
  </div>
</template>

                                