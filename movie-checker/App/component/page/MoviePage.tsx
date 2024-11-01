import { StyleSheet, View } from 'react-native';
import MovieCard from "../molecule/MovieCard";
import {MovieDetails} from "../../models/models";

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


export default function MoviePage() {
    return (
        <View style={styles.container}>
            <MovieCard movie={testmovie} />
        </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
