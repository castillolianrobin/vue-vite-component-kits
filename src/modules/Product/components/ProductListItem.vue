<script setup lang="ts">
import type { PropType } from 'vue';
import { AppFormRating } from '@/components/app';



const props = defineProps({
  image: String,
  name: String,
  quantity: Number as PropType<number>,
  category: String,
})
</script>

<template>
  <li
    class="
      p-2 
      w-full
      grid md:grid-cols-3 lg:grid-cols-5 items-center gap-3
      shadow shadow-secondary-500/50 dark:shadow-secondary-200/50
      hover:bg-primary-500/50
      transition-colors
      cursor-pointer 
    "
  >
    <!-- Product Image -->
    <img 
      :src="props.image" 
      :alt="props.name" 
      class="w-full md:w-12 aspect-square"
    />

    <div>
      <!-- Product Name -->
      <span class="font-bold truncate">
        {{  props.name  }}
      </span>

      <!-- Product Category -->
      <p class="mt-2 text-sm text-secondary-400 dark:text-secondary-500">
        {{  props.category || 'N/A'  }}
      </p>
    </div>
    <!-- Product Price -->
    <div class="text-sm font-light">
      <span>{{  `$ ` + (Math.random() * 10000).toLocaleString('en')  }}</span>
    </div>

    <!-- Product Stock -->
    <div class="text-xs">
        <span 
          v-if="!props.quantity" 
          class="text-error-500"
        >
          Out of stock
        </span>
        <span v-else class="text-success-500">
          {{ props.quantity }} in stock
        </span>
      </div>

    <!-- Product Rating -->
    <div class="w-32">
      <AppFormRating 
        :model-value="3"
        readonly
      ></AppFormRating>
    </div>
  </li>
</template>
