import { api } from "../api/Api";
import login from "./AuthService";

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

  getRandomMovie: async () => {
    /* Code snippet to use in HomePage.tsx to display random movie
                    <IconButton
                    icon="pencil"
                    size={24}
                    onPress={async () => {
                        const randomMovie = await MovieService().getRandomMovie();
                        setMovieData(randomMovie);
                    }}
                    style={styles.editIcon}
                    />
    */
    await login(email, password);
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
    await login(email, password);
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
