import api from '../library/axios/api';

const Service = {
  addForm: (data) => {
    return api
      .post('/api/addForm', data)
      .then((res) => {
        return res;
      }, (error) => {
        throw error;
      });
  },
};

export default Service;
