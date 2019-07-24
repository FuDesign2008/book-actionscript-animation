/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import Vector from '../common/Vector'
import KeyInteractive from '../core/KeyInteractive'
import KeyInteractiveProps from '../core/KeyInteractiveProps'
import KeyInteractiveState from '../core/KeyInteractiveState'
import { gotoZero, recycle } from '../utils/compute'

interface VectorBallProps extends KeyInteractiveProps {
  accelaration: number
  friction: number
  x: number
  y: number
}

interface VectorBallState extends KeyInteractiveState {
  speedX: number
  speedY: number
  x: number
  y: number
}

class VectorBall extends KeyInteractive {
  constructor(props: VectorBallProps) {
    super(props)
    const { state } = this
    const initState: VectorBallState = Object.assign(
      {},
      state as KeyInteractiveState,
      {
        speedX: 0,
        speedY: 0,
        x: props.x || 0,
        y: props.y || 0,
      },
    )
    this.state = initState
  }

  onEnterFrame() {
    this.setState((state: VectorBallState, props: VectorBallProps) => {
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
        newSpeedX = gotoZero(speedX, friction)
        newSpeedY = gotoZero(speedY, friction)
      }

      let newX = x + newSpeedX
      let newY = y + newSpeedY
      const size = this.getStageSize()
      if (size) {
        const { width, height } = size
        newX = recycle(newX, 0, width)
        newY = recycle(newY, 0, height)
      }

      return {
        speedX: newSpeedX,
        speedY: newSpeedY,
        x: newX,
        y: newY,
      }
    })
  }

  draw(context2d: CanvasRenderingContext2D, state: VectorBallState) {
    const { x, y } = state
    context2d.beginPath()
    context2d.fillStyle = 'rgb(234, 146, 100)'
    context2d.arc(x, y, 5, 0, Math.PI * 2, false)
    context2d.fill()
  }

  private convertToAngle(state: VectorBallState): number {
    const clone: VectorBallState = Object.assign({}, state)
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

export default VectorBall
