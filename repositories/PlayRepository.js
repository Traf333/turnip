// import { playsDB, speechesDB } from '../lib/database'
// import { find } from './SpeechRepository'
//
// const modelName = 'play'
//
// export const all = async () => {
//   console.log('fetching plays')
//   try {
//     const result = await playsDB.allDocs({ include_docs: true })
//     console.log('plays result', result)
//     return result.rows.map(row => row.doc)
//   } catch (err) {
//     console.log(err)
//   }
// }
//
// export const bulkCreate = async (params) => {
//   console.log('bulk creating')
//   try {
//     await playsDB.bulkDocs(params)
//   } catch (err) {
//     console.log(err)
//   }
// }
//
//
// export const update = async (id, params) => {
//   try {
//     const record = await find(id)
//     return await playsDB.put({ ...record, ...params })
//   } catch (err) {
//     console.error(err)
//   }
// }
//
// export const exists = async (id) => {
//   try {
//     await playsDB.get(id)
//     return true
//   } catch (err) {
//     return false
//   }
// }
//
// export const remove = async (id) => {
//   try {
//     const record = await find(id)
//     return await speechesDB.remove(record)
//   } catch (err) {
//     console.error(err)
//   }
// }
//
// export const purge = async () => {
//   const records = await all()
//   records.forEach(r => remove(r._id))
// }
//
// export default {
//   all, update, exists, bulkCreate, purge
// }
