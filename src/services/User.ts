import axios from '@/plugins/axios';

const base = 'user'
export default {
  // Auth
  login(params?: any) {
    return axios.post(`/${base}/login`, params);
  },

  // CRUD
  list(params?: any) {
    return axios.get(`/${base}`, { params });
  },
  show(id: number) {
    return axios.get(`/${base}/${id}`);
  }
}
