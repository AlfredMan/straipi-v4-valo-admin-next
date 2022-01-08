// const isProduction = process.env.NODE_ENV === 'production';

import Axios, { AxiosRequestConfig } from "axios";

const urls = {
  // test: `http://localhost:1337`,
  // development: 'http://localhost:1337/',
  test: `https://valo-strapi.herokuapp.com/`,
  development: "https://valo-strapi.herokuapp.com/",
  production: "https://valo-strapi.herokuapp.com/",
};
const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// export const api = Axios.create({
//   baseURL: isProduction
//     ? process.env.NEXT_PUBLIC_BACKEND_URL
//     : 'http://localhost:1337/',
// });

let authInterceptorID: number;
export const authenticateAPI = (token: string) => {
  authInterceptorID = api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (!config?.headers) {
        config.headers = {};
      }
      console.log("*** mounting token to auth interceptor");
      config.headers.authorization = `bearer ${token}`;
      return config;
    }
  );
};

export const unauthenticateAPI = () => {
  console.log("--- ejecting auth interceptor");
  api.interceptors.request.eject(authInterceptorID);
};

export default api;
