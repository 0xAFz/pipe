import Axios from 'axios';

const axios = Axios.create({
  baseURL: "https://api.ajorcloud.ir",
});

axios.interceptors.request.use(async (config) => {
  config.headers['Authorization'] = `tma ${window.Telegram.WebApp.initData}`;
  return config;
});

export default axios;