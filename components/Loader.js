import React from 'react'

import { StyleSheet, Text, View } from 'react-native'

const Loader = () => (
  <View style={styles.container}>
    <Text style={styles.text}>LOADING...</Text>
  </View>
)

export default Loader


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
})
