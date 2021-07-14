import React from 'react'
import { useNodeCtx } from '@milkdown/react'

const Link: React.FC = () => {
  const { node } = useNodeCtx()

  return (
    <a href={node.attrs.href} target='_blank' rel="noreferrer" className='link'>
      {node.attrs.href}
    </a>
  )
}

export default Link
