import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { useLogInMutation } from '../../store/services/AuthApi'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserEmail } from '../../store/slices/userSlice'

const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [triggerLogin, result] = useLogInMutation()

    const onSubmit = () => {
        triggerLogin({ email, password })
    }

    const dispatch = useDispatch()

    useEffect(() => {
        if (result.status === "fulfilled") {
            dispatch(setUserEmail(email))
        }
    }, [result])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Los Pishis</Text>
            <Text style={styles.subTitle}>Inicia sesión</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Email"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Crea una
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onSubmit}><Text style={styles.btnText}>Iniciar sesión</Text></Pressable>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: "PressStart2P",
        fontSize: 24
    },
    subTitle: {
        fontFamily: "Montserrat",
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 3
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        width: textInputWidth,
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        borderRadius: 16,
        marginTop: 32
    },
    btnText: {
        fontSize: 16,
        fontWeight: '700'
    },
    error: {
        padding: 16,
        borderRadius: 8,
    }
})