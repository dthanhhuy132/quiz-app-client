import axios from 'axios';
const baseURL = 'https://json-server-quizapp.herokuapp.com/api';

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use(() => {
  (config) => config;
  (error) => Promise.reject(error);
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
