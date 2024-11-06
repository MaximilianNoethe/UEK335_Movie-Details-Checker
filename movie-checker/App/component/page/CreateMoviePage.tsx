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
    <View style={styles.container}>
      <Text style={styles.title}>Create Movie</Text>

      <TextInput
        label="Movie Title"
        value={title}
        onChangeText={setTitle}
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
        label="MPAA Rating"
        value={mpaaRating}
        onChangeText={setMpaaRating}
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
      <TextInput
        label="IMDB Rating"
        value={imdbRating}
        onChangeText={setImdbRating}
        mode="outlined"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        label="IMDB Votes"
        value={imdbVotes}
        onChangeText={setImdbVotes}
        mode="outlined"
        style={styles.input}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleCreate}
          style={styles.createButton}
          labelStyle={{ color: "#FFFFFF" }}
        >
          Create
        </Button>
        <Button
          mode="outlined"
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  createButton: {
    backgroundColor: "#AD3F57",
    borderRadius: 8,
    paddingHorizontal: 30,
  },
  cancelButton: {
    borderColor: "#AD3F57",
    borderRadius: 8,
    paddingHorizontal: 30,
  },
});
