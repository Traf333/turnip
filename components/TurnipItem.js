import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableHighlight, Vibration, View } from 'react-native'
import { Audio } from 'expo-av'
import { putAudio } from '../lib/api'
import { Ionicons } from '@expo/vector-icons'

const TurnipItem = (props) => {
  const { id, text, audio_url, onSelectSpeech } = props
  const [url, setUrl] = useState(audio_url)
  const [recording, setRecording] = useState()
  const [sound, setSound] = useState()

  const handlePress = () => {
    console.log(props, 'props')
    if (url) {
      playSound(url).then(() => console.log('paaaaayinng....!!!!'))
    } else {
      console.log('just tap', id, text)

    }
  }

  const handleSelect = () => {
    console.log('long press', props)
    Vibration.vibrate(60)

    onSelectSpeech()
  }
  const handleLongPress = () => {
    Vibration.vibrate(60)
    startRecording()
  }

  const logPresOut = () => {
    console.log('pressOut')
    if (recording) {
      stopRecording()
    }
  }

  async function startRecording() {
    try {
      console.log('Requesting permissions..')
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
      console.log('Starting recording..')
      const recording = new Audio.Recording()
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
      await recording.startAsync()
      setRecording(recording)
      console.log('Recording started')
    } catch (err) {
      console.error('Failed to start recording', err)
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..')
    setRecording(undefined)
    await recording.stopAndUnloadAsync()
    const uri = recording.getURI()
    try {
      await putAudio(id, uri)
    } catch (e) {
      console.log('Not posted audio')
    }
    setUrl(uri)
    console.log('Recording stopped and stored at', uri)
  }


  async function playSound(uri) {
    console.log('Loading Sound')

    const { sound } = await Audio.Sound.createAsync({ uri })
    setSound(sound)

    console.log('Playing Sound')
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
    <View style={[styles.item, url ? styles.recordedBg : styles.emptyBg]}>
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
      <TouchableHighlight
        onLongPress={handleLongPress}
        onPressOut={logPresOut}
        underlayColor={'#ddd'}
        style={styles.recordAudio}
      >
        <Ionicons name='mic-outline' size={26} />
      </TouchableHighlight>
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
  recordAudio: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
})
