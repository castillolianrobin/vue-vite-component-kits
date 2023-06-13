<script setup lang="ts">
import { AppButton, AppChip, AppTable, AppTabs, type HeadersProp } from '@/components/app';
import { UserCircleIcon } from '@heroicons/vue/24/solid';

const tabs = [
  { text: 'On Going', key: 'on-going' },
  { text: 'Completed', key: 'complete' },
]

const headers: HeadersProp[] = [
  { text: 'Customer', key: 'customer', class: 'w-64 xl:w-72' },
  { text: 'Status', key: 'status' },
  { text: 'Delivery Date', key: 'deliver_at' },
  { text: 'Order Date', key: 'created_at' },
  { text: '', key: 'actions' },
]

const items = [
  { customer: 'Juan Dela Cruz', deliver_at: '02-02-2024', created_at: '02-02-2023', status: 'Pending' },
  { customer: 'Juan Dela Cruz', deliver_at: '02-02-2024', created_at: '02-02-2023', status: 'Pending' },
  { customer: 'Juan Dela Cruz', deliver_at: '02-02-2024', created_at: '02-02-2023', status: 'Pending' },
  { customer: 'Juan Dela Cruz', deliver_at: '02-02-2024', created_at: '02-02-2023', status: 'Pending' },
]

const persistColumns = ['actions']

</script>

<template>
  <div>
    <AppTabs 
      :items="tabs" 
      item-class="mr-4 text-lg"
      tab-class="mt-5"
    >
      <!-- On Going -->
      <template #on-going>
        <AppTable 
          :headers="headers" 
          :items="items"
          :persist-column-on-mobile="persistColumns"
        >
          <template #item-customer="{ item }">
            <div class="flex gap-2">
              <UserCircleIcon class="h-10 text-secondary-500"></UserCircleIcon>
              <div class="flex-shrink flex flex-col">
                <span>{{ item.customer  }}</span>
                <span class="text-secondary-500">
                  Yasawa Builders Inc.
                </span>
              </div>
            </div>
          </template>

          <template #item-status="{ item }">
            <div class="flex justify-start">
              <AppChip 
                class="px-2"
                :color="item.status === 'delivered' 
                  ? 'success-500'
                  : 'info-500'
                "
              >
                {{  item.status  }}
              </AppChip>
            </div>
          </template>

          <template #item-actions>
            <div class="flex justify-end">
              <AppButton size="sm">
                View Order
              </AppButton>
            </div>
          </template>
        </AppTable>
      </template>

      <!-- Complete -->
      <template #complete>
        <AppTable :headers="headers" :items="[]"></AppTable>
      </template>
    
    </AppTabs>
  </div>
</template>
