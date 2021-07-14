import type { NodeParserSpec, NodeSerializerSpec } from '@milkdown/core'
import { InputRule } from 'prosemirror-inputrules'
import type { NodeSpec, NodeType } from 'prosemirror-model'
import { BaseNode } from '../Util'

export class Link extends BaseNode {
  id = 'tag_a'
  schema: NodeSpec = {
    attrs: {
      href: { default: '' },
      title: { default: null },
    },
    inline: true,
    group: 'inline',
    parseDOM: [
      {
        tag: 'a[href]',
        getAttrs: (dom) => {
          if (!(dom instanceof HTMLElement)) {
            throw new Error()
          }
          return { href: dom.getAttribute('href'), title: dom.getAttribute('title') }
        },
      },
    ],
    toDOM: (node) => {
      return ['a', { ...node.attrs, class: 'link' }]
    },
  }
  parser: NodeParserSpec = {
    match: ({ type }) => type === this.id,
    runner: (state, node, type) => {
      const url = (node as any).url as string
      const title = (node as any).title as string
      state.openNode(type, { href: url, title })
      state.next(node.children)
      state.closeNode()
    },
  }
  serializer: NodeSerializerSpec = {
    match: (node) => node.type.name === this.id,
    runner: (state, node) => {
      state.openNode('tag_a')
      state.next(node.content)
      state.closeNode()
    },
  }
  inputRules = (nodeType: NodeType) => [
    new InputRule(
      /\[(?<text>.+?)]\((?<href>.*?)(?=“|\))"?(?<title>[^"]+)?"?\)/,
      (state, match, start, end) => {
        const [okay, href, title] = match
        const { tr } = state
        if (okay) {
          tr.replaceWith(start, end, nodeType.create({ href, title }))
        }

        return tr
      }
    ),
  ]
}
