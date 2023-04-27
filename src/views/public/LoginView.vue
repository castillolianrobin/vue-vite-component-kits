<script setup lang="ts">
import { 
  AppCard, 
  AppButton, 
  AppForm, 
  AppFormInput, 
  AppFormCheckbox
} from '@/components/app'; 
import { useDark } from '@vueuse/core';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
useDark().value = false;
// Login Data
const username = ref('');
const password = ref('');
const isRemember = ref(false);
const loading = ref(false);

// Login Function
async function loginUser(errors?: string[]) {
  if (errors?.length) return;
  
  loading.value = true;

  try {
    await sleep(1000);
    router.push({ name: 'DashboardHome' })
  } catch {
    console.error('Login: Something went wrong')
  }
  loading.value = false;
}

/** Helpers */

function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

</script>

<template>
  <div 
    class="
      h-full w-full
      flex flex-col md:flex-row
    "
  >
    <!--Login Card Column  -->
    <div 
      class="
        order-2 md:order-1 
        flex-grow
        p-5 
        bg-secondary-50
        md:w-1/2 
        flex items-center justify-center
      "
    >

      <AppCard class="p-5 lg:px-16 h-fit">
        <h1 class="text-3xl font-bold text-primary-500">
          Login
        </h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
        <AppForm 
          class="mt-6 flex flex-col gap-2"
          @validate="loginUser"
        >
          <AppFormInput
            v-model="username"
            label="Username"
            name="Username"
            placeholder="username_1@email.com"
            validations="required | email"
          ></AppFormInput>
  
          <AppFormInput
            v-model="password"
            name="Password"
            type="password"
            label="Password"
            placeholder="******"
            validations="required"
          ></AppFormInput>
          
  
          <div class="mt-2 flex items-center justify-between">
            <AppFormCheckbox
              v-model="isRemember"
              label="Remember Me"
              toggle-input
            ></AppFormCheckbox>
            
            <!-- Submit Button -->
            <AppButton
              class="px-7"
              type="submit"
              :loading="loading"
            >
              Login
            </AppButton>
          </div>
        </AppForm>
      </AppCard>
    </div>

    <!-- Brand Column -->
    <div 
      class="
        order-1 md:order-2
        p-5
        bg-primary-500 md:flex-grow
        flex flex-col items-center justify-center
        bg-gradient-to-r 
        from-primary-500  
        to-primary-700
      "
    >
      <h1 class="drop-shadow-lg text-center text-2xl md:text-4xl text-white font-semibold">
        Sleek. Clean. Simple
      </h1>
      <p class="hidden md:block mt-5 text-lg text-primary-50">Sample Dashboard for Vue 3 Component Kits</p>
    </div>
  </div>
</template>
