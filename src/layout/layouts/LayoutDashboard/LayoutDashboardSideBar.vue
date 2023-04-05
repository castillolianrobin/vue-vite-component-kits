<script setup lang="ts">
import type { RouteRecordName } from 'vue-router';

const navigations: Navigation[] = [
  { routeName: 'Home', label: 'Home' },
  { routeName: 'Buttons', label: 'Buttons' },
  { routeName: 'Modals', label: 'Modals' },
  { routeName: 'Pagination', label: 'Paginations' },
  { routeName: 'Table', label: 'Tables' },
  { routeName: 'FormInput', label: 'Form Input & Text Area' },
  { routeName: 'FormCheckboxRadio', label: 'Checkbox & Radio' },
  { routeName: 'Sandbox', label: 'SandBox' },
];

interface Navigation {
  routeName: RouteRecordName;
  label: string;
}
</script>

<template>
  <aside 
    class="
      w-[30vw] max-w-full h-full 
      overflow-auto 
      shadow-xl
      bg-secondary-200
    "
  >
    <h3 
      class="mt-3 text-lg text-center uppercase font-semibold"
    >
      Components
    </h3>

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
            focus-within:bg-primary-200
            hover:text-primary-500
            border-l-4 border-primary-500/0
            transition-colors
          "
          active-class="border-primary-500/100"
        >
          {{  nav.label  }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>
