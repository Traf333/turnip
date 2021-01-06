import React, { useState, useEffect, useCallback } from 'react'
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


const TurnipScreen = ({ route, navigation }) => {
  const { dispatch, speeches, selectedSpeechId } = useStoreon('speeches', 'selectedSpeechId')
  const { id } = route.params

  useEffect(() => {
    dispatch('speeches/fetchAll', id)
  }, [])

  console.log('selected speech id', selectedSpeechId)
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

  const renderItem = ({ item }) => <TurnipItem {...item}
                                               onSelectSpeech={() => dispatch('speeches/selectSpeech', item._id)} />

  if (!speeches) return <Loader />
  return (
    <SafeAreaView style={styles.container}>

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
          <TouchableHighlight onPress={handleEdit} underlayColor={'#ddd'}>
            <View style={styles.actionItem}>
              <Ionicons name='pencil-sharp' size={26} />
              <Text style={styles.actionText}>Редактировать</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={handleOnDelete} underlayColor={'#ddd'}>
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
    marginTop: StatusBar.currentHeight || 0,
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

})
