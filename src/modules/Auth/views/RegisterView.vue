
<script setup lang="ts">
import { ref } from 'vue';
import type { AxiosError } from 'axios';
// Components
import { AppButton, AppCard, AppForm, AppFormDatePicker, AppFormInput } from '@/components/app';
// Services
import { Users, type CreateUser } from '@/services';
import type { ErrorResponse } from '@/services/types';
// Compsables
import { matchString } from '@/composables/validation/validations';
// Assets
import logo from '@/assets/logo.png';

const form = ref({
  email: '',
  password: '',
  verify_password: '',
  userInfo: { firstName: '', lastName: '', middleName: '', birthday: ''},
})
const error = ref('');
const loading = ref(false);
const success = ref(false);

async function signupUser(errors: string[]) {
  if (errors?.length) return;

  loading.value = true;
  try {
    const response = await Users.register(form.value);
    const registeredUser = response.data.success.data;
    if (response.data.success) {
      success.value = true;
      console.log(registeredUser);
    }
  } catch (e) {
    console.error('Login: Something went wrong', e);
    const err = (e as AxiosError<ErrorResponse>).response?.data.error
    error.value = err?.message || '';
  }
  loading.value = false;
}

</script>

<template>
  <div 
    class="
      w-full h-full 
      flex flex-col md:flex-row justify-center items-center 
      bg-gradient-to-b 
      from-secondary-300
      to-primary-100
      dark
      md:overflow-hidden
    "
  >
    <!-- Brand Column -->
    <div class="px-1 md:px-5">
      <!-- Logo -->
      <div 
        class="
          p-5
          mb-10 
          h-12 md:h-40
          bg-primary-300 
          rounded-full
          aspect-square 
        "
      >
        <img 
          :src="logo" 
          class="w-full drop-shadow-lg" 
          alt="Logo" 
        />
      </div>

      <!-- Tagline -->
      <h3 class="hidden md:block leading-normal font-bold text-3xl">
        <span class="text-white bg-primary-500">PACK</span>
         YOUR CONSTRUCTION SUPPLY WITHIN THE CONVENIENCE OF YOUR 
         <span class="text-primary-500">
          DEVICE.
         </span>
      </h3>
      <p class="mt-5">
        Sign up and discover unlimited supplies of construction material varying prices. You don't have spend your time canvassing on multiple locations and phone numbers anymore.
        <!-- You've got schedules, and budgets to keep. When your team is on pocketyard, you've got everything you need to keep construction moving. All in your pocket. -->
      </p>
    </div>
    <!-- Register column -->
    <AppCard 
      class="
        my-5 mx-2 p-4 md:ml-auto md:mr-0 lg:px-10
        flex-shrink-0 
        w-[650px] max-w-[98%]
        md:h-full md:overflow-auto 
        scrollbar
      "
    >
      <div v-if="success">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-primary-500">
            Successfully Registered! 
          </h1>

          <p class="mt-5">
            Please check your email for the verification link.
          </p>
        </div>
      </div>
      <div v-else>
        <div class="text-center ">
          <h1 class="mb-2 text-2xl text-primary-500">
            <span>Sign Up</span> 
          </h1>
    
          <!-- <p class="mx-5 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p> -->
        </div>
  
        <AppForm 
          class="mt-5 flex flex-col gap-2"
          @validate="signupUser"
        >
          <h3 class="font-semibold">
            Credentials
          </h3>
          <AppFormInput
            v-model="form.email"
            :disabled="loading"
            label="Email"
            name="Email"
            placeholder="username_1@email.com"
            validations="required | email"
          ></AppFormInput>
  
          <div class="gap-3 grid grid-cols-1 md:grid-cols-2">
            <AppFormInput
              v-model="form.password"
              :disabled="loading"
              name="Password"
              type="password"
              label="Password"
              placeholder="******"
              validations="required"
            ></AppFormInput>

            <AppFormInput
              v-model="form.verify_password"
              :disabled="loading"
              type="password"
              label="Verify Password"
              placeholder="******"
              :validations="[
                'required', 
                matchString(form.password, 'Password')
              ]"
            ></AppFormInput>

          </div>
          <h3 class="mt-2 font-semibold">
            Basic Information
          </h3>

          <div class="grid gap-3 grid-cols-1 md:grid-cols-2">

            <AppFormInput
              v-model="form.userInfo.firstName"
              :disabled="loading"
              name="First Name"
              label="First Name"
              placeholder="Juan"
              validations="required"
            ></AppFormInput>
    
            <AppFormInput
              v-model="form.userInfo.lastName"
              :disabled="loading"
              name="Last Name"
              label="Last Name"
              placeholder="Dela Cruz"
              validations="required"
            ></AppFormInput>
    
            <AppFormInput
              v-model="form.userInfo.middleName"
              :disabled="loading"
              name="Middle Name"
              label="Middle Name"
              placeholder="Siena"
              validations="required"
            ></AppFormInput>
  
            <AppFormDatePicker
              v-model="form.userInfo.birthday"
              :disabled="loading"
              label="Birthday"
              as-single
            ></AppFormDatePicker>
    
          </div>
          
  
          <AppButton 
            :loading="loading"
            class="mt-10 w-full" 
            type="submit"
          >
            Submit
          </AppButton>
        </AppForm>
      </div>

      <AppButton
        :to="{ name: 'Login' }"
        variant="text" 
        class="mt-5 mx-auto"
      >
        Back to Login
      </AppButton>
    </AppCard>
    <div class="">
    </div>
  </div>
</template>