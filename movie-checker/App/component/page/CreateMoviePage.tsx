import React, { useState } from 'react';
import { View } from 'react-native';
import MovieService from '../../services/MovieService';

export default function CreateMoviePage() {

    const [title, setTitle] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [mpaaRating, setMpaaRating] = useState("");
    const [runningTime, setRunningTime] = useState("");
    const [imdbRating, setImdbRating] = useState("");
    const [imdbVotes, setImdbVotes] = useState("");

    const handleCreate = async () => {
        const newMovie = {
            Title: title,
            "Release Date": releaseDate,
            "MPAA Rating": mpaaRating,
            "Running Time min": parseInt(runningTime, 10),
            "IMDB Rating": parseFloat(imdbRating),
            "IMDB Votes": parseInt(imdbVotes, 10),
        };

        try {
            await MovieService().createMovie(newMovie);
            console.log('Movie created successfully');
            alert('Movie created successfully');
            // navigation back to MoviePage implemented here
        } catch (error) {
            console.error('Error creating movie:', error);
            alert('Error creating movie');
        }
    };

    const handleCancel = () => {
        // navigation back to MoviePage implemented here
    };

    return (
        <View>
        </View>
    );
}
