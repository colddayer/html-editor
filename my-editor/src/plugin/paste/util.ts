import { EditorView } from 'prosemirror-view'

export const pasteAndCreate = (
  e: ClipboardEvent,
  view: EditorView,
  uploadImgApi?: (file: File | null) => Promise<{ url: string }>
) => {
  const clipboardData = e.clipboardData
  if (clipboardData && clipboardData.items) {
    for (let i = 0; i < clipboardData.items.length; i++) {
      if (clipboardData.items[i].type.includes('image')) {
        uploadImgApi &&
          uploadImgApi(clipboardData.items[i].getAsFile()).then(
            ({ url }) => url && createImgTag(view, url)
          )
      }

      if (clipboardData.items[i].kind === 'string') {
        clipboardData.items[i].getAsString((str) => {
          if (/^(http|https):\/\//.test(str)) {
            createLink(view, str)
          } else {
            createNormal(view, str)
          }
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
  const { tag_a } = schema.nodes

  const node = schema.text(url, [tag_a.create({ href: url })])
  dispatch(tr.replaceSelectionWith(node))
}

const createNormal = (view: EditorView, text: string) => {
  const { state, dispatch } = view
  const { tr, schema } = state

  const node = schema.text(text)
  dispatch(tr.replaceSelectionWith(node))
}
