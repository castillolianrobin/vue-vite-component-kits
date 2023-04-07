vbase<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppButton, AppCard, AppDropdown } from '@/components/app';
import type { DropProp } from '@/components/app/AppDropdown.vue';


const dropdown1Items = [
  { text: 'Item 1' },
  { text: 'Item 2' },
  { text: 'Item 3' },
  { text: 'Item 4' },
];

const dropPositions: DropProp[] = [
  'down', 'up', 'right', 'left'
];

</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Dropdowns</PageHeader>
    <div class="">
      <!-- Default Dropdown -->
      <ComponentCard title="Default Dropdown">
        <div class="flex flex-wrap justify-center gap-4">
          <AppDropdown
            :items="dropdown1Items"
          ></AppDropdown>
        
        </div>
      </ComponentCard>
      
      <!-- Dropdown Drop Positions -->
      <ComponentCard title="Dropdown Positions">
        <div class="grid grid-cols-2 md:grid-cols-4 justify-center gap-6">
          <AppDropdown
            v-for="position in dropPositions"
            :key="position"
            :drop="position"
            :items="dropdown1Items"
            class="flex justify-center"
          >
            <template #trigger="{ props }">
              <AppButton 
                class="capitalize" 
                v-bind="{ ...props }"
              >
                Drop {{ position }}
              </AppButton>
            </template>
          </AppDropdown>

        </div>
      </ComponentCard>

      <div class="grid md:grid-cols-2 gap-2">
        
        <!-- Slotted Dropdown -->
        <ComponentCard title="Dropdown Trigger Slot">
          <div class="flex flex-wrap justify-center gap-4">
            <AppDropdown
              :items="dropdown1Items"
            >
              <template #trigger="{ props }">
                <AppButton
                  variant="outline" 
                  v-bind="{ ...props }" 
                >
                  Custom Trigger
                </AppButton>
              </template>
            </AppDropdown>
          </div>
        </ComponentCard>

        <!-- Slotted Dropdown -->
        <ComponentCard title="Dropdown Default Slot (Menu)">
          <div class="flex flex-wrap justify-center gap-4">
            <AppDropdown>
              <div class="p-2 bg-primary-300 relative whitespace-nowrap">
                <p>Showing an AppCard instead</p>
                <AppCard class="w-full">
                  Hello World
                </AppCard>
              </div>
            </AppDropdown>
          </div>
        </ComponentCard>
      </div>

    </div>
  </div>
</template>