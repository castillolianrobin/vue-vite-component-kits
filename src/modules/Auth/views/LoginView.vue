<script setup lang="ts">
import { ref } from 'vue';
import type { AxiosError } from 'axios';
import { useRouter } from 'vue-router';
// Components
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
// Services
import { Users } from '@/services';
// Store
import { useAuthStore } from '@/stores/authStore';
// Assets
import logo from '@/assets/logo.png';


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
      bg-[url('/src/assets/login-background.png')] bg-cover
    "
  >
    <!--Login Card Column  -->
    <div 
      class="
        order-2 md:order-2 
        flex-grow
        p-5 
        md:w-1/2 
        flex flex-col items-center justify-center
      "
    >

      <AppCard 
        class="login-card p-4 lg:px-10 w-full max-w-[430px] shadow-none"
      >
      <h1 class="text-xl font-bold text-center flex items-center justify-center">
          <span class="uppercase">Sign in</span> 
          <AppTooltip
            class="ml-3"
            tooltip-text="email: test@email.com | password: pass123"
          ></AppTooltip>
        </h1>
        
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
              label="Stay signed in"
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
                class="px-7"
                type="submit"
                :loading="loading"
              >
                Sign in
              </AppButton>
            </div>
          </div>

          <AppFormError :error="error" aria-label="form-error"></AppFormError>

        </AppForm>
      </AppCard>
      
      <!-- Sign up Button -->
      <div class="mt-3 flex items-center">
        <p>Don't have an account yet?</p>
        <AppButton
          variant="text"
          class="mr-1"
          :disabled="loading"
          :to="{ name: 'Register' }"
        >
          Sign up
        </AppButton>

      </div>
    </div>

    <!-- Brand Column -->
    <div 
      class="
        md:w-1/2
        order-1 md:order-1
        md:p-5
        flex flex-col items-center justify-center
      "
    >
    
      <img 
        :src="logo" 
        class="md:mb-10 mx-auto h-24 drop-shadow-lg" 
        alt="Logo" 
      />
      <h1 
        class="
          hidden md:block
          p-1 px-5 
          bg-primary-700 
          drop-shadow-lg 
          text-center text-2xl md:text-4xl text-white  uppercase 
        "
      >
        Pack-it Portal
      </h1>
      <p class="
        shadow-lg p-1 bg-white hidden md:block mt-3 text-lg text-primary-700">
        Bring your hardware online
      </p>
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
