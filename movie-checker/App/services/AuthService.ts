import { AxiosInstance } from "axios";
import { defaultInstance } from "../api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export type loginRequest = {
  email: string;
  password: string;
};

const LoginService = (api: AxiosInstance = defaultInstance) => ({

  /**
   * Authenticates a user using the provided login credentials.
   * If successful, stores the access token and user ID in AsyncStorage.
   * If the user does not exist, an alert is shown and `null` is returned.
   *
   * @async
   * @function
   * @param {loginRequest} param - The login credentials containing `email` and `password`.
   * @returns {Promise<any | null>} - A promise resolving to the response object if successful, or `null` if the user does not exist.
   * @throws Will throw an error if the login request fails.
   */

  login: async (param: loginRequest): Promise<any | null> => {
    try {
      const response = await api.post("login", param);
      const { accessToken, user } = response.data;

      if (user && user.id) {
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("userId", user.id.toString());
      } else {
        Alert.alert("Login Failed", "User does not exist. Please check your credentials or register.");
        return null;
      }

      return response;

    } catch (error) {
      Alert.alert("Login Error", "An error occurred while logging in. Check your credentials and please try again.");
      throw error;
    }
  },

  /**
   * Logs out the user by removing the access token and user ID from AsyncStorage.
   * If an error occurs, it logs the error to the console and displays an alert.
   *
   * @async
   * @function
   * @returns {Promise<void>} - A promise that resolves when the logout process completes.
   * @throws Will throw an error if the logout process encounters an issue.
   */

  logout: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("userId");
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Logout Error", "An error occurred while logging out. Please try again.");
      throw error;
    }
  }


});

export default LoginService;
