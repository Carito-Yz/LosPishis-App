import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, SignupScreen } from "../screens";

const Stack = createNativeStackNavigator()

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
            <Stack.Screen name="Signup" component={SignupScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default AuthStackNavigator