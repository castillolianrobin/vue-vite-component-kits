import { useAuthStore } from '@/stores/authStore';
import axios, { type InternalAxiosRequestConfig } from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8081';



// Request Interceptor for Beater Token Auth
axios.interceptors.request.use((config)=> {
  const { user } = useAuthStore();
  if (user && user?.token && !config.headers?.Authorization) {
    config
      .headers
      .setAuthorization(`Bearer ${user.token}`);
  }
  return config;
})

export default axios;