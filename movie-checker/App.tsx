import { StyleSheet } from 'react-native';
import NavBar from "./App/component/molecule/NavBar";
import {PaperProvider} from "react-native-paper";
import MoviePage from './App/component/page/MoviePage';


export default function App() {
  return (
    <PaperProvider>
      <MoviePage />
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
