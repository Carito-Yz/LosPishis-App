import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import FlatCard from '../../components/FlatCard'
import { useEffect, useState } from 'react'
import Search from "../../components/Search"
import { useSelector, useDispatch } from 'react-redux'
import { selectProduct } from '../../store/slices/shopSlice'

const ProductsScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const [filteredProducts, setFilteredProducts] = useState([])
    const [filterKeyWord, setFilterKeyWord] = useState("")

    const subCategory = useSelector(state => state.shopReducer.subCategorySelected)
    const productsByCategory = useSelector(state => state.shopReducer.productsFilteredByCategory);
    const productsBySubCategory = useSelector(state => state.shopReducer.productsFilteredBySubCategory);

    const productsToShow = subCategory.toLowerCase() === "todo"
        ? productsByCategory
        : productsBySubCategory;


    useEffect(() => {
        let productsFilteredByKeyWord = productsToShow;
        if (filterKeyWord) {
            productsFilteredByKeyWord = productsToShow.filter(item =>
                item.name.toLowerCase().includes(filterKeyWord.toLowerCase())
            );
        }
        setFilteredProducts(productsFilteredByKeyWord);
    }, [productsToShow, filterKeyWord]);

    const handleSelectProduct = (item) => {
        dispatch(selectProduct(item))
        navigation.navigate("Producto")
    }

    const renderProductItem = ({ item }) => (
        <Pressable onPress={() => handleSelectProduct(item)}>
            {console.log(productsToShow)}
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