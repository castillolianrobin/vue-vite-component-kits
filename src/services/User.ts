import axios from '@/plugins/axios';

const base = 'user'
export default {
  list(params?: any) {
    return axios.get(`/${base}`, { params });
  },
  show(id: number) {
    return axios.get(`/${base}/${id}`);
  }
}
