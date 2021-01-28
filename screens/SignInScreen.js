import React, { useState } from 'react'
import { StyleSheet, Alert, View } from 'react-native'
import { signIn } from '../lib/fsapi'
import { Button, Divider, Input, Layout, Text } from '@ui-kitten/components'

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handlePress = () => {
    if (!email) {
      Alert.alert('Email field is required.')
    }

    if (!password) {
      Alert.alert('Password field is required.')
    }

    signIn(email, password)
    setEmail('')
    setPassword('')
  }

  return (
    <Layout style={styles.container}>
      <Text style={styles.text} category='h5'>Sign in to your account:</Text>
      <Divider />
      <View style={{ marginVertical: 15 }}>
        <Input
          placeholder="Enter your email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
        />
        <Input
          placeholder="Enter your password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />

        <Button style={styles.button} onPress={handlePress}>
          Войти
        </Button>
      </View>

      <Divider />
      <Text>Впервые здесь?</Text>
      <Button appearance='ghost' style={styles.button} onPress={() => navigation.navigate('Sign Up')}>
        Зарегистрироваться
      </Button>


    </Layout>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    marginVertical: 15,
  },
  button: {
    marginVertical: 15,
  },
})
