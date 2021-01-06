import PouchDB from './pouchdb'

export const playsDB = () => new PouchDB('plays', { adapter: 'react-native-sqlite' })
export const speechesDB = () => new PouchDB('speeches', { adapter: 'react-native-sqlite' })

export const resetDatabase = async () => {
  await playsDB().destroy()
  await speechesDB().destroy()
  console.log('database destroyed')
}
