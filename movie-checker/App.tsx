import { StyleSheet } from 'react-native';
import NavBar from "./App/component/molecule/NavBar";
import {PaperProvider} from "react-native-paper";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomePage from "./App/component/page/HomePage";
import {NavigationContainer} from "@react-navigation/native";
import LoginPage from "./App/component/page/LoginPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <PaperProvider>
          <LoginPage />
      </PaperProvider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
