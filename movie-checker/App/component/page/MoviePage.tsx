import { StyleSheet, View } from 'react-native';
import MovieCard from "../molecule/MovieCard";
import {MovieDetails} from "../../models/models";
import {useEffect, useState} from "react";
import MovieService from "../../services/MovieService";

const testmovie : MovieDetails = {
    Title: "Mad Max",
    "Release Date": "Okt 18 2006",
    "MPAA Rating": "R",
    "Running Time min": "120min",
    "Major Genre": "Horror",
    Director: "Martin Scorcese",
    "Rotten Tomatoes Rating": 20,
    "IMDB Rating" : 7.3,
    id: 2
}

const MoviePage = () => {
    type Movie = {
        id: number;
        Title: string;
        "Release Date": string;
        "MPAA Rating": string;
        "Running Time min": number;
        "IMDB Rating": number;
        "IMDB Votes": number;
    };

    const [movieData, setMovieData] = useState<Movie>({
        id: 0,
        Title: "Failed to load data",
        "Release Date": "Failed to load data",
        "MPAA Rating": "Failed to load data",
        "Running Time min": 0,
        "IMDB Rating": 0,
        "IMDB Votes": 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await MovieService().getAllMovies();
                setMovieData(data[0]);
            } catch (error) {
                console.error("Error fetching movie data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>

            <MovieCard movie={testmovie} />
        </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    topBorder: {
        height: 100,
        backgroundColor: "#8c5c68",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: -40, 
        marginBottom: 35,
    },
    avatar: {
        backgroundColor: "#424242",
    },
    editIcon: {
        marginLeft: "auto", 
        marginTop: 50, 
    },
    input: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
});

export default MoviePage;