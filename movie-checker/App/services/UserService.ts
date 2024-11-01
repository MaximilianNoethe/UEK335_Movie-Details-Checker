import { AxiosInstance } from 'axios';
import { defaultInstance } from '../api/Api';

export type User = {
    userId: string;
    email: string;
    firstname: string;
    lastname: string;
    age: number;
}
// Typ von getCurrentUserData so anpassen, dass nur userId übergeben wird
const UserService = (api: AxiosInstance = defaultInstance) => ({
    getCurrentUserData: async (userId: string) => { // nur userId als Argument
        try {
            const response = await api.get(`users/${userId}`);
            return response.data;
        } catch (error) {
            console.log("Error occurred:", error);
        }
    },

    updateUser: async (user: User) => {
        try {
            const data = { user };
            const response = await api.put(`users/${user.userId}`, data);
            return response.data;
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }
});

export default UserService;