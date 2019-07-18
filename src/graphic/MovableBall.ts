/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import { recycle } from '../utils/compute'
import KeyInteractive from './KeyInteractive'
import KeyInteractiveState from './KeyInteractiveState'

interface MovableBallProps {
  speed: number
  x: number
  y: number
}

interface MovableBallState extends KeyInteractiveState {
  x: number
  y: number
}

class MovableBall extends KeyInteractive {
  constructor(props: MovableBallProps) {
    super(props)
    const { state } = this
    const initState: MovableBallState = Object.assign({}, state, {
      x: props.x || 0,
      y: props.y || 0,
    })
    this.state = initState
  }

  onEnterFrame() {
    this.setState((state: MovableBallState, props: MovableBallProps) => {
      const { x, y } = state
      const { speed } = props

      let dx = 0
      let dy = 0
      const angle = this.convertToAngle(state)
      if (angle >= 0) {
        dy = speed * Math.sin((angle * Math.PI) / 180)
        dx = speed * Math.cos((angle * Math.PI) / 180)
      }

      let newX = x + dx
      let newY = y + dy
      const size = this.getScreenSize()
      if (size) {
        const { width, height } = size
        newX = recycle(newX, 0, width)
        newY = recycle(newY, 0, height)
      }

      return {
        x: newX,
        y: newY,
      }
    })
  }

  draw(context2d: CanvasRenderingContext2D, state: MovableBallState) {
    const { x, y } = state
    context2d.beginPath()
    context2d.arc(x, y, 5, 0, Math.PI * 2, false)
    context2d.fill()
  }

  private convertToAngle(state: MovableBallState): number {
    const clone: MovableBallState = Object.assign({}, state)
    if (clone.left === true && clone.right === true) {
      clone.left = false
      clone.right = false
    }

    if (clone.up === true && clone.down === true) {
      clone.up = false
      clone.down = false
    }
    const { up, left, right, down } = clone
    let angle = -1
    if (up === true) {
      angle = 270
      if (left === true) {
        angle = 270 - 45
      } else if (right === true) {
        angle = 270 + 45
      }
    } else if (down === true) {
      angle = 90
      if (left === true) {
        angle = 90 + 45
      } else if (right === true) {
        angle = 90 - 45
      }
    } else if (left === true) {
      angle = 180
    } else if (right === true) {
      angle = 0
    }

    return angle
  }
}

export default MovableBall
