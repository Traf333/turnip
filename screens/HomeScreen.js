import React, { useEffect } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native'
import { useStoreon } from 'storeon/react'
import { fetchTurnips } from '../lib/api'
import Loader from '../components/Loader'

const Item = ({ title, onPress }) => (
  <View style={[styles.item, styles.shadow]}>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  </View>
)

export default function App({ navigation }) {
  const { dispatch, turnips } = useStoreon('turnips')

  useEffect(() => {
    dispatch('turnips/fetchAll')
  }, [])

  const renderItem = ({ item }) => <Item title={item.title}
                                         onPress={() => navigation.navigate('TurnipScreen', item)} />

  if (!turnips) return <Loader />
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={turnips} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
    </SafeAreaView>
  )
}

function elevationShadowStyle(elevation) {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  shadow: elevationShadowStyle(5),
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
  },
})
