<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppSteps, AppCard } from '@/components/app';


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

</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Tabs</PageHeader>
    <div class="">
      <!-- Default Tabs -->
      <ComponentCard title="Default Steps">
        <div class="p-5 h-full">
          <AppCard  class="h-full">
            <AppSteps steps="5" color="error-500">
              <template #step-1>
                <div class="">
                  <p class="p-5">Test content 1</p>
                </div>
              </template>

              <template #step-2>
                <div class="">
                  <p class="p-5">Test content 2</p>
                </div>
              </template>
            </AppSteps>


            <!-- <AppSteps steps="4">
            </AppSteps>

            
            <AppSteps steps="5">
            </AppSteps> -->
          </AppCard>
        </div>
      </ComponentCard>

    </div>
  </div>
</template>