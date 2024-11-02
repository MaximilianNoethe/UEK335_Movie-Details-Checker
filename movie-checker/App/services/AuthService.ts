import { AxiosInstance } from "axios";
/*import { defaultInstance } from "../api/Api";*/
import { api } from "../api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";





export const login = async (email: string, password: string) => {
    try {
      const response = await api.post("login", {
        email: email,
        password: password,
      });
      const { accessToken, user } = response.data;
      AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("userId", user.id.toString());

    return response;
    } catch (error) {
      throw error;
    }
  };


  export const getAuthorizationToken = () => {
    const accessToken = AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("no token");
    }
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };








/*export type loginRequest = {
    email: "gianluca@noseryoung.ch", //string
    password: "bestPassw0rd" //string
}

const LoginService = (api: AxiosInstance = defaultInstance) => ({
    login: async (param: loginRequest) => {
      const answer = await api.post("login", param);
      const { accessToken, user } = answer.data;
  
      await AsyncStorage.setItem("accessToken", accessToken);
      if (user && user.id) {
        await AsyncStorage.setItem("userId", user.id.toString());
        console.log("User ID saved to AsyncStorage:", user.id);
      } else {
        console.log("User ID is missing in the response data");
      }
  
      return answer;
    }
  });

*/
  export default login;
  