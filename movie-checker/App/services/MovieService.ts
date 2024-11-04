import { api } from "../api/Api";
import login from "./AuthService";


type Movie = {
    id: number;
    Title: string;
    "Release Date": string;
    "MPAA Rating": string;
    "Running Time min": number;
    "IMDB Rating": number;
    "IMDB Votes": number;
};

const email = "gianluca@noseryoung.ch";
const password = "bestPassw0rd";

const MovieService = () => ({
  getAllMovies: async () => {
    await login(email, password);
    try {
      const response = await api.get(`movies?start=3182&_limit=1`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  },
  getMovieById: async (id: string) => {
    await login(email, password);

    try {
      const response = await api.get(`movies/${id}`);

      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  },

  deleteMovie: async (id: string) => {
    await login(email, password);

    try {
      const response = await api.delete(`movies/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  },

  createMovie: async (newMovie: Movie) => {
    await login(email, password);

    try {
      const response = await api.post(`movies`, newMovie);

      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  },

    updateMovie: async (id: string, updatedMovie: Movie) => {
        await login(email, password);

        try {
        const response = await api.put(`movies/${id}`, updatedMovie);
    
        return response.data;
        } catch (error) {
        console.error("Error occurred:", error);
        }
    },
});

export default MovieService;
