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

  const [titleError, setTitleError] = useState("");
  const [directorError, setDirectorError] = useState("");
  const [genreError, setGenreError] = useState("");
  const [releaseDateError, setReleaseDateError] = useState("");
  const [runningTimeError, setRunningTimeError] = useState("");
  const [imdbRatingError, setImdbRatingError] = useState("");
  const [rtRatingError, setRtRatingError] = useState("");
  const [mpaaRatingError, setMpaaRatingError] = useState("");

  const handleTitleChange = (text: string) => {
    setTitle(text);
    setTitleError(text ? "" : "Title is required");
  };

  const handleDirectorChange = (text: string) => {
    setDirector(text);
    setDirectorError(text ? "" : "Director is required");
  };

  const handleGenreChange = (text: string) => {
    setGenre(text);
    setGenreError(text ? "" : "Genre is required");
  };

  const handleReleaseDateChange = (text: string) => {
    setReleaseDate(text);
    setReleaseDateError(text ? "" : "Release Date is required");
  };

  const handleRunningTimeChange = (text: string) => {
    setRunningTime(text);
    const numericRunningTime = parseInt(text, 10);
    setRunningTimeError(
      !numericRunningTime || numericRunningTime <= 0
        ? "Please enter a valid running time"
        : ""
    );
  };

  const handleImdbRatingChange = (text: string) => {
    setImdbRating(text);
    const numericImdbRating = parseFloat(text);
    setImdbRatingError(
      !numericImdbRating || numericImdbRating < 0 || numericImdbRating > 10
        ? "Please enter a valid IMDB rating"
        : ""
    );
  };

  const handleRtRatingChange = (text: string) => {
    setRtRating(text);
    const numericRtRating = parseInt(text, 10);
    setRtRatingError(
      !numericRtRating || numericRtRating < 0 || numericRtRating > 100
        ? "Please enter a valid Rotten Tomatoes rating"
        : ""
    );
  };

  const handleMpaaRatingChange = (text: string) => {
    setMpaaRating(text);
    setMpaaRatingError(text ? "" : "MPAA Rating is required");
  };

  const handleCreate = async () => {
    if (
      titleError ||
      directorError ||
      genreError ||
      releaseDateError ||
      runningTimeError ||
      imdbRatingError ||
      rtRatingError ||
      mpaaRatingError
    ) {
      Alert.alert("Error", "Please fill in all fields before submitting");
    }
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
      console.log(newMovie);
      
      Alert.alert("Movie Created", "Movie successfully created");
      navigation.navigate("Movies");
    } catch (error) {
      console.error("Error creating movie:", error);
      Alert.alert("Error","Error creating movie");
    }
  };

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
        onChangeText={handleTitleChange}
        mode="outlined"
        style={styles.input}
        error={!!titleError}
      />
      {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}

      <TextInput
        label="Director"
        value={director}
        onChangeText={handleDirectorChange}
        mode="outlined"
        style={styles.input}
        error={!!directorError}
      />
      {directorError ? <Text style={styles.errorText}>{directorError}</Text> : null}

      <TextInput
        label="Genre"
        value={genre}
        onChangeText={handleGenreChange}
        mode="outlined"
        style={styles.input}
        error={!!genreError}
      />
      {genreError ? <Text style={styles.errorText}>{genreError}</Text> : null}

      <TextInput
        label="Release Date"
        value={releaseDate}
        onChangeText={handleReleaseDateChange}
        mode="outlined"
        style={styles.input}
        error={!!releaseDateError}
      />
      {releaseDateError ? <Text style={styles.errorText}>{releaseDateError}</Text> : null}

      <TextInput
        label="Running Time (min)"
        value={runningTime}
        onChangeText={handleRunningTimeChange}
        mode="outlined"
        style={styles.input}
        keyboardType="numeric"
        error={!!runningTimeError}
      />
      {runningTimeError ? <Text style={styles.errorText}>{runningTimeError}</Text> : null}

      <View style={styles.ratingContainer}>
        <TextInput
          label="MPAA Rating"
          value={mpaaRating}
          onChangeText={handleMpaaRatingChange}
          mode="outlined"
          style={styles.ratingInput}
        />

        <TextInput
          label="IMDB Rating"
          value={imdbRating}
          onChangeText={handleImdbRatingChange}
          mode="outlined"
          style={styles.ratingInput}
          keyboardType="numeric"
        />
        <TextInput
          label="Rotten Tomatoes"
          value={rtRating}
          onChangeText={handleRtRatingChange}
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
