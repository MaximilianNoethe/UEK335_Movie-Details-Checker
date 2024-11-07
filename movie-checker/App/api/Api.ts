import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

export const defaultInstance: AxiosInstance = axios.create({
    baseURL: "http://172.20.10.3:3000", // Change this to your own IP address
  });
  

defaultInstance.interceptors.request.use(
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
