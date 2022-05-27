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
    console.log(cell)
  }
})

// Memory tape. og had 30k slots. We will do dynamic but start with 10
tape.push(...Array(10).fill(0))

const input = document.querySelector('#input') as HTMLTextAreaElement
const output = document.querySelector('#output') as HTMLDivElement
const compileButton = document.querySelector('#compile')

const compile = () => {
  const code = input.value
  let pointer = 0

  const stack = (code: string): number => {
    for (let i = 0; i < code.length; i++) {
      const handlers = {
        '>': () => pointer++, // Increment pointer and add a new cell if needed
        '<': () => pointer--, // Decrement pointer
        '+': () => tape[pointer]++, // Increment cell
        '-': () => tape[pointer]--, // Decrement cell
        '.': () => (output.innerHTML += String.fromCharCode(tape[pointer])), // Output cell
        ',': () => (tape[pointer] = prompt('Input:', '0')?.charCodeAt(0) || 0), // Input cell
        '[': () => {
          if (tape[pointer]) {
            console.log('entering loop')
            // If cell is not zero
            i += stack(code.slice(i + 1)) + 1 // Recurse
          } else {
            i = code.indexOf(']', i) // Find matching bracket
          }
        }, // Start a new stack if needed
      }

      // We have to return stack so need to be outside of the handlers
      if (code[i] === ']' && tape[pointer] === 0) return i // End stack if cell is zero
      if (code[i] === ']') i = 0 // Restart loop if we found a closing bracket

      if (code[i] in handlers) handlers[code[i]]()

      // Some sanity checks
      if (pointer < 0) pointer = 0
      if (pointer >= tape.length) tape.push(0)
      if (tape[pointer] > 255) tape[pointer] = 0
      if (tape[pointer] < 0) tape[pointer] = 0
    }
  }

  stack(code)
}

compileButton.addEventListener('click', () => compile())
