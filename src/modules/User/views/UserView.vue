<script setup lang="ts">
import { AppButton, AppCard, AppModal } from '@/components/app';
import { DashboardBody } from '@/components/dashboard';
import { DashboardCardItem } from '@/components/dashboard';
import { Users, type User } from '@/services';
import type { AxiosError } from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


/** Route Composable */
const route = useRoute()

/** Route Composable */
const router = useRouter()

const { id } = route.params;
const user = ref<User>(); 
const loading = ref(false);

async function getUser() {
  const response = await Users.show(+id);
  if (response.data)
    user.value = response.data;
}

async function deleteUser() {
  loading.value = true;
  try {
    const response = await Users.delete(+id);
    if (response.data.success)
      alert('Deleted')
      router.push({ name: 'UserList' })
  } catch (e) {
    const error = e as AxiosError;
    if (error.response?.status) {
      alert('Something went wrong');
    }
  }
  loading.value = false;
}

getUser();
</script>


<template>
  <DashboardBody>
    
    <div class="mb-5 flex">
      <!-- Actions -->
      <div class="ml-auto flex gap-2">
        <!-- Back Btn -->
        <AppButton variant="outline" class="px-4">
          Back
        </AppButton>
        
        <!-- Delete Modal -->
        <AppModal :persist="loading">
          <template #trigger="{ toggleModal }">
            <AppButton 
              color="error-500"
              @click="toggleModal"
            >
              Delete User
            </AppButton>
          </template>
          <template #default="{ toggleModal }">
            <div class="px-5 py-2">
              <div>
                <h3 class="mb-3 font-bold text-xl ">Confirm Delete</h3>
                <p>Are you sure you want to delete this user? </p>
                <p>Click to confirm to proceed.</p>
              </div>
              <!-- Delete Actions -->
              <div class="mt-10 flex justify-end gap-3">
                <AppButton 
                  :disabled="loading"
                  color="secondary-500" 
                  variant="outline"
                  @click="toggleModal(false)"
                >
                  Cancel
                </AppButton>
                <AppButton
                  :loading="loading"
                  color="error-500"
                  @click="deleteUser"              
                >
                  Confirm
                </AppButton>
              </div>
            </div>
          </template>
        </AppModal>
        
        <!-- Edit Btn -->
        <AppButton>
          Edit User
        </AppButton>
      </div>
    </div>
    
    <AppCard title="User Credential">
      <div class="grid grid-cols-2 gap-2">
        <DashboardCardItem label="Email" >
          {{ user?.email }}
        </DashboardCardItem>
  
        <DashboardCardItem label="Type">
          <span class="capitalize">{{ user?.userType?.name }}</span>
        </DashboardCardItem>
      </div>
    </AppCard>


    <AppCard title="User Information" class="mt-4">
      <div class="grid grid-cols-2 gap-2">
        <DashboardCardItem label="First Name" >
          {{ user?.userInfo?.firstName  || 'N/A' }}
        </DashboardCardItem>
  
        <DashboardCardItem label="Last Name">
          {{ user?.userInfo?.lastName  || 'N/A' }}
        </DashboardCardItem>

          
        <DashboardCardItem label="Middle Name">
          {{ user?.userInfo?.middleName  || 'N/A' }}
        </DashboardCardItem>

        <DashboardCardItem label="Birthday">
          {{ user?.userInfo?.birthday || 'N/A' }}
        </DashboardCardItem>
      </div>
    </AppCard>
  </DashboardBody>
</template>
