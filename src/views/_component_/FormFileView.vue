<script setup lang="ts">
import ComponentCard from '@/components/ComponentCard.vue';
import PageHeader from '@/components/PageHeader.vue';
import { AppButton, AppFormFile } from '@/components/app';
import { ref } from 'vue';

const file1 = ref([]);
const file2 = ref([]);
const file3 = ref([]);
const file4 = ref([]);
const file5 = ref([]);

</script>

<template>
  <div class="p-3 px-6 w-full h-full">
    <PageHeader>Form File Upload</PageHeader>
    <ComponentCard title="Default File Upload">
      <AppFormFile
        v-model="file1"
        label="Single file upload"
      ></AppFormFile>
    </ComponentCard>

    <ComponentCard title="File Upload With Limit">
      <AppFormFile
        v-model="file2"
        accept="image/*"
        max-size="25"
        label="Single file upload"
      ></AppFormFile>
    </ComponentCard>

    <ComponentCard title="Multiple File Upload">
      <AppFormFile
        v-model="file3"
        label="Multiple file upload" 
        max-size="25000"
        multiple
      ></AppFormFile>
    </ComponentCard>

    <ComponentCard title="Default File Input">
      <AppFormFile
        default-input
        v-model="file4"
        label="Multiple file upload" 
        multiple
      ></AppFormFile>
    </ComponentCard>

    <ComponentCard title="File Upload Custom Display Slot">
      <AppFormFile
        v-model="file5"
        label="Single file upload"
        color="success-500"
        default-input
        multiple
      >
        <template #display="{ openFileInput, props: _props }">
          <div 
            class="flex gap-2"
            @click="openFileInput"          
          >
            <p
              v-if="!_props?.modelValue?.length" 
              class="text-secondary-500"
            >
              No file to show
            </p>
            <div
              v-else
              v-for="file, i in _props.modelValue"
              :key="`file-${i}`"
              :class="`
                px-2 
                text-white
                rounded-full
                bg-${_props.color}
                flex gap-1 items-center
              `"
            >
              <span>{{ file.name }}</span>
              <AppButton 
                size="sm" 
                variant="text"
                color="black" 
                class="p-0 rounded-full font-bold"
                @click.stop="()=>file5.splice(i, 1)"
              >
                x
              </AppButton>
            </div>
          </div>
        </template>
      </AppFormFile>
    </ComponentCard>
  </div>
</template>