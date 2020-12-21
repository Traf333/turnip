import React, { useState, useEffect } from 'react'
import { FlatList, SafeAreaView, Vibration, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const fetchPlay = async (id) => {
  const res = await fetch(`https://turnipapp-api.herokuapp.com/play/${id}.json`)
  return res.json()
}

const Item = ({ id, text, onPress }) => (
  <View style={styles.item}>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  </View>
)

const TurnipScreen = ({ route }) => {

  const [play, setPlay] = useState()

  useEffect(() => {
    fetchPlay(route.params.id).then(data => setPlay(data))
  }, [])

  const handlePress = (item) => {
    console.log(item)
    Vibration.vibrate(60)
  }
  const renderItem = ({ item }) => <Item text={item.text} onPress={() => handlePress(item)} />

  if (!play) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>

      <FlatList data={play.speeches} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
    </SafeAreaView>
  )
}

export default TurnipScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 5,
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
  },
})
