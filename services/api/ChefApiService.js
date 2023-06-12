import ChefApi from "./chef_api";
import { SnackType } from "@/utils/Context/SnackBarProvider";
import LocalStorage from "../storage/LocalStorage";
import Router from "next/router";
import { Alert, Snackbar } from "@mui/material";
import Api from "./api";
import axios from "axios";

const ChefApiService = {
  ChefLogin: async (email, password, showSnackbar) => {
    const res = await ChefApi.post("/login", { email, password });
    console.log(res);
    if (!res.success) {
      showSnackbar(res?.data, SnackType.error);
      return false;
    }
    res.data.role = "chef";
    Router.replace("/");
    showSnackbar("Login Success", SnackType.success);
    LocalStorage.saveUser(res.data, res.data.token);
    return res.data;
  },
  ChefRegister: async (register_data, showSnackbar) => {
    const res = await ChefApi.post("/register", register_data);
    if (!res.success) {
      showSnackbar(res?.data, SnackType.error);
      return false;
    }
    res.data.role = "chef";
    Router.replace("/");
    LocalStorage.saveUser(res.data, res.data.token);
    return res.data;
  },
  UploadImg: async (img_file, showSnackbar) => {
    const formData = new FormData();
    formData.append("image", img_file);
    let url = "https://api.privy.sg/api/upload-img";

    // const res = await Api.post("/upload-img", formData);
    const res = await axios.post(url, formData);
    console.log(res);
    const { data } = res;
    if (!data.success) {
      showSnackbar("Img Upload Err");
      return null;
    }
    return data.data;
  },
  GetMenuList: async () => {
    const res = await ChefApi.get("/menu");
    return res.data;
  },
  GetProfile: async () => {
    const res = await ChefApi.get("/profile");
    if (!res.success) return null;
    return res.data;
  },
  ChefLogOut: async () => {
    const res = await ChefApi.post("/logout");
    if (!res.success) return null;
    LocalStorage.clearUser();
    return true;
  },
  GetMenuDetail: async (slug) => {
    const res = await Api.get(`/menu/${slug}`);
    if (!res.success) {
      return null;
    }
    return res.data;
  },
  CreateMenu: async (data, showSnackbar) => {
    const res = await ChefApi.post("/menu", data);
    if (!res.success) {
      showSnackbar(res?.data, SnackType.error);
      return false;
    }
    return res.data;
  },
  UpdateMenu: async (data, showSnackbar) => {
    const res = await ChefApi.put(`/menu/${data.slug}`, data);
    if (!res.success) {
      showSnackbar(res?.data, SnackType.error);
      return false;
    }
    return res.data;
  },
  EditProfile: async (data) => {
    const res = await ChefApi.put(`/profile`, data);
    if (!res.success) return false;
    LocalStorage.updateUser(res.data);
    return res.data;
  },
};
export const findChef = (token) => {};

export default ChefApiService;
