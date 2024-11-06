import { StyleSheet } from 'react-native';
import NavBar from "./App/component/molecule/NavBar";
import {PaperProvider} from "react-native-paper";
import HomePage from "./App/component/page/HomePage";
import {NavigationContainer} from "@react-navigation/native";
import LoginPage from "./App/component/page/LoginPage";

export default function App() {
  return (
      <PaperProvider>
          <NavBar />
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
