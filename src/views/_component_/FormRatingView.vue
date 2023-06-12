<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppFormInput, AppFormTextArea, AppFormRating } from '@/components/app';
import type { ThemeColors } from '@/composables';
import type { Validation } from '@/composables/validation';
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/solid';
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
]

const defaultInput = ref(0);
const defaultInput2 = ref(0);
const defaultInput3 = ref(0);

const PasswordInput = ref('');
const NumberInput = ref('0');
const DecimalInput = ref('0');
const MultipleTextInput = ref([]);

const defaultTextArea = ref('');

</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Form Rating</PageHeader>
    <ComponentCard title="Default Rating">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-4">
          <AppFormRating
            v-model="defaultInput"
            v-for="(input, index) in inputs"
            :key="`default-${index}`"
            container-class="w-32"
            v-bind="{ ...input }"
          ></AppFormRating>
        </div>
    </ComponentCard>

    
    <ComponentCard title="Custom Icon Rating">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-4">
          <AppFormRating
            v-model="defaultInput"
            v-for="(input, index) in inputs"
            :key="`default-${index}`"
            container-class="w-32"
            v-bind="{ ...input }"
          >
            <template #unrate-icon>
              <XMarkIcon class="h-6"></XMarkIcon>
            </template>

            
            <template #rate-icon>
              <CheckIcon class="h-6"></CheckIcon>
            </template>
          </AppFormRating>
        </div>
    </ComponentCard>

    <ComponentCard title="Different Rating Numbers">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-4">
          <AppFormRating
            v-model="defaultInput3"
            v-for="(input, index) in inputs"
            :key="`default-${index}`"
            container-class="w-32"
            v-bind="{ ...input }"
            :max-value="index + 2"
            icon-class="h-6"
          >
          </AppFormRating>
        </div>
    </ComponentCard>

  </div>
</template>
