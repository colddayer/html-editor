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
