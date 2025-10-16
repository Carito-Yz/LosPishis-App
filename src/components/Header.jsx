import { Pressable, StyleSheet, Text, View } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import { colors } from '../theme/colors';
import { useSelector } from 'react-redux';

const Header = ({ navigation, route }) => {

  const categorySelected = useSelector(state => state.shopReducer.categorySelected);
  const subCategorySelected = useSelector(state => state.shopReducer.subCategorySelected);

  const getTitle = () => {
    if (route.name === "Categorias") {
      return <Text style={styles.title}>Los Pishis</Text>;
    }

    if (route.name === "Productos") {
      return (
        <>
          <Text style={styles.title}>{categorySelected}</Text>
          <Text style={styles.subTitle}>{subCategorySelected}</Text>
        </>
      );
    }

    if (route.name === "Producto") {
      return <Text style={styles.title}>Detalle</Text>;
    }

    if (route.name === "Carrito") {
      return <Text style={styles.title}>Carrito</Text>;
    }

    if (route.name === "Perfil") {
      return <Text style={styles.title}>Perfil</Text>;
    }

    return null;
  };



  return (
    <View style={styles.container}>
      {
        navigation.canGoBack()
          ?
          <Pressable style={styles.menu} onPress={() => navigation.goBack()}>
            <Feather name={"arrow-left"} size={26} color="black" />
          </Pressable>
          :
          null
      }

      <View style={styles.titleContainer}>{getTitle()}</View>
      {
        route.name === "Perfil"
          ?
          null
          :
          <Pressable style={styles.cart} onPress={() => navigation.navigate("ProfileStack", { screen: "Perfil" })}><Feather name="user" size={26} color="black" /></Pressable>
      }
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    height: 120,
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
    fontFamily: "Juice-ITC-Regular",
    textAlign: "center"
  },
  menu: {
    width: '20%',
  },
  cart: {
    width: '20%',
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  subTitle: {
    fontFamily: "Product-Sans-Italic",
    fontSize: 16,
    textAlign: "center"
  }
})