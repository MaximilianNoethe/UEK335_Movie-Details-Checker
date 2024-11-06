import React from "react";
import { Button, Text, PaperProvider, TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export default function LoginPage() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            Login
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput mode="outlined" label="E-Mail" style={styles.input} />
          <TextInput
            mode="outlined"
            label="Password"
            secureTextEntry
            style={styles.input}
          />
          <Text
            variant="labelMedium"
            style={styles.registerText}
            onPress={() => console.log("Navigate to Register Page")}
          >
            No account? Register here
          </Text>
          <Button
            mode="contained"
            onPress={() => console.log("Login pressed")}
            style={styles.loginButton}
          >
            Login
          </Button>
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
    flex: 3,
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
  loginButton: {
    width: 250,
    alignSelf: "center",
    backgroundColor: "#AD3F57",
  },
});
