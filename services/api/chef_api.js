import axios from "axios";
import LocalStorage from "../storage/LocalStorage";
import { api_url } from "../constant";
import Router from "next/router";
import CookieService from "../storage/CookieService";

const ChefApi = axios.create();

ChefApi.interceptors.request.use(
  (config) => {
    config.baseURL = `${api_url}/api/chef`;
    const token = CookieService.getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);
ChefApi.interceptors.response.use(
  async (response) => {
    const { data } = response;
    console.log(data);
    return data;
  },
  async (error) => {
    const { response } = error;
    if (response?.status == 401) {
      // setTimeout(() => {
      // window.location.href = "/chef/login";
      // useRouter().push("/chef/login");
      // }, 500);
      Router.push("/chef/login");
    }
    return Boolean(response) ? response.data : error;
  }
);

export default ChefApi;
