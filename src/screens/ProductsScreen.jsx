import { StyleSheet, Text, View, FlatList } from 'react-native'
import products from "../data/products.json"
import FlatCard from '../components/FlatCard'
import { useEffect, useState } from 'react'

const ProductsScreen = ({ category, subCategory }) => {

    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        const filteredByCategory = products.filter(item => item.category.toLowerCase() === category.toLowerCase())

        if (subCategory.toLowerCase() === "todo") {
            setFilteredProducts(filteredByCategory)
        }
        else {
            const filteredBySubCategory = filteredByCategory.filter(item => item.subCategory.toLowerCase() === subCategory.toLowerCase())

            setFilteredProducts(filteredBySubCategory)
        }
    }, [category, subCategory])

    const renderProductItem = ({ item }) => (
        < FlatCard >
            <Text style={styles.text}>{item.name}</Text>
        </FlatCard >
    )

    return (
        <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}>
        </FlatList>
    )
}

export default ProductsScreen

const styles = StyleSheet.create({
    text: {
        color: "black"
    }
})