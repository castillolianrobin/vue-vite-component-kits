<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppButton, AppCard } from '@/components/app';


</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Tabs</PageHeader>
    <div class="grid lg:grid-cols-2 items-stretch gap-2">
      <!-- Default Card -->
      <ComponentCard title="Default Card">
        <div class="bg-secondary-200 p-5 h-full">
          <AppCard class="h-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet gravida augue. Curabitur et erat non ligula iaculis malesuada id at magna. Nulla pharetra, lacus at blandit porta, mi metus congue nisl, iaculis tristique dui sem a libero. Aenean tempor, tortor non blandit gravida, urna felis malesuada massa, quis rutrum felis nisi vitae sem. Aenean volutpat orci massa. Fusce eget mollis felis, tristique gravida sem.
          </AppCard>
        </div>
      </ComponentCard>
    </div>
  </div>
</template>