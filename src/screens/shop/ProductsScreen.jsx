import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import products from "../../data/products.json"
import FlatCard from '../../components/FlatCard'
import { useEffect, useState } from 'react'
import Search from "../../components/Search"

const ProductsScreen = ({ route, navigation }) => {

    const [filteredProducts, setFilteredProducts] = useState([])
    const [filterKeyWord, setFilterKeyWord] = useState("")

    const { category, subCategory } = route.params

    useEffect(() => {
        let filteredByCategory = products.filter(item => item.category.toLowerCase() === category.toLowerCase())

        if (subCategory.toLowerCase() !== "todo") {
            filteredByCategory = filteredByCategory.filter(item => item.subCategory.toLowerCase() === subCategory.toLowerCase())
        }

        if (filterKeyWord) {
            filteredByCategory = filteredByCategory.filter(item =>
                item.name.toLowerCase().includes(filterKeyWord.toLowerCase())
            )
        }

        setFilteredProducts(filteredByCategory)
    }, [filterKeyWord])


    const renderProductItem = ({ item }) => (
        <Pressable onPress={() => navigation.navigate("Producto")}>
            < FlatCard >
                <Text style={styles.text}>{item.name}</Text>
            </FlatCard >
        </Pressable>
    )

    return (
        <>
            <Search setFilterKeyWord={setFilterKeyWord} keyWord={filterKeyWord} />
            <FlatList
                data={filteredProducts}
                renderItem={renderProductItem}
                keyExtractor={item => item.id}>
            </FlatList>
        </>
    )
}

export default ProductsScreen

const styles = StyleSheet.create({
    text: {
        color: "black"
    }
})