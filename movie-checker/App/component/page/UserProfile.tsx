import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, TextInput, IconButton } from "react-native-paper";
import UserService from "../../services/UserService";

const UserProfilePage = () => {
    type User = {
        userId: string;
        email: string;
        firstname: string;
        lastname: string;
        age: number;
    };

    const [userData, setUserData] = useState<User>({
        userId: "",
        email: "Failed to load data",
        firstname: "Failed to load data",
        lastname: "Failed to load data",
        age: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await UserService().getCurrentUserData();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        
        fetchData();
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.topBorder} /> 
            
            <View style={styles.header}>
                <Avatar.Icon size={95} icon="account" style={styles.avatar} />
                <IconButton
                    icon="pencil"
                    size={24}
                    onPress={() => console.log("Navigate to ProfileEditPage")}
                    style={styles.editIcon}
                />
            </View>

            <TextInput
                label="E-Mail"
                value={userData.email}
                mode="outlined"
                style={styles.input}
                editable={false}
            />
            <TextInput
                label="Firstname"
                value={userData.firstname}
                mode="outlined"
                style={styles.input}
                editable={false}
            />
            <TextInput
                label="Lastname"
                value={userData.lastname}
                mode="outlined"
                style={styles.input}
                editable={false}
            />
            <TextInput
                label="Age"
                value={userData.age.toString()}
                mode="outlined"
                style={[styles.input, styles.ageInput]}
                editable={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    topBorder: {
        height: 100,
        backgroundColor: "#8c5c68", 
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: -40, 
        marginBottom: 35,
    },
    avatar: {
        backgroundColor: "#424242",
    },
    editIcon: {
        marginLeft: "auto", 
        marginTop: 50, 
    },
    input: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
    ageInput:{
        width: 60,
        marginHorizontal: 16,
    }
});

export default UserProfilePage;
