import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { IconButton, Card } from "react-native-paper";
import MovieService from "../../services/MovieService";
import UserService from "../../services/UserService"; // Import UserService
import MovieCard from "../molecule/MovieCard";

export default function HomePage() {
  type User = {
    firstname: string;
  };
  const [randomMovie, setRandomMovie] = useState(null);
  const [movieCount, setMovieCount] = useState(null);
  const [userData, setUserData] = useState<User>({
    firstname: "Failed to load data",
  }); 

  
  useEffect(() => {
    fetchRandomMovie();
    fetchMovieCount();
    fetchUserData(); 
  }, []);

  const fetchRandomMovie = async () => {
    try {
      const movie = await MovieService().getRandomMovie();
      console.log("Random movie fetched:", movie);
      setRandomMovie(movie);
    } catch (error) {
      console.error("Error fetching random movie:", error);
    }
  };

  const fetchMovieCount = async () => {
    try {
      const count = await MovieService().getMovieCount();
      console.log("Movie count fetched:", count);
      setMovieCount(count);
    } catch (error) {
      console.error("Error fetching movie count:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const data = await UserService().getCurrentUserData();
      setUserData(data); 
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
       
        <Text style={styles.welcomeText}>
          Welcome Back, {userData ? userData.firstname : "Guest"}!
        </Text>

        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Random movie</Text>
          <View style={styles.movieCardContainer}>
            {randomMovie ? (
              <MovieCard movie={randomMovie} />
            ) : (
              <Card style={styles.movieCardPlaceholder}>
                <Text style={styles.placeholderText}>Loading...</Text>
              </Card>
            )}
            
            <IconButton
              icon="reload"
              size={24}
              iconColor="#FFFFFF"
              onPress={fetchRandomMovie}
              style={styles.reloadButton}
            />
          </View>
        </View>

        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Info</Text>
          <Card style={styles.countCard}>
            <Text style={styles.countText}>
              Total movie count:{" "}
              {movieCount !== null ? movieCount : "Loading..."}
            </Text>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#AD3F57",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    width: "90%",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 26,
    color: "#FFFFFF",
    marginBottom: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  sectionContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 5,
  },
  movieCardContainer: {
    position: "relative",
    alignItems: "center",
  },
  reloadButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#8C4C5C",
    borderRadius: 50,
  },
  movieCardPlaceholder: {
    backgroundColor: "#8C4C5C",
    borderRadius: 15,
    width: 330,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  countCard: {
    backgroundColor: "#8C4C5C",
    width: 330,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
  },
  countText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
});
