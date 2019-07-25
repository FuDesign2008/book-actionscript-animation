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
import KeyInteractiveProps from './KeyInteractiveProps'
import KeyInteractiveState from './KeyInteractiveState'
import Sprite from './Sprite'
import SpriteState from './SpriteState'

class KeyInteractive extends Sprite {
  constructor(props: KeyInteractiveProps) {
    super(props)
    const { state } = this
    const blankState = createBlankArrowKeyState()
    const initState: KeyInteractiveState = Object.assign(
      {},
      state as SpriteState,
      blankState,
    )
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

  getSelfDrawIgnoredStateNames(): string[] {
    const names = Sprite.prototype.getSelfDrawIgnoredStateNames.apply(this)
    return [...names, 'left', 'right', 'up', 'down']
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
