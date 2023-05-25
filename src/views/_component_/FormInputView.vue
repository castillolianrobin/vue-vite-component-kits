<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppFormInput, AppFormTextArea } from '@/components/app';
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
  { label: 'With Validations and Name', validations: 'required | minLength(2)', name: 'Password' },
]

const defaultInput = ref('');

const PasswordInput = ref('');
const NumberInput = ref(0);
const defaultTextArea = ref('');

</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Form Inputs & Text Area</PageHeader>
    <ComponentCard title="Text Inputs">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-4">
          <AppFormInput
            v-model="defaultInput"
            v-for="(input, index) in inputs"
            :key="`default-${index}`"
            v-bind="{ ...input }"
          ></AppFormInput>
        </div>
    </ComponentCard>

    <div class="grid md:grid-cols-2 gap-4">
      <ComponentCard title="Password Inputs">
          <div class="grid md:grid-cols-2 gap-2">
            <AppFormInput
              v-model="PasswordInput"
              v-for="(input, index) in [inputs[0],inputs[4]]"
              :key="`password-${index}`"
              type="password"
              v-bind="{ ...input }"
            ></AppFormInput>
          </div>
      </ComponentCard>
  
      <ComponentCard title="Number Inputs">
          <div class="grid md:grid-cols-2 gap-2">
            <AppFormInput
              v-model="NumberInput"
              v-for="(input, index) in [inputs[0],inputs[4]]"
              :key="`number-${index}`"
              type="number"
              v-bind="{ ...input }"
            ></AppFormInput>
          </div>
      </ComponentCard>
    </div>

    <ComponentCard title="Text Areas">
          <div class="grid md:grid-cols-3 gap-4">
            <AppFormTextArea
              v-model="defaultTextArea"
              v-for="(input, index) in [inputs[0],inputs[4]]"
              :key="`textarea-${index}`"
              v-bind="{ ...input }"
            ></AppFormTextArea>

            <AppFormTextArea
              v-model="defaultTextArea" 
              label="No Resize"
              disable-resize
            ></AppFormTextArea>
          </div>
      </ComponentCard>

  </div>
</template>
