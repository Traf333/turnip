import React, { useState, useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useStoreon } from 'storeon/react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native'

const EditSpeechScreen = ({ route, navigation }) => {
  const { _id, text } = route.params
  const [value, setValue] = useState(text)
  const { dispatch } = useStoreon()

  const onSave = () => {
    dispatch('speeches/update', { _id, text: value })
    navigation.goBack()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableHighlight onPress={onSave} underlayColor='#ddd' style={{padding: 10}}>
          <Ionicons name='checkmark-sharp' size={26} />
        </TouchableHighlight>
      ),
    })
  }, [value])

  return (
    <SafeAreaView style={styles.container}>
      <TextInput value={value} multiline onChangeText={setValue} />
    </SafeAreaView>
  )
}

export default EditSpeechScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
})
