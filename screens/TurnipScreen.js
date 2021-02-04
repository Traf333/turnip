import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useStoreon } from 'storeon/react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableHighlight,
} from 'react-native'
import TurnipItem from '../components/TurnipItem'
import Modal from '../components/Modal'
import Loader from '../components/Loader'

const TurnipScreen = ({ route, navigation }) => {
  const [selectedRole, setSelectedRole] = useState()
  const [showModal, setShowModal] = useState(false)
  const [selectedSpeechId, setSelectedSpeech] = useState()
  const {
    dispatch,
    speeches,
  } = useStoreon('speeches')
  const { id, roles } = route.params

  useEffect(() => {
    dispatch('speeches/fetchAll', id)
  }, [id])

  const handleOnDelete = useCallback(() => {
    try {
      dispatch('speeches/remove')
      setSelectedSpeech(undefined)
      setShowModal(false)
    } catch (e) {
      console.log(e)
      console.log('something went wrong with deletion')
    }
  }, [])
  const handleEdit = () => {
    navigation.navigate('EditSpeechScreen', speeches.find(i => i._id === selectedSpeechId))
    setShowModal(false)
  }
  const handleSync = async () => {
    dispatch('speeches/sync', id)
  }

  const handleItemSelect = id => {
    setSelectedSpeech(id)
    setShowModal(true)
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
      onSelectSpeech={() => handleItemSelect(item._id)}
    />
  )

  if (!speeches) return <Loader />

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.selectorBar} horizontal>
        {roles.map(role => (
          <TouchableHighlight
            key={role}
            underlayColor='#ddd'
            style={[styles.selector, role === selectedRole ? styles.selectedRole : undefined]}
            onPress={() => setSelectedRole(role === selectedRole ? undefined : role)}
          >
            <Text>{role}</Text>
          </TouchableHighlight>
        ))}
      </ScrollView>
      <FlatList
        data={speeches}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
      {showModal &&
      <Modal
        visible
        onRequestClose={() => console.log('on request console.log()')}
        onDismiss={() => console.log('on dismiss')}
        onPressOut={() => setShowModal(false)}
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
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#ccc',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  selectedRole: {
    backgroundColor: '#bbec7f',
  },
})
