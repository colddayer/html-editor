import type { EditorView } from 'prosemirror-view'
import { Event2Command, InputMap, InputAction } from './item'
import { inputImageHTML } from './utility'

export class InputManager {
  #input: HTMLDivElement
  #imgInput: HTMLDivElement
  #activeInput: HTMLDivElement
  #inputMap: InputMap
  #inputCommand?: Event2Command
  #isClickLink: boolean = false

  constructor(inputMap: InputMap, private view: EditorView) {
    this.#inputMap = inputMap
    this.#input = this.createInput()
    this.#imgInput = this.createImgInput()
    this.#activeInput = this.#input

    this.#input.addEventListener('mousedown', this.listener)
    this.#imgInput.addEventListener('mousedown', this.listener)
    document.addEventListener('mousedown', this.onClick)
  }

  destroy() {
    this.#input.removeEventListener('mousedown', this.listener)
    this.#imgInput.removeEventListener('mousedown', this.listener)
    document.removeEventListener('mousedown', this.onClick)
    this.#input.remove()
    this.#imgInput.remove()
  }

  hide() {
    if (!this.#isClickLink) {
      this.#input.classList.add('hide')
      this.#inputCommand = undefined
    }
    this.#imgInput.classList.add('hide')
  }

  update(view: EditorView) {
    const result = this.filterInput(view)
    if (!result) return
    this.calcPos(view)
  }

  private calcPos(view: EditorView) {
    const state = view.state
    const { from, to } = state.selection
    const start = view.coordsAtPos(from)
    const end = view.coordsAtPos(to)
    const left = Math.max((start.left + end.left) / 2, start.left + 3)
    const rect = this.#activeInput.getBoundingClientRect()

    const box = this.#activeInput.offsetParent?.getBoundingClientRect()
    if (!box) return

    const offsetX = left - box.left - rect.width / 2
    const sumX = offsetX + rect.width

    this.#activeInput.style.left =
      (sumX > box.width ? offsetX - (sumX - box.width) : offsetX < 0 ? left - box.left : offsetX) +
      'px'
    this.#activeInput.style.bottom = box.bottom - start.bottom - rect.height - 10 + 'px'
    return
  }

  private createInput() {
    const div = document.createElement('div')
    div.className = 'tooltip-input'
    const input = document.createElement('input')
    div.appendChild(input)
    const button1 = document.createElement('button')
    button1.textContent = 'MODIFY'
    const button2 = document.createElement('button')
    button2.textContent = 'GO'
    div.appendChild(button1)
    div.appendChild(button2)
    this.view.dom.parentNode?.appendChild(div)

    return div
  }

  private createImgInput() {
    const div = document.createElement('div')
    div.innerHTML = inputImageHTML
    div.className = 'tooltip-input tooltip-input-img'
    this.view.dom.parentNode?.appendChild(div)

    return div
  }

  private filterInput(view: EditorView) {
    const target = Object.values(this.#inputMap).find((input) => {
      return input.display(view)
    })
    if (!target) {
      return false
    }

    this.#imgInput.classList.add('hide')
    this.#input.classList.add('hide')

    this.#activeInput = target.placeholder.includes('Image') ? this.#imgInput : this.#input

    this.#activeInput.classList.remove('hide')
    this.#inputCommand = target.command
    this.#activeInput.firstElementChild?.setAttribute('placeholder', target.placeholder)
    target.update(view, this.#activeInput)
    return true
  }

  private listener = (e: Event) => {
    const { view } = this
    const command = this.#inputCommand

    if (!view || !command) return

    e.stopPropagation()
    command(e, view)(view.state, view.dispatch)
  }

  onClick = (e: Event) => {
    const target = e.target as HTMLElement
    const clastList = Array.from(target.classList)
    this.#isClickLink = false
    if (target instanceof HTMLAnchorElement && clastList.includes('link')) {
      this.#activeInput = this.#input
      this.#inputCommand = this.#inputMap[InputAction.ModifyLink].command
      this.#activeInput.classList.remove('hide')
      this.#isClickLink = true

      const { firstChild } = this.#activeInput
      if (!(firstChild instanceof HTMLInputElement)) return

      firstChild.value = target.href
      this.calcPos(this.view)
    }
  }
}
