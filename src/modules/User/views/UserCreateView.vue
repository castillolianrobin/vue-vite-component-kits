<script setup lang="ts">
import { ref } from 'vue';
// Components
import { 
  AppButton, 
  AppCard, 
  AppForm, 
  AppFormDatePicker, 
  AppFormInput, 
  AppFormSelect,
  AppFormError, 
} from '@/components/app';
import { DashboardBody } from '@/components/dashboard';
// composables
import { matchString } from '@/composables/validation/validations';
// Services
import { Users } from '@/services';
import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@/services/types';

const error = ref('');
const form = ref({ 
  email: '', 
  password: '', 
  verify_password: '', 
  userInfo: {
    firstName: '',
    lastName: '',
    middleName: '',
    birthday: '',
  },
  userType: 'Member',
});

async function createUser(formError: string[]) {
  if (formError.length) return;

  try {
    const response = await Users.create(form.value);
    if (response.data.success) {
      alert('User Created Successfully');
    }
  } catch(e) {
    console.log('Create User: ', e);
    const err = e as AxiosError<ErrorResponse<any>>
    if (err.response) {
      error.value = err.response?.data.error.message;
    }
  }
}
</script>

<template>
  <DashboardBody>
    <!-- Create User Form -->
    <AppForm @validate="createUser">
      <div class="mb-5 flex items-end">
        <AppFormError :error="error"></AppFormError>
        <!-- Actions -->
        <div class="ml-auto flex gap-2">
          <AppButton
            :to="{ name: 'UserList' }" 
            color="secondary-500" 
            class="px-4"
          >
            Cancel
          </AppButton>
  
          <AppButton type="submit">
            Create User
          </AppButton>
        </div>
      </div>
      <!-- Form Inputs -->
      <div class="grid lg:grid-cols-5 gap-4">
        <div class="lg:col-span-3 flex flex-col gap-6">
          <AppCard title="User Credentials">
            <div class="flex flex-col gap-2">
              <!-- Email -->
              <AppFormInput
                v-model="form.email"
                label="Email"
                placeholder="email@gmail.com"
                validations="required | email"
              ></AppFormInput>
  
              <!-- Password -->
              <AppFormInput
                v-model="form.password"
                type="password"
                label="Password"
                placeholder="PassWord123"
                validations="required"
              ></AppFormInput>
  
              <!-- Password -->
              <AppFormInput
                v-model="form.verify_password"
                type="password"
                label="Confirm Password"
                placeholder="PassWord123"
                :validations="[
                  'required', 
                  matchString(form.password, 'Password')
                ]"
              ></AppFormInput>

            </div>
          </AppCard>

          <AppCard title="User Information">
            <div class="grid grid-cols-2 gap-2">
              <!-- First Name -->
              <AppFormInput
                v-model="form.userInfo.firstName"
                label="First Name"
                placeholder="Juan"
                validations="required"
              ></AppFormInput>
  
              <!-- Last Name -->
              <AppFormInput
                v-model="form.userInfo.lastName"
                label="Last Name"
                placeholder="Dela Cruz"
                validations="required"
              ></AppFormInput>

              <!-- Middle Name -->
              <AppFormInput
              v-model="form.userInfo.middleName"
                label="Middle Name"
                placeholder="Rizal"
              ></AppFormInput>
              
              <AppFormDatePicker
                v-model="form.userInfo.birthday"
                label="Birthday"
                as-single
              ></AppFormDatePicker>
            </div>
          </AppCard>
        </div>

        <!-- Second Column -->
        <div class="lg:col-span-2">
          <AppCard title="Roles & Permission">
            <AppFormSelect
              v-model="form.userType"
              label="User Type"
              :items="[ 'Member', 'Admin']"
            ></AppFormSelect>
          </AppCard>
        </div>
      </div>
    </AppForm>
  </DashboardBody>
</template>