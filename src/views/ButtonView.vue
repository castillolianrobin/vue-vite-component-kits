<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppButton } from '@/components/app';
import type { ThemeColors } from '@/composables';

interface Button {
  title: string;
  color: ThemeColors;
  disabled?: boolean;
  loading?: boolean;
  size?: 'lg' | 'md' | 'sm'
}

const buttons:Button[] = [
  { title: 'Primary', color: 'primary-500' },
  { title: 'Secondary', color: 'secondary-500' },
  // { title: 'Info', color: 'info-500' },
  // { title: 'Alert', color: 'alert-500' },
  { title: 'Success', color: 'success-500' },
  { title: 'Error', color: 'error-500' },
  { title: 'Disabled', color: 'primary-500', disabled: true },
  { title: 'Loading', color: 'primary-500', loading: true },
  { title: 'Small', color: 'primary-500', size: 'sm' },
  { title: 'Medium', color: 'primary-500', size: 'md' },
  { title: 'Large', color: 'primary-500', size: 'lg' },
]

</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Buttons</PageHeader>
    <div class="">
      <!-- Default Buttons -->
      <ComponentCard title="Default Buttons">
        <div class="flex flex-wrap items-center gap-4">
          <AppButton
            v-for="button in buttons"
            :key="`solid-${button.title}`"
            v-bind="{ ...button }"
          >
            {{ button.title }}
          </AppButton>
        </div>
      </ComponentCard>
      
      
      <!-- Outlined Buttons -->
      <ComponentCard title="Outlined Buttons">
        <div class="flex flex-wrap items-center gap-4">
          <AppButton
            v-for="button in buttons"
            :key="`outline-${button.title}`"
            variant="outline"
            v-bind="{ ...button }"
          >
            {{ button.title }}
          </AppButton>
        </div>
      </ComponentCard>
  
  
      <!-- Text Buttons -->
      <ComponentCard title="Text Buttons">
        <div class="flex flex-wrap items-center gap-4">
          <AppButton
            v-for="button in buttons"
            :key="`outline-${button.title}`"
            variant="text"
            v-bind="{ ...button }"
          >
            {{ button.title }}
          </AppButton>
        </div>
      </ComponentCard>
    </div>
  </div>
</template>