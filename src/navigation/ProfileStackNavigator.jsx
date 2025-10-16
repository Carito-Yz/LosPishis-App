import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header";
import { ProfileScreen } from "../screens";

const Stack = createNativeStackNavigator()

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Perfil"
            screenOptions={{
                header: ({ navigation, route }) => <Header navigation={navigation} route={route} title={"Perfil"} />
            }}
        >
            <Stack.Screen name="Perfil" component={ProfileScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default ProfileStackNavigator