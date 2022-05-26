import { HeaderText } from '../components'
import { addTapeListener, tape } from '../state/tape'
import './index.css'

// Registering the component begins it's asyncronous loading
HeaderText()

// If tape gets new elements we add memory cells to the DOM
const container = document.querySelector('#memory-cells')
addTapeListener(async (target, index, value) => {
  if (parseInt(index) >= target.length) {
    const cell = document.createElement('memory-cell')
    cell.setAttribute('index', index)
    container.appendChild(cell)
  }
})

// Memory tape. og had 30k slots. We will do dynamic but start with 10
tape.push(...Array(10).fill(0))

const input = document.querySelector('#input')
const compileButton = document.querySelector('#compile')

const compile = () => {}
