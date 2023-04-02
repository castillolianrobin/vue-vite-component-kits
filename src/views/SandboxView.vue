<script setup lang="ts">
import { AppButton, AppModal } from '@/components/app';
import { ref } from 'vue';

const active = ref(false);
</script>

<template>
  <div>
    <AppModal>
      Modal Content
      
      <template #trigger="{ toggleModal }">
        <AppButton 
          @click="toggleModal(true)"
        >
          Trigger
        </AppButton>
      </template>
    </AppModal>

    <AppButton @click="active = !active">Activate</AppButton>
    <AppModal v-model:active="active">
      Welcome To Sandbox
    </AppModal>
  </div>
</template>
