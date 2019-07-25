/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import Vector from '../common/Vector'
import KeyInteractive from '../core/KeyInteractive'
import KeyInteractiveProps from '../core/KeyInteractiveProps'
import KeyInteractiveState from '../core/KeyInteractiveState'
import { gotoZero } from '../utils/compute'

interface BouncingBallProps extends KeyInteractiveProps {
  accelaration: number
  friction: number
  speedX: number
  speedY: number
  radius: number
}

interface BouncingBallState extends KeyInteractiveState {
  speedX: number
  speedY: number
  x: number
  y: number
}

class BouncingBall extends KeyInteractive {
  constructor(props: BouncingBallProps) {
    super(props)
    const { state } = this
    const initState: BouncingBallState = Object.assign(
      {},
      state as KeyInteractiveState,
      {
        speedX: props.speedX || 0,
        speedY: props.speedY || 0,
        x: props.x || 0,
        y: props.y || 0,
      },
    )
    this.state = initState
  }

  onEnterFrame() {
    this.setState((state: BouncingBallState, props: BouncingBallProps) => {
      const { x, y, speedX, speedY } = state
      const { accelaration, friction, radius } = props

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
        if (newX + radius > width || newX - radius < 0) {
          newSpeedX = 0 - newSpeedX
          newX = x + newSpeedX
        }
        if (newY + radius > height || newY - radius < 0) {
          newSpeedY = 0 - newSpeedY
          newY = y + newSpeedY
        }
      }

      return {
        speedX: newSpeedX,
        speedY: newSpeedY,
        x: newX,
        y: newY,
      }
    })
  }

  draw(
    context2d: CanvasRenderingContext2D,
    state: BouncingBallState,
    props: BouncingBallProps,
  ) {
    const { x, y } = state
    const { radius } = props
    context2d.beginPath()
    context2d.fillStyle = 'rgb(234, 146, 100)'
    context2d.arc(x, y, radius, 0, Math.PI * 2, false)
    context2d.fill()
  }

  private convertToAngle(state: BouncingBallState): number {
    const clone: BouncingBallState = Object.assign({}, state)
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

export default BouncingBall
