import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import UserService from "../../services/UserService";
import login from "../../services/AuthService";
import { api } from "../../api/Api";

const UserProfilePage = () => {
    type User = {
        userId: string;
        email: string;
        firstname: string;
        lastname: string;
        age: number;
        password: string;
    };
    

    const [userData, setUserData] = useState<User>();    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await UserService().getUserData();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        
        fetchData();
    }, []);

    return (
        <View>
            {userData ? (
                <>
                    <Text>User Name: {userData.firstname} {userData.lastname}</Text>
                    <Text>Email: {userData.email}</Text>
                    <Text>Age: {userData.age}</Text>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

export default UserProfilePage;
