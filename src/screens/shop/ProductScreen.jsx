import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

const ProductScreen = () => {

    const product = useSelector(state => state.shopReducer.productSelected)

    return (
        <View>
            <Text>{product.name}</Text>
        </View>
    )
}

export default ProductScreen

const styles = StyleSheet.create({})