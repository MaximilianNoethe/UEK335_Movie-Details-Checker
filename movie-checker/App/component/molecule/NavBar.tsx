import {View} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomePage from "../page/HomePage";
import MoviePage from "../page/MoviePage";
import UserProfilePage from "../page/UserProfilePage";
import {IconButton, Provider} from "react-native-paper";

const Tab = createBottomTabNavigator();
const screenOptions = {
    tabBarShown: false,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        backgroundColor: "#621827",
    }
}
export default function NavBar() {
    return (
        <Provider>
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        left: 0,
                        elevation: 0,
                        height: 60,
                        backgroundColor: "#621827",
                    },
                    tabBarIconStyle: { marginBottom: -5 },
                }}
            >
                <Tab.Screen
                    name="Movies"
                    component={MoviePage}
                    options={{
                        tabBarIcon : ({focused})=> (
                            <IconButton icon="movie" size={24} iconColor={focused ?"#B0B0B0": "#FFFFFF"}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Home"
                    component={HomePage}
                    options={{
                        tabBarIcon : ({focused})=> (
                            <IconButton icon="home" size={24} iconColor={focused ?"#B0B0B0": "#FFFFFF"}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="User"
                    component={UserProfilePage}
                    options={{
                        tabBarIcon : ({focused})=> (
                            <IconButton icon="account" size={30} iconColor={focused ?"#B0B0B0": "#FFFFFF"}/>
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
        </Provider>
    )
}