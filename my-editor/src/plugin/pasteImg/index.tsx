import { createProsemirrorPlugin } from '@milkdown/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { getImgFile, createImgTag, UploadImg } from './util'

export const key = 'MILKDOWN_PLUGIN_PASTEIMG'

const pasteImageUploadPlugin = () =>
  new Plugin({
    key: new PluginKey(key),
    props: {
      handlePaste(view, e) {
        const { img } = getImgFile(e)
        if (img) {
          UploadImg(img).then((res) => createImgTag(view, res.data.data))
        }
        return !!img
      },
    },
  })

export const pasteImage = createProsemirrorPlugin('pasteImage', () => [pasteImageUploadPlugin()])
