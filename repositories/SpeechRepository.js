// import { speechesDB } from '../lib/database'
// import { exists } from './PlayRepository'
//
// export const find = async (id) => {
//   try {
//     return await speechesDB.get(id)
//   } catch (e) {
//     console.log(e)
//   }
// }
//
// export const all = async (play_id) => {
//   try {
//     const result = await speechesDB.allDocs({
//       include_docs: true,
//     })
//     const rows = result.rows
//     return rows
//       .filter(row => row.doc.play_id === play_id)
//       .map(row => row.doc)
//   } catch (err) {
//     console.log(err)
//   }
// }
//
//
// export const bulkCreate = async (params) => {
//   console.log('bulk create', params.length)
//   try {
//     await speechesDB.bulkDocs(params)
//   } catch (err) {
//     console.log(err)
//   }
// }
//
// export const update = async (id, params) => {
//   try {
//     const record = await find(id)
//     return await speechesDB.put({ ...record, ...params })
//   } catch (err) {
//     console.error(err)
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
// // export const duplicate = async () => {
// //   try {
// //     let ret = await this.localDB2.replicate.from(this.localDB1);
// //   } catch (err) {
// //     console.log(JSON.stringify(err));
// //   }
// // }
//
//
// export default {
//   all, update, exists, bulkCreate, purge, remove
// }
