import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePageLoadStore = defineStore('pageLoad', () => { 
  const pageLoading = ref(false);
  // const token = computed(() => user.value?.token)
  
  function setPageLoading(loading?: boolean) {
    pageLoading.value = typeof loading === 'boolean' 
      ? loading 
      : !pageLoading.value;
  }
  

  return { pageLoading, setPageLoading }
});