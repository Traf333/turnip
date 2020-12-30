import { downloadAsync, documentDirectory, uploadAsync } from 'expo-file-system'

const apiUrl = 'https://turnip.ngrok.io'

export const downloadAudio = async (url, fileName) => {
  const uri = await downloadAsync(url, documentDirectory + fileName)

}


export const uploadAudio = async (uri) => {
  try {
    await uploadAsync(`${apiUrl}/speeches/${id}`, uri, { httpMethod: 'PUT' })
  } catch (e) {
    console.log('failes', res)
  }
}
