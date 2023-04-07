<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppButton, AppFormCheckbox, AppFormRadio } from '@/components/app';
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
const radioButton = ref(false);

</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Checkbox & Radio</PageHeader>
    
    <!-- Default Checkbox -->
    <ComponentCard title="Checkboxes">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
          <AppFormCheckbox 
            v-for="(input, index) in inputs"
            :key="`default-${index}`"
            v-model="checkBox"
            type="number"
            v-bind="{ ...input }"
          ></AppFormCheckbox>
        </div>
    </ComponentCard>

    <!-- Custom Checkbox -->
    <ComponentCard title="Custom Checkboxes">
      <div class="grid md:grid-cols-2 gap-4">
        <AppFormCheckbox
          v-model="checkBox"
          label="Custom Checkbox 1"
        >
          <template #button="{ isActive, onChangeHandler }">
            <div 
              tabindex="1"
              class="relative mx-2 w-8 h-4 border border-secondary-500 rounded-full"
              @keypress.space="onChangeHandler"
            >
              <div 
                class="absolute transition-[right] bg-primary-500 h-full aspect-square rounded-full"
                :class="isActive ? 'right-0' : 'right-4'"
              ></div>
            </div>
          </template>
        </AppFormCheckbox>

        <AppFormCheckbox
          v-model="checkBox"
          label="Custom Checkbox 2"
        >
          <template #button="{ isActive, onChangeHandler }">
          <AppButton
            :color="isActive ? 'primary-500' : 'secondary-500'"
            @keypress.space="onChangeHandler"
          >
            {{  isActive ? 'Active' : 'Inactive'  }}
          </AppButton>
          </template>
        </AppFormCheckbox>
      </div>
    </ComponentCard>

    <!-- Default Radio Button -->
    <ComponentCard title="Radio Buttons">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AppFormRadio
            v-for="(input, index) in inputs.slice(0,-1)"
            :key="`default-${index}`"
            v-model="radioButton"
            :active-value="index"
            type="number"
            v-bind="{ ...input }"
          ></AppFormRadio>
        </div>
    </ComponentCard>

  </div>
</template>
