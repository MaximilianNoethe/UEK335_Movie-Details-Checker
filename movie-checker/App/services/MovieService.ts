import { AxiosInstance } from "axios";
import { defaultInstance } from "../api/Api";
import {MovieDetails} from "../models/models";

type Movie = {
  Title: string;
  Director?: string;
  "Release Date": string;
  "MPAA Rating"?: string;
  "Major Genre"?: string;
  "Running Time min"?: number;
  "IMDB Rating"?: number;
  "Rotten Tomatoes Rating"?: number;
};





const MovieService = (api: AxiosInstance = defaultInstance) => ({

  /**
   * Fetches a list of movies with pagination.
   * Defaults to starting from movie ID 3100, with a limit of 20 movies.
   *
   * @async
   * @function
   * @param {number} [start=3100] - The starting point for the movies list.
   * @param {number} [limit=20] - The number of movies to retrieve.
   * @returns {Promise<Movie[]>} A promise resolving to an array of movies.
   * @throws Will log an error and return an empty array if the request fails.
   */

  getAllMovies: async (start: number = 3100, limit: number = 20) => {
    try {
      const response = await api.get(`movies?start=${start}&_limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  },

  /**
   * Fetches the details of a specific movie by its ID.
   *
   * @async
   * @function
   * @param {string} id - The ID of the movie to fetch.
   * @returns {Promise<Movie | undefined>} A promise resolving to the movie data, or undefined if an error occurs.
   * @throws Will log an error if the request fails.
   */

  getMovieById: async (id: string)  => {
    try {
      const response = await api.get(`movies/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  },

  /**
   * Deletes a specific movie by its ID.
   *
   * @async
   * @function
   * @param {number} id - The ID of the movie to delete.
   * @returns {Promise<any>} A promise resolving to the response data upon successful deletion, or undefined if an error occurs.
   * @throws Will log an error if the request fails.
   */

  deleteMovie: async (id: number) => {
    try {
      const response = await api.delete(`movies/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  },

  /**
   * Creates a new movie entry with the provided data.
   *
   * @async
   * @function
   * @param {Movie} newMovie - An object containing movie details to be created.
   * @returns {Promise<any>} A promise resolving to the created movie data, or undefined if an error occurs.
   * @throws Will log an error if the request fails.
   */

  createMovie: async (newMovie: Movie) => {

    try {
      const response = await api.post(`movies`, newMovie);

      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  },

  /**
   * Updates an existing movie entry with new details.
   *
   * @async
   * @function
   * @param {string} id - The ID of the movie to update.
   * @param {MovieDetails} updatedMovie - The new details for the movie.
   * @returns {Promise<any>} A promise resolving to the updated movie data, or undefined if an error occurs.
   * @throws Will log an error if the request fails.
   */

  updateMovie: async (id: string, updatedMovie: MovieDetails) => {

    try {
      const response = await api.put(`movies/${id}`, updatedMovie);

      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  },

  /**
   * Fetches a random movie from the list of movies.
   * Selects a random movie from the available list if data exists.
   *
   * @async
   * @function
   * @returns {Promise<Movie | null>} A promise resolving to a random movie object, or null if no movies are found or an error occurs.
   * @throws Will log an error if the request fails.
   */

  getRandomMovie: async () => {
    try {
      const response = await api.get(`movies`);

      
      if (response.data && response.data.length > 0) { // Makes sure that the response has an array of movies
        
        const randomIndex = Math.floor(Math.random() * response.data.length); // Select a random index in the array of movies
        const randomMovie = response.data[randomIndex];

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

  /**
   * Fetches the total count of movies.
   *
   * @async
   * @function
   * @returns {Promise<number | null>} A promise resolving to the total count of movies, or null if an error occurs.
   * @throws Will log an error if the request fails.
   */


  getMovieCount: async () => {
    try {
        const response = await api.get(`movies`);
        
        const totalCount = response.data ? response.data.length : 0;
        return totalCount;
    } catch (error) {
        console.error("Error occurred:", error);
        return null;
    }
},

});

export default MovieService;
