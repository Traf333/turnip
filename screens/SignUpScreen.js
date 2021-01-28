import React, { useState } from 'react'
import { Alert, ScrollView, Keyboard, StyleSheet } from 'react-native'
import { registration } from '../lib/fsapi'
import { Layout, Text, Input, Button, Divider } from '@ui-kitten/components'

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emptyState = () => {
    setUsername('')
    setEmail('')
    setPassword('')
  }

  const handlePress = () => {
    if (!username) {
      Alert.alert('First name is required')
    } else if (!email) {
      Alert.alert('Email field is required.')
    } else if (!password) {
      Alert.alert('Password field is required.')
    } else {
      registration(
        email,
        password,
        username,
      )
      navigation.navigate('Loading')
      emptyState()
    }
  }

  return (
    <Layout style={styles.container}>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text} category='h5'>Create an account</Text>
        <Divider style={styles.button} />
        <Input
          placeholder="User name*"
          value={username}
          onChangeText={(name) => setUsername(name)}
        />

        <Input
          placeholder="Enter your email*"
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          placeholder="Enter your password*"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />

        <Button style={styles.button} onPress={handlePress}>
          Зарегистрироваться
        </Button>
        <Divider />

        <Text style={styles.text}>Already have an account?</Text>
        <Button appearance='ghost' style={styles.button} onPress={() => navigation.navigate('Sign In')}>
          Войти
        </Button>
      </ScrollView>
    </Layout>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  text: {
    marginVertical: 15,
  },
  button: {
    marginVertical: 15,
  },
})
