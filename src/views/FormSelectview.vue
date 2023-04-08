<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppFormSelect, type SelectItemProp } from '@/components/app';
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
  name?: string;
};

const inputs:Input[] = [
  { label: 'Default' },
  { label: 'With Error Props', error: 'Invalid Message' },
  { label: 'Readonly', readonly: true },
  { label: 'Disabled', disabled: true },
  { label: 'With Validations', validations: 'required | minLength(2)' },
  { label: 'With Validations and Name', validations: 'required | minLength(2)', name: 'Select Item' },
];

const items: SelectItemProp[] = [
  { label: 'Item 1', value: '1'  },
  { label: 'Item 2', value: '2'  },
  { label: 'Item 3', value: '3'  },
  { label: 'Item 4', value: '4'  },
  { label: 'Item 5', value: '5'  },
  { label: 'Item 6', value: '6'  },

]

const defaultInput = ref('');
const multiSelectInput = ref('');

</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Form Select</PageHeader>
    
    <ComponentCard title="Default Select Input">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-4">
          <AppFormSelect
            v-model="defaultInput"
            v-for="(input, index) in inputs"
            :items="items"
            :key="`default-${index}`"
            v-bind="{ ...input }"
          ></AppFormSelect>
        </div>
    </ComponentCard>

    <ComponentCard title="Multiselect Input">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-4">
          <AppFormSelect
            v-model="multiSelectInput"
            v-for="(input, index) in inputs"
            :items="items"
            :key="`default-${index}`"
            multiselect
            v-bind="{ ...input }"
          ></AppFormSelect>
        </div>
    </ComponentCard>
  </div>
</template>
