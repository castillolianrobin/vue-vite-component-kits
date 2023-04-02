<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutHandler from './layout/LayoutHandler.vue';

</script>

<template>
  <LayoutHandler>
    <RouterView></RouterView>    
  </LayoutHandler>
</template>