import React, { useState, useEffect } from 'react'
import { Editor } from '@milkdown/core'
import { ReactEditor, useEditor } from '@milkdown/react'
import { history } from '@milkdown/plugin-history'
import { prism } from '@milkdown/plugin-prism'
import { tooltip } from './plugin/tooltip'
import { table } from '@milkdown/plugin-table'
import { slash } from '@milkdown/plugin-slash'
import defaultMd from './constant/default.md'

import '@milkdown/theme-nord/lib/theme.css'
import '@milkdown/plugin-table/lib/style.css'
import '@milkdown/plugin-tooltip/lib/style.css'
import '@milkdown/plugin-slash/lib/style.css'
import './plugin/tooltip/index.css'
import createCommonMark from './plugin/commonmark'
import { createPastePlugin } from './plugin/paste'
import { uploadImg } from './api/upload'

type Props = {
  content?: string
  readOnly?: boolean
  onChange?: (getMarkdown: () => string) => void
}

const MilkdownEditor: React.FC<Props> = ({ content, readOnly, onChange }) => {
  const [markdown, setMarkdown] = useState(content || '')
  const editor = useEditor(
    (root, renderReact) => {
      const editor = new Editor({
        root,
        defaultValue: markdown,
        editable: () => !readOnly,
        listener: {
          markdown: onChange ? [onChange] : [],
        },
      })
        .use(createCommonMark(renderReact))
        .use(history)
        .use(table())
        .use(prism)
        .use(tooltip)
        .use(createPastePlugin(uploadImg))

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
