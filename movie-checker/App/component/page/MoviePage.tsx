import React, {useCallback, useEffect, useState} from "react";
import { Animated, StyleSheet, View, Text } from 'react-native';
import MovieCard from "../molecule/MovieCard";
import { MovieDetails } from "../../models/models";
import MovieService from "../../services/MovieService";
import {FAB, IconButton} from "react-native-paper";
import {useFocusEffect} from "@react-navigation/native";

const MoviePage = ({navigation}) => {
    const [moviesData, setMoviesData] = useState<MovieDetails[]>([]);

    const fetchData = async () => {
        try {
            const data = await MovieService().getAllMovies();
            setMoviesData(data);
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, []));

    const handleMovieSelect = (movie: MovieDetails) => {
        navigation.navigate("MovieDetails", {movie})
    };


    return (
            <Animated.ScrollView endFillColor={"#B96F80"} contentContainerStyle={styles.scrollingContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        Movies
                    </Text>
                    <IconButton
                        icon="sort-alphabetical-variant"
                        size={24}
                        iconColor="#fff"
                        onPress={() => console.log("Delete Movie")}
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
                <FAB icon="plus" customSize={70} style={{position: "absolute"}}/>
            </Animated.ScrollView>

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
