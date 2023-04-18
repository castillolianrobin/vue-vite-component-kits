<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppButton, AppCard, AppTabs } from '@/components/app';


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
      <ComponentCard title="Default Tabs">
        <div class="p-5 h-full">
          <AppCard class="h-full">
            <AppTabs
              :items="tabItems1"
            >
              <template
                v-for="(item, i) in tabItems1"
                :key="i" 
                #[`tab-${i}`]
              >
                <div class="flex flex-col md:flex-row gap-3 items-center">
                  <h3 class="text-lg font-semibold">
                    Hello World!
                  </h3>
                  <p>Displaying {{ item.text }}</p>
                  <p>Index: <span class="">{{ i }}</span></p>
                </div>
              </template>
            </AppTabs>
          </AppCard>
        </div>
      </ComponentCard>


      <!-- Tab with key -->
      <ComponentCard title="Tabs With Key Property">
        <div class="p-5 h-full">
          <AppCard class="h-full">
            <AppTabs
              :items="tabItems2"
            >
              <template
                v-for="(item) in tabItems2"
                :key="item.key" 
                #[item.key]
              >
                <div class="flex flex-col md:flex-row gap-3 items-center">
                  <h3 class="text-lg font-semibold">
                    Hello World!
                  </h3>
                  <p>Displaying {{ item.text }}</p>
                  <p>Key: <span class="">{{ item.key }}</span></p>
                </div>
              </template>
            </AppTabs>
          </AppCard>
        </div>
      </ComponentCard>
    </div>
  </div>
</template>