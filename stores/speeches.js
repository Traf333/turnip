import { deleteSpeech, fetchSpeeches, updateSpeech, uploadAudio } from '../lib/api'
import * as SpeechRepository from '../repositories/SpeechRepository'

export function speeches(store) {
  store.on('@init', () => ({ speeches: undefined, selectedSpeechId: undefined }))
  store.on('speeches/set', (_, speeches) => ({ speeches }))

  store.on('speeches/fetchAll', async (_, playId) => {
    const data = await fetchSpeeches(playId)
    store.dispatch('speeches/set', data)
  })


  store.on('speeches/remove', async ({ speeches, selectedSpeechId }) => {
    store.dispatch('speeches/set', speeches.filter(s => s._id !== selectedSpeechId))
    store.dispatch('speeches/deselectSpeech')
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

  store.on('speeches/selectSpeech', (_, selectedSpeechId) => ({ selectedSpeechId }))
  store.on('speeches/deselectSpeech', () => ({ selectedSpeechId: undefined }))
}
