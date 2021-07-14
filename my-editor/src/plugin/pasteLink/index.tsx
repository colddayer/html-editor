import { createProsemirrorPlugin } from '@milkdown/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { getLink, createLink } from './utils'

export const key = 'MILKDOWN_PLUGIN_PASTE_LINK'

const pasteLinkUploadPlugin = () =>
  new Plugin({
    key: new PluginKey(key),
    props: {
      handlePaste(view, e) {
        getLink(e, view)
        return false
      },
    },
  })

export const pasteLink = createProsemirrorPlugin('pasteLink', () => [pasteLinkUploadPlugin()])
