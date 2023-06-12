
<script setup lang="ts">
import { usePageLoadStore } from '@/stores/pageLoadStore';

const { pageLoading } = usePageLoadStore()
</script>

<template>
  <div class="w-full h-1 z-50 position-fix top-0">
    <div 
      :class="`
        h-full w-full 
        ${ pageLoading ? 'max-w-[30%]' : 'max-w-full' } 
        transition-all
        bg-primary-500
      `"
    ></div>
  </div>
</template>
