import { speechesDB } from '../lib/database'

export const find = async (id) => {
  try {
    return await speechesDB().get(id)
  } catch (e) {
    console.log(e)
  }
}

export const all = async (play_id) => {
  try {
    const result = await speechesDB().allDocs({ include_docs: true })
    let data = result.rows.map(row => row.doc)
    if (play_id) {
      data = data.filter(d => d.play_id === play_id)
    }
    return data
  } catch (err) {
    console.log(err)
  }
}


export const bulkCreate = async (params) => {
  console.log('bulk create', params.length)
  try {
    await speechesDB().bulkDocs(params)
  } catch (err) {
    console.log(err)
  }
}

export const update = async (id, params) => {
  try {
    const record = await find(id)
    return await speechesDB().put({ ...record, ...params })
  } catch (err) {
    console.error(err)
  }
}

export const remove = async (id) => {
  try {
    const record = await find(id)
    return await speechesDB().remove(record)
  } catch (err) {
    console.error(err)
  }
}

export const addNew = async (params) => {
  try {
    await speechesDB().put(params)
  } catch (err) {
    console.error(err)
  }
}

export const exists = async (id) => {
  try {
    await speechesDB().get(id)
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
