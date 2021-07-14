import { EditorView } from 'prosemirror-view'

export const getLink = (e: ClipboardEvent, view: EditorView) => {
  const clipboardData = e.clipboardData
  if (clipboardData && clipboardData.items) {
    for (let i = 0; i < clipboardData.items.length; i++) {
      if (clipboardData.items[i].kind === 'string') {
        clipboardData.items[i].getAsString((str) => {
          if (/^(http|https):\/\//.test(str)) {
            createLink(view, str)
          }
        })
      }
    }
  }
}

export const createLink = (view: EditorView, url: string) => {
  const { state, dispatch } = view
  const { tr, schema, selection } = state
  const { $head } = selection
  const { link } = schema.marks

  const node = schema.text(url, [link.create({ href: url })])
  //删除默认事件粘贴的字符串再创建a标签
  dispatch(tr.replaceRangeWith($head.pos - $head.parent.nodeSize + 1, $head.pos, node))
}
