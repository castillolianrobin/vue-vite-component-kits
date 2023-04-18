<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppFormInput, AppFormSelect, AppPagination, AppTable, type HeadersProp } from '@/components/app';
import { ref } from 'vue';

const headers:HeadersProp[] = [
  { text: 'First Name', key: 'first_name', sortable: true },
  { text: 'Last Name', key: 'last_name', sortable: true },
  { text: 'Age', key: 'age', sortable: true },
];

const items = [
  { first_name: 'Elson', last_name: 'Sparks', age: 17 },
  { first_name: 'Sheemus', last_name: 'Barks', age: 44 },
  { first_name: 'Tyrone', last_name: 'Al-zhakim', age: 23 },
  { first_name: 'Christie', last_name: 'Fermin', age: 15 },
  { first_name: 'Barley', last_name: 'Monroe', age: 20 },
  { first_name: 'Marlou', last_name: 'Ford', age: 12 },
  { first_name: 'Zandro', last_name: 'Marudz', age: 12 },
  { first_name: 'Tristle', last_name: 'Fermin', age: 54 },
  { first_name: 'Byrone', last_name: 'Al-zhakim', age: 23 },
  { first_name: 'Carlo', last_name: 'Ford', age: 20 },
  { first_name: 'Alexander Dee', last_name: 'Grate', age: 20 },
  { first_name: 'Edris', last_name: 'Elback', age: 20 },
  { first_name: 'Lil', last_name: 'Wayne', age: 20 },
  { first_name: 'Glock', last_name: 'Nayn', age: 40 },
  { first_name: 'Preston', last_name: 'Miles', age: 24 },
  { first_name: 'Edie', last_name: 'Smith', age: 24 },
];
</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Table</PageHeader>
    
    <ComponentCard title="Default Table">
      <AppTable
        :headers="headers"
        :items="items"
        mobile-column-number="2"
      ></AppTable>
    </ComponentCard>


    <ComponentCard title="Table with 5 items per page">
      <AppTable
        :headers="headers"
        :items="items"
        items-per-page="5"
      ></AppTable>
    </ComponentCard>

    <ComponentCard title="Table Cell Slots">
      <AppTable
        :headers="headers"
        :items="items"
        items-per-page="5"
        :persist-column-on-small="[2]"
      >
      <template #item-first_name="{ item }">
        <p class="text-primary-500">
          {{ item.first_name }}
        </p>
      </template>

      <template #item-last_name="{ item }">
        <p class="font-bold">
          {{ item.last_name }}
        </p>
      </template>

      <template #item-age="{ item }">
        <div class="flex item-center justify-between">
          <p>
            {{ item.age }}
          </p>
          <p
            v-if="+item.age < 18"
            class="ml-1 px-2 py-1 bg-secondary-500 rounded-full text-white text-xs"
          >
            Underage
          </p>
        </div>
      </template>
      </AppTable>
    </ComponentCard>
  </div>
</template>
