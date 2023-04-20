<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppButton, AppFormCheckbox, AppModal } from '@/components/app';
import { ref } from 'vue';

const modalActive = ref(false);
const persistModal = ref(true);
</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Modals</PageHeader>
    
    <!-- Modal via Props -->
    <ComponentCard title="Modal Trigger via Prop">
      <AppModal v-model:active="modalActive" close-icon>
        <h1 
          class="mb-3 text-lg text-center drop-shadow-lg font-semibold text-primary-500"
        >
          Hello World!
        </h1>
        <p class="my-2 text-center">Showing Modal using v-model:active</p>
        <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
      </AppModal>
      <div class="grid md:grid-cols-2 items-center justify-center">
        <div class="flex justify-center">
          <AppButton @click="modalActive = !modalActive">
            Show Modal via v-model
          </AppButton>
        </div>

        <p class="text-center">
          Reactive State: <b class="uppercase">{{ modalActive  }}</b>
        </p>
      </div>
    </ComponentCard>

    <!-- Modal via template -->
    <ComponentCard title="Modal Trigger via Slot">
      <AppModal close-icon>
        <h1 
          class="mb-3 text-lg text-center drop-shadow-lg font-semibold text-primary-500"
        >
          Hello World!
        </h1>
        <p class="my-2 text-center">Showing Modal using 'trigger' slot</p>
        <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
        
        <!-- Trigger -->
        <template #trigger="{ toggleModal }">
          <div class="flex justify-center">
            <AppButton @click="toggleModal(true)">
              Show Modal via slot
            </AppButton>
          </div>
        </template>
      </AppModal>
    </ComponentCard>

    <div class="grid md:grid-cols-2 gap-4">
      
      <!-- Persisting Modal -->
      <ComponentCard title="Persisting Modal">
        <AppModal :persist="persistModal" close-icon >
          <h1 
            class="my-3 text-lg text-center drop-shadow-lg font-semibold text-primary-500"
          >
            Persisting Modal
          </h1>
          <div class="flex flex-col items-center">
            <p class="my-3">This modal will not close unless toggled</p>
            <AppFormCheckbox
              v-model="persistModal"
              label="Activate Persist"
              class="mb-3"
            ></AppFormCheckbox>
          </div>
          <!-- Trigger -->
          <template #trigger="{ toggleModal }">
            <div class="flex justify-center">
              <AppButton @click="toggleModal(true)">
                Show Persisting Modal
              </AppButton>
            </div>
          </template>
        </AppModal>
      </ComponentCard>

      <!-- Custom modal -->
      <ComponentCard title="Custom Modal">
        <AppModal>
          <template #template="{toggleModal }">
            <div class="bg-primary-500 p-4 rounded-lg">
              <h1 
                class="my-3 text-lg text-center drop-shadow-lg font-semibold text-white"
              >
                This is a custom modal
              </h1>
              <div class="flex flex-col items-center">
                <p class="my-3">This modal will not close unless toggled</p>
                <AppButton 
                  color="secondary-500" 
                  class="mt-5"
                  @click="toggleModal(false)" 
                >
                  Close Modal
                </AppButton>
              </div>
            </div>
          </template>
          <!-- Trigger -->
          <template #trigger="{ toggleModal }">
            <div class="flex justify-center">
              <AppButton @click="toggleModal(true)">
                Custom Modal
              </AppButton>
            </div>
          </template>
        </AppModal>
      </ComponentCard>
    </div>
  </div>
</template>