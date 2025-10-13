import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoriesScreen, ProductsScreen, ProductScreen } from "../screens"
import Header from "../components/Header";

const Stack = createNativeStackNavigator()

const ShopStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Categorias"
            screenOptions={{
                header: ({ navigation, route }) => <Header navigation={navigation} route={route} title={"Explorar"} />
            }}
        >
            <Stack.Screen name="Categorias" component={CategoriesScreen}></Stack.Screen>
            <Stack.Screen name="Productos" component={ProductsScreen}></Stack.Screen>
            <Stack.Screen name="Producto" component={ProductScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default ShopStackNavigator