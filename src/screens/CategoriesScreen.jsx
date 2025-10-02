import { StyleSheet, Text, View, FlatList } from 'react-native'
import categories from "../data/categories.json"
import FlatCard from '../components/FlatCard'

const CategoriesScreen = () => {

  const RenderCategoryItem = ({item}) => (
    <FlatCard>
      <Text>{item.title}</Text>
    </FlatCard>
  )

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={RenderCategoryItem}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({})