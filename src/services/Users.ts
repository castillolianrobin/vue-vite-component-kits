import axios from '@/plugins/axios';
import { CRUDService, type SuccessResponse, type TableResponse } from './types';

const base = 'user';

class Users extends CRUDService<User, CreateUser>{
  // Auth
  login(params?: any) {
    return axios.post<SuccessResponse<User>>(`/login`, params);
  }
  logout(params?: any) {
    return axios.post<SuccessResponse<User>>(`/logout`, params);
  }
  register(user: CreateUser) {
    return axios.post<SuccessResponse<User>>(`/register`, user);    
  }
}

export default new Users(base);

// export default {
//   // Auth
//   login(params?: any) {
//     return axios.post<SuccessResponse<User>>(`/login`, params);
//   },
//   logout(params?: any) {
//     return axios.post<SuccessResponse<User>>(`/logout`, params);
//   },
//   register(user: CreateUser) {
//     return axios.post<SuccessResponse<User>>(`/register`, user);    
//   },

//   // CRUD
//   list(params?: any) {
//     return axios.get<TableResponse<User>>(`/${base}`, { params });
//   },
//   show(id: number) {
//     return axios.get<User>(`/${base}/${id}`);
//   },
//   create(data: CreateUser) {
//     return axios.post<SuccessResponse<User>>(`/${base}/`, data);
//   },
//   delete(id: number) {
//     return axios.post<SuccessResponse>(`/${base}/${id}/delete`);
//   },
// }


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

export interface CreateUser extends Modify<User,{
  id?: number;
  password: string, 
  verify_password: string, 
  userInfo: Modify<UserInfo, { birthday: string }>;
  userType?: string;
  updatedAt?: string;
  createdAt?: string;
}> {}

type Modify<T, R> = Omit<T, keyof R> & R;