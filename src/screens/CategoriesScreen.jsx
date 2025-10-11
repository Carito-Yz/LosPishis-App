import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import categories from "../data/categories.json"
import FlatCard from '../components/FlatCard'
import { colorsCategories, colors, subColorsCategories } from '../theme/colors'
import { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

const CategoriesScreen = ({ setCategorySelected, setSubCategorySelected }) => {

  const [categorySelectedToggle, setCategorySelectedToggle] = useState(null)


  const handleCategorySelectedToggle = (selectedCategory) => {
    setCategorySelectedToggle(prev => prev === selectedCategory ? null : selectedCategory)
  }

  const handleOnPressSubCategory = (category, subCategory) => {
    getSubCategory({
      category: category,
      subCategory: subCategory
    })
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
              <Pressable onPress={() => (setCategorySelected(item.title), setSubCategorySelected(subCategory))} style={styles.subCategory} key={index}>
                <Text style={styles.subCategoryTitle}>{subCategory}</Text>
                <AntDesign style={styles.subCategoryIcon} name="right" size={20} color="black" />
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
      />
    </View>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
  categories: {
    height: "90%"
  },
  title: {
    color: colors.white,
    fontFamily: "Product-Sans-Regular",
    marginLeft: 40,
    fontSize: 25
  },
  categoriesDecoration: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    right: 30
  },
  categoriesSubDecoration: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    position: "absolute",
    right: 48
  },
  categoriesImage: {
    position: "absolute",
    right: 20,
    bottom: 0,
    width: 110,
    height: 110,
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
  },
  subCategoryIcon: {

  }
})