import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import UserService from "../../services/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProfileScreen = () => {
    const [userData, setUserData] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await AsyncStorage.getItem("userId");
                if (userId) {
                    const data = await UserService().getCurrentUserData(userId); // nur userId übergeben
                    setUserData(data);
                } else {
                    console.log("User ID not found in AsyncStorage");
                }
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

export default UserProfileScreen;
