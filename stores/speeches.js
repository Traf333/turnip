import { deleteSpeech, fetchSpeeches, updateSpeech } from '../lib/api'

export function speeches(store) {
  store.on('@init', () => ({ speeches: undefined }))

  store.on('speeches/add', ({ speeches }, speech) => {
    return { speeches: speeches.concat([speech]) }
  })

  store.on('speeches/fetchAll', async (_, playId) => {
    const data = await fetchSpeeches(playId)
    store.dispatch('speeches/set', data)
  })

  store.on('speeches/set', (_, speeches) => ({ speeches }))

  store.on('speeches/remove', async ({ speeches }, id) => {
    await deleteSpeech(id)
    return { speeches: speeches.filter(s => s._id !== id) }
  })

  store.on('speeches/update', async ({ speeches }, { _id, text }) => {
    await updateSpeech(_id, { text })
    return { speeches: speeches.map(i => i._id === _id ? { ...i, text } : i) }
  })
}
