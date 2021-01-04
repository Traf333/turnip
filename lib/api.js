import * as PlayRepository from '../repositories/PlayRepository'
import * as SpeechRepository from '../repositories/SpeechRepository'
// const apiUrl = 'https://turnipapp-api.herokuapp.com'

const apiUrl = 'https://turnip.ngrok.io'


export const fetchTurnips = async () => {
  let plays = await PlayRepository.all()
  if (plays.length > 0)  return plays
  console.log('fetch from the server')

  const res = await fetch(`${apiUrl}/play.json`)
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
    res = await fetch(`${apiUrl}/speeches/${id}.json`, options)
  } catch (e) {
    console.log('failes', res)
  }
  return res.json()
}

export const fetchSpeeches = async (playId) => {
  let speeches = await SpeechRepository.all(playId)
  if (speeches.length > 0) return speeches
  console.log('fetch from the server')
  try {
    const res = await fetch(`${apiUrl}/speeches.json?play_id=${playId}`)
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
  await fetch(`${apiUrl}/speeches/${id}.json`, {
    method: 'DELETE', headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  })
)
