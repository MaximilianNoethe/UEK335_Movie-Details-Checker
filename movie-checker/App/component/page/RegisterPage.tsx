import React from "react";
import { Button, Text, PaperProvider, TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export default function RegisterPage() {
    return (
        <PaperProvider>
            <View style={styles.container}>

                <View style={styles.header}>

                </View>
                <View style={styles.formContainer}>
                    <TextInput mode="outlined" label="E-Mail" style={styles.input} />
                    <TextInput mode="outlined" label="Vorname" style={styles.input} />
                    <TextInput mode="outlined" label="Nachname" style={styles.input} />
                    <TextInput keyboardType="numeric" mode="outlined" label="Age" style={styles.ageInput} />
                    <TextInput
                        mode="outlined"
                        label="Password"
                        secureTextEntry
                        style={styles.input}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            onPress={() => console.log("Register pressed")}
                            style={styles.registerButton}
                        >
                            Register
                        </Button>
                        <Button
                            theme ={{colors: {primary: '#621827'}}}
                            mode="outlined"
                            onPress={() => console.log("Cancel pressed")}
                            style={styles.cancelButton}
                        >
                            Cancel
                        </Button>
                    </View>
                </View>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
    },
    header: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 50,
    },
    title: {
        color: "#000000",
    },
    formContainer: {
        flex: 5,
        paddingHorizontal: 30,
        justifyContent: "flex-start",
    },
    input: {
        marginBottom: 15,
    },
    registerText: {
        paddingTop: 35,
        alignSelf: "center",
        color: "#000000",
        marginBottom: 20,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 5,
        marginTop:55,
        flexDirection: "row",
    },
    cancelButton: {
        width: 125,
        color: "#AD3F57"
    },
    registerButton: {
        width: 125,
        backgroundColor: "#AD3F57",
    },
    ageInput:{
        width: 60,
        marginBottom: 15,
    },
});
