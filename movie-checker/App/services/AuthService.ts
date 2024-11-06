import { AxiosInstance } from "axios";
import { defaultInstance } from "../api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export type loginRequest = {
  email: string;
  password: string;
};

const LoginService = (api: AxiosInstance = defaultInstance) => ({
  login: async (param: loginRequest) => {
    console.log(param);
    
    try {
      const response = await api.post("login", param);
      const { accessToken, user } = response.data;

      if (user && user.id) {
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("userId", user.id.toString());
        console.log("User ID saved to AsyncStorage:", user.id);
      } else {
        Alert.alert("Login Failed", "User does not exist. Please check your credentials or register.");
        return null;
      }

      return response;

    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Login Error", "An error occurred while logging in. Please try again.");
      throw error;
    }
  },
});

export default LoginService;
