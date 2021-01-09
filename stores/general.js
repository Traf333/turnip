import { resetDatabase } from '../lib/database'

export function general(store) {
  store.on('@init', async () => ({ clearing: false }))


  store.on('general/reset', async () => {
    console.log('remoteSettings')
    store.dispatch('general/set', true)

    await resetDatabase()

    store.dispatch('general/set', false)
  })

  store.on('general/set', (_, flag) => ({ clearing: flag }))
}
