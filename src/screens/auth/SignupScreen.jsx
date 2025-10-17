import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Switch } from 'react-native'
import { useSignUpMutation } from '../../store/services/AuthApi'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserEmail } from '../../store/slices/userSlice'
import * as Yup from "yup";
import { clearSession, saveSession } from '../../db'
import { setLocalId } from '../../store/slices/userSlice'
import { Popup } from '@sekizlipenguen/react-native-popup-confirm-toast'

const textInputWidth = Dimensions.get('window').width * 0.7

const SignupSreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [persistSession, setPersistSession] = useState(false)

    const signupSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email inválido")
            .required("El email es obligatorio"),

        password: Yup.string()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .required("La contraseña es obligatoria"),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
            .required("Por favor, confirma tu contraseña"),
    });

    const [triggerSignUp, result] = useSignUpMutation()

    const onSubmit = async () => {
        try {
            await signupSchema.validate(
                { email, password, confirmPassword },
                { abortEarly: false }
            );

            setErrors({});
            triggerSignUp({ email, password });

        } catch (validationError) {
            const formattedErrors = {};
            validationError.inner.forEach(err => {
                formattedErrors[err.path] = err.message;
            });
            setErrors(formattedErrors);
        }
    };


    const dispatch = useDispatch()

    useEffect(() => {
        const saveSignupSession = async () => {
            if (result.status === "fulfilled") {
                try {
                    const { localId, email } = result.data;
                    if (persistSession) {
                        await saveSession(localId, email);
                    } else {
                        await clearSession();
                    }

                    dispatch(setUserEmail(email));
                    dispatch(setLocalId(localId));
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

        saveSignupSession();
    }, [result]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Los Pishis</Text>
            <Text style={styles.subTitle}>Registrarse</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Email"
                    style={styles.textInput}
                />
                {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
                {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholder='Confirm Password'
                    style={styles.textInput}
                    secureTextEntry
                />
                {errors.confirmPassword ? <Text style={styles.error}>{errors.confirmPassword}</Text> : null}
            </View>

            <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
            <Pressable onPress={() => navigation.navigate('Signup')}>
                <Text style={
                    {
                        ...styles.whiteText,
                        ...styles.underLineText
                    }
                }>
                    Ingresa
                </Text>
            </Pressable>

            <Switch
                onValueChange={() => setPersistSession(!persistSession)}
                value={persistSession}
                trackColor={{ false: '#767577', true: '#81b0ff' }} />

            <Pressable style={styles.btn} onPress={onSubmit}>
                <Text style={styles.btnText}>Registrarse</Text>
            </Pressable>
        </View>
    )
}

export default SignupSreen

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