import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import MovieService from "../../services/MovieService";

const CreateMoviePage = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [runningTime, setRunningTime] = useState("");
  const [imdbRating, setImdbRating] = useState("");
  const [rtRating, setRtRating] = useState("");
  const [mpaaRating, setMpaaRating] = useState("");

  /**
   * Handles the creation of a new movie.
   * Gathers form input values, creates a new movie object, and calls the movie service to add it.
   * If successful, shows a success alert and navigates back to the movie list page.
   * If there's an error, logs it to the console and shows an error alert.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
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
      Alert.alert("Movie Created", "Movie successfully created");
      navigation.navigate("Movies");
    } catch (error) {
      console.error("Error creating movie:", error);
      Alert.alert("Error","Error creating movie");
    }
  }

  /**
   * Navigates back to the "Movies" screen without saving any changes.
   *
   * @function
   * @returns {void}
   */
  const handleCancel = () => {
    navigation.navigate("Movies");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Movie</Text>
      </View>

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
          theme={{ colors: { primary: "#621827" } }}
          onPress={handleCancel}
          style={styles.cancelButton}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
};

export default CreateMoviePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    padding: 20,
    paddingBottom: 200,
  },
  header: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
    
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
    
  },
  ratingInput: {
    marginBottom: 10,
    width: "30%",
  },
  ratingContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "stretch",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
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
