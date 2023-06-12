<script setup lang="ts">
import type { PropType } from 'vue';
// Components
import ProductListItem from './ProductListItem.vue';

export interface ProductProp {
  id: number;
  image?: string;
  name?: string;
  quantity?: number;
  category?: string;
}
const props = defineProps({
  products: {
    type: Array as PropType<ProductProp[]>,
    default: ()=>([]),
  }
})


</script>

<template>
  <ul class="mt-1 flex flex-col gap-3 ">
    <ProductListItem
      v-for="product in props.products"
      :key="`product-${product.id}`"
      v-bind="{ ...product }"
    ></ProductListItem>
  </ul>
</template>
