import React, { useRef, useEffect } from 'react'
import './App.css'
import { toolSchema } from './constant/toolbar'

const afterRemove = () => {
  console.log('remove listener!')
}

function App() {
  const tools = Object.values(toolSchema)
  const $editor = useRef<any>(null)
  const $activeElement = useRef<any>(null)
  

  useEffect(() => {
    if ($editor.current) {
      $editor.current.removeEventListener('click', afterRemove)
      $editor.current.addEventListener('click', (e: any) => {
        $activeElement.current = e.target
      })
    }
  }, [$editor.current])

  return (
    <div>
      <div className='toolBar'>
        {tools.map((item, index) => (
          <div
            onClick={(e) => item.onClick(e, $activeElement.current)}
            className='toolItem'
            key={index}
          >
            <img src={item.icon} className='toolBarIcon' alt={index + ''} />
          </div>
        ))}
      </div>
      <div contentEditable className='editorContainer' id='editorContainer' ref={$editor}>
        <div>段落1</div>
        <div>段落2</div>
        <div>段落3</div>
        <div>段落4</div>
        <div>段落5</div>
        <div>段落6</div>
      </div>
    </div>
  )
}

export default App
