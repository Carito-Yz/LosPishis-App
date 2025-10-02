import { Pressable, StyleSheet, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../theme/colors';

const Header = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.menu}><AntDesign name="menu" size={24} color="black" /></Pressable>
      <View style={styles.titleContainer}><Text style={styles.title}>Los Pishis</Text></View>
      <Pressable style={styles.cart}><AntDesign name="shopping-cart" size={24} color="black" /></Pressable>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        height: 140,
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    titleContainer:{
      justifyContent: "center"
    },
    title:{
        fontSize: 35,
        fontFamily: "Juice-ITC-Regular"
    },
    menu:{
      width: '20%',
    },
    cart:{
      width: '20%',
      flexDirection: "row",
      justifyContent: "flex-end"
    }
})