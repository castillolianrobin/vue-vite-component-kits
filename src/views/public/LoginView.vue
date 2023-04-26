<script setup lang="ts">
import { 
  AppCard, 
  AppButton, 
  AppForm, 
  AppFormInput, 
AppFormCheckbox
} from '@/components/app'; 


</script>

<template>
  <div 
    class="
      h-full w-full 
      bg-primary-100
      flex flex-col md:flex-row
    "
  >
    <!--Login Card  -->
    <AppCard class="p-5 lg:px-16 md:w-1/2">
      <h1 class="text-3xl font-bold text-primary-500">
        Login
      </h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
      <AppForm class="mt-6">
        <AppFormInput
          label="Username"
          placeholder="username_1@email.com"
        ></AppFormInput>

        <AppFormInput
          type="password"
          label="Password"
          placeholder="Password_123"
        ></AppFormInput>
        

        <div class="flex items-center justify-between">
          <AppFormCheckbox
            label="Remember Me"
            toggle-input
          ></AppFormCheckbox>
          <AppButton class="mt-4 px-7">
            Login
          </AppButton>
        </div>
      </AppForm>
    </AppCard>

    <div class="bg-primary-500 flex-grow">
      Other Section
    </div>
  </div>
</template>
