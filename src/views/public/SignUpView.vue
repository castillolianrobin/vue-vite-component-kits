
<script setup lang="ts">
import { AppButton, AppCard, AppForm, AppFormDatePicker, AppFormInput } from '@/components/app';
import { ref } from 'vue';
import { Users, type CreateUser } from '@/services';
import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@/services/types';
import { matchString } from '@/composables/validation/validations';


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
      w-full h-full overflow-auto scrollbar 
      flex flex-wrap justify-center items-center 
      bg-gradient-to-b 
      from-primary-500
      to-primary-800
    "
  >
    <AppCard class="my-5 mx-2 p-4 lg:px-10">
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
          <h1 class="text-3xl font-bold text-primary-500">
            <span>Sign Up</span> 
          </h1>
    
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
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
            name="Password Verify"
            type="password"
            label="Verify Password"
            placeholder="******"
            :validations="[
              'required', 
              matchString(form.password, 'Password')
            ]"
          ></AppFormInput>
  
          <h3 class="mt-6 font-semibold">
            Basic Information
          </h3>
          
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
  
  
          <AppButton 
            :loading="loading"
            class="mt-5 mx-auto px-12" 
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
  </div>
</template>