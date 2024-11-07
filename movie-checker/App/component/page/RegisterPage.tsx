import React, { useState } from "react";
import { Button, Text, TextInput, PaperProvider } from "react-native-paper";
import { View, StyleSheet, Alert } from "react-native";
import UserService from "../../services/UserService"; 

const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  /**
   * Validates if the input string is a properly formatted email address.
   *
   * @param input - The email string to validate.
   * @returns `true` if the email format is valid, otherwise `false`.
   */
  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  /**
   * Updates the email state and sets an error message if the email format is invalid.
   *
   * @param text - The new email text entered by the user.
   */
  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(
      validateEmail(text) ? "" : "Please enter a valid email address"
    );
  };

  /**
   * Updates the first name state and sets an error message if the field is empty.
   *
   * @param text - The new first name text entered by the user.
   */
  const handleFirstNameChange = (text: string) => {
    setFirstName(text);
    setFirstNameError(text ? "" : "Firstname is required");
  };

  /**
   * Updates the last name state and sets an error message if the field is empty.
   *
   * @param text - The new last name text entered by the user.
   */
  const handleLastNameChange = (text: string) => {
    setLastName(text);
    setLastNameError(text ? "" : "Lastname is required");
  };

  /**
   * Updates the age state and sets an error message if the input is not a positive number.
   *
   * @param text - The new age text entered by the user.
   */
  const handleAgeChange = (text: string) => {
    setAge(text);
    const numericAge = parseInt(text, 10);
    setAgeError(
      !numericAge || numericAge <= 0 ? "Please enter a valid age" : ""
    );
  };

  /**
   * Updates the password state and sets an error message if the password is too short.
   *
   * @param text - The new password text entered by the user.
   */
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(text.length >= 6 ? "" : "Password must be at least 6 characters");
  };

  /**
   * Handles user registration by validating inputs and calling the user service.
   *
   * If any input errors are present, an alert prompts the user to fix them.
   * When inputs are valid, it submits the data to `UserService` to create a new user account.
   *
   * On successful registration:
   * - Displays a success alert.
   * - Navigates the user to the Login page.
   *
   * On failure, displays an alert indicating registration failure.
   *
   * @async
   * @returns {Promise<void>} Performs an asynchronous registration operation.
   */
  const handleRegister = async () => {
    if (
      emailError ||
      firstNameError ||
      lastNameError ||
      ageError ||
      passwordError
    ) {
      Alert.alert("Error", "Please fill in all fields before submitting");
      return;
    }

    try {
      const response = await UserService().createUser({
        userId: "",
        email,
        firstname,
        lastname,
        age: parseInt(age, 10),
        password,
      });
      if (response) {
        Alert.alert("Success", "Registration successful!");
        navigation.navigate("Login");
      }
    } catch (error) {
      Alert.alert("Registration Failed", "Could not register the user.");
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Register</Text>
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
            label="Firstname"
            value={firstname}
            onChangeText={handleFirstNameChange}
            style={styles.input}
            error={!!firstNameError}
          />
          {firstNameError ? (
            <Text style={styles.errorText}>{firstNameError}</Text>
          ) : null}

          <TextInput
            mode="outlined"
            label="Lastname"
            value={lastname}
            onChangeText={handleLastNameChange}
            style={styles.input}
            error={!!lastNameError}
          />
          {lastNameError ? (
            <Text style={styles.errorText}>{lastNameError}</Text>
          ) : null}

          <TextInput
            keyboardType="numeric"
            mode="outlined"
            label="Age"
            value={age}
            onChangeText={handleAgeChange}
            style={styles.ageInput}
            error={!!ageError}
          />
          {ageError ? <Text style={styles.errorText}>{ageError}</Text> : null}

          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            style={styles.input}
            error={!!passwordError}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleRegister}
              style={styles.registerButton}
            >
              Register
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate("Login")}
              style={styles.cancelButton}
            >
              Cancel
            </Button>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
};

export default RegisterPage;

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
    fontSize: 35,
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
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 35,
  },
  registerButton: {
    height: 42,
    width: 125,
    backgroundColor: "#AD3F57",
  },
  cancelButton: {
    width: 125,
    color: "#AD3F57",
  },
  ageInput: {
    width: 80,
    marginBottom: 15,
  },
});
