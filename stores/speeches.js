import { deleteSpeech, fetchSpeeches, fetchSpeechesFromServer, updateSpeech, uploadAudio } from '../lib/api'
import * as SpeechRepository from '../repositories/SpeechRepository'

export function speeches(store) {
  store.on('@init', () => ({ speeches: undefined }))
  store.on('speeches/set', (_, speeches) => ({ speeches }))

  store.on('speeches/fetchAll', async (_, playId) => {
    const data = await fetchSpeeches(playId)
    store.dispatch('speeches/set', data)
  })

  store.on('speeches/sync', async ({ speeches }, playId) => {
    const data = await fetchSpeechesFromServer(playId)
    const groupedResult = data.reduce((acc, i) => {
      acc[i._id] = i
      return acc
    }, {})
    const newSnapshot = []

    speeches.forEach(speech => {
      const serverSpeech = groupedResult[speech._id]
      if (serverSpeech) {
        if (serverSpeech.version > speech.version) {
          SpeechRepository.update(serverSpeech._id, serverSpeech)
          newSnapshot.push({ ...serverSpeech, requiredUpdate: true })
        } else {
          newSnapshot.push(speech)
        }
      } else {
        SpeechRepository.remove(speech._id)
      }
    })
    store.dispatch('speeches/set', newSnapshot)
  })


  store.on('speeches/remove', async ({ speeches, selectedSpeechId }) => {
    store.dispatch('speeches/set', speeches.filter(s => s._id !== selectedSpeechId))
    await deleteSpeech(selectedSpeechId)
  })


  store.on('speeches/record', async ({ speeches }, { _id, audio_uri }) => {
    await SpeechRepository.update(_id, { audio_uri })
    await uploadAudio(_id, audio_uri)
  })

  store.on('speeches/update', async ({ speeches }, { _id, text }) => {
    store.dispatch('speeches/set', speeches.map(i => i._id === _id ? { ...i, text } : i))
    await updateSpeech(_id, { text })
  })
}
