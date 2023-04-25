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
    
    
    
    <!-- Default Tabs -->
    <ComponentCard title="Default Steps">
      <div class="p-1 md:p-5 h-full ">
        <AppSteps steps="3" container-class="p-5 border rounded">
          <template #step-1>
            <div class="text-center ">
              <p class="font-semibold">Step content 1</p>
              <p>
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
              </p>
            </div>
          </template>

          <template #step-2>
            <div class="text-center">
              <p class="font-semibold">Step Content 2</p>
              <p>
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
              </p>
            </div>
          </template>

          <template #step-3>
            <div class="text-center">
              <p class="font-semibold">Test content 3</p>
              <p>
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
              </p>
            </div>
          </template>
        </AppSteps>
      </div>
    </ComponentCard>
    
      <!-- Default Tabs -->
      <ComponentCard title="Labeled Steps">
        <div class="p-1 md:p-5 h-full ">
          <AppSteps 
            :steps="['Add', 'Push', 'Commit']" 
            container-class="p-5 border rounded"
          >
            <template #step-1>
              <div class="text-center ">
                <p class="font-semibold">Step content 1</p>
                <p>
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                </p>
              </div>
            </template>

            <template #step-2>
              <div class="text-center">
                <p class="font-semibold">Step Content 2</p>
                <p>
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                </p>
              </div>
            </template>

            <template #step-3>
              <div class="text-center">
                <p class="font-semibold">Test content 3</p>
                <p>
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                </p>
              </div>
            </template>
          </AppSteps>
        </div>
      </ComponentCard>
  </div>
</template>