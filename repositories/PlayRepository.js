import { playsDB } from '../lib/database'

const modelName = 'play'

export const find = async (id) => {
  try {
    return await playsDB().get(`${modelName}-${id}`)
  } catch (e) {
    console.log(`record with id: ${id}, not found`, e)
  }
}

export const all = async () => {
  console.log('fetching plays')
  try {
    const result = await playsDB().allDocs({ include_docs: true })
    return result.rows.map(row => row.doc)
  } catch (err) {
    console.log(err)
  }
}

export const bulkCreate = async (params) => {
  console.log('bulk creating')
  try {
    await playsDB().bulkDocs(params)
  } catch (err) {
    console.log(err)
  }
}


export const addNew = async (params) => {
  try {
    await playsDB().put(params)
  } catch (err) {
    console.error(err)
  }
}


export const exists = async (id) => {
  try {
    await playsDB().get(id)
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
