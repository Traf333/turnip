import { fetchTurnips, fetchTurnipsFromServer } from '../lib/api'

export function turnips(store) {
  store.on('@init', async () => ({ turnips: undefined }))


  store.on('turnips/fetchAll', async () => {
    const data = await fetchTurnips()
    store.dispatch('turnips/set', data)
    store.dispatch('turnips/sync')
  })

  store.on('turnips/sync', async ({ turnips }) => {
    console.log('syncing')
    const data = await fetchTurnipsFromServer()
    const snapshot = turnips.map(t => ({
      ...t,
      updated_at: data.find(i => i.id === t.id).updated_at,
    }))
    store.dispatch('turnips/set', snapshot)
  })

  store.on('turnips/update', ({ turnips }, turnip) => {
    return {
      turnips: turnips.map(t => t.id === turnip.id ? { ...t, ...turnip } : t),
    }
  })

  store.on('turnips/set', (_, turnips) => ({ turnips }))
}
