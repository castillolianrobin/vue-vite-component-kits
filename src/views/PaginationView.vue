<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppFormInput, AppFormSelect, AppPagination } from '@/components/app';
import { ref } from 'vue';

// First pagination
const firstPagination = ref(1);
// Second pagination
const secondPagination = ref(1);
const secondPaginationLength = ref(10);
// Third pagination
const thirdPagination = ref(1);
const thirdPaginationLength = ref(100);
const thirdPaginationPageVisible = ref(3);
// Third pagination
const fourthPagination = ref(5);


</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Pagination</PageHeader>
    
    <ComponentCard title="Pagination v-model">
      <div class="grid lg:grid-cols-2 items-center justify-center">
        <div>
          <AppPagination
            v-model="firstPagination"
            length="10"
          ></AppPagination>
        </div>

        <p class="text-center">
          Current Page: 
          <b class="ml-2 text-primary-500">
            {{ firstPagination }}
          </b>
        </p>
      </div>
    </ComponentCard>
    <div class="grid lg:grid-cols-2 gap-2">
      <ComponentCard title="Pagination Length">
        <div class="grid lg:grid-cols-2 items-end justify-center">
          <div>
            <AppPagination
              v-model="secondPagination"
              :length="secondPaginationLength"
            ></AppPagination>
          </div>
  
          <div>
            <AppFormInput
              v-model="secondPaginationLength" 
              label="Pagination Length"
              type="number"
              min="1"
            />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Pagination Visible Page">
        <div class="grid lg:grid-cols-2 items-end justify-center">
          <div>
            <AppPagination
              v-model="thirdPagination"
              :length="thirdPaginationLength"
              :page-visible="thirdPaginationPageVisible"
            ></AppPagination>
          </div>
  
          <div>
            <AppFormSelect
              v-model="thirdPaginationPageVisible" 
              :items="[1,2,3,4,5]"
              label="Visible Page Length"
            />
          </div>
        </div>
      </ComponentCard>
    </div>

    

    <div class="grid lg:grid-cols-2 gap-2 w-full overflow-hidden">
      <!-- persistEdgePAges props -->
      <ComponentCard title="Pagination with persisting edge pages">
        <div class="grid items-center justify-center">
          <div>
            <AppPagination
              v-model="fourthPagination"
              length="10"
              page-visible="5"
              persist-edge-pages
            ></AppPagination>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Disabled Pagination">
        <div class="grid items-center justify-center">
          <div>
            <AppPagination
              length="10"
              disabled
            ></AppPagination>
          </div>
        </div>
      </ComponentCard>
    </div>

  </div>
</template>
