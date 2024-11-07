import {StyleSheet, View, Text} from 'react-native';
import MovieCardDetail from "../molecule/MovieDetailCard";
import RatingCard from "../molecule/RatingCard";
import {IconButton} from "react-native-paper";
import React from "react";
import MovieService from "../../services/MovieService";



export default function MovieDetailPage({navigation, route}) {
    const {movie} = route.params;

    /**
     * Handles the deletion of a movie by calling the MovieService's deleteMovie method.
     * Upon successful deletion, navigates back to the "Movies" page.
     *
     * @param id - The ID of the movie to be deleted.
     */
    const handleDeleteMovie = (id : number) => {
            MovieService().deleteMovie(id)
                .then(() =>
                navigation.navigate("Movies")
                );
    }

    /**
     * Handles the editing of a movie by navigating to the "MovieEditPage" with the movie ID.
     *
     * @param id - The ID of the movie to be edited.
     */
    const handleEditMovie =  (id : number) => {
        navigation.navigate("MovieEditPage", {id});
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleAndButtons}>
                <IconButton
                    icon="delete"
                    size={24}
                    iconColor="#fff"
                    onPress={() => handleDeleteMovie(movie.id)}
                    style={{ ...styles.iconButton, borderColor: '#fff', borderWidth: 2 }}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.movieTitle}>
                        {movie.Title}
                    </Text>
                    <Text style={styles.mpaaRatingText}>
                        MPAA Rating: {movie["MPAA Rating"] ? movie["MPAA Rating"] : "unknown"}
                    </Text>
                </View>
                <IconButton
                    icon="pencil"
                    size={24}
                    iconColor="#fff"
                    onPress={() => handleEditMovie(movie.id)}
                    style={{ ...styles.iconButton, borderColor: '#fff', borderWidth: 2 }}
                />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                <MovieCardDetail title="Director" value={movie["Director"]}/>
                <MovieCardDetail title="Release Date" value={movie["Release Date"]}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                <MovieCardDetail title="Duration" value={movie["Running Time min"]}/>
                <MovieCardDetail title="Genre" value={movie["Major Genre"]}/>
            </View>
            <RatingCard imdbRating={movie["IMDB Rating"]} rottenTomatoRating={movie["Rotten Tomatoes Rating"]}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B96F80',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "15%"
    },
    titleAndButtons: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    movieTitle: {
        fontSize: 20,
        color: "white"
    },
    textContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    mpaaRatingText: {
        color: "white"
    },
    iconButton : {
        borderRadius: 50,
    }
});
