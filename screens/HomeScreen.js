import React, { useEffect } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useStoreon } from 'storeon/react'
import Loader from '../components/Loader'
import { elevationShadowStyle } from '../lib/styles'

const Item = ({ title, author, description, onPress }) => (
  <View style={[styles.item, styles.shadow]}>
    <TouchableOpacity onPress={onPress}>
      <View><Text style={styles.title}>{title}</Text></View>
      {author && <View><Text style={styles.author}>{author}</Text></View>}
      {description && <View><Text style={styles.description}>{description}</Text></View>}
    </TouchableOpacity>
  </View>
)

export default function App({ navigation }) {
  const { dispatch, turnips } = useStoreon('turnips')

  useEffect(() => {
    dispatch('turnips/fetchAll')
  }, [])

  const renderItem = ({ item }) => <Item {...item}
                                         onPress={() => navigation.navigate('TurnipScreen', item)} />

  if (!turnips) return <Loader />
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={turnips} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  description: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666'
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666'
  },
})
