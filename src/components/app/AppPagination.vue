<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import type { InputHTMLAttributes, PropType } from 'vue';
import { inputEmits, inputProps, useInputValue } from '@/composables';
import { AppButton } from '.';

const props = defineProps({
  /** Total number of pages  */
  length: { 
    type: [Number, String] as PropType<string | number>, 
      required: true 
    },
  /** number of pages to display  */
  pageVisible: { 
    type: [Number, String] as PropType<string | number>, 
    default: 3,
    required: false, 
  },
  /** Flag to retain first and last page in the items */
  persistEdgePages: {
    type: [Boolean] as PropType<InputHTMLAttributes['disabled']>,
    default: false,
    required: false,
  },
  disabled: { 
    type: [Boolean] as PropType<InputHTMLAttributes['disabled']>,
    default: false,
    required: false,
  },
  ...inputProps,
});

const emits = defineEmits([
  ...inputEmits,
])

/** Input value composable */
const { updateInputValue } = useInputValue(emits);

/** Pages Logic */

// The pages to be displayed in pagination (based on pageVisible prop)
const visiblePages = computed(()=>{
  const { modelValue, pageVisible, length } = props;
  const pageParams = [
    modelValue, 
    +pageVisible,
    +length,
  ] as const;
  const pageStart = getPageStart(...pageParams)
  const pageEnd = getPageEnd(...pageParams);
  const _pages = [];
  for (let page = pageStart; page <= pageEnd; page++) {
    _pages.push(page);
  }

  if (props.persistEdgePages) {
    if (!_pages.includes(1) && _pages.length > 1) 
      _pages.shift()
    if (!_pages.includes(+length) && _pages.length > 1)
      _pages.pop()
  }

  return _pages;  
});

function getPageStart(currentPage: number, visiblePages: number,  pageLength: number) {
  const halfVisible = Math.floor(visiblePages/2);
  let pageStart = currentPage - halfVisible;
  const pageEnd = pageStart + visiblePages - 1;
  if (pageEnd > pageLength) {
    pageStart =  pageLength - (visiblePages - 1) ;
  }
  return pageStart >= 1 ? pageStart : 1;
}

function getPageEnd(currentPage: number, visiblePages: number, pageLength: number) {
  const pageStart = getPageStart(currentPage, visiblePages, pageLength)
  const pageEnd = pageStart + visiblePages - 1;
  return pageEnd <= pageLength ? pageEnd : pageLength;
}

function isActive(page: Page) {
  return props.modelValue == page;
}

function onChangeHandler(page: Page) {
  if (isActive(page)) return;
  
  const newPage = page <= props.length ? page : props.length
  updateInputValue(+newPage)
}

// Watchers to ensure modelValue doesn't exceed the pages
watchEffect(()=>{
  const { length, modelValue } = props;

  if (+modelValue > +length) {
    onChangeHandler(length);
  } else if (+modelValue < 1) {
    onChangeHandler(1);
  }
});

type Page = string | number;
</script>

<template>
  <div class="flex font-semibold">
    <!-- Jump To First Button -->
    <AppButton
      :disabled="props.disabled || isActive(1)" 
      variant="text"
      aria-label="jump to first page button"
      @click="onChangeHandler(1)"
    >
      &laquo;
    </AppButton>
    <!-- Previous Button -->
    <AppButton
      :disabled="props.disabled || isActive(1)" 
      variant="text"
      aria-label="previous button"
      @click="onChangeHandler(modelValue-1)"
    >
      &lsaquo;
    </AppButton>
    
    <!-- First page button -->
    <div
      v-if="!visiblePages.includes(1)"
      class="flex items-end gap-1"
    >
      <AppButton
        v-if="props.persistEdgePages"
        :disabled="props.disabled" 
        variant="text"
        aria-label="page 1 button"
        @click="onChangeHandler(1)"
      >
        1
      </AppButton>
      <p class="text-gray-400">...</p>
    </div>

    <!-- Pages Button -->
    <AppButton
      v-for="page in visiblePages"
      :key="`page-${page}`"
      :variant="isActive(page) ? 'solid' : 'text'"
      :disabled="props.disabled" 
      :aria-label="`page ${page} button`"
      :class="[
        { 'scale-105 brightness-110': isActive(page)}
      ]"
      size="sm"
      @click="onChangeHandler(page)"
    >
      <div class="aspect-square w-5">{{ page }}</div>
    </AppButton>

    <!-- Last page button -->
    <div
      v-if="!visiblePages.includes(+length)"
      class="flex items-end gap-1"
    >
      <p class="text-gray-400">...</p>
      <AppButton
        v-if="props.persistEdgePages"
        :disabled="props.disabled" 
        :aria-label="`page ${length} button`"
        variant="text"
        @click="onChangeHandler(length)"
      >
        {{ length }}
      </AppButton>
    </div>

    <!-- Next Button -->
    <AppButton 
      :disabled="props.disabled || isActive(props.length)" 
      variant="text"
      aria-label="next button"
      @click="onChangeHandler(modelValue+1)"
    >
      &rsaquo;
    </AppButton>
    <!-- Jump To Last Button -->
    <AppButton
      :disabled="props.disabled || isActive(props.length)" 
      variant="text"
      aria-label="jump to last page button"
      @click="onChangeHandler(length)"
    >
      &raquo;
    </AppButton>
  </div>
</template>
