import { StyleSheet, Text, View } from 'react-native'

const FlatCard = ({ children, color }) => {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      {children}
    </View>
  )
}

export default FlatCard

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    elevation: 10,
    height: 130,
    borderRadius: 25
  }
})