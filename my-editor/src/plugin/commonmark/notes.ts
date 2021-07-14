import { Doc } from '@milkdown/preset-commonmark/lib/node/doc'
import {
  Paragraph,
  HardBreak,
  Blockquote,
  CodeFence,
  OrderedList,
  BulletList,
  ListItem,
  Heading,
  Hr,
  Text,
  Image,
} from '@milkdown/preset-commonmark'
import { Link } from './Link/node'

export const nodes = [
  new Doc(),
  new Paragraph(),
  new HardBreak(),
  new Blockquote(),
  new CodeFence(),
  new OrderedList(),
  new BulletList(),
  new ListItem(),
  new Heading(),
  new Hr(),
  new Text(),
  new Image(),
  new Link()
]
