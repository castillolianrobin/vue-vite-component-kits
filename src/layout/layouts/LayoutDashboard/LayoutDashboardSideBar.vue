<script setup lang="ts">
import { AppButton } from '@/components/app';
import { ref } from 'vue';
import type { RouteRecordName } from 'vue-router';

const navigations: Navigation[] = [
  { routeName: 'Home', label: 'Home' },
  { routeName: 'Cards', label: 'Cards' },
  { routeName: 'Buttons', label: 'Buttons' },
  { routeName: 'Dropdowns', label: 'Dropdowns' },
  { routeName: 'Tabs', label: 'Tabs' },
  { routeName: 'Modals', label: 'Modals' },
  { routeName: 'Pagination', label: 'Paginations' },
  { routeName: 'Table', label: 'Tables' },
  { routeName: 'Form', label: 'Form' },
  { routeName: 'FormInput', label: 'Form Input & Text Area' },
  { routeName: 'FormSelect', label: 'Form Select' },
  { routeName: 'FormCheckboxRadio', label: 'Form Checkbox & Radio' },
  { routeName: 'FormFileUpload', label: 'Form File Upload' },
  { routeName: 'Sandbox', label: 'SandBox' },
];

const active = ref(false);

interface Navigation {
  routeName: RouteRecordName;
  label: string;
}
</script>

<template>
  <div
    class="
      flex
      relative
      h-full
      bg-primary-900 text-secondary-200
      shadow-xl
      z-20
    "
  >
    <div class="p-1 flex-shrink-0 md:sr-only z-20 bg-success-800">
      <AppButton 
        variant="outline"
        size="sm"
        class="px-0.5"
        color="white"
        @click="active = !active"
      >
        {{ active ? '&lsaquo;' : '&rsaquo;'  }}
      </AppButton>
    </div>
    <aside 
        class="
          transition-all
          md:w-screen max-w-[250px] h-full 
          overflow-auto
          absolute md:relative left-full md:left-0  
          bg-inherit
        "
        :class="{
          'w-0': !active,
          'w-screen': active,
        }"
      >
    
        <ul class="mt-5">
          <li
            v-for="nav in navigations"
            :key="nav.label"
          >
            <router-link 
              :to="{ name: nav.routeName }"
              class="
                w-full 
                block 
                pl-3 my-2 
                outline-none            
                focus-within:text-primary-200
                hover:text-primary-300
                border-l-4 border-primary-500/0
                transition-colors
              "
              active-class="
                border-primary-500/100 
                font-semibold
              "
              @click="active = false"
            >
              {{  nav.label  }}
            </router-link>
          </li>
        </ul>
    </aside>
  </div>
</template>
