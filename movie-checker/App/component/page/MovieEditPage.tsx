import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import MovieService from "../../services/MovieService";
import {MovieDetails} from "../../models/models";


export default function MovieEditPage({navigation, route}) {
    const {id} = route.params;

    const [title , setTitle] = useState("" );
    const [director, setDirector] = useState("");
    const [genre, setGenre] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [runningTime, setRunningTime] = useState("");
    const [imdbRating, setImdbRating] = useState("");
    const [rtRating, setRtRating] = useState("");
    const [mpaaRating, setMpaaRating] = useState("");

    /**
     * Fetches data for the specified movie by ID and populates state variables
     * with the movie details.
     *
     * @async
     * @function
     * @returns {Promise<void>} A promise that resolves when movie data is successfully retrieved.
     * @throws Logs an error to the console if the request fails.
     */
    const fetchData = async () => {
        try {
            const data = await MovieService().getMovieById(id);
            setTitle(data.Title || "");
            setDirector(data.Director || "");
            setGenre(data["Major Genre"] || "");
            setReleaseDate(data["Release Date"] || "");
            setRunningTime(data["Running Time min"]?.toString() || "");
            setImdbRating(data["IMDB Rating"]?.toString() || "");
            setRtRating(data["Rotten Tomatoes Rating"]?.toString() || "");
            setMpaaRating(data["MPAA Rating"] || "");
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    };

    /**
     * Handles saving the edited movie data by updating it in the database
     * and navigating to the MovieDetails page with the updated data.
     *
     * @async
     * @function
     * @returns {Promise<void>} A promise that resolves when the movie data is successfully updated.
     * @throws Logs an error to the console if the update fails, and shows an alert.
     */
    const handleEdit = async () => {
        const newMovie : MovieDetails = {
            id,
            Title: title,
            "Release Date": releaseDate,
            "Director": director,
            "Major Genre": genre,
            "MPAA Rating": mpaaRating,
            "Running Time min": parseInt(runningTime, 10) || 0,
            "IMDB Rating": parseFloat(imdbRating) || 0,
            "Rotten Tomatoes Rating": parseInt(rtRating, 10) || 0,
        };

        try {
            await MovieService().updateMovie(id, newMovie);
            Alert.alert("Succesfully Edited","Movie updated successfully");
            navigation.navigate("MovieDetails", {movie : newMovie});
        } catch (error) {
            console.error("Error creating movie:", error);
            alert("Error creating movie");
        }
    };

    /**
     * Navigates back to the Movies page without saving any changes.
     *
     * @function
     * @returns {void}
     */
    const handleCancel = () => {
        navigation.navigate("Movies");
    };

    useEffect(() => {
        fetchData();
    }, [id])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Movie</Text>

            <TextInput
                label="Movie Title"
                value={title}
                onChangeText={setTitle}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="Director"
                value={director}
                onChangeText={setDirector}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="Genre"
                value={genre}
                onChangeText={setGenre}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="Release Date"
                value={releaseDate}
                onChangeText={setReleaseDate}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="Running Time (min)"
                value={runningTime}
                onChangeText={setRunningTime}
                mode="outlined"
                style={styles.input}
                keyboardType="numeric"
            />
            <View style={styles.ratingContainer}>
                <TextInput
                    label="MPAA Rating"
                    value={mpaaRating}
                    onChangeText={setMpaaRating}
                    mode="outlined"
                    style={styles.ratingInput}
                />
                <TextInput
                    label="IMDB Rating"
                    value={imdbRating}
                    onChangeText={setImdbRating}
                    mode="outlined"
                    style={styles.ratingInput}
                    keyboardType="numeric"
                />
                <TextInput
                    label="Rotten Tomatoes"
                    value={rtRating}
                    onChangeText={setRtRating}
                    mode="outlined"
                    style={styles.ratingInput}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    onPress={handleEdit}
                    style={styles.createButton}
                    labelStyle={{ color: "#FFFFFF" }}
                >
                    Save
                </Button>
                <Button
                    mode="outlined"
                    theme={{colors: { primary: '#621827'}}}
                    onPress={handleCancel}
                    style={styles.cancelButton}
                >
                    Cancel
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#ffffff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
    ratingInput: {
        marginBottom: 10,
        width: "30%",
    },
    ratingContainer: {
        flex:0,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignContent: "stretch",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },
    createButton: {
        backgroundColor: "#AD3F57",
        paddingHorizontal: 30,
    },
    cancelButton: {
        borderColor: "#AD3F57",
        paddingHorizontal: 30,
    },
});
