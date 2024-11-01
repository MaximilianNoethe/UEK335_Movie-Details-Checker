import { AxiosInstance } from "axios";
import { defaultInstance } from "../api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";


export type loginRequest = {
    email: "gianluca@noseryoung.ch", //string
    password: "bestPassword0" //string
}

const LoginService = (api: AxiosInstance = defaultInstance) => ({
    login: async (param: loginRequest) => {
      const answer = await api.post("login", param);
      const { accessToken, user } = answer.data;
      console.log(answer.data.accessToken);

      AsyncStorage.setItem("accessToken", accessToken);
      AsyncStorage.setItem("userId", user.id.toString());
  
      return answer;
    }
  });

  export default LoginService;
  