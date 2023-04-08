<script setup lang="ts">
import { 
  AppButton, 
  AppCard, 
  AppDropdown,
  AppForm,
  AppFormCheckboxGroup,
  AppFormInput,
  AppFormRadioGroup,
  AppModal, 
  AppPagination, 
  AppTable, 
} from '@/components/app';
import { ref } from 'vue';

const active = ref(false);
const headers = ref([
  { text: 'Header 1', key: 'header_1', sortable: true },
  { text: 'Header 2', key: 'header_2' },
  { text: 'Header 3', key: 'headers_3'},
]);
const items  = ref([
  { header_1: 'D', header_2: '2', headers_3: '@' },
  { header_1: 'D', header_2: '2', headers_3: '@' },
  { header_1: 'B', header_2: '1', headers_3: '@' },
  { header_1: 'D', header_2: '3', headers_3: '@' },
  { header_1: 'D', header_2: '2', headers_3: '@' },
  { header_1: 'A', header_2: '1', headers_3: '@' },
  { header_1: 'C', header_2: '4', headers_3l: '@' },
  { header_1: 'D', header_2: '2', headers_3: '@' },
  { header_1: 'G', header_2: '2', headers_3: '@' },
  { header_1: 'E', header_2: '2', headers_3: '@' },
  // { header: '', header_2: '', headers_3l: '' },
]);

const currentPage = ref(1);

const radioGroupVal = ref('');
const checkGroupVal = ref([]);

</script>

<template>
  <div>
    <AppModal>
      Modal Content
      
      <template #trigger="{ toggleModal }">
        <AppButton 
          @click="toggleModal(true)"
        >
          Trigger
        </AppButton>
      </template>
    </AppModal>

    <AppButton @click="active = !active">Activate</AppButton>
    <AppModal v-model:active="active">
      Welcome To Sandbox
    </AppModal>

    <AppPagination
      v-model="currentPage"
      length="10"
      page-visible="5"
    ></AppPagination>

    <AppTable
      class="w-full"
      current-page="1"
      items-per-page="5"
      items-clickable
      v-bind="{ headers, items }"
     ></AppTable>

     <div class="p-4 bg-primary-400">
       <AppDropdown></AppDropdown>

     </div>
    
     <AppCard class="m-2 w-1/2">
      <template #title>Header</template>
      <template #subtitle>This is a subtitle</template>
      A Content meant for your satisfaction
      <template #actions>
        <AppButton>
          Agree
        </AppButton>
      </template>
     </AppCard>

     <AppForm>
      <AppFormInput validations="required"></AppFormInput>
      <AppButton type="submit">Sub</AppButton>
     </AppForm>


    <div class="grid grid-cols-2">
      <AppFormRadioGroup
      v-model="radioGroupVal"
      :items="[
        { label: 'Item 1', value: 1 },
        { label: 'Item 2', value: 2 },
        { label: 'Item 3', value: 3 },
       ]"
       label="Radio Group"
       error="Test"
      ></AppFormRadioGroup>


      <AppFormCheckboxGroup
      v-model="checkGroupVal"
      :items="[
        { label: 'Item 1', value: 1 },
        { label: 'Item 2', value: 2 },
        { label: 'Item 3', value: 3 },
       ]"
       label="Check Group"
       error="Test"
       return-inactive
      ></AppFormCheckboxGroup>
      {{ checkGroupVal }}
    </div>

  </div>
</template>
