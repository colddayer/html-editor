import { createProsemirrorPlugin } from '@milkdown/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { pasteAndCreate } from './util'

export const key = 'MILKDOWN_PLUGIN_PASTE'

const pastePlugin = (uploadImgApi?: (file: File | null) => Promise<{ url: string }>) =>
  new Plugin({
    key: new PluginKey(key),
    props: {
      handlePaste(view, e) {
        pasteAndCreate(e, view, uploadImgApi)
        return true
      },
    },
  })

export const createPastePlugin = (uploadImgApi?: (file: File | null) => Promise<{ url: string }>) =>
  createProsemirrorPlugin('paste', () => [pastePlugin(uploadImgApi)])
