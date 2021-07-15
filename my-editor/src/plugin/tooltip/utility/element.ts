export const elementIsTag = (element: HTMLElement, tagName: string): boolean =>
  element.tagName === tagName.toUpperCase()

export const icon = (text: string): HTMLSpanElement => {
  const span = document.createElement('span')
  span.textContent = text
  span.className = 'icon material-icons'
  return span
}

export const inputImageHTML = `
  <div>
    <div class='input-row'>
      <div class='input-title'>width</div>
      <input class='input-img' placeholder='please input width' />
    </div>
    <div class='input-row'>
      <div class='input-title'>url</div>
      <input class='input-img' placeholder='please input url' />
    </div>
  </div>
  <div>
    <button class='input-button'>apply</button>
  </div>
`

export const getAnchorElement = (path: HTMLElement[]): HTMLAnchorElement | null => {
  for (const item of path) {
    if (item instanceof HTMLAnchorElement && item.className?.includes('link')) return item
    if (item.className?.includes('ProseMirror editor')) return null
  }

  return null
}
