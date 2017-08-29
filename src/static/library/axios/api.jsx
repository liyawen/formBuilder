import axios from 'axios';
import NProgress from 'nprogress';
import _ from 'underscore';

const NETWORK_ERROR_MESSAGE = '网络异常';
const SERVER_ERROR_MESSAGE = '系统异常';
const UNEXPETED_STATUS = -1;
const UNLOGIN_STATUS = 1000;
const SUCCESS_STATUS = 0;
const COMMON_STATUS = 0;
const LOGIN_STATUS = 10000000;

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000 * 60 * 5,
  transformRequest: [(data) => {
    NProgress.start();
    if (!data) {
      return '';
    }
    return JSON.stringify(data);
  }],
  transformResponse: [(data) => {
    NProgress.done();
    if (data) {
      try {
        data = JSON.parse(data);
      } catch (e) {
        alert('服务器异常,请重试!');
      }
    }
    return data;
  }],
});

api.interceptors.response.use(
  (response) => {
    const status = typeof response.data.status !== 'undefined' ? response.data.status : UNEXPETED_STATUS;
    if (typeof status !== 'number' || status === UNLOGIN_STATUS || status < SUCCESS_STATUS || status > LOGIN_STATUS) {
      const newData = _.defaults({}, response.data, {
        msg: SERVER_ERROR_MESSAGE,
        status: UNEXPETED_STATUS,
      });
      return Promise.reject(newData);
    }
    return response.data || {};
  },
  () => {
    return Promise.reject({
      msg: NETWORK_ERROR_MESSAGE,
      status: UNEXPETED_STATUS,
    });
  }
);

export default api;