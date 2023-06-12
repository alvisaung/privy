import axios from "axios";
import LocalStorage from "../storage/LocalStorage";
import { api_url } from "../constant";

const api_instance = axios.create();

api_instance.interceptors.request.use(
  (config) => {
    config.baseURL = `${api_url}/api`;
    // const token = LocalStorage.getToken();
    // if (token) {
    //   config.headers["Authorization"] = "Bearer " + token;
    // }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

api_instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data;
  },
  function (error) {
    const { response } = error;
    console.log(response);
    if (response?.status == 401) {
      Router.replace("/");
    }
    return Boolean(response) ? response.data : error;
    if (error.response.status === 401 && originalRequest.url === "http://127.0.0.1:3000/v1/auth/token") {
      router.push("/login");
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorageService.getRefreshToken();
      return axios
        .post("/auth/token", {
          refresh_token: refreshToken,
        })
        .then((res) => {
          if (res.status === 201) {
            localStorageService.setToken(res.data);
            axios.defaults.headers.common["Authorization"] = "Bearer " + localStorageService.getAccessToken();
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default api_instance;
