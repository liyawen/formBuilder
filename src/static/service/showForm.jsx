import api from '../library/axios/api';

const Service = {
  getList: () => {
    return api
      .get('/api/getList')
      .then((res) => {
        return res;
      }, (error) => {
        throw error;
      });
  },
  getFormData: (id) => {
    return api
      .get(`/api/getFormData?id=${id}`)
      .then((res) => {
        return res;
      }, (error) => {
        throw error;
      });
  },
};

export default Service;
