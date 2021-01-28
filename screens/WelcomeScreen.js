import { StyleSheet } from 'react-native'
import React from 'react'
import { Layout, Text, Button } from '@ui-kitten/components'

export default function WelcomeScreen({ navigation }) {
  return (
    <Layout style={styles.container}>
      <Layout level='1' style={styles.titleContainer}>
        <Text style={styles.text} category='h5'>Добро пожаловать в Репы</Text>
        <Text style={styles.text}>Приложение для заучивания текстов с пратнерами</Text>
      </Layout>
      <Button style={styles.button} onPress={() => navigation.navigate('Sign Up')}>
        Зарегистрироваться
      </Button>
      <Text style={styles.text}>Already have an account?</Text>
      <Button style={styles.button} onPress={() => navigation.navigate('Sign In')}>
        Войти
      </Button>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    margin: 5
  },
  button: {
    margin: 5
  },
});
