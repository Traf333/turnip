import { fetchTurnips } from '../lib/api'

export function turnips(store) {
  store.on('@init', async () => ({ turnips: undefined }))


  store.on('turnips/fetchAll', async () => {
    const data = await fetchTurnips()
    store.dispatch('turnips/set', data)
  })

  store.on('turnips/set', (_, turnips) => ({ turnips }))
}
