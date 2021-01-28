import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useStoreon } from 'storeon/react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native'
import TurnipItem from '../components/TurnipItem'
import Modal from '../components/Modal'
import Loader from '../components/Loader'
import { resetDatabase } from '../lib/database'

const TurnipScreen = ({ route, navigation }) => {
  const {
    dispatch,
    speeches,
    selectedSpeechId,
    selectedRole,
  } = useStoreon('speeches', 'selectedSpeechId', 'selectedRole')
  const { id } = route.params

  useEffect(() => {

    dispatch('speeches/fetchAll', id)
  }, [])

  const handleOnDelete = useCallback(() => {
    try {
      dispatch('speeches/remove')
    } catch (e) {
      console.log(e)
      console.log('something went wrong with deletion')
    }
  }, [])
  const handleEdit = () => {
    navigation.navigate('EditSpeechScreen', speeches.find(i => i._id === selectedSpeechId))
    dispatch('speeches/deselectSpeech')
  }
  const handleSync = async () => {
    dispatch('speeches/sync')
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableHighlight onPress={handleSync} underlayColor='#ddd' style={{ padding: 10 }}>
          <Ionicons name='sync-outline' size={26} />
        </TouchableHighlight>
      ),
    })
  }, [])


  const renderItem = ({ item }) => (
    <TurnipItem
      {...item}
      highlighted={!selectedRole || item.text.startsWith(selectedRole)}
      onSelectSpeech={() => dispatch('speeches/selectSpeech', item._id)}
    />
  )
  if (!speeches) return <Loader />
  const roles = ['ОН.', 'ОНА.']
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.selectorBar}>
        {roles.map(role => (
          <TouchableHighlight
            key={role}
            underlayColor='#ddd'
            style={[styles.selector, role === selectedRole ? styles.selectedRole : undefined]}
            onPress={() => dispatch('speeches/toggleRole', role)}
          >
            <Text>{role}</Text>
          </TouchableHighlight>
        ))}
      </View>
      <FlatList
        data={speeches}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
      {selectedSpeechId &&
      <Modal
        visible
        onRequestClose={() => console.log('on request console.log()')}
        onDismiss={() => console.log('on dismiss')}
        onPressOut={() => dispatch('speeches/deselectSpeech')}
        transparent
      >
        <View>
          <TouchableHighlight onPress={handleEdit} underlayColor='#ddd'>
            <View style={styles.actionItem}>
              <Ionicons name='pencil-sharp' size={26} />
              <Text style={styles.actionText}>Редактировать</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={handleOnDelete} underlayColor='#ddd'>
            <View style={styles.actionItem}>
              <Ionicons name='trash-outline' size={26} />
              <Text style={styles.actionText}>Удалить</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
      }
    </SafeAreaView>
  )
}

export default TurnipScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionItem: {
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  actionText: {
    fontSize: 16,
    paddingLeft: 20,
  },
  selectorBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selector: {
    backgroundColor: '#ccc',
    margin: 10,
    padding: 10,
    flex: 1,
    borderRadius: 10,
  },
  selectedRole: {
    backgroundColor: '#bbec7f',
  },

})
