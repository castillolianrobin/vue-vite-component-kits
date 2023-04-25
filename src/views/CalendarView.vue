<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppButton, AppCard, AppFormDatePicker, AppFormInput, AppTabs } from '@/components/app';
import { ref } from 'vue';


const tabItems1 = [
  { text: 'Tab 1' },
  { text: 'Tab 2' },
  { text: 'Tab 3' },
];
const tabItems2 = [
  { text: 'Tab 1', key: 'tab-1' },
  { text: 'Tab 2', key: 'tab-2' },
  { text: 'Tab 3', key: 'tab-3' },
];

const date1 = ref<[Date, Date]>([]);

</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Calendar Input</PageHeader>
    <div class="">
      <!-- Calendar -->
      <ComponentCard title="Sample Calendar Input">
        <div class="p-5 h-full">
          <p class="mb-3 text-center">
            This date picker uses a third party component for the functionality and UI of the calendar.
          </p>
          <AppCard class="h-full">
            <AppFormDatePicker
              v-model="date1"
              label="Date Picker"
              placeholder="Select a Date"
            ></AppFormDatePicker>

            <AppFormDatePicker
              v-model="date1"
              color="secondary-500"
              label="Date Picker"
              placeholder="Select a Date"
            ></AppFormDatePicker>

            <AppFormDatePicker
              v-model="date1"
              color="error-500"
              label="Date Picker"
              placeholder="Select a Date"
            ></AppFormDatePicker>
          </AppCard>
        </div>
      </ComponentCard>
    </div>
  </div>
</template>