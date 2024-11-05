import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import MovieService from "../../services/MovieService";

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
      console.log("Movie created successfully");
      alert("Movie created successfully");
      // navigation back to MoviePage implemented here
    } catch (error) {
      console.error("Error creating movie:", error);
      alert("Error creating movie");
    }
  };

  const handleCancel = () => {
    // navigation back to MoviePage implemented here
  };

  return (
    <View>
      <Text>Create Movie</Text>

      <TextInput
        label="Movie Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
      />
      <TextInput
        label="Release Date"
        value={releaseDate}
        onChangeText={setReleaseDate}
        mode="outlined"
      />
      <TextInput
        label="MPAA Rating"
        value={mpaaRating}
        onChangeText={setMpaaRating}
        mode="outlined"
      />
      <TextInput
        label="Running Time (min)"
        value={runningTime}
        onChangeText={setRunningTime}
        mode="outlined"
        keyboardType="numeric"
      />
      <TextInput
        label="IMDB Rating"
        value={imdbRating}
        onChangeText={setImdbRating}
        mode="outlined"
        keyboardType="numeric"
      />
      <TextInput
        label="IMDB Votes"
        value={imdbVotes}
        onChangeText={setImdbVotes}
        mode="outlined"
        keyboardType="numeric"
      />

      <View>
        <Button
          mode="contained"
          onPress={handleCreate}
          labelStyle={{ color: "#FFFFFF" }}
        >
          Create
        </Button>
        <Button mode="outlined" onPress={handleCancel}>
          Cancel
        </Button>
      </View>
    </View>
  );
}
