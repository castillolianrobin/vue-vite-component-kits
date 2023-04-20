<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppButton, AppCard } from '@/components/app';


</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Cards</PageHeader>
    <div class="grid lg:grid-cols-2 items-stretch gap-5">
      <!-- Default Card -->
      <ComponentCard title="Default Card">
        <div class="p-5 h-full">
          <AppCard class="h-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet gravida augue. Curabitur et erat non ligula iaculis malesuada id at magna. Nulla pharetra, lacus at blandit porta, mi metus congue nisl, iaculis tristique dui sem a libero. Aenean tempor, tortor non blandit gravida, urna felis malesuada massa, quis rutrum felis nisi vitae sem. Aenean volutpat orci massa. Fusce eget mollis felis, tristique gravida sem.
          </AppCard>
        </div>
      </ComponentCard>

      <!-- Card Slots -->
      <ComponentCard title="Card Slot Composition">
        <div class="p-5 h-full">
          <AppCard class="h-full">
            <template #title>Slot Name: title</template>
            <template #subtitle>Slot Name: Subtitle</template>
            
            Slot Name: Default

            <template #actions>
              Slot Name: Actions
            </template>
          </AppCard>
        </div>
      </ComponentCard>
    </div>

    <!-- Sample Card -->
    <ComponentCard title="Sample Card with slots">
        <div class=" p-5">
          <AppCard class="mx-auto w-[500px] max-w-full">
            <template #title>Confirm Transaction!</template>
            <template #subtitle>Transaction ID: 5x-453453-234X</template>
            <template #actions>
              <AppButton variant="outline">
                Cancel
              </AppButton>

              <AppButton>
                Confirm
              </AppButton>
            </template>

            <p>
              We need your confirmation to proceed with the transaction step.
            </p>

            <p>Click the 'confirm' button to agree with the terms of service.</p>

          </AppCard>
        </div>
      </ComponentCard>
  </div>
</template>