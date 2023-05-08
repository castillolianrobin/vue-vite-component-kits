import axios from '@/plugins/axios';
import type { SuccessResponse, TableResponse } from './types';

const base = 'user'
export default {
  // Auth
  login(params?: any) {
    return axios.post<SuccessResponse<User>>(`/login`, params);
  },

  // CRUD
  list(params?: any) {
    return axios.get<TableResponse<User>>(`/${base}`, { params });
  },
  show(id: number) {
    return axios.get(`/${base}/${id}`);
  }
}


/** __TYPE DEFINITION__ */

export interface User {
  email: string;
  id: number;
  token?: string; 
  tokenExpiration?: string;
  userInfo?: UserInfo | number;
  userType?: UserType | number;
  updatedAt: string;
  createdAt: string;
}

export interface UserInfo {}
 
export interface UserType {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}