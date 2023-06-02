<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppButton, AppFormCheckbox, AppFormCheckboxGroup, AppFormRadio, AppFormRadioGroup } from '@/components/app';
import type { ThemeColors } from '@/composables';
import type { Validation } from '@/composables/validation';
import { ref } from 'vue';

interface Input {
  label?: string;
  error?:string;
  disabled?: boolean;
  readonly?: boolean;
  color?:ThemeColors;
  validations?: string | Validation[];
};

const inputs:Input[] = [
  { label: 'Default' },
  { label: 'With Error Props', error: 'Invalid Message' },
  { label: 'Disabled', disabled: true },
  { label: 'With Validations', validations: 'required' },
]

const checkBox = ref(false);
const checkboxGroup = ref([]);
const checkItems = [
  { label: 'Eat Dinner', value: 'ate' },
  { label: 'Brush Teeth', value: 'brushed' },
  { label: 'Dress up', value: 'dressed' },
];
const radioButton = ref(false);
const radioButtonGroup = ref(false);
const radioItems = [
  { label: 'Ice Cream', value: 'ice_cream' },
  { label: 'Cake', value: 'cake' },
  { label: 'Halo halo', value: 'halo_halo' },
];
</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Checkbox & Radio</PageHeader>
    
    <!-- Default Checkbox -->
    <ComponentCard title="Checkboxes">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
          <div 
            v-for="(input, index) in inputs"
            :key="`default-${index}`"
            class="flex justify-center"
          >
            <AppFormCheckbox 
              v-model="checkBox"
              type="number"
              v-bind="{ ...input }"
            ></AppFormCheckbox>
          </div>
        </div>
    </ComponentCard>

    <!-- Custom Checkbox -->
    <ComponentCard title="Custom Checkboxes">
      <div class="grid md:grid-cols-2 gap-4 items-center">
        <div class="flex justify-center">
          <AppFormCheckbox
            v-model="checkBox"
            label="Custom Checkbox 1"
            toggle-input
          >
          </AppFormCheckbox>
        </div>
        <div class="flex justify-center">
          <AppFormCheckbox
            v-model="checkBox"
            label="Custom Checkbox 2"
            class="items-center"
          >
            <template #checkbox="{ isActive, onChangeHandler }">
            <AppButton
              :color="isActive ? 'primary-500' : 'secondary-500'"
              @keypress.space="onChangeHandler"
            >
              {{  isActive ? 'Active' : 'Inactive'  }}
            </AppButton>
            </template>
          </AppFormCheckbox>
        </div>
      </div>
    </ComponentCard>

    
    <!-- Chekcbox Group -->
    <ComponentCard title="Checkbox Group">
        <div class="grid md: grid-cols-2 gap-4 items-center">
          <div class="flex">
            <AppFormCheckboxGroup
              v-model="checkboxGroup"
              :items="checkItems"
              label="To do"
              class="mx-auto"
              container-class="flex-col md:flex-row"
            ></AppFormCheckboxGroup>
          </div>

          <div class="text-center">
            <span>Done: </span>
            <span class="text-primary-500 font-semibold">
              {{ checkboxGroup.join(', ') }}
            </span>
          </div>
        </div>
    </ComponentCard>

    <!-- Default Radio Button -->
    <ComponentCard title="Radio Buttons">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="(input, index) in inputs.slice(0,-1)"
            :key="`default-${index}`"
            class="flex justify-center"
          >
            <AppFormRadio
              v-model="radioButton"
              :active-value="index"
              v-bind="{ ...input }"
            ></AppFormRadio>
          </div>
        </div>
    </ComponentCard>

    <!--  Radio Button Gropp -->
    <ComponentCard title="Radio Group">
        <div class="grid md: grid-cols-2 gap-4 items-center">
          <div class="flex">
            <AppFormRadioGroup
              v-model="radioButtonGroup"
              :items="radioItems"
              label="Favorite Dessert"
              class="mx-auto"
              container-class="flex-col md:flex-row"
              validations="required"
            ></AppFormRadioGroup>
          </div>

          <div class="text-center ">
            <span>Current Value: </span>
            <span class="text-primary-500 font-semibold">
              {{ radioButtonGroup }}
            </span>
          </div>
        </div>
    </ComponentCard>

  </div>
</template>
