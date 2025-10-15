import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./AuthStackNavigation";
import BottomTabsNavigator from "./BottomTabsNavigator";
import { useSelector } from "react-redux";

export default function MainNavigator() {

    const user = useSelector(state => state.userReducer.user)

    return (
        <NavigationContainer>
            {
                user ? <BottomTabsNavigator /> : <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}