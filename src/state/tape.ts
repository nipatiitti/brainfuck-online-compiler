export type TapeListener = (target: Number[], index: string, value: number) => Promise<void> // We force async for faster iteration
const _tape: Number[] = []
const _callbacks: TapeListener[] = []

export const tape = new Proxy(_tape, {
  set: (target, index, value, _) => {
    for (const cb of _callbacks) cb(target, index.toString(), value)

    target[index] = value
    return true
  },
})

export const addTapeListener = (cb: TapeListener) => {
  _callbacks.push(cb)
}
