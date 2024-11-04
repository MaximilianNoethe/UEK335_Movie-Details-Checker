import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

export const api: AxiosInstance = axios.create({
    baseURL: "http://10.62.105.108:3000/", // Change this to your own IP address
  });
  

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    let correctPath = config.url !== "login";

    const token = await AsyncStorage.getItem("accessToken");

    if (token && correctPath) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  }
);