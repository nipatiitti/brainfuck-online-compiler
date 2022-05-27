import { addTapeListener, tape } from '../../state/tape'
import templateString from './template.html'

class MemoryCell extends HTMLElement {
  index = '0'

  // Whatch out for attribute changes
  static get observedAttributes() {
    return ['index']
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    if (!this.shadowRoot) return

    const template = document.createElement('template')
    template.innerHTML = templateString

    this.shadowRoot.appendChild(template.content.cloneNode(true))

    addTapeListener(async (_, index, value) => {
      if (index == this.index.toString()) {
        this.shadowRoot.querySelector('#content').innerHTML = value.toString()
      }
    })
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'index') {
      this.index = newValue
      this.shadowRoot.querySelector('#content').innerHTML = tape[parseInt(this.index)]?.toString() || '0'
      this.shadowRoot.querySelector('#index').innerHTML = this.index
    }
  }
}

customElements.define('memory-cell', MemoryCell)
export default MemoryCell
