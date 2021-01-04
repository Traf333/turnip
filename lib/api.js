import { downloadAsync, documentDirectory, uploadAsync, FileSystemUploadType } from 'expo-file-system'

import * as PlayRepository from '../repositories/PlayRepository'
import * as SpeechRepository from '../repositories/SpeechRepository'

export const API_URL = 'https://turnipapp-api.herokuapp.com'

const extractedId = id => id.match(/\d+/)[0]

export const fetchTurnips = async () => {
  let plays = await PlayRepository.all()
  if (plays.length > 0)  return plays
  console.log('fetch from the server')

  const res = await fetch(`${API_URL}/play.json`)
  const json = await res.json()
  await PlayRepository.bulkCreate(json)
  return json
}

export const updateSpeech = async (id, params) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify({ speech: params }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  let res
  try {
    res = await fetch(`${API_URL}/speeches/${extractedId(id)}.json`, options)
  } catch (e) {
    console.log('fails with', id)
    console.error(e)
  }
  return res.json()
}

export const fetchSpeeches = async (playId) => {
  let speeches = await SpeechRepository.all(playId)
  if (speeches.length > 0) return speeches
  console.log('fetch from the server')
  try {
    const res = await fetch(`${API_URL}/speeches.json?play_id=${playId}`)
    speeches = await res.json()
  } catch (e) {
    console.log(e.message)
  }

  console.log('speech size', speeches.length)
  try {
    await SpeechRepository.bulkCreate(speeches)
  } catch (e) {
    console.log('error to put', e.message)
  }
  return speeches
}

export const deleteSpeech = async (id) => (
  await fetch(`${API_URL}/speeches/${extractedId(id)}.json`, {
    method: 'DELETE', headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  })
)

export const downloadAudio = async (url, fileName) => {
  return await downloadAsync(url, documentDirectory + fileName)
}

export const uploadAudio = async (id, uri) => {
  try {
    return await uploadAsync(`${API_URL}/speeches/${extractedId(id)}`, uri, {
      httpMethod: 'PUT',
      fieldName: 'speech[audio]',
      uploadType: FileSystemUploadType.MULTIPART,
    })
  } catch (e) {
    console.log('fails with speech id', id)
  }
}
