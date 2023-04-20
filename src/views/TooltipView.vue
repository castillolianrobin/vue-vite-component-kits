<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppButton, AppCard, AppTooltip } from '@/components/app';


</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Tooltips</PageHeader>
    <!-- Default Tooltip -->
    <ComponentCard title="Default Tooltip">
      <div class="p-4">
        <div class="flex item-center justify-center gap-1">
          <p>
            Hover on the info icon to show the tooltip
          </p>
          <AppTooltip
            tooltip-text="Default tooltip text"
          ></AppTooltip>
        </div>
      </div>
      </ComponentCard>

      <!-- Tooltio Direction -->
      <ComponentCard title="Tooltip Directions">
      <div class="p-4">
        <div class="grid grid-cols-2 lg:grid-cols-4 item-center justify-center gap-5">
          <AppTooltip 
            direction="top" 
            tooltip-text="Tooltip Text"
          >
            <div class="border border-primary-300 px-2 rounded">
              Top
            </div>
          </AppTooltip>

          <AppTooltip 
            direction="bottom" 
            tooltip-text="Tooltip Text"
          >
            <div class="border border-primary-300 px-2 rounded">
              Bottom
            </div>
          </AppTooltip>

          <div class="flex justify-center">
            <AppTooltip 
              direction="right" 
              tooltip-text="Tooltip Text"
            >
              <div class="border border-primary-300 px-2 rounded">
                Right
              </div>
            </AppTooltip>
          </div>

          <div class="flex justify-center">
            <AppTooltip 
              direction="left" 
              tooltip-text="Tooltip top"
            >
              <div class="border border-primary-300 px-2 rounded">
                Left
              </div>
            </AppTooltip>
          </div>
        </div>

      </div>
      </ComponentCard>

      <ComponentCard title="Tooltip on Click">
        <div class="flex justify-center">
          <AppTooltip 
            direction="top" 
            tooltip-text="Tooltip top"
            show-on-click
          >
            <AppButton>
              Click Me
            </AppButton>
          </AppTooltip>
        </div>
      </ComponentCard>
  </div>
</template>