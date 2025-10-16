import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import FlatCard from '../../components/FlatCard'
import { colorsCategories, colors, subColorsCategories } from '../../theme/colors'
import { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { selectCategory, selectSubCategory } from "../../store/slices/shopSlice.js"
import { useGetCategoriesQuery } from "../../store/services/shopApi.js"

const CategoriesScreen = ({ navigation }) => {

  const [categorySelectedToggle, setCategorySelectedToggle] = useState(null)

  const { data: categories } = useGetCategoriesQuery()

  const dispatch = useDispatch()

  const handleCategorySelectedToggle = (selectedCategory) => {
    setCategorySelectedToggle(prev => prev === selectedCategory ? null : selectedCategory)
  }

  const handleSelectSubCategory = (category, subCategory) => {
    dispatch(selectCategory(category))
    dispatch(selectSubCategory(subCategory))
    navigation.navigate("Productos")
  }

  const RenderCategoryItem = ({ item, index }) => (
    <>
      <Pressable onPress={() => handleCategorySelectedToggle(item.id)}>
        <FlatCard color={colorsCategories[index % colorsCategories.length]}>
          <Text style={styles.title}>{item.title}</Text>

          <View style={[styles.categoriesDecoration,
          { backgroundColor: subColorsCategories[index % subColorsCategories.length] }, { opacity: 0.4 }]}>
          </View>

          <View style={[styles.categoriesSubDecoration,
          { backgroundColor: subColorsCategories[index % subColorsCategories.length] }, { opacity: 0.17 }]}>
          </View>

          <Image style={styles.categoriesImage} source={{ uri: item.image }}></Image>

        </FlatCard>
      </Pressable>

      {categorySelectedToggle === item.id && (
        <View style={styles.subCategoryContainer}>
          <View style={styles.subCategorySubContainer}>
            {item.subCategories.map((subCategory, index) => (
              <Pressable onPress={() => handleSelectSubCategory(item.title, subCategory)} style={styles.subCategory} key={index}>
                <Text style={styles.subCategoryTitle}>{subCategory}</Text>
                <Feather name="chevron-right" size={24} color="black" />
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </>
  );

  return (
    <View style={styles.categories}>
      <FlatList
        data={categories}
        renderItem={RenderCategoryItem}
        keyExtractor={item => item.id}
        style={styles.container}
      />
    </View>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
  container: {
    marginBottom: 30
  },
  categories: {
    flex: 1
  },
  title: {
    color: colors.white,
    fontFamily: "Product-Sans-Regular",
    marginLeft: 40,
    fontSize: 25
  },
  categoriesDecoration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    position: "absolute",
    right: 20
  },
  categoriesSubDecoration: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    position: "absolute",
    right: 44
  },
  categoriesImage: {
    position: "absolute",
    right: 20,
    bottom: 5,
    width: 120,
    height: 120,
  },
  subCategoryContainer: {
    alignItems: "center"
  },
  subCategorySubContainer: {
    width: "80%",
  },
  subCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: colors.grisClaro,
    borderBottomWidth: 1,
    height: 60,
  },
  subCategoryTitle: {
    fontFamily: "Product-Sans-Italic",
    fontSize: 15
  }
})