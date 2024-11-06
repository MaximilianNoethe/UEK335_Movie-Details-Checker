import { AxiosInstance } from "axios";
import { defaultInstance } from "../api/Api";

type Movie = {
  id: number;
  Title: string;
  Director?: string;
  "Release Date": string;
  "MPAA Rating"?: string;
  "Major Genre"?: string;
  "Running Time min"?: number;
  "IMDB Rating"?: number;
  "IMDB Votes"?: number;
};



const MovieService = (api: AxiosInstance = defaultInstance) => ({
  getAllMovies: async (start = 3100, limit = 20) => {
    try {
      const response = await api.get(`movies?start=${start}&_limit=${limit}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
      return [];
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


  deleteMovie: async (id: number) => {
    try {
      const response = await api.delete(`movies/${id}`);
      console.log("what",response.data);
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

  getRandomMovie: async () => {
    try {
      const response = await api.get(`movies`);

      
      if (response.data && response.data.length > 0) { // Makes sure that the response has an array of movies
        
        const randomIndex = Math.floor(Math.random() * response.data.length); // Select a random index in the array of movies
        const randomMovie = response.data[randomIndex];

        console.log("Random movie selected:", randomMovie);
        return randomMovie;
      } else {
        console.log("No movies found in data.");
        return null;
      }
    } catch (error) {
      console.error("Error occurred:", error);
      return null;
    }
  },

  getMovieCount: async () => {
    try {
        const response = await api.get(`movies`);
        
        const totalCount = response.data ? response.data.length : 0;
        
        console.log("Total movie count:", totalCount);
        return totalCount;
    } catch (error) {
        console.error("Error occurred:", error);
        return null;
    }
},

});

export default MovieService;
