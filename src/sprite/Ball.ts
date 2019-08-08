/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import Sprite from '../core/Sprite'
import SpriteState from '../core/SpriteState'
import { gotoZero, recycle } from '../utils/compute'
import BallProps from './BallProps'
import BallState from './BallState'

class Ball extends Sprite {
  constructor(props: BallProps) {
    super(props)
    const { state } = this
    const initState: BallState = Object.assign({}, state as SpriteState, {
      vx: props.vx || 0,
      vy: props.vy || 0,
      speedX: props.speedX || 0,
      speedY: props.speedY || 0,
      x: props.x || 0,
      y: props.y || 0,
    })
    this.state = initState
  }

  onEnterFrame() {
    const { state, props } = this
    const { x, y, speedX, speedY } = state as BallState
    const { vx, vy, friction } = props as BallProps

    const newSpeedX = gotoZero(speedX + vx, friction)
    const newSpeedY = gotoZero(speedY + vy, friction)
    let newX = x + newSpeedX
    let newY = y + newSpeedY

    const size = this.getStageSize()
    if (size) {
      const { width, height } = size
      newX = recycle(newX, 0, width)
      newY = recycle(newY, 0, height)
    }

    this.setState({
      speedX: newSpeedX,
      speedY: newSpeedY,
      x: newX,
      y: newY,
    })
  }

  draw(
    context2d: CanvasRenderingContext2D,
    state: BallState,
    props: BallProps,
  ) {
    const { x, y } = state
    const { radius, color } = props
    const theColor = color ? color : 'rgb(12, 76, 33)'
    context2d.beginPath()
    context2d.fillStyle = theColor
    context2d.arc(x, y, radius, 0, Math.PI * 2, false)
    context2d.closePath()
    context2d.fill()
  }
}

export default Ball
