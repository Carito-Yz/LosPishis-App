import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import FlatCard from '../../components/FlatCard'
import { useEffect, useState } from 'react'
import Search from "../../components/Search"
import { useSelector, useDispatch } from 'react-redux'
import { selectProduct } from '../../store/slices/shopSlice'
import { useGetProductsByCategoryQuery } from '../../store/services/shopApi'
import { ActivityIndicator } from 'react-native'


const ProductsScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const [filteredProducts, setFilteredProducts] = useState([])
    const [filterKeyWord, setFilterKeyWord] = useState("")

    const category = useSelector(state => state.shopReducer.categorySelected)
    const subCategory = useSelector(state => state.shopReducer.subCategorySelected)


    const { data: productsByCategory, isLoading, error } = useGetProductsByCategoryQuery(category)

    useEffect(() => {
        let filtered = productsByCategory;

        if (subCategory.toLowerCase() !== "todo") {
            filtered = filtered.filter(item => item.subCategory.toLowerCase() === subCategory.toLowerCase());
        }

        if (filterKeyWord) {
            filtered = filtered.filter(item => item.name.toLowerCase().includes(filterKeyWord.toLowerCase()));
        }

        setFilteredProducts(filtered);
    }, [productsByCategory, subCategory, filterKeyWord])

    const handleSelectProduct = (item) => {
        dispatch(selectProduct(item))
        navigation.navigate("Producto")
    }

    const renderProductItem = ({ item }) => (
        <Pressable onPress={() => handleSelectProduct(item)}>
            < FlatCard >
                <Text style={styles.text}>{item.name}</Text>
            </FlatCard >
        </Pressable>
    )

    return (
        <>
            <Search setFilterKeyWord={setFilterKeyWord} keyWord={filterKeyWord} />
            {isLoading && <ActivityIndicator />}
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