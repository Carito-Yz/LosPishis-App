import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native'

const Search = ({ setFilterKeyWord, keyWord }) => {
    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={(text) => setFilterKeyWord(text)}
                placeholder='Buscar Producto'
                style={styles.searchBar}
                value={keyWord}
            />
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    searchBar: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 16,
        width: "90%",
        padding: 16
    },
    container: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 5
    }
})