<script setup lang="ts">
// Components
import { AppButton, AppTable, type HeadersProp } from '@/components/app';
import { DashboardBody } from '@/components/dashboard';
// services
import { Users, type User } from '@/services';
import { ref, watch } from 'vue';

/** Table Logic */

// Table Headers
const headers: HeadersProp[]  = [
  { text: 'Fist Name', key: 'userInfo', subKey: 'firstName' },
  { text: 'Last Name', key: 'userInfo', subKey: 'lastName' },
  { text: 'Email', key: 'email' },
  { text: 'Type', key: 'userType', subKey: 'name' },
  { text: 'Status', key: 'status' },
  { text: '', key: 'actions' },
]

// Table data
const items = ref<User[]>([])
const itemsPerPage = ref(5);
const currentPage = ref(1);
const pageLength = ref(1);
const loading = ref(false);

async function getData(page: number = 1) {
  loading.value = true;
  try {
    const data = (await Users.list({ page, limit: itemsPerPage.value })).data;
    items.value = data.data;
    pageLength.value = data.lastPage;
  } catch (e) {
    console.error('User Table: ', e)
  }
  loading.value = false;
}

watch(currentPage, (val)=> getData(val), { immediate: true });
</script>

<template>
  <div >
    
    <!-- Header -->
    <div class="mb-6 flex justify-between items-center">
      <h3>Users</h3>
      <AppButton 
        :to="{ name: 'UserCreate' }"
      >
        Create User
      </AppButton>
    </div>  

    <AppTable
      :persist-column-on-mobile="['actions']"
      :loading="loading" 
      static
      v-bind="{ headers, items, currentPage, pageLength }"
      v-model:current-page="currentPage"
    >
      <!-- Type Column -->
      <template #item-userType-name="{ item }">
        <span class="capitalize">{{ item.userType.name }}</span>
      </template>
      <!-- Status Column -->
      <template #item-status="{ item }">
        <span 
          v-if="item.status === 'verified'"
          class="px-2 uppercase text-sm font-light rounded-full bg-primary-800"
        >
          {{ item.status }}
        </span>
        <span v-else class="text-secondary">
          {{ item.status }}
        </span>
      </template>
      
      <!-- Actions Column -->
      <template #item-actions="{ item }">
        <AppButton 
        :to="{ name: 'UserShow', params: {id: item.id} }"  
        class="block ml-auto"
          variant="text"
          size="sm"
        >
          View User
        </AppButton>
      </template>
    </AppTable>
  </div>
</template>