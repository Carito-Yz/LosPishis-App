import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native'
import FlatCard from '../../components/FlatCard'
import { useEffect, useState } from 'react'
import Search from "../../components/Search"
import { useSelector, useDispatch } from 'react-redux'
import { selectProduct } from '../../store/slices/shopSlice'
import { useGetProductsByCategoryQuery } from '../../store/services/shopApi'
import { ActivityIndicator } from 'react-native'
import { colors } from '../../theme/colors'


const ProductsScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const [filteredProducts, setFilteredProducts] = useState([])
    const [filterKeyWord, setFilterKeyWord] = useState("")
    const [allImagesLoaded, setAllImagesLoaded] = useState([])

    const category = useSelector(state => state.shopReducer.categorySelected)
    const subCategory = useSelector(state => state.shopReducer.subCategorySelected)


    const { data: productsByCategory, isLoading } = useGetProductsByCategoryQuery(category)

    useEffect(() => {
        if (!productsByCategory) {
            setFilteredProducts([]);
            return;
        }
        let filtered = productsByCategory;

        if (subCategory.toLowerCase() !== "todo") {
            filtered = filtered.filter(item => item.subCategory.toLowerCase() === subCategory.toLowerCase());
        }

        if (filterKeyWord) {
            filtered = filtered.filter(item => item.name.toLowerCase().includes(filterKeyWord.toLowerCase()));
        }

        setFilteredProducts(filtered);
    }, [productsByCategory, subCategory, filterKeyWord])

    //Manejo de imagenes traidas de internet
    useEffect(() => {
        if (filteredProducts.length > 0) {
            Promise.all(
                filteredProducts.map(item =>
                    Image.prefetch(item.image) //Precargo imagenes
                )
            ).then(() => {
                setAllImagesLoaded(true); //Una vez cargadas paso a mostrar todos los productos
            });
        }
    }, [filteredProducts]);

    //Si mis imagenes no estan cargadas muestro activity indicator
    if (!allImagesLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
                <Text>Cargando productos...</Text>
            </View>
        );
    }

    const handleSelectProduct = (item) => {
        dispatch(selectProduct(item))
        navigation.navigate("Producto")
    }

    //Formateo para agregar punto en unidades y coma en decimales
    const formatCurrency = (number) => {
        return new Intl.NumberFormat('es-AR', {
            minimumFractionDigits: 2,
        }).format(number);
    };

    const renderProductItem = ({ item }) => (
        <Pressable onPress={() => handleSelectProduct(item)} style={styles.productCardPressable}>
            <FlatCard style={styles.productCard}>
                <View style={styles.imageWrapper}>
                    <View style={styles.imagePlaceholderContainer}>
                        <Image style={styles.image} source={{ uri: item.image }} />
                    </View>
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{item.name}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${formatCurrency(item.price)}</Text>
                    </View>
                </View>
            </FlatCard >
        </Pressable>
    )

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Search setFilterKeyWord={setFilterKeyWord} keyWord={filterKeyWord} />
            <FlatList
                data={filteredProducts}
                renderItem={renderProductItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    )
}

export default ProductsScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.white,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    flatListContent: {
        paddingHorizontal: 8,
        paddingBottom: 16,
        paddingTop: 10
    },
    row: {
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    productCardPressable: {
        width: '45%'
    },
    productCard: {
        margin: 0,
        flexDirection: "column",
        justifyContent: 'space-evenly',
        backgroundColor: colors.white,
        borderRadius: 12,
        overflow: 'hidden',
        height: 300,
        alignItems: "center",
        elevation: 0,
        borderRadius: 0,
        elevation: 2,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3
    },
    imagePlaceholderContainer: {
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageWrapper: {
        width: '100%',
        aspectRatio: 1,
        padding: 20,
        height: '70%'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    detailsContainer: {
        justifyContent: 'flex-start',
        width: '95%',
        height: '20%',
        paddingStart: 10
    },
    title: {
        fontSize: 16,
        color: colors.black,
        marginBottom: 4,
        fontFamily: "Product-Sans-Regular"
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    price: {
        fontSize: 15,
        fontFamily: "Product-Sans-Bold",
        color: colors.bordo,
        marginRight: 8,
    }
});