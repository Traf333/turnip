import { deleteSpeech, fetchSpeeches, updateSpeech, uploadAudio } from '../lib/api'
import * as SpeechRepository from '../repositories/SpeechRepository'

export function speeches(store) {
  store.on('@init', () => ({ speeches: undefined, selectedSpeechId: undefined, selectedRole: undefined }))
  store.on('speeches/set', (_, speeches) => ({ speeches }))

  store.on('speeches/fetchAll', async ({ turnips }, turnipId) => {
    const data = await fetchSpeeches(turnipId)
    store.dispatch('turnips/update', { id: turnipId, speeches: data })
  })


  store.on('speeches/remove', async ({ speeches, selectedSpeechId }) => {
    store.dispatch('speeches/set', speeches.filter(s => s._id !== selectedSpeechId))
    store.dispatch('speeches/deselectSpeech')
    await deleteSpeech(selectedSpeechId)
  })


  store.on('speeches/record', async ({ speeches }, { _id, audio_uri, version }) => {
    await uploadAudio(_id, audio_uri)
    await SpeechRepository.update(_id, { audio_uri, version })
  })

  store.on('speeches/update', async ({ speeches }, { _id, text, version }) => {
    store.dispatch('speeches/set', speeches.map(i => i._id === _id ? { ...i, text, version } : i))
    await updateSpeech(_id, { text, version })
  })

  store.on('speeches/selectSpeech', (_, selectedSpeechId) => ({ selectedSpeechId }))
  store.on('speeches/deselectSpeech', () => ({ selectedSpeechId: undefined }))
  store.on('speeches/toggleRole', ({ selectedRole }, value) => ({ selectedRole: selectedRole === value ? undefined : value }))
}
