import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TouchableHighlight, Vibration } from 'react-native'
import { Audio } from 'expo-av'

const RecordAudio = ({ onRecord }) => {
  const [recording, setRecording] = useState()


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
    onRecord(uri)
  }

  const handleLongPress = () => {
    Vibration.vibrate(60)
    startRecording()
  }

  const onPressOut = () => {
    if (recording) stopRecording()
  }


  return (
    <TouchableHighlight
      onLongPress={handleLongPress}
      onPressOut={onPressOut}
      underlayColor='#ddd'
      style={styles.recordAudio}
    >
      <Ionicons name='mic-outline' size={26} />
    </TouchableHighlight>
  )
}

export default RecordAudio


const styles = StyleSheet.create({
  recordAudio: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
})
