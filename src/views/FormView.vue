<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppButton, AppForm, AppFormInput, AppFormTextArea } from '@/components/app';
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
  type?: 'password' | 'text';
};

const inputs:Input[] = [
  { label: 'First Name', validations: 'required', name: 'First Name' },
  { label: 'Last Name', validations: 'required', name: 'Last Name' },
  { label: 'Username', validations: 'required', name: 'Username' },
  { label: 'Password', type: 'password', validations: 'required | minLength(5)', name: 'Password' },
]

const inputVal = ref(new Array(inputs.length).fill(''));

</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Form</PageHeader>
    
    <ComponentCard title="Form Validation">
        <AppForm class="p-4 flex flex-col gap-4">
          <AppFormInput
            v-for="(input, index) in inputs"
            v-model="inputVal[index]"
            :key="`default-${index}`"
            v-bind="{ ...input }"
          ></AppFormInput>

          <AppButton type="submit" class="mt-5 mr-auto">
            Submit
          </AppButton>
        </AppForm>
    </ComponentCard>

  </div>
</template>
