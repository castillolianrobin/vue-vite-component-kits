<script setup lang="ts">
import { ref } from 'vue';
// Component
import { 
  AppButton, 
  AppCard, 
  AppForm, 
  AppFormCheckbox, 
  AppFormFile, 
  AppFormInput, 
  AppFormSelect, AppFormTextArea 
} from '@/components/app';
import { TransitionFade, TransitionSlideDown } from '@/components/transitions';
import { PlusIcon, TrashIcon } from '@heroicons/vue/24/solid';
import type { MultiTextItem } from '@/components/app/AppFormInput.vue';


const categoryItems = [
  { label: 'Woodwork', value: 1 },
  { label: 'Metalwork', value: 2 },
  { label: 'Concrete', value: 3 },
]

/** Form */
const form = ref<ProductForm>({
  variants: [],
  min_price: '0',
  max_price: '0',
})


/** Variant Logic  */


function toggleVariants() {
  form.value.variants = !form.value.variants?.length 
    ? [{ name: '', options: [] }] 
    : [];

}

interface ProductForm {
  min_price: string,
  max_price: string,
  variants?: Array<{ name: string; options: MultiTextItem[] }>
}
</script>

<template>
  <div>
    <AppForm class="flex flex-col gap-3">
      
      <!-- General -->
      <AppCard title="General Info">
        <div class="flex flex-col gap-2">
          <AppFormInput
            label="Product Name"
            validations="required"
          ></AppFormInput>
  
          <AppFormTextArea
            label="Description"
            validations="required"
          ></AppFormTextArea>
        </div>
      </AppCard>

      <!-- Media -->
      <AppCard title="Media">
        <AppFormFile multiple></AppFormFile>
      </AppCard>

      <!-- Organization -->
      <AppCard title="Organization">
        <AppFormSelect
          :model-value="1"
          label="Category" 
          :items="categoryItems"
        ></AppFormSelect>

        <AppFormInput
          label="Tags"
          placeholder="e.g. road, metal, tools, etc"
        ></AppFormInput>
      </AppCard>

      <!-- Variants -->
      <AppCard>
        <template #title>
          <div class="flex items-end justify-between">
            <p class="">Variants, Pricing, Inventory</p>
            <AppFormCheckbox 
              toggle-input
              label="With variants"
              :model-value="!!form.variants?.length"
              @update:model-value="toggleVariants"
            ></AppFormCheckbox>
          </div>
        </template>

        <div class="pt-3 flex flex-col gap-4">
          <!-- Variant Option -->
          <TransitionFade>
            <div 
              class="border-b pb-5"
              v-if="form.variants?.length"
            >
              <label class="font-bold">Variants</label>
              <div class="mt-2 mb-3 flex flex-col gap-3">
                <TransitionSlideDown group>
                  <div
                    v-for="(variant, i) in form.variants"
                    :key="i"
                    class="flex gap-3"
                  >
                    <AppFormInput
                      v-model="variant.name"
                      label="Variant Name"
                      placeholder="Label for the variants"
                    ></AppFormInput>
    
                    <AppFormInput 
                      v-model="variant.options"
                      label="Options"
                      class="flex-grow"
                      type="multiple-text"
                      placeholder="List of options for the variant (Press enter to confirm)"
                    ></AppFormInput>
                    
                    <AppButton 
                      variant="text" 
                      class="mt-auto"
                      color="error-500"
                      @click="form.variants?.splice(i, 1)"
                    >
                      <TrashIcon class="h-6"></TrashIcon>
                    </AppButton>
                  </div>
                </TransitionSlideDown>
              </div>
              
              <AppButton 
                size="sm" 
                class="mt-10 ml-auto mr-2" @click="()=>form.variants?.push({name: '', options: []})"
              >
                <PlusIcon class="h-5"></PlusIcon>
              </AppButton>
            </div>

          </TransitionFade>
          <!-- Price Range -->
          <div class="border-b pb-5">
            <label class="font-bold">Pricing</label>
            <div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
              <AppFormInput
                v-model="form.min_price"
                :readonly="!!form.variants?.length"
                label="Minimum Price"
                type="decimal"
              >
                <template #prepend>
                  <span class="mr-2">$</span>
                </template>
              </AppFormInput>
  
              <AppFormInput
                v-model="form.max_price"
                :readonly="!!form.variants?.length"
                label="Maximum Price"
                type="decimal"
              >
                <template #prepend>
                  <span class="mr-2">$</span>
                </template>
              </AppFormInput>
            </div>
          </div>

          <!-- Price Range -->
          <div class="">
            <label class="font-bold">Inventory</label>
            <div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
              <AppFormInput
                type="number"
                :readonly="!!form.variants?.length"
                label="Total Stocks"
              ></AppFormInput>
  
              <AppFormInput
                :readonly="!!form.variants?.length"
                label="SKU"
              ></AppFormInput>
            </div>
          </div>

        </div>
      </AppCard>
      <AppButton 
        type="submit"
        class="mt-2 ml-auto px-5"
      >
        Submit
    </AppButton>
    </AppForm>
  </div>
</template>
