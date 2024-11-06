import {Button, Text, PaperProvider, TextInput} from "react-native-paper";
import {View} from "react-native";

export default function LoginPage() {
    return (
        <PaperProvider>
            <View style={{flex: 1,justifyContent: 'center'}}>
                <View style={{flex: 3,alignItems: 'center',marginBottom:50,justifyContent:'flex-end'}}>
                    <Text variant={"displaySmall"}>Login</Text>
                </View>
                <View style={{flex: 5, paddingHorizontal: 30, rowGap:15 ,justifyContent: 'flex-start'}}>
                    <TextInput mode='outlined' label="E-Mail"></TextInput>
                    <TextInput mode='outlined' label="Password"></TextInput>
                    <Text variant={"labelMedium"} style={{paddingTop:35, alignSelf:'center',marginBottom:20}}>No account? Register here</Text>
                    <Button mode='contained' onPress={() => {console.log("pressed")}} style={{width:250, alignSelf:'center'}}>Login</Button>
                </View>
            </View>
        </PaperProvider>
    );
}