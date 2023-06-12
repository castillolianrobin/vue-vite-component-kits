<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutHandler from './layout/LayoutHandler.vue';
import { TransitionFade } from '@/components/transitions'
import ThePageLoader from './components/ThePageLoader.vue';
</script>

<template>
  <ThePageLoader></ThePageLoader>
  <LayoutHandler>
    <RouterView  v-slot="{ Component }" >
      <TransitionFade>
        <component :is="Component"></component>
      </TransitionFade>
    </RouterView>      
  </LayoutHandler>
</template>