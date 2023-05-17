<script setup lang="ts">
import { 
  AppCard, 
  AppButton, 
  AppForm, 
  AppFormInput, 
  AppFormCheckbox,
  AppFormError,
  AppTooltip,
  AppModal,
  AppLoading
} from '@/components/app'; 
import { Users } from '@/services';
import type { AxiosError } from 'axios';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

/** Router composable */
const router = useRouter();

/** Auth Store */
const authStore = useAuthStore()

// Data
const email = ref('');
const password = ref('');
const isRemember = ref(false);
const loading = ref(false);
const success = ref(false);
const error = ref('');


// Login Function
async function loginUser(errors?: string[]) {
  if (errors?.length  ) return;
  
  loading.value = true;
  try {
    const response = await Users.login({ 
      email: email.value, 
      password: password.value,
      remember: isRemember.value, 
    });
    const loggedUser = response.data.success.data;
    authStore.setUser(loggedUser)
    

    success.value = true;
    router.push({ name: 'DashboardHome' })
  } catch (e) {

    console.error('Login: Something went wrong', e);
    const err = (e as AxiosError<{ error: { message: string } }>).response?.data.error
    error.value = err?.message || '';
  }
  loading.value = false;
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

      <AppCard class="login-card p-4 lg:px-10">
        <h1 class="text-3xl font-bold text-primary-500">
          <span>Login</span> 
          <AppTooltip
            class="ml-3"
            tooltip-text="email: test@email.com | password: pass123"
          ></AppTooltip>
        </h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
        <AppForm 
          class="mt-6 flex flex-col gap-2"
          @validate="loginUser"
        >
          <AppFormInput
            v-model="email"
            :disabled="loading"
            label="Email"
            name="Email"
            placeholder="username_1@email.com"
            validations="required | email"
          ></AppFormInput>
  
          <AppFormInput
            v-model="password"
            :disabled="loading"
            name="Password"
            type="password"
            label="Password"
            placeholder="******"
            validations="required"
          ></AppFormInput>
          
  
          <div 
            class="
              mt-5 
              flex flex-col md:flex-row 
              items-end md:items-center justify-between

            "
          >
            <!-- Remember Checkbox -->
            <AppFormCheckbox
              v-model="isRemember"
              label="Remember Me"
              toggle-input
              class="flex-shrink-0"
            ></AppFormCheckbox>

            <!-- Actions Buttons -->
            <div 
              class="
                md:ml-auto mt-8 md:mt-0 
                flex justify-center items-center
              "
            >
              <!-- Submit Button -->
              <AppButton
                variant="text"
                class="mr-1"
                :disabled="loading"
                :to="{ name: 'SignUp' }"
              >
                Sign up
              </AppButton>
  
              <!-- Submit Button -->
              <AppButton
                class="px-7"
                type="submit"
                :loading="loading"
              >
                Login
              </AppButton>
            </div>
          </div>

          <AppFormError :error="error" aria-label="form-error"></AppFormError>

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

    <AppModal :active="success" persist>
      <div class="p-2 text-center">
        <h3 
          class="text-primary-600 font-bold uppercase"
        >
          Successfully logged in
        </h3>

        <p class="mt-3 mb-5 text-sm">
          Please wait. Loading dashboard...
        </p>

        <AppLoading></AppLoading>
      </div>
    </AppModal>
  </div>
</template>
