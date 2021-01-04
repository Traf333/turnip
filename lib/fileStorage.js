import { downloadAsync, documentDirectory, uploadAsync, FileSystemUploadType } from 'expo-file-system'

const apiUrl = 'https://turnip.ngrok.io'

export const downloadAudio = async (url, fileName) => {
  return await downloadAsync(url, documentDirectory + fileName)
}

export const uploadAudio = async (id, uri) => {
  let res
  const extractedId = id.match(/\d+/)[0]
  try {
    console.log('uri', uri)
    res = await uploadAsync(`${apiUrl}/speeches/${extractedId}`, uri, {
      httpMethod: 'PUT',
      fieldName: 'speech[audio]',
      uploadType: FileSystemUploadType.MULTIPART,
    })
    return res
  } catch (e) {
    console.log('fails with speech id', extractedId)
  }
}
