import React, {useCallback, useState} from "react";
import { Animated, StyleSheet, View, Text } from 'react-native';
import MovieCard from "../molecule/MovieCard";
import { MovieDetails } from "../../models/models";
import MovieService from "../../services/MovieService";
import {FAB, IconButton} from "react-native-paper";
import {useFocusEffect} from "@react-navigation/native";

const MoviePage = ({navigation}) => {
    const [moviesData, setMoviesData] = useState<MovieDetails[]>([]);
    const [isAscending, setIsAscending] = useState(true);

    /**
     * Fetches a list of movies from the `MovieService` and updates the `moviesData` state.
     * Logs an error if the fetch operation fails.
     *
     * @returns A promise that resolves once the movies data is fetched and set in the state.
     */
    const fetchData = async () => {
        try {
            const data = await MovieService().getAllMovies();
            setMoviesData(data);
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    };

    /**
     * Navigates to the "CreateMoviePage" screen, allowing the user to add a new movie.
     * Triggered by tapping the floating action button (FAB).
     */
    const handleNavigate = async () => {
        navigation.navigate("CreateMoviePage");
      };

    /**
     * Opens the "MovieDetails" screen with the selected movie's data passed as a parameter.
     * Triggered by selecting a movie from the list.
     *
     * @param movie - The selected `MovieDetails` object, containing details such as title and genre.
     */
    const handleMovieSelect = (movie: MovieDetails) => {
        navigation.navigate("MovieDetails", {movie})
    };

    /**
     * Sorts the list of movies alphabetically by title in ascending or descending order.
     * The sort order toggles each time the function is called.
     *
     * - If `isAscending` is true, sorts A to Z.
     * - If `isAscending` is false, sorts Z to A.
     *
     * After sorting, updates the `moviesData` state and toggles `isAscending`.
     */
    const sortMovies = () => {
        const sortedMovies = [ ...moviesData].sort((a, b) =>{
           if (a.Title < b.Title) return isAscending ? -1 : 1;
           if (a.Title > b.Title) return isAscending ? 1 : -1;
           return 0;
        });
        setMoviesData(sortedMovies);
        setIsAscending (!isAscending);
    }

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, []));

    return (
        <View>
            <Animated.ScrollView endFillColor={"#B96F80"} contentContainerStyle={styles.scrollingContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        Movies
                    </Text>
                    <IconButton
                        icon={isAscending ? "sort-alphabetical-ascending-variant" : "sort-alphabetical-descending-variant"}
                        size={24}
                        iconColor="#fff"
                        onPress={sortMovies}
                        style={{ ...styles.iconButton, borderColor: '#fff', borderWidth: 2 }}
                    />
                </View>
                {moviesData.length > 0 ? (
                    moviesData.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} onSelect={() => handleMovieSelect(movie)} />
                    ))
                ) : (
                    <View style={styles.placeholderContainer}>
                        <Text style={styles.placeholderText}>Loading movies...</Text>
                    </View>
                )}
            </Animated.ScrollView>

            <FAB icon="plus" color="#fff" customSize={70}
                 style={{position: "absolute", right: 20, bottom: 100, borderRadius: 50}}
                 onPress={() => handleNavigate()}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
      backgroundColor: "#B96F80",
    },
    scrollingContainer: {
        flexGrow: 1,
        backgroundColor: "#B96F80",
        alignItems: 'center',
        paddingVertical: 120,
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 16,
        color: '#888',
    },
    iconButton : {
        borderRadius: 50,
    },
    titleContainer: {
        width: "130%",
        justifyContent: "space-around",
        marginTop: 40,
        flexDirection: "row",
        alignItems: "center"
    },
    titleText : {
        fontSize: 25,
        color: "white"
    }
});

export default MoviePage;
