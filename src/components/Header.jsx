import { Pressable, StyleSheet, Text, View } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import { colors } from '../theme/colors';

const Header = ({ navigation, route, title }) => {

  const RootScreens = ["Categorias", "Carrito"];

  const isRootScreen = RootScreens.includes(route.name);

  const handlePress = () => {
    if (!isRootScreen && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log("Abrir menú");
    }
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.menu} onPress={handlePress}><Feather name={isRootScreen ? "menu" : "arrow-left"} size={26} color="black" /></Pressable>
      <View style={styles.titleContainer}><Text style={styles.title}>{title}</Text></View>
      <Pressable style={styles.cart}><Feather name="user" size={26} color="black" /></Pressable>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 30
  },
  titleContainer: {
    justifyContent: "center"
  },
  title: {
    fontSize: 35,
    fontFamily: "Juice-ITC-Regular"
  },
  menu: {
    width: '20%',
  },
  cart: {
    width: '20%',
    flexDirection: "row",
    justifyContent: "flex-end"
  }
})