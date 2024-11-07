import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultInstance } from "../api/Api";
import { AxiosInstance } from 'axios';

export type User = {
    userId: string;
    email: string;
    firstname: string;
    lastname: string;
    age: number;
    password: string;
};


const UserService = (api: AxiosInstance = defaultInstance) => ({

    /**
     * Retrieves the data of the currently authenticated user based on the user ID stored in AsyncStorage.
     *
     * @async
     * @function
     * @returns {Promise<User>} A promise resolving to the user's data. Returns an empty User object if no user ID is found or if an error occurs.
     * @throws Logs an error if the request fails.
     */

    getCurrentUserData: async (): Promise<User> => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) {
                return {} as User;
            }

            const response = await api.get(`users/${userId}`);
            return response.data;
        } catch (error) {
            console.log("Error occurred:", error);
            return {} as User;
        }
    },

    /**
     * Registers a new user with the provided details.
     *
     * @async
     * @function
     * @param {User} newUser - An object containing the new user's details, including userId, email, firstname, lastname, age, and password.
     * @returns {Promise<any>} A promise resolving to the response data upon successful creation, or undefined if an error occurs.
     * @throws Logs an error if the request fails.
     */

    createUser: async (newUser: User) => {
        try{
            const response = await api.post(`register`, newUser);
            return response.data;
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }
});

export default UserService;
