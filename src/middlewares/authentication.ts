import type { RouterMiddleWare } from './index';
import { useAuthStore } from '@/stores/authStore';

const authentication:RouterMiddleWare = (context) => {
  const { user } = useAuthStore();
  
  if (user && user?.token) {
    return context.next();
  } else {
    return context.next({ name: 'Login' })
  }
} 

export default authentication;