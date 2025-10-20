import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Switch } from 'react-native'
import { useSignUpMutation } from '../../store/services/AuthApi'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserEmail } from '../../store/slices/userSlice'
import * as Yup from "yup";
import { clearSession, saveSession } from '../../db'
import { setLocalId } from '../../store/slices/userSlice'
import { Popup } from '@sekizlipenguen/react-native-popup-confirm-toast'
import { colors } from '../../theme/colors';

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
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Registrar</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Email"
                    style={styles.textInput}
                />
                {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholder='Contraseña'
                    style={styles.textInput}
                    secureTextEntry
                />
                {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholder='Confirmar Contraseña'
                    style={styles.textInput}
                    secureTextEntry
                />
                {errors.confirmPassword ? <Text style={styles.error}>{errors.confirmPassword}</Text> : null}

                <View style={styles.persistContainer}>
                    <Text style={styles.persistText}>Recordar Sesión</Text>
                    <Switch
                        onValueChange={() => setPersistSession(!persistSession)}
                        value={persistSession}
                        trackColor={{ false: colors.grisClaro, true: colors.bordo }}
                        thumbColor={colors.white} />
                </View>

                <View style={styles.buttonContainer}>
                    <Pressable style={styles.btn} onPress={onSubmit}><Text style={styles.btnText}>REGISTRAR</Text></Pressable>
                </View>
            </View>

            <View style={styles.footTextContainer}>
                <Text style={styles.footText}>¿Ya tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={styles.footPressableText}>
                        Ingresar
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export default SignupSreen

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
        alignItems: "center",
        backgroundColor: colors.black
    },
    btnText: {
        fontSize: 20,
        color: "white",
        fontFamily: "Product-Sans-Regular",
    },
    error: {
        paddingStart: 16,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 8,
        color: colors.bordo
    }
})