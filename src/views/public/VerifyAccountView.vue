

<script setup lang="ts">
// components
import { AppButton, AppCard, AppLoading } from '@/components/app';
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/vue/20/solid';
// Services
import { Users } from '@/services';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@/services/types';

/** Route Composable */
const route = useRoute();


// Data
const loading = ref(false);
const success = ref(false);
const error = ref('');

async function verifyUser() {
  const token = `${route.query?.token}`;
  const email = `${route.query?.email}`;
  if (!token || !email) {
    success.value = false;
    return (error.value = 'Missing Parameter. Check the email sent to your email');
  }
  
  loading.value = true;
  try {
    await Users.verifyAccount({ token, email });
    success.value = true;
  } catch (e) {
    const err = e as AxiosError<ErrorResponse>
    error.value = `An error occured. ${err.response?.data.error.message}`;
    success.value = false;
  }
  loading.value = false;
}


verifyUser();

</script>

<template>
  <div 
    class="
      w-full h-full 
      flex items-center justify-center
      bg-gradient-to-b 
      from-primary-500
      to-primary-800
    "
  >

    <AppCard
      class="mx-4 max-w-[340px]"
    >
      <AppLoading v-if="loading"></AppLoading>
      <div
        v-if="success" 
        class="flex flex-col items-center justify-center"
      >
        <CheckCircleIcon 
          class="h-20 text-primary-500"
        ></CheckCircleIcon>
        
        <h1 class="text-2xl font-bold text-center text-primary-500">
          VERIFIED!
        </h1>
  
        <p class="mt-3 text-center text-sm">
          You have successfuly verified your account.
           Proceed to login to use this account
        </p>
      </div>
      <!-- If Failed -->
      <div 
        v-else
        class="flex flex-col items-center justify-center"
      >
        <InformationCircleIcon 
          class="h-20 text-error-500"
        ></InformationCircleIcon>

        <h1 class="text-2xl font-bold text-center text-error-500">
          ERROR!
        </h1>

        <p class="mt-3 text-center text-sm">
          {{ error }}
        </p>

      </div>
      <AppButton
        :to="{ name: 'Login' }" 
        variant="text"
        class="mt-5 font-bold"
      >
        Proceed to Login
      </AppButton>
    </AppCard>
  </div>
</template>