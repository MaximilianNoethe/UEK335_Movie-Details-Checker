import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, TextInput, IconButton } from "react-native-paper";
import MovieService from "../../services/MovieService";

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

            <View style={styles.topBorder} /> 
            
            <View style={styles.header}>
                <Avatar.Icon size={95} icon="film" style={styles.avatar} />
                <IconButton
                    icon="pencil"
                    size={24}
                    onPress={async () => {
                        const randomMovie = await MovieService().getRandomMovie();
                        setMovieData(randomMovie);
                    }}
                    style={styles.editIcon}
                />
            </View>

            <TextInput
                label="Title"
                value={movieData.Title}
                mode="outlined"
                style={styles.input}
                editable={false}
            />
            <TextInput
                label="Release Date"
                value={movieData["Release Date"]}
                mode="outlined"
                style={styles.input}
                editable={false}
            />
            <TextInput
                label="MPAA Rating"
                value={movieData["MPAA Rating"]}
                mode="outlined"
                style={styles.input}
                editable={false}
            />
            <TextInput
                label="Running Time (min)"
                value={movieData["Running Time min"] ? `${movieData["Running Time min"]} min` : "N/A"}
                mode="outlined"
                style={styles.input}
                editable={false}
            />
            <TextInput
                label="IMDB Rating"
                value={movieData["IMDB Rating"] ? movieData["IMDB Rating"].toString() : "N/A"}
                mode="outlined"
                style={styles.input}
                editable={false}
            />
            <TextInput
                label="IMDB Votes"
                value={movieData["IMDB Votes"] ? movieData["IMDB Votes"].toLocaleString() : "N/A"}
                mode="outlined"
                style={styles.input}
                editable={false}
            />
        </View>
    );
};

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