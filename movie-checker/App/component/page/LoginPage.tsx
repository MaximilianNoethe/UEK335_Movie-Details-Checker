import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import LoginService from "../../services/AuthService";

const LoginPage = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!validateEmail(text)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = async () => {
    try {
        const response = await LoginService().login({ email, password });        

        if (response) {
          navigation.navigate("Home"); 
        }
      } catch (error) {
        
        console.error("Login failed:", error);
      }
  };

  return (
    
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            Login
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            mode="outlined"
            label="E-Mail"
            value={email}
            onChangeText={handleEmailChange}
            style={styles.input}
            error={!!emailError}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <TextInput
            mode="outlined"
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
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
            onPress={handleLogin}
            style={styles.loginButton}
          >
            Login
          </Button>
        </View>
      </View>
    
  );
}

export default LoginPage;

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
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    alignSelf: "flex-start",
    paddingLeft: 30,
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
