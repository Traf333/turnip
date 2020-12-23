import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
  ScrollView
} from 'react-native'

import TurnipItem from '../components/TurnipItem'
import { fetchPlay } from '../lib/api'


const TurnipScreen = ({ route }) => {
  const [play, setPlay] = useState()
  const [selectedSpeech, setSelectedSpeech] = useState(null)

  useEffect(() => {
    fetchPlay(route.params.id).then(data => setPlay(data))
  }, [])


  const renderItem = ({ item }) => <TurnipItem {...item} onSelectSpeech={() => setSelectedSpeech(item.id)} />

  if (!play) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={play.speeches}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
      <Modal
        transparent={true}
        visible={selectedSpeech > 0}
        onRequestClose={() => console.log('on request console.log()')}
        onDismiss={() => console.log('on dismiss')}
      >
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPressOut={() => setSelectedSpeech(null)}
        >
          <ScrollView
            directionalLockEnabled={true}
            contentContainerStyle={styles.scrollModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                  onPress={() => setSelectedSpeech(null)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )
}

export default TurnipScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollModal: {
    flex: 1
  }
})
