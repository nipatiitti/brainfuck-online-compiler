import { addTapeListener, tape } from '../../state/tape'
import templateString from './template.html'

class MemoryCell extends HTMLElement {
  index = '0'

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    if (!this.shadowRoot) return

    const template = document.createElement('template')
    template.innerHTML = templateString

    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.index = this.getAttribute('index')
    this.shadowRoot.querySelector('#content').innerHTML = tape[this.index]
    this.shadowRoot.querySelector('#index').innerHTML = this.index

    addTapeListener(async (target, index, value) => {
      target[index] = value

      if (index == this.index.toString()) {
        this.shadowRoot.querySelector('#content').innerHTML = value.toString()
      }
    })
  }
}

customElements.define('memory-cell', MemoryCell)
export default MemoryCell
