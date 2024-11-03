import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../api/Api";
import { login } from "./AuthService";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export type Movie = {
  movieTitle: string;
  director: string;
  releaseDate: string;
  duration: string;
  imdb: number;
  mpaa: number;
  rottenTomato: number;
};

const email = "gianluca@noseryoung.ch";
const password = "bestPassw0rd";

const MovieService = () => ({
  getAllMovies: async () => {
    try {
      const response = await api.get(`movies`);
      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  },
  getMovieById: async (id: string) => {
    try {
      const response = await api.get(`movies/${id}`);

      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  },

  deleteMovie: async (id: string) => {
    try {
      const response = await api.delete(`movies/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  },

  createMovie: async (newMovie: Movie) => {
    try {
      const response = await api.post(`movies`, newMovie);

      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  },

    updateMovie: async (id: string, updatedMovie: Movie) => {
        try {
        const response = await api.put(`movies/${id}`, updatedMovie);
    
        return response.data;
        } catch (error) {
        console.error("Error occurred:", error);
        }
    },
});

export default MovieService;
