import { StyleSheet, Text, View, TextInput, Pressable, Switch } from 'react-native'
import { useLogInMutation } from '../../store/services/AuthApi'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserEmail, setLocalId } from '../../store/slices/userSlice'
import { saveSession, clearSession } from '../../db'
import { Popup } from '@sekizlipenguen/react-native-popup-confirm-toast'
import { colors } from '../../theme/colors';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [persistSession, setPersistSession] = useState(false)

    const [triggerLogin, result] = useLogInMutation()

    const onSubmit = async () => {
        try {
            const result = await triggerLogin({ email, password }).unwrap();
        } catch (err) {
            Popup.show({
                iconEnabled: false,
                textBody: "Ha ocurrido un error, vuelva a intentarlo",
                buttonText: 'Cerrar',
                callback: () => {
                    Popup.hide();
                }
            })
        }
    };

    const dispatch = useDispatch()

    useEffect(() => {
        const saveLoginSession = async () => {
            if (result.status === "fulfilled") {
                try {

                    const { localId, email } = result.data

                    if (persistSession) {
                        await saveSession(localId, email)
                    } else {
                        await clearSession(localId)
                    }
                    dispatch(setUserEmail(email))
                    dispatch(setLocalId(localId))
                } catch (error) {
                    Popup.show({
                        iconEnabled: false,
                        textBody: "Ha ocurrido un error, vuelva a intentarlo",
                        buttonText: 'Cerrar',
                        callback: () => {
                            Popup.hide();
                        }
                    })
                }
            }
        }
        saveLoginSession()
    }, [result])

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Ingresar</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Email"
                    style={styles.textInput}
                />

                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholder='Contraseña'
                    style={styles.textInput}
                    secureTextEntry
                />

                <View style={styles.persistContainer}>
                    <Text style={styles.persistText}>Recordar Sesión</Text>
                    <Switch
                        onValueChange={() => setPersistSession(!persistSession)}
                        value={persistSession}
                        trackColor={{ false: colors.grisClaro, true: colors.bordo }}
                        thumbColor={colors.white} />
                </View>

                <View style={styles.buttonContainer}>
                    <Pressable style={styles.btn} onPress={onSubmit}><Text style={styles.btnText}>INGRESAR</Text></Pressable>
                </View>
            </View>

            <View style={styles.footTextContainer}>
                <Text style={styles.footText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.footPressableText}>
                        Crea una
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    titleContainer: {
        height: "20%",
        justifyContent: "flex-end",
        width: "80%",
        alignItems: "flex-start",
        paddingLeft: 16
    },
    title: {
        fontFamily: "Product-Sans-Bold",
        fontSize: 40
    },
    formContainer: {
        height: "40%",
        width: "80%"
    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        width: "100%",
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        fontFamily: "Product-Sans-Regular",
        fontSize: 16
    },
    footTextContainer: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "center",
        height: "10%"
    },
    footText: {
        marginEnd: 10,
        fontFamily: "Product-Sans-Regular",
        fontSize: 16
    },
    footPressableText: {
        textDecorationLine: "underline",
        fontFamily: "Product-Sans-Regular",
        fontSize: 16
    },
    persistContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: 10
    },
    persistText: {
        marginEnd: 10,
        fontFamily: "Product-Sans-Regular",
        fontSize: 14
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 40,
    },
    btn: {
        backgroundColor: "black",
        height: 60,
        width: 150,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    btnText: {
        fontSize: 20,
        color: "white",
        fontFamily: "Product-Sans-Regular",
    }
})