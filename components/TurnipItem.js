import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, TouchableHighlight, Vibration, View } from 'react-native'
import { Audio } from 'expo-av'
import RecordAudio from './RecordAudio'
import * as SpeechRepository from '../repositories/SpeechRepository'
import { downloadAudio } from '../lib/api'
import { useStoreon } from 'storeon/react'

const TurnipItem = (props) => {
  const { _id, text, audio_url, onSelectSpeech, audio_uri, highlighted } = props
  const [uri, setUri] = useState(audio_uri)
  const [sound, setSound] = useState()
  const { dispatch } = useStoreon()

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

  const handleRecord = useCallback((uri) => {
    dispatch('speeches/record', { _id, audio_uri: uri })
    setUri(uri)
  }, [])

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
    <View style={[styles.item, uri || audio_url ? styles.recordedItem : styles.emptyItem]}>
      <TouchableHighlight
        onLongPress={handleSelect}
        onPress={handlePress}
        underlayColor='#ddd'
        style={{
          padding: 10,
          width: '80%',
        }}
      >
        <Text style={highlighted ? styles.text : styles.blurredText}>{text}</Text>
      </TouchableHighlight>
      {highlighted && <RecordAudio onRecord={handleRecord} />}
    </View>
  )
}

export default TurnipItem

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
  },
  emptyItem: {
    borderColor: '#fff',
  },
  recordedItem: {
    borderColor: 'green'
  },
  text: {
    fontSize: 16,
    color: "#222",

  },
  blurredText: {
    color: "#999",
    fontSize: 16,
  },
})
