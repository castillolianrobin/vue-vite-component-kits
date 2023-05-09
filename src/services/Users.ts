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
    return axios.get<User>(`/${base}/${id}`);
  },
  create(data: CreateUser ) {
    return axios.post<SuccessResponse<User>>(`/${base}/`, data);
  }
}


/** __TYPE DEFINITION__ */

export interface User<userInfo = UserInfo, userType = UserType> {
  email: string;
  password?: string;
  id: number;
  token?: string; 
  tokenExpiration?: string;
  userInfo?: userInfo;
  userType?: userType;
  updatedAt: string;
  createdAt: string;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  middleName?: string;
  birthday?: string;
}
 
export interface UserType {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}

interface CreateUser extends Modify<User,{
  id?: undefined;
  userInfo: UserInfo;
  userType: string;
  updatedAt?: string;
  createdAt?: string;
}> {}

type Modify<T, R> = Omit<T, keyof R> & R;