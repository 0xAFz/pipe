import Axios from 'axios';

const axios = Axios.create({
  baseURL: "https://api.ajorcloud.ir",
});

axios.interceptors.request.use(async (config) => {
  config.headers['Authorization'] = `tma ${window.Telegram.WebApp.initData}`;
  config.headers['User-Agent'] = 'kuchak';
  return config;
});

export default axios;