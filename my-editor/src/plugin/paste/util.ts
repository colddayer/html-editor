import { EditorView } from 'prosemirror-view'

export const pasteAndCreate = (
  e: ClipboardEvent,
  view: EditorView,
  uploadImgApi?: (file: File | null) => Promise<{ url: string }>
) => {
  const clipboardData = e.clipboardData
  if (clipboardData && clipboardData.items) {
    const clipboardDataItems = Array.from(clipboardData.items)
    const imgFile = clipboardDataItems.find((item) => item.type.includes('image'))
    if (imgFile) {
      uploadImgApi &&
        uploadImgApi(imgFile.getAsFile()).then(({ url }) => url && createImgTag(view, url))
      return
    }

    for (const item of clipboardDataItems) {
      if (item.kind === 'string') {
        item.getAsString((str) => {
          if (/^(http|https):\/\//.test(str)) {
            createLink(view, str)
            return
          }

          if (!str.includes('<meta')) createNormal(view, str)
        })
      }
    }
  }
}

const createImgTag = (view: EditorView, url: string = '') => {
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

const createLink = (view: EditorView, url: string) => {
  const { state, dispatch } = view
  const { tr, schema } = state
  const { link } = schema.marks

  const node = schema.text(url, [link.create({ href: url })])
  dispatch(tr.replaceSelectionWith(node, false))
}

const createNormal = (view: EditorView, text: string) => {
  const { state, dispatch } = view
  const { tr, schema } = state

  const node = schema.text(text)
  dispatch(tr.replaceSelectionWith(node))
}
