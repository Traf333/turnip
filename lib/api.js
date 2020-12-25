// const apiUrl = 'https://turnipapp-api.herokuapp.com'
const apiUrl = 'https://turnip.ngrok.io'
export const putAudio = async (id, uri) => {
  const fileType = uri.substring(uri.lastIndexOf('.') + 1)

  const formData = new FormData()

  formData.append('speech[audio]', {
    uri,
    name: `audio-${id}.${fileType}`,
    type: `audio/${fileType}`,
  })

  const options = {
    method: 'PUT',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  }
  let res
  try {
    res = await fetch(`${apiUrl}/speeches/${id}.json`, options)
  } catch (e) {
    console.log('failes', res)
  }
  return res.json()
}
export const updateSpeech = async (id, params) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify({ speech: params }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  let res
  try {
    res = await fetch(`${apiUrl}/speeches/${id}.json`, options)
  } catch (e) {
    console.log('failes', res)
  }
  return res.json()
}

export const fetchPlay = async (id) => {
  const res = await fetch(`${apiUrl}/play/${id}.json`)
  return res.json()
}

export const deleteSpeech = async (id) => (
  await fetch(`${apiUrl}/speeches/${id}.json`, {
    method: 'DELETE', headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  })
)
