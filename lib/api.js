import { downloadAsync, cacheDirectory, uploadAsync, FileSystemUploadType } from 'expo-file-system'
import { stringify } from 'qs'
import Constants from 'expo-constants'

import * as PlayRepository from '../repositories/PlayRepository'
import * as SpeechRepository from '../repositories/SpeechRepository'


export const API_URL = Constants.manifest.extra.apiUrl || 'https://turnipapp-api.herokuapp.com'

const extractedId = id => id.split('speech-')[1]

export const fetchTurnipsFromServer = async () => {
  console.log('fetch from the server', API_URL)

  const res = await fetch(`${API_URL}/play.json`)
  return res.json()
}

export const fetchSpeechesFromServer = async (params) => {
  console.log('fetch speeches from the server')
  const res = await fetch(`${API_URL}/speeches.json?${stringify(params)}`)
  return await res.json()
}


export const fetchTurnips = async () => {
  let plays = await PlayRepository.all()
  if (plays?.length > 0) return plays
  const json = await fetchTurnipsFromServer()
  console.log(json)
  await PlayRepository.bulkCreate(json)
  return json
}

export const updateSpeech = async (id, params) => {
  await SpeechRepository.update(id, params)
  let res
  try {
    res = await fetch(`${API_URL}/speeches/${extractedId(id)}.json`, {
      method: 'PUT',
      body: JSON.stringify({ speech: params }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
    console.log('fails with', id)
    console.error(e)
  }
  return await res.json()
}

export const fetchSpeeches = async (play_id) => {
  let speeches = await SpeechRepository.all(play_id)
  if (speeches?.length > 0) return speeches
  speeches = fetchSpeechesFromServer({ play_id })

  try {
    await SpeechRepository.bulkCreate(speeches)
  } catch (e) {
    console.log('error to put', e.message)
  }
  return speeches
}

export const deleteSpeech = async (id) => {
  await SpeechRepository.remove(id)

  await fetch(`${API_URL}/speeches/${extractedId(id)}.json`, {
    method: 'DELETE', headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}
export const downloadAudio = async (url, fileName) => {
  return await downloadAsync(url, cacheDirectory + fileName)
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

