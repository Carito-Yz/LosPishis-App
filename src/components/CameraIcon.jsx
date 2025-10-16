import { StyleSheet, Text, View } from 'react-native'
import Feather from '@expo/vector-icons/Feather';

const CameraIcon = () => {
    return (
        <View style={styles.iconContainer}>
            <Feather name="camera" size={26} color="black" />
        </View>
    )
}

export default CameraIcon

const styles = StyleSheet.create({})