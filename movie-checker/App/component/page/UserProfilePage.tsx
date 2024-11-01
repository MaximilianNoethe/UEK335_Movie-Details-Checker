import { StyleSheet, Text, View } from 'react-native';


export default function UserProfilePage() {
    return (
        <View style={styles.container}>
            <Text>UserProfilePage</Text>
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
