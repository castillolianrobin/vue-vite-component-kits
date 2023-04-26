<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppCard, AppFormDatePicker } from '@/components/app';
import { ref } from 'vue';

const date1 = ref<[any, any] | string>('');
const date2 = ref<[any, any] | string>('');
const date3 = ref<[any, any] | string>('');

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
            <div class="flex flex-col gap-5">
              <AppFormDatePicker
                v-model="date1"
                label="Date Picker"
                placeholder="Select a Date"
              ></AppFormDatePicker>
  
              <AppFormDatePicker
                v-model="date2"
                color="secondary-500"
                label="Date Picker with Single Calendar"
                placeholder="Select a Date"
                as-single
              ></AppFormDatePicker>
  
              <AppFormDatePicker
                v-model="date3"
                color="error-500"
                label="Range Date Picker with Single Calendar"
                placeholder="Select a Date"
                as-single
                use-range
              ></AppFormDatePicker>
            </div>
          </AppCard>
        </div>
      </ComponentCard>
    </div>
  </div>
</template>