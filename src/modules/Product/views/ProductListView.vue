<script setup lang="ts">
import { ref } from 'vue';
// Components
import { AppButton, AppFormSelect, AppCard } from '@/components/app';
import { BarsArrowDownIcon as SortByIcon} from '@heroicons/vue/24/solid';
import ProductList from '../components/ProductList.vue';
// Mock Items
import _sampleProducts from '../_sampleProducts'; 


/** Sort */

const sortOptions = [
  { label: 'Recent', value: 'recent' },
  { label: 'A-Z', value: 'asc' },
  { label: 'Z-A', value: 'desc' },
]
const sortBy = ref(sortOptions[0].value);


/** Product Fetch */

const products = ref(_sampleProducts);

</script>

<template>
  <div>
    <!-- Actions -->
    <div class="p-1 flex flex-col md:flex-row gap-2 justify-center md:justify-between">
      <!-- Add Product -->
      <AppButton 
        :to="{ name: 'ProductAdd' }"
      >
        Add Product
      </AppButton>
      
      <!-- Filter Dropdown -->
      <AppFormSelect
        v-model="sortBy"
        :items="sortOptions"
        class="md:2/5 lg:w-1/5"
      >
        <template #prepend>
          <p class="mr-2 flex gap-1 items-center flex-shrink-0">
            <SortByIcon class="h-5"></SortByIcon>
            <span class="hidden md:inline">Sort By:</span>
          </p> 
        </template>
      </AppFormSelect>
    </div>

    <!-- Products -->
    <AppCard class="mt-2">
      <!-- Products -->
      <ProductList :products="products" ></ProductList>
    </AppCard>
  </div>
</template>
