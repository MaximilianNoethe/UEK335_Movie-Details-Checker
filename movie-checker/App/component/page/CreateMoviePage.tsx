import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import MovieService from "../../services/MovieService";

export default function CreateMoviePage() {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [runningTime, setRunningTime] = useState("");
  const [imdbRating, setImdbRating] = useState("");
  const [rtRating, setRtRating] = useState("");
  const [mpaaRating, setMpaaRating] = useState("");

  const handleCreate = async () => {
    const newMovie = {
      Title: title,
      "Release Date": releaseDate,
      "Director": director,
      "Genre": genre,
      "MPAA Rating": mpaaRating,
      "Running Time min": parseInt(runningTime, 10),
      "IMDB Rating": parseFloat(imdbRating),
      "Rotten Tomatoes Rating": parseInt(rtRating, 10),
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
          onPress={handleCreate}
          style={styles.createButton}
          labelStyle={{ color: "#FFFFFF" }}
        >
          Create
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
