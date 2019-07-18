/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import Vector from '../common/Vector'
import KeyInteractive from './KeyInteractive'
import KeyInteractiveState from './KeyInteractiveState'

interface VectorRocketProps {
  accelaration: number
  friction: number
  x: number
  y: number
}

interface VectorRocketState extends KeyInteractiveState {
  speedX: number
  speedY: number
  x: number
  y: number
}

class VectorRocket extends KeyInteractive {
  constructor(props: VectorRocketProps) {
    super(props)
    const { state } = this
    const initState: VectorRocketState = Object.assign({}, state, {
      speedX: 0,
      speedY: 0,
      x: props.x || 0,
      y: props.y || 0,
    })
    this.state = initState
  }

  onEnterFrame() {
    this.setState((state: VectorRocketState, props: VectorRocketProps) => {
      const { x, y, speedX, speedY } = state
      const { accelaration, friction } = props

      let newSpeedX = speedX
      let newSpeedY = speedY
      const angle = this.convertToAngle(state)
      if (angle >= 0) {
        const vector = new Vector(accelaration, (angle * Math.PI) / 180)
        newSpeedX += vector.valueX
        newSpeedY += vector.valueY
      } else {
        newSpeedX = this.gotoZero(speedX, friction)
        newSpeedY = this.gotoZero(speedY, friction)
      }

      return {
        speedX: newSpeedX,
        speedY: newSpeedY,
        x: x + newSpeedX,
        y: y + newSpeedY,
      }
    })
  }

  draw(context2d: CanvasRenderingContext2D, state: VectorRocketState) {
    const { x, y } = state
    context2d.beginPath()
    context2d.fillStyle = 'rgb(234, 146, 100)'
    context2d.arc(x, y, 5, 0, Math.PI * 2, false)
    context2d.fill()
  }

  private gotoZero(value: number, delta: number): number {
    if (Math.abs(value - 0) > delta) {
      return value > 0 ? value - delta : value + delta
    } else {
      return 0
    }
  }

  private convertToAngle(state: VectorRocketState): number {
    const clone: VectorRocketState = Object.assign({}, state)
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

export default VectorRocket
