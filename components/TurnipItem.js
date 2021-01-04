import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableHighlight, Vibration, View } from 'react-native'
import { Audio } from 'expo-av'
import RecordAudio from './RecordAudio'
import { downloadAudio, uploadAudio } from '../lib/fileStorage'
import * as SpeechRepository from '../repositories/SpeechRepository'

const TurnipItem = (props) => {
  const { _id, text, audio_url, onSelectSpeech, audio_uri } = props
  const [uri, setUri] = useState(audio_uri)
  const [sound, setSound] = useState()

  const handlePress = async () => {
    try {
      if (uri) return await playSound(uri)
      if (audio_url) {
        const response = await downloadAudio(audio_url, _id)
        await SpeechRepository.update(_id, { audio_uri: response.uri })
        setUri(response.uri)
        return await playSound(response.uri)
      }
    } catch (e) {
      console.log('something went wrong with playing')
      console.error(e)
    }
  }

  const handleRecord = async (uri) => {
    await SpeechRepository.update(_id, { audio_uri: uri })
    await uploadAudio(_id, uri)
    setUri(uri)
  }

  const handleSelect = () => {
    Vibration.vibrate(60)
    onSelectSpeech()
  }

  async function playSound(uri) {
    const { sound } = await Audio.Sound.createAsync({ uri })
    setSound(sound)
    await sound.playAsync()
  }

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound')
        sound.unloadAsync()
      }
      : undefined
  }, [sound])

  return (
    <View style={[styles.item, uri || audio_url ? styles.recordedBg : styles.emptyBg]}>
      <TouchableHighlight
        onLongPress={handleSelect}
        onPress={handlePress}
        underlayColor={'#ddd'}
        style={{
          padding: 10,
          width: '80%',
        }}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableHighlight>
      <RecordAudio onRecord={handleRecord} />
    </View>
  )
}

export default TurnipItem


const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyBg: {
    backgroundColor: '#fff',

  },
  recordedBg: {
    backgroundColor: '#DAEEB2',
  },
  text: {
    fontSize: 16,
  },
})
