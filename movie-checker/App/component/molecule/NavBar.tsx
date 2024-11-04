import {Text, View} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomePage from "../page/HomePage";
import MoviePage from "../page/MoviePage";
import {IconButton, Provider} from "react-native-paper";
import UserProfile from "../page/UserProfile";

const Tab = createBottomTabNavigator();
export default function NavBar() {
    return (
        <Provider>
        <NavigationContainer>
            <View style={{flex: 1}}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        left: 0,
                        elevation: 0,
                        height: 90,
                        backgroundColor: "#621827",
                        paddingBottom: 6
                    },
                    tabBarIconStyle: { marginBottom: -5 },
                }}
            >
                <Tab.Screen
                    name="Movies"
                    component={MoviePage}
                    options={{
                        tabBarIcon : ({focused})=> (
                            <IconButton icon="movie" size={40} iconColor={focused ?"#B0B0B0": "#FFFFFF"} style={{marginBottom: -5}}/>
                        ),
                        tabBarLabel : ({focused})=>(
                            <Text style={{ color : focused ? "#B0B0B0": "#FFFFFF", fontSize: 15 , marginBottom: 5}}>
                                Movies
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Home"
                    component={HomePage}
                    options={{
                        tabBarIcon : ({focused})=> (
                            <IconButton icon="home" size={40} iconColor={focused ?"#B0B0B0": "#FFFFFF"} style={{marginBottom: -5}}/>
                        ),
                        tabBarLabel : ({focused})=>(
                            <Text style={{ color : focused ? "#B0B0B0": "#FFFFFF", fontSize: 12 , marginBottom: 5}}>
                                Home
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="User"
                    component={UserProfile}
                    options={{
                        tabBarIcon : ({focused})=> (
                            <IconButton icon="account-circle" size={40} iconColor={focused ?"#B0B0B0": "#FFFFFF"} style={{marginBottom: -5}}/>
                        ),
                        tabBarLabel : ({focused})=>(
                            <Text style={{ color : focused ? "#B0B0B0": "#FFFFFF", fontSize: 12 , marginBottom: 5}}>
                                Profile
                            </Text>
                        ),
                    }}
                />
            </Tab.Navigator>
            </View>
        </NavigationContainer>
        </Provider>
    )
}