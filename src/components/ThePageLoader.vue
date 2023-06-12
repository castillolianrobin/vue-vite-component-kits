
<script setup lang="ts">
import { usePageLoadStore } from '@/stores/pageLoadStore';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const { pageLoading } = storeToRefs(usePageLoadStore())
const loadingPercent = ref(0);
const hideLoading = ref(false);
let interValId: ReturnType<typeof setInterval>;

function runLoading() {
  loadingPercent.value += 5;
  // console.log('test',)
  if (loadingPercent.value > 60) {
    clearInterval(interValId);
  }
}

watch(pageLoading, (isLoading)=>{
  if (isLoading) {
    hideLoading.value = false;
    loadingPercent.value = 15;
    interValId = setInterval(runLoading, 100)
  } else {
    clearInterval(interValId);
    loadingPercent.value = 100;
    setTimeout(()=>hideLoading.value = true, 700);
  }
})

</script>

<template>
  <div
    v-show="!hideLoading"
    class="w-full h-1 dark:h-0.5 z-50 fixed top-0 bg-transparent"
  >
    <div 
      @click="loadingPercent = loadingPercent + 5"
      :class="`
        h-full 
        bg-primary-500
      `"
      :style="{ 
        width: `${loadingPercent}%`,
        transition: 'width 0.3s ease-in-out', 
      }"
    ></div>
  </div>
</template>
