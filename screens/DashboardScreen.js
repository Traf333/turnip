import React, { useEffect, useState } from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { Layout, List, ListItem, Divider, Text } from '@ui-kitten/components'
import { fetchTurnips } from '../lib/fsapi'

export default function Dashboard({ navigation }) {
  const [turnips, setTurnips] = useState()

  useEffect(() => {
    fetchTurnips().then(d => setTurnips(d))
  }, [])

  const renderItem = ({ item, _index }) => (
    <ListItem onPress={() => navigation.navigate('Turnip', item)}>
      <Text style={styles.itemText}>{item.name}</Text>
    </ListItem>
  )

  return (
    <Layout style={styles.container}>
      <List
        contentContainerStyle={styles.contentContainer}
        data={turnips}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  itemText: {
    fontSize: 20,
    padding: 10,
  },
})

