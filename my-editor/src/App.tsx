import React, { useState, useEffect } from 'react'
import { Editor } from '@milkdown/core'
import { ReactEditor, useEditor } from '@milkdown/react'
import { commonmark } from '@milkdown/preset-commonmark'
import { history } from '@milkdown/plugin-history'
import { prism } from '@milkdown/plugin-prism'
import { tooltip } from '@milkdown/plugin-tooltip'
import { table } from '@milkdown/plugin-table'
import { slash } from '@milkdown/plugin-slash'
import { pasteImage } from './plugin/pasteImg'
import { pasteLink } from './plugin/pasteLink'
import defaultMd from './constant/default.md'

import '@milkdown/theme-nord/lib/theme.css'
import '@milkdown/plugin-table/lib/style.css'
import '@milkdown/plugin-tooltip/lib/style.css'
import '@milkdown/plugin-slash/lib/style.css'

type Props = {
  content?: string
  readOnly?: boolean
  onChange?: (getMarkdown: () => string) => void
}

const MilkdownEditor: React.FC<Props> = ({ content, readOnly, onChange }) => {
  const [markdown, setMarkdown] = useState(content || '')
  const editor = useEditor(
    (root) => {
      const editor = new Editor({
        root,
        defaultValue: markdown,
        editable: () => !readOnly,
        listener: {
          markdown: onChange ? [onChange] : [],
        },
      })
        .use(commonmark)
        .use(history)
        .use(table())
        .use(prism)
        .use(tooltip)
        .use(pasteImage)
        .use(pasteLink)

      if (!readOnly) {
        editor.use(slash)
      }
      return editor
    },
    [readOnly, markdown]
  )

  useEffect(() => {
    fetch(defaultMd)
      .then((res) => res.text())
      .then((text) => setMarkdown(text))
  }, [content])

  return (
    <div>
      <ReactEditor editor={editor} />
    </div>
  )
}

export default MilkdownEditor
