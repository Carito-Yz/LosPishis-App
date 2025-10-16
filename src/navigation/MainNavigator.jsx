import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./AuthStackNavigation";
import BottomTabsNavigator from "./BottomTabsNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import { useSelector, useDispatch } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useGetProfilePictureQuery } from "../store/services/profileApi";
import { setLocalId, setProfilePicture, setUserEmail } from "../store/slices/userSlice";
import { useEffect, useState } from "react";
import { initSessionsTable, getSession } from "../db";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator()

export default function MainNavigator() {

    const user = useSelector(state => state.userReducer.user)
    const localId = useSelector(state => state.userReducer.localId)
    const [checkingSession, setCheckingSession] = useState(true)

    const dispatch = useDispatch()

    const { data: profilePicture, isLoading, error } = useGetProfilePictureQuery(localId)

    useEffect(() => {
        if (profilePicture) {
            dispatch(setProfilePicture(profilePicture.image))
        }
    }, [profilePicture])

    useEffect(() => {
        const bootstrap = async () => {
            try {
                await initSessionsTable()
                const session = await getSession(localId)

                if (session) {
                    dispatch(setUserEmail(session.email))
                    dispatch(setLocalId(session.localId))
                }
            } catch (error) {
                Popup.show({
                    iconEnabled: false,
                    textBody: "Ha ocurrido un error, vuelva a intentarlo",
                    buttonText: 'Cerrar',
                    callback: () => {
                        Popup.hide();
                    }
                })
            } finally {
                setCheckingSession(false)
            }
        }

        bootstrap()
    }, [])


    if (checkingSession) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="BottomTabs" component={BottomTabsNavigator} />
                    <Stack.Screen name="ProfileStack" component={ProfileStackNavigator} />
                </Stack.Navigator>
            ) : (
                <AuthStackNavigator />
            )}
        </NavigationContainer>

    )
}