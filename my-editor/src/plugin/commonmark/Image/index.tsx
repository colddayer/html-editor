import React from 'react'
import { useNodeCtx } from '@milkdown/react'
import './index.css'

const Image: React.FC = () => {
  const { node } = useNodeCtx()
  return (
    <div className='wrapImg'>
      <img
        className='react-image'
        src={node.attrs.src}
        title={node.attrs.tittle}
        width={node.attrs.alt}
      />
    </div>
  )
}

export default Image
