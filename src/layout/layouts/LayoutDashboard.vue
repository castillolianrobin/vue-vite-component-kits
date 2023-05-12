<script setup lang="ts">
import LayoutDashboardSideBar from './LayoutDashboard/LayoutDashboardSideBar.vue';
import { ToggleDarkMode } from '@/components';
import { AppButton, AppModal } from '@/components/app';
import { ref } from 'vue';
import { Users } from '@/services';
import { useRouter } from 'vue-router';
  

/** Router Composable */
const router = useRouter();


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
  <div 
    id="layout-dashboard"
    class="w-full h-full"
  >
    <div 
      class="
        relative
        w-full h-full
        grid grid-rows-dashboard grid-cols-dashboard
        text-secondary-800 dark:text-secondary-200
        bg-secondary-100 dark:bg-secondary-900 
      "
    >
      <!-- Top Navigation -->
      <header 
        class="
          px-1 md:px-3 py-1
          flex items-center
          bg-secondary-50 dark:bg-secondary-800
          text-black dark:text-white
          row-start-1 col-span-2
          shadow-md 
          border-b dark:border-secondary-700
        "
      >
        <!-- Github Link -->
        <a
          href="https://github.com/castillolianrobin/vue-vite-component-kits/"
          class="p-1 rounded-full bg-secondary-50 hover:underline"
          target="_blank"
        >  
          <img 
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
            alt="GitHub Link"
            class="h-5 aspect-square"
          />
        </a>

        <!-- Title -->
        <h1 class="mx-3 my-2 flex-grow text-center font-semibold truncate hidden md:block ">
          Sample Dashboard
        </h1>

        <ToggleDarkMode 
          :options="{ selector: '#layout-dashboard' }"
        ></ToggleDarkMode>

        <!-- Log Out Modal -->
        <AppModal :persist="logoutLoading">
          <template #trigger="{ toggleModal }">
            <AppButton 
              size="sm" 
              color="secondary-500"
              class="ml-1"
              @click="toggleModal"
            >
              Logout
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
      <!-- Side Bar -->
      <LayoutDashboardSideBar
        class="row-start-2"
      ></LayoutDashboardSideBar>
      
      <main
        class="
          scrollbar
          row-start-2 col-start-2 
          overflow-auto 
        "
      >
        <slot></slot>
      </main>
    </div>
  </div>
</template>
