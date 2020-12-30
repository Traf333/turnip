import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableHighlight, Vibration, View } from 'react-native'
import { Audio } from 'expo-av'
import RecordAudio from './RecordAudio'

const TurnipItem = (props) => {
  const { id, text, audio_url, onSelectSpeech } = props
  const [url, setUrl] = useState(audio_url)
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
    Vibration.vibrate(60)
    onSelectSpeech()
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
      <RecordAudio onRecord={setUrl} />
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
