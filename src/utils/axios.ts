import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
});

// 设置请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
  }
);

// 设置响应拦截器(方便统一地处理错误信息)
instance.interceptors.response.use(
  (success) => {
    // 业务逻辑错误(success表示能连到接口)
    if (success.status && success.status === 200) {
      return success.data;
    }
    // 返回一个json对象，以便可以进行后续处理
    return success;
  },
  (error) => {
    return error;
  }
);

export default instance;
