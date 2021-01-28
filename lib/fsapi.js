import * as firebase from 'firebase'
import 'firebase/firestore'
import { Alert } from 'react-native'
import { fetchSpeechesFromServer } from './api'

const db = firebase.firestore

export async function registration(email, password, username) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    const currentUser = firebase.auth().currentUser

    await db().collection('users')
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        username,
      })
  } catch (err) {
    Alert.alert('There is something wrong!!!!', err.message)
  }
}

export async function signIn(email, password) {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
  } catch (err) {
    Alert.alert('There is something wrong!', err.message)
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut()
  } catch (err) {
    Alert.alert('There is something wrong!', err.message)
  }
}

export async function fetchTurnips() {
  await db().setPersistenceEnabled(true)

  console.log('fetching turnips')
  let docs = await db()
    .collection('turnips')
    .get()

  let res = []
  docs.forEach(d => res.push({ id: d.id, ...d.data() }))
  return res
}

export async function fetchSpeeches(play_id) {
  console.log('fetching speeches')
  const speechRef = db().collection('speeches')
  let docs = await speechRef.where('play_id', '==', play_id).orderBy('position', 'asc').get()
  let res = []
  docs.forEach(d => res.push({ id: d.id, ...d.data() }))
  return res
}
