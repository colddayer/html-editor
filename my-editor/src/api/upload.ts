import axios from 'axios'

export const uploadImg = async (file: File | null): Promise<{ url: string }> => {
  if (!file) return { url: '' }

  const uploadService = '/api/uploadImg' // 上传服务地址
  const uploadFileFormDataKeyName = 'upfile'

  const f = new FormData()
  f.append(uploadFileFormDataKeyName, file)

  const url: string = (
    await axios({
      method: 'post',
      url: uploadService,
      data: f,
      withCredentials: false,
      proxy: {
        host: 'http://localhost',
        port: 8080,
      },
    })
  ).data.data

  return { url }
}
