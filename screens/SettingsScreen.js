import React, { useState } from 'react'
import { Text, TouchableOpacity, View, Switch, StyleSheet } from 'react-native'
import { resetDatabase } from '../lib/database'

export default function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled(!isEnabled)
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={resetDatabase} style={styles.button}>
        <Text style={styles.buttonText}>Стереть данные</Text>
      </TouchableOpacity>
      <View>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onChange={toggleSwitch}
          value={isEnabled}
        />
        <Text>{isEnabled ? 'Enabled' : 'Disabled'}</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    padding: 30,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 22,
    color: 'white',
  },
})

