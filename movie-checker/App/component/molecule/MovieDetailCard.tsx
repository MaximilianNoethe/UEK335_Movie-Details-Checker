import {StyleSheet, Text} from 'react-native';
import {Card} from "react-native-paper";


type MovieCardProps = {
    title: string;
    value: string | null;
}


export default function MovieCardDetail({title, value}: MovieCardProps) {
    return (
        <Card style={styles.cardContainer}>
            <Card.Content>
                <Text style={styles.titleText}>{title}:</Text>
                <Text style={styles.valueText}>{value ? value : "Not found"}</Text>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        backgroundColor: '#AD3F57',
        borderRadius: 20,
        width: 180,
        height: 160,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: 4,
    },
    valueText: {
        fontSize: 18,
        color: "#FFFFFF",
        textAlign: 'center',
    },
});


