import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartStackNavigator from "./CartStackNavigator";
import ShopStackNavigator from "./ShopStackNavigator"
import Feather from '@expo/vector-icons/Feather';
import { StyleSheet } from "react-native";

import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator()

const BottomTabsNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: styles.tabBar }}>
            <Tab.Screen name="Shop" component={ShopStackNavigator} options={{
                tabBarIcon: ({ focused }) => (<Feather name="search" size={24} color={focused ? colors.bordo : colors.grisMedio} />),
            }}
            />
            <Tab.Screen name="Cart" component={CartStackNavigator} options={{
                tabBarIcon: ({ focused }) => (<Feather name="shopping-cart" size={24} color={focused ? colors.bordo : colors.grisMedio} />),
            }}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default BottomTabsNavigator

const styles = StyleSheet.create({
    tabBar: {
        height: 60
    }
})