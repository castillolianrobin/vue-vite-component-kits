<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// Components
import { ToggleDarkMode } from '@/components';
import { AppButton, AppModal } from '@/components/app';
import { ArrowLeftOnRectangleIcon as LogoutIcon } from '@heroicons/vue/24/solid';
// Services
import { Users } from '@/services';


/** Router Composable */
const router = useRouter();

/** $route Composable */
const route = useRoute();


// layout meta tag listed in the route definition
const title = computed(()=> route.meta.title as string);


/** Logout Logic */

const logoutLoading = ref(false);

async function logOut() {
  logoutLoading.value = true;
  try {
    const response = await Users.logout();
    if (response.data.success) {
      router.push({ name: 'Login' });
    } else {
      alert('Failed to logout. Try again')
    }
  } catch(e) {
    alert('Failed to logout. Try again')
  }
  logoutLoading.value = false;
}

</script>


<template>
  <header 
    class="
      px-1 md:px-3 py-1
      flex items-center
      bg-secondary-50 dark:bg-secondary-800
      text-black dark:text-white
      shadow-md 
      border-b dark:border-secondary-700
    "
  >
    <!-- Title -->
    <h1 class="mx-3 my-2 flex-grow font-bold truncate hidden md:block ">
      {{ title || 'Pack-it Portal' }}
    </h1>

    <ToggleDarkMode 
      :options="{ selector: '#layout-dashboard' }"
    ></ToggleDarkMode>

    <!-- Log Out Modal -->
    <AppModal :persist="logoutLoading">
      <template #trigger="{ toggleModal }">
        <AppButton 
          variant="text"
          size="sm" 
          color="secondary-500"
          class="ml-1"
          @click="toggleModal"
        >
          <LogoutIcon class="h-6"></LogoutIcon>
        </AppButton>
      </template>
      <template #default="{ toggleModal }">
        <div class="m-3">
          <p>Are you sure you want to logout?</p>
          <div class="mt-5 flex justify-end gap-3">
            <AppButton 
              :disab="logoutLoading"
              variant="outline" 
              @click="toggleModal"
            >
              Cancel
            </AppButton>
            <AppButton 
              :loading="logoutLoading"
              @click="logOut"
            >
              Logout
            </AppButton>
          </div>
        </div>
      </template>
    </AppModal>
  </header>
</template>