import {StyleSheet, Text, View} from 'react-native';
import {Card, IconButton} from "react-native-paper";
import {MovieDetails} from "../../models/models";

type MovieCardProps = {
    movie: MovieDetails;
}


export default function MovieCard({movie}: MovieCardProps) {
    return (
            <Card style={moviecard.cardContainer}>
                <Card.Content>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={[moviecard.fontAndColor, moviecard.MovieTitle]}>
                                {movie.Title}
                            </Text>
                            <Text style={[moviecard.fontAndColor,moviecard.DirectorSubtitle]}>
                                {movie.Director}
                            </Text>
                        </View>
                        <Text style={[moviecard.fontAndColor,moviecard.MPAARating]}>
                            {movie["MPAA Rating"]}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: -10 }}>
                        <Text style={[moviecard.fontAndColor, moviecard.GenreText]}>
                            {movie["Major Genre"]}
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginRight: -15}}>
                            <Text style={[moviecard.fontAndColor, moviecard.IMDBRating]}>
                                {movie["IMDB Rating"]}/10
                            </Text>
                            <IconButton icon="star" iconColor="#FFFD54" style={{ marginLeft: 0, padding: 0 }}/>
                        </View>
                    </View>
                </Card.Content>
            </Card>

    );
}

const moviecard = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#AD3F57',
        borderRadius: 15,
        width: 330
    },
    fontAndColor : {
        fontFamily: "Roboto",
        color: "#fff"
    },
    MovieTitle : {
        fontSize: 22
    },
    DirectorSubtitle :{
        fontSize: 15
    },
    MPAARating : {
        fontSize: 22,
    },
    GenreText : {
        fontSize: 18,
    },
    IMDBRating : {
        fontSize: 20,
    }

});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


