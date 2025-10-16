import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { colors } from '../../theme/colors'
import FlatCard from '../../components/FlatCard'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, clearCart, changeQuantity } from '../../store/slices/cartSlice'
import Feather from '@expo/vector-icons/Feather';
import { Popup } from '@sekizlipenguen/react-native-popup-confirm-toast';

const CartScreen = ({ navigation }) => {

    const cartItems = useSelector(state => state.cartReducer.cartItems);
    const total = useSelector(state => state.cartReducer.total);
    const dispatch = useDispatch();

    const shippingCost = total > 30000 ? 0 : 0.10;
    const subtotal = total;
    const finalTotal = subtotal + subtotal * shippingCost;

    const formatCurrency = (number) => {
        if (typeof number !== 'number' || isNaN(number)) return '0,00';
        return new Intl.NumberFormat('es-AR', {
            minimumFractionDigits: 2,
        }).format(number);
    };

    const QuantitySelector = ({ item }) => (
        <View style={styles.quantityContainer}>
            <Pressable style={styles.quantityButton} onPress={() => { dispatch(changeQuantity({ id: item.id, quantity: -1 })) }}>
                <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>
            <Text style={styles.quantityText}>
                {item.quantity}
            </Text>
            <Pressable style={styles.quantityButton} onPress={() => { dispatch(changeQuantity({ id: item.id, quantity: 1 })) }}>
                <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
        </View>
    );

    const calculateSubtotal = () => {
        return cartItems.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
    };

    const confirmarCompra = () => {
        Popup.show({
            type: 'success',
            title: 'Confirmado!',
            textBody: 'Gracias por tu compra!! ',
            buttonText: 'Volver al Inicio',
            callback: () => {
                Popup.hide();
                navigation.navigate("Shop", { screen: "Categories" })
                dispatch(clearCart())
            },
        })
    }

    const FooterComponent = () => {
        return (
            <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>${formatCurrency(calculateSubtotal(cartItems))}</Text>
                </View>

                <View style={styles.totalSeparator} />

                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Envío</Text>
                    <Text style={shippingCost === 0 ? styles.summaryValueFree : styles.summaryValue}>
                        {shippingCost === 0 ? "Gratis" : `$${formatCurrency(subtotal * shippingCost)}`}
                    </Text>
                </View>

                <View style={styles.totalSeparator} />

                <View style={styles.summaryRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>${formatCurrency(finalTotal)}</Text>
                </View>

                <Pressable style={styles.confirmButton} onPress={() => confirmarCompra()}>
                    <Text style={styles.confirmButtonText}>Confirmar</Text>
                </Pressable>

                <Pressable style={styles.clearCartButton} onPress={() => dispatch(clearCart())}>
                    <Feather name="trash-2" size={24} color={colors.bordo} />
                    <Text style={styles.clearCartText}>Vaciar Carrito</Text>
                </Pressable>
            </View>
        );
    };

    const renderCartItem = ({ item }) => {
        const imageUri = item.image;

        return (
            <FlatCard style={styles.cartContainer}>
                <View style={styles.imagePlaceholder}>
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.cartImage}
                        resizeMode='contain'
                    />
                </View>

                <View style={styles.cartDetails}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.itemPrice}>${formatCurrency(item.price)}</Text>
                    <Text style={styles.description}>
                        <Text>{item.shortDescription}</Text>
                    </Text>
                </View>

                <View style={styles.cartActions}>
                    <Pressable onPress={() => dispatch(removeItem(item.id))}>
                        <Feather name="trash-2" size={24} color={colors.bordo} />
                    </Pressable>

                    <QuantitySelector item={item} />
                </View>
            </FlatCard>
        )
    }

    return (
        <View style={styles.screen}>
            {cartItems.length > 0 ? (
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderCartItem}
                    ListFooterComponent={FooterComponent}
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>Aún no hay productos en el carrito</Text>
                </View>
            )}
        </View>
    )
}

export default CartScreen


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.white
    },
    listContent: {
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 18,
        fontFamily: 'Product-Sans-Regular',
        color: colors.gray || '#808080',
    },
    cartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 5,
        backgroundColor: colors.white,
        borderRadius: 0,
        elevation: 3,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    imagePlaceholder: {
        width: 90,
        height: 90,
        backgroundColor: colors.white,
        borderRadius: 8,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    cartDetails: {
        flex: 1,
        paddingRight: 10,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Product-Sans-Bold',
        color: colors.black,
    },
    itemPrice: {
        fontSize: 14,
        fontFamily: 'Product-Sans-Bold',
        color: colors.bordo,
        marginTop: 4,
    },
    description: {
        fontSize: 12,
        fontFamily: 'Product-Sans-Regular',
        color: colors.grisMedio,
        marginTop: 2,
    },
    cartActions: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '100%',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.grisMedio,
        borderRadius: 20,
        height: 28,
        overflow: 'hidden',
    },
    quantityButton: {
        paddingHorizontal: 8,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    quantityButtonText: {
        fontSize: 16,
        fontFamily: 'Product-Sans-Bold',
        color: colors.black,
    },
    quantityText: {
        paddingHorizontal: 12,
        fontSize: 14,
        color: colors.black,
        fontFamily: 'Product-Sans-Bold',
    },
    summaryContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
        backgroundColor: colors.white,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    summaryLabel: {
        fontSize: 16,
        fontFamily: 'Product-Sans-Regular',
        color: colors.grisMedio,
    },
    summaryValue: {
        fontSize: 16,
        fontFamily: 'Product-Sans-Bold',
        color: colors.black,
    },
    summaryValueFree: {
        fontSize: 16,
        fontFamily: 'Product-Sans-Bold',
        color: colors.bordo,
    },
    totalSeparator: {
        height: 1,
        backgroundColor: colors.grisClaro,
        marginVertical: 10,
    },
    totalLabel: {
        fontSize: 20,
        fontFamily: 'Product-Sans-Bold',
        color: colors.black,
    },
    totalValue: {
        fontSize: 20,
        fontFamily: 'Product-Sans-Bold',
        color: colors.bordo,
    },
    confirmButton: {
        paddingVertical: 15,
        backgroundColor: colors.grisOscuro,
        borderRadius: 12,
        marginTop: 20,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: colors.white,
        fontSize: 18,
        fontFamily: 'Product-Sans-Bold',
    },
    clearCartButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    clearCartText: {
        marginLeft: 5,
        color: colors.bordo,
        fontSize: 14,
        fontFamily: 'Product-Sans-Bold',
    },
});