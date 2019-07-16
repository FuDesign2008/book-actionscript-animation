/**
 *
 * @author fuyg
 * @date  2019-07-16
 */
import ArrowKeyName from './ArrowKeyName'
import ArrowKeyState from './ArrowKeyState'
import { ArrowKeyCode } from './keyCode'

function mergeArrowKeyState(a: ArrowKeyState, b: ArrowKeyState): ArrowKeyState {
  const state: ArrowKeyState = {}

  Object.keys(state).forEach((key: string) => {
    const theKey: ArrowKeyName = key as ArrowKeyName
    const value = a[theKey] || b[theKey] || false
    state[theKey] = value
  })

  return state
}

function createBlankArrowKeyState(): ArrowKeyState {
  const state: ArrowKeyState = {
    left: false,
    right: false,
    up: false,
    down: false,
  }
  return state
}
function createStateFromKeyCode(
  keyCode: number,
  value: boolean,
): ArrowKeyState | null {
  const state: ArrowKeyState = {}
  switch (keyCode) {
    case ArrowKeyCode.LEFT:
      state.left = value
      break

    case ArrowKeyCode.RIGHT:
      state.right = value
      break

    case ArrowKeyCode.UP:
      state.up = value
      break

    case ArrowKeyCode.DOWN:
      state.down = value
      break
    default:
      return null
  }
  return state
}

export { mergeArrowKeyState, createStateFromKeyCode, createBlankArrowKeyState }
