import React, { useState, useEffect } from 'react'
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
import { fetchSpeeches } from '../lib/api'
import Modal from '../components/Modal'
import Loader from '../components/Loader'


const TurnipScreen = ({ route, navigation }) => {
  const { dispatch, speeches } = useStoreon('speeches')

  const [selectedSpeech, setSelectedSpeech] = useState(null)
  const { id } = route.params

  useEffect(() => {
    dispatch('speeches/fetchAll', id)
  }, [])

  const handleOnDelete = async () => {
    try {
      dispatch('speeches/remove', selectedSpeech)
      setSelectedSpeech(null)
    } catch (e) {
      console.log(e)
      console.log('something went wrong with deletion')
    }

  }
  const handleEdit = () => {
    navigation.navigate('EditSpeechScreen', speeches.find(i => i._id === selectedSpeech))
    setSelectedSpeech(null)
  }

  const renderItem = ({ item }) => <TurnipItem {...item} onSelectSpeech={() => setSelectedSpeech(item._id)} />

  if (!speeches) return <Loader />
  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={speeches}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
      {selectedSpeech &&
      <Modal
        visible
        onRequestClose={() => console.log('on request console.log()')}
        onDismiss={() => console.log('on dismiss')}
        onPressOut={() => setSelectedSpeech(null)}
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
