import { Pressable, StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Feather from '@expo/vector-icons/Feather';
import { colors } from '../../theme/colors';
import { addItem } from '../../store/slices/cartSlice'
import { Popup } from '@sekizlipenguen/react-native-popup-confirm-toast';

const { width } = Dimensions.get('window');

const ProductScreen = () => {

    const product = useSelector(state => state.shopReducer.productSelected)

    const dispatch = useDispatch()

    //Formateo para agregar punto en unidades y coma en decimales
    const formatCurrency = (number) => {
        return new Intl.NumberFormat('es-AR', {
            minimumFractionDigits: 2,
        }).format(number);
    };


    const alertReadMore = (longDescription) => {
        Popup.show({
            iconEnabled: false,
            textBody: longDescription,
            buttonText: 'Cerrar',
            callback: () => {
                Popup.hide();
            }
        })
    }

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.imageHeaderContainer}>
                    <Image
                        style={styles.productImage}
                        source={{ uri: product.image }}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.detailsContainer}>

                    <View style={styles.headerRow}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}>$ {formatCurrency(product.price)}</Text>
                    </View>

                    <View style={styles.tagContainer}>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Categoría: {product.category}</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Subcategoría: {product.subCategory}</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Stock: {product.stock > 0 ? product.stock : "Agotado"}</Text>
                        </View>
                    </View>

                    <View style={styles.sectionSeparator} />
                    <Text style={styles.sectionTitle}>Descripción</Text>
                    <Text style={styles.descriptionText} numberOfLines={4}>
                        {product.longDescription}
                    </Text>
                    <Pressable onPress={() => alertReadMore(product.longDescription)}>
                        <Text style={styles.readMoreText}>Read more</Text>
                    </Pressable>
                </View>
            </ScrollView>

            <Pressable style={styles.addToCartButton} onPress={() => dispatch(addItem({ product: product, quantity: 1 }))}>
                <Feather name="shopping-bag" size={24} color={colors.white} style={{ marginRight: 10 }} />
                <Text style={styles.addToCartText}>Agregar al Carrito</Text>
            </Pressable>
        </View>
    );
}

export default ProductScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.white
    },
    scrollContent: {
        paddingBottom: 100
    },
    imageHeaderContainer: {
        width: width,
        height: width * 1.2,
        backgroundColor: colors.white,
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    detailsContainer: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 20,
        paddingTop: 20,
        marginTop: -20,
        minHeight: 'auto'
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Product-Sans-Regular',
        color: colors.black,
        flex: 1,
    },
    productPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Product-Sans-Regular',
        color: colors.bordo,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
        marginTop: 10,
    },
    tag: {
        backgroundColor: colors.grisClaro,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: {
        fontSize: 14,
        color: colors.black,
        fontFamily: 'Product-Sans-Regular',
    },
    sectionSeparator: {
        height: 1,
        backgroundColor: colors.grisClaro,
        marginVertical: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Product-Sans-Regular',
        color: colors.black,
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 16,
        fontFamily: 'Product-Sans-Regular',
        color: colors.grisMedio,
        lineHeight: 24,
    },
    readMoreText: {
        fontSize: 16,
        color: colors.bordo,
        fontWeight: 'bold',
        fontFamily: 'Product-Sans-Regular',
        marginTop: 5,
    },
    addToCartButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.grisOscuro,
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    addToCartText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.white,
    }
});