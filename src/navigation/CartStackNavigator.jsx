import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartScreen } from "../screens"
import Header from "../components/Header";

const Stack = createNativeStackNavigator()

const CartStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Carrito"
            screenOptions={{
                header: ({ navigation, route }) => <Header navigation={navigation} route={route} title={"Carrito"} />
            }}
        >
            <Stack.Screen name="Carrito" component={CartScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default CartStackNavigator