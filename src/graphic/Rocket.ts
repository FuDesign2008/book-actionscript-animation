/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import ArrowKeyState from '../key/ArrowKeyState'
import {
  createBlankArrowKeyState,
  createStateFromKeyCode,
} from '../key/keyState'
import { GraphicComponent } from './GraphicComponent'

interface RocketProps {
  easing: number
}

interface RocketState extends ArrowKeyState {
  x: number
  y: number
  targetX: number
  targetY: number
}

class Rocket extends GraphicComponent {
  constructor(props: RocketProps) {
    super(props)
    const state: RocketState = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      ...createBlankArrowKeyState(),
    }
    this.state = state

    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
  }

  onEnterFrame() {
    this.setState((state: RocketState, props: RocketProps) => {
      const { x, y, targetX, targetY } = state
      const { easing } = props

      return {
        x: x + (targetX - x) * easing,
        y: y + (targetY - y) * easing,
      }
    })
  }

  componentDidMount() {
    this.bindEvnets()
  }

  componentWillUnmount() {
    this.unbindEvents()
  }

  draw(context2d: CanvasRenderingContext2D, state: RocketState) {
    const { x, y } = state
    context2d.beginPath()
    context2d.arc(x, y, 2, 0, Math.PI * 2, false)
    context2d.fill()
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

export default Rocket
