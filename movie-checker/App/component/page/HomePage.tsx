import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { IconButton, Card } from "react-native-paper";
import MovieService from "../../services/MovieService";
import UserService from "../../services/UserService";
import MovieCard from "../molecule/MovieCard";
import { useFocusEffect } from "@react-navigation/native";

export default function HomePage() {
  type User = {
    firstname: string;
  };
  const [randomMovie, setRandomMovie] = useState(null);
  const [movieCount, setMovieCount] = useState(null);
  const [userData, setUserData] = useState<User>({
    firstname: "Failed to load data",
  }); 


  /**
   * Fetches a random movie from the MovieService and sets it in the `randomMovie` state.
   * If an error occurs, it logs the error to the console.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const fetchRandomMovie = async () => {
    try {
      const movie = await MovieService().getRandomMovie();
      setRandomMovie(movie);
    } catch (error) {
      console.error("Error fetching random movie:", error);
    }
  };

  /**
   * Fetches the total count of movies from the MovieService and sets it in the `movieCount` state.
   * If an error occurs, it logs the error to the console.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const fetchMovieCount = async () => {
    try {
      const count = await MovieService().getMovieCount();
      setMovieCount(count);
    } catch (error) {
      console.error("Error fetching movie count:", error);
    }
  };

  /**
   * Fetches the current user data from the UserService and sets it in the `userData` state.
   * If an error occurs, it logs the error to the console.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const fetchUserData = async () => {
    try {
      const data = await UserService().getCurrentUserData();
      setUserData(data); 
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
    fetchUserData();
  }, []);

  useFocusEffect(
      useCallback(() => {
        fetchMovieCount();
        }, []));

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.welcomeText}>
        Welcome Back,
      </Text>
      <Text style={styles.welcomeText}>
        {userData ? userData.firstname : "Guest"}!
      </Text>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>
            Random movie
          </Text>
          <IconButton
              icon="reload"
              size={24}
              iconColor="#FFFFFF"
              onPress={fetchRandomMovie}
              style={styles.reloadButton}
          />
        </View>
        <View style={styles.movieCardContainer}>
          {randomMovie ? (
              <MovieCard movie={randomMovie} />
          ) : (
              <Card style={styles.movieCardPlaceholder}>
                <Text style={styles.placeholderText}>Loading...</Text>
              </Card>
          )}
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>
            Info
          </Text>
        </View>
        <Card style={styles.countCard}>
          <Text style={styles.countText}>
            Total movie count: {movieCount !== null ? movieCount : "Loading..."}
          </Text>
        </Card>
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#B96F80",
    alignItems: "center",
    paddingVertical: 150,
  },
  welcomeText: {
    fontSize: 26,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  sectionContainer: {
    width: "90%",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 40
  },
  sectionTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "left"
  },
  reloadButton: {
    backgroundColor: "#8C4C5C",
    borderRadius: 50,
  },
  movieCardContainer: {
    alignItems: "center",
    width: "100%",
  },
  movieCardPlaceholder: {
    backgroundColor: "#8C4C5C",
    borderRadius: 15,
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  placeholderText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  countCard: {
    backgroundColor: "#AD3F57",
    width: "90%",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
  },
  countText: {
    fontSize: 18,
    color: "#FFFFFF",
    alignSelf: "center",
    paddingVertical: 20
  },
});
