import { speechesDB } from '../lib/database'

const modelName = 'speech'

export const find = async (id) => {
  try {
    return await speechesDB.get(`${modelName}-${id}`)
  } catch (e) {
    console.log(e)
  }
}

export const all = async () => {
  try {
    const result = await speechesDB.allDocs({ include_docs: true })
    return result.rows.map(row => row.doc)
  } catch (err) {
    console.log(err)
  }
}


export const bulkCreate = async (params) => {
  console.log('bulk create', params.length)
  try {
    await speechesDB.bulkDocs(params)
  } catch (err) {
    console.log(err)
  }
}


export const addNew = async (params) => {
  try {
    await speechesDB.put(params)
  } catch (err) {
    console.error(err)
  }
}

export const exists = async (id) => {
  try {
    await speechesDB.get(id)
    return true
  } catch (err) {
    return false
  }
}

export const addIfNew = async (params) => {
  const ex = await exists(params._id)
  if (!ex) {
    await addNew(params)
  }
}


// export const duplicate = async () => {
//   try {
//     let ret = await this.localDB2.replicate.from(this.localDB1);
//   } catch (err) {
//     console.log(JSON.stringify(err));
//   }
// }
