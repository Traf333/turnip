// import PouchDB from './pouchdb'
// import PlayRepository from '../repositories/PlayRepository'
// import SpeechRepository from '../repositories/SpeechRepository'
//
// const buildDb = (name, fields = []) => {
//   const db = new PouchDB(name, { adapter: 'react-native-sqlite' })
//   if (fields.length > 0) {
//     db.createIndex({ index: { fields } })
//   }
//   return db
// }
//
// const playsDB = buildDb('plays-1')
// const speechesDB = buildDb('speeches-1', ['play_id'])
//
//
// export const resetDatabase = async () => {
//   await PlayRepository.purge()
//   await SpeechRepository.purge()
//   console.log('database destroyed')
// }
//
// export {
//   playsDB, speechesDB,
// }
