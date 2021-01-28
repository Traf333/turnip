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
import { Audio } from 'expo-av'
import { fetchSpeeches } from '../lib/fsapi'
// import PlayRepository from '../repositories/PlayRepository'

const TurnipScreen = ({ route, navigation }) => {
  const [speeches, setSpeeches] = useState()
  const [turnip, setTurnip] = useState(route.params)
  const {
    dispatch,
    selectedSpeechId,
    selectedRole,
  } = useStoreon('selectedSpeechId', 'selectedRole')
  const { id, roles = [], updated_at, sync_date } = turnip
  const outdated = updated_at !== sync_date
  const requestAudioRecordPermissions = async () => {
    try {
      await Audio.requestPermissionsAsync()
      return await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
    } catch (e) {
      console.log(e, 'failure with request permissions')
    }
  }

  useEffect(() => {
    fetchSpeeches(id).then(data => setSpeeches(data))
    requestAudioRecordPermissions()
      .then(() => console.log('accepted'))
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
  // const handleSync = async () => {
  //   // const updatedSpeeches = fetchSpeechesFromServer({ play_id: id, sync_date })
  //   const data = {...turnip, sync_date: updated_at}
  //   // await PlayRepository.update(data)
  //   setTurnip(data)
  //
  // }
  //
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (outdated &&
  //       <TouchableHighlight onPress={handleSync} underlayColor={'#ddd'} style={{ padding: 10 }}>
  //         <Ionicons name='sync-outline' size={26} />
  //       </TouchableHighlight>
  //     ),
  //   })
  // }, [])


  const renderItem = ({ item }) => (
    <TurnipItem
      {...item}
      highlighted={!selectedRole || item.text.startsWith(selectedRole)}
      onSelectSpeech={() => dispatch('speeches/selectSpeech', item._id)}
    />
  )
  if (!speeches) return <Loader />
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.selectorBar}>
        {roles.map(role => (
          <TouchableHighlight
            key={role}
            underlayColor={'#ddd'}
            style={[styles.selector, role === selectedRole ? styles.selectedRole : undefined]}
            onPress={() => dispatch('speeches/toggleRole', role)}
          >
            <Text>{role}</Text>
          </TouchableHighlight>
        ))}
      </View>
      <FlatList
        data={speeches}
        keyExtractor={item => item.id}
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
  selectorBar: {
    flexDirection: 'row',
  },
  selector: {
    backgroundColor: '#ccc',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    flex: 1,
    borderRadius: 10,
  },
  selectedRole: {
    backgroundColor: '#bbec7f',
  },

})
