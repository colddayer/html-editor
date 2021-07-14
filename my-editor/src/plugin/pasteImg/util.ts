import { EditorView } from 'prosemirror-view'
import axios from 'axios'

export const getImgFile = (e: ClipboardEvent) => {
  const clipboardData = e.clipboardData
  if (clipboardData && clipboardData.items) {
    for (let i = 0; i < clipboardData.items.length; i++) {
      if (clipboardData.items[i].type.includes('image'))
        return {
          img: clipboardData.items[i].getAsFile(),
        }
    }
  }
  return {}
}

export const createImgTag = (view: EditorView, url: string = '') => {
  const { state, dispatch } = view
  const { selection, tr, schema } = state
  const { $head } = selection
  const { image } = schema.nodes

  dispatch(
    tr.replaceRangeWith(
      $head.pos,
      $head.pos,
      image.createAndFill({
        src: url,
      })
    )
  )
}

export const UploadImg = async (file: File) => {
  const uploadService = '/api/uploadImg' // 上传服务地址
  const uploadFileFormDataKeyName = 'upfile'

  const f = new FormData()
  f.append(uploadFileFormDataKeyName, file)

  return axios({
    method: 'post',
    url: uploadService,
    data: f,
    withCredentials: false,
    proxy: {
      host: 'http://localhost',
      port: 8080,
    },
  })
}
