import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'
import { Layout } from '@ui-kitten/components'

export default function LoadingScreen({ navigation }) {
  useEffect(
    () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.replace('Dashboard')
        } else {
          navigation.replace('Home')
        }
      })
    },
  )

  return (
    <Layout>
      <ActivityIndicator size='large' />
    </Layout>
  )
}
