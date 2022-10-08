// const isProduction = process.env.NODE_ENV === 'production';

import Axios, { AxiosRequestConfig } from "axios";

const urls = {
  test: `http://localhost:1337`,
  development: "http://localhost:1337/",
  // test: `https://valo-strapi.herokuapp.com/`,
  // development: "https://valo-strapi.herokuapp.com/",
  production: "https://valo-strapi.herokuapp.com/",
};
const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const v4BearerToken = `7fc9dfaf61a9d3da12d93de84f6f4a9da07c7d124cdee6827d8d9722b3b98fe5e877689e525947c2be71ecf2de880f275f5a1c7454360acbef7a27ee4a3f7613f645bc3a63854549bc939c35629e9f645ff856578b17c72f6be37a0dec71038234422c000414c45c1933bf30db56ad0fb839c5c8e8f4221c6f141b191f5f001d`;
const v4Api = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export const v4AuthenticateAPI = () =>
  // token: string
  {
    const token = v4BearerToken;
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
