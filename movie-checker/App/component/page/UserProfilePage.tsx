import { StyleSheet, Text, View } from 'react-native';
import {Button} from "react-native-paper";
import LoginPage from "./LoginPage";


export default function UserProfilePage() {
    return (
        <View style={styles.container}>
            <Text>UserProfilePage</Text>
            <Button>goto login</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
