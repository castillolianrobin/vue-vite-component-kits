import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/services/Users';

export const useAuthStore = defineStore('counter', () => { 
  const user = ref<User>(getRememberedUser());
  // const token = computed(() => user.value?.token)
  
  function setUser(_user: any, remember?: boolean) {
    user.value = _user;
    if (remember) {
      localStorage.setItem(storageUserKey, JSON.stringify(_user));
    } else {
      localStorage.removeItem(storageUserKey);
    }
  }

  function logOut() { setUser(null, true) }

  return { user, setUser, logOut }
})


export const storageUserKey = '_auth_user';



/** HELPERS */

function getRememberedUser() {
  const rememberedUserString: string = localStorage.getItem(storageUserKey) || '';
  let rememberedUser = undefined;
  if (rememberedUserString && typeof rememberedUserString === 'string') {
    try {
      rememberedUser = JSON.parse(rememberedUserString);
    } catch (e) {
      console.error('auth: ',e)
      rememberedUser = undefined;
    }
  }
  return rememberedUser;
}