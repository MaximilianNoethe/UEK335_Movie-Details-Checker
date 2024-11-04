import { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from "../api/Api";
import { login } from './AuthService';

export type User = {
    userId: string;
    email: string;
    firstname: string;
    lastname: string;
    age: number;
};

const email = "gianluca@noseryoung.ch";
const password = "bestPassw0rd";


const UserService = () => ({

    getCurrentUserData: async (): Promise<User> => {
        await login(email, password);
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

            const data = { user };
            const response = await api.put(`users/${userId}`, data);
            return response.data;
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }
});

export default UserService;
