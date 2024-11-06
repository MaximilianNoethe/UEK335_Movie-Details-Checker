import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultInstance } from "../api/Api";
import { AxiosInstance } from 'axios';

export type User = {
    userId: string;
    email: string;
    firstname: string;
    lastname: string;
    age: number;
};


const UserService = (api: AxiosInstance = defaultInstance) => ({

    getCurrentUserData: async (): Promise<User> => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) {
                console.log("User ID not found in AsyncStorage");
                return {} as User;
            }

            const response = await api.get(`users/${userId}`);
            return response.data;
        } catch (error) {
            console.log("Error occurred:", error);
            return {} as User;
        }
    },

    updateUser: async (user: User) => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) {
                console.log("User ID not found in AsyncStorage");
                return;
            }
            const response = await api.put(`users/${userId}`, user);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error occurred:", error);
        }
    },

    createUser: async (newUser: User) => {
        try{
            const response = await api.post(`register`, newUser);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }
});

export default UserService;
