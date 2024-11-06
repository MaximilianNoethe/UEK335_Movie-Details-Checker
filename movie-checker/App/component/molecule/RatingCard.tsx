import { StyleSheet, Text, View } from 'react-native';
import { Card } from "react-native-paper";
import { MovieDetails } from "../../models/models";

type RatingCardProps = {
    imdbRating: number | null;
    rottenTomatoRating: number | null;
};

export default function RatingCard({ imdbRating, rottenTomatoRating }: RatingCardProps) {
    return (
        <Card style={styles.cardContainer}>
            <Card.Content>
                <Text style={styles.titleText}>Ratings across platforms</Text>
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingSection}>
                        <Text style={styles.ratingNumber}>{imdbRating ? imdbRating : "? "}/10</Text>
                        <Text style={styles.ratingTitle}>IMDB Rating</Text>
                    </View>
                    <View style={styles.ratingSection}>
                        <Text style={styles.ratingNumber}>{rottenTomatoRating ? rottenTomatoRating : "? "}%</Text>
                        <Text style={styles.ratingTitle}>Rotten Tomato Rating</Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#AD3F57',
        borderRadius: 15,
        width: 370,
        paddingVertical: 10,
        margin: 15,
    },
    titleText: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "bold",
        marginBottom: 20,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,

    },
    ratingSection: {
        alignItems: 'center',
        flex: 1,
    },
    ratingNumber: {
        fontSize: 24,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    ratingTitle: {
        fontSize: 14,
        color: "#FFFFFF",
        textAlign: "center",
        marginTop: 5,
    }
});
