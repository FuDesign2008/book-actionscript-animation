/**
 *
 * @author fuyg
 * @date  2019-07-18
 */

import ArrowKeyState from '../key/ArrowKeyState'
import {
  createBlankArrowKeyState,
  createStateFromKeyCode,
} from '../key/keyState'
import { GraphicComponent } from './GraphicComponent'
import KeyInteractiveState from './KeyInteractiveState'

class KeyInteractive extends GraphicComponent {
  constructor(props: object) {
    super(props)
    const { state } = this
    const blankState = createBlankArrowKeyState()
    const initState: KeyInteractiveState = Object.assign({}, state, blankState)
    this.state = initState

    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
  }

  componentDidMount() {
    this.bindEvnets()
  }

  componentWillUnmount() {
    this.unbindEvents()
  }

  private bindEvnets() {
    document.addEventListener('keydown', this.onKeyDown, false)
    document.addEventListener('keyup', this.onKeyUp, false)
  }

  private unbindEvents() {
    document.removeEventListener('keydown', this.onKeyDown, false)
    document.removeEventListener('keyup', this.onKeyUp, false)
  }

  private updateKeyState(keyState: ArrowKeyState | null) {
    if (!keyState) {
      return
    }
    this.setState(keyState)
  }

  private onKeyDown(event: KeyboardEvent) {
    const state = createStateFromKeyCode(event.keyCode, true)
    if (state) {
      event.preventDefault()
      this.updateKeyState(state)
    }
  }

  private onKeyUp(event: KeyboardEvent) {
    const state = createStateFromKeyCode(event.keyCode, false)
    if (state) {
      event.preventDefault()
      this.updateKeyState(state)
    }
  }
}

export default KeyInteractive
