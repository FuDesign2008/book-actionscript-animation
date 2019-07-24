/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import Sprite from '../core/Sprite'
import SpriteProps from '../core/SpriteProps'
import SpriteState from '../core/SpriteState'

interface EllipseBallProps extends SpriteProps {
  speed: number
  radius: number
  longRadius: number
  x: number
  y: number
}

interface EllipseBallState extends SpriteState {
  angle: number
}

class EllipseBall extends Sprite {
  constructor(props: EllipseBallProps) {
    super(props)
    const { state } = this
    const initState: EllipseBallState = Object.assign(
      {
        angle: 0,
      },
      state as SpriteState,
    )
    this.state = initState
  }

  onEnterFrame() {
    this.setState((state: EllipseBallState, props: EllipseBallProps) => {
      const { angle } = state
      const { speed } = props

      return {
        angle: angle + speed,
      }
    })
  }

  draw(context2d: CanvasRenderingContext2D, state: EllipseBallState) {
    const { angle } = state
    const { props } = this
    const { radius, x, y, longRadius } = props as EllipseBallProps

    // draw center pointer
    // context2d.fillStyle = 'rgb(100, 200, 145)'
    // context2d.beginPath()
    // context2d.arc(x, y, 1, 0, Math.PI * 2, false)
    // context2d.fill()

    // draw path
    context2d.lineWidth = 1
    context2d.strokeStyle = 'rgb(200, 200, 200)'
    context2d.beginPath()
    context2d.ellipse(x, y, longRadius, radius, 0, 0, Math.PI * 2, false)
    context2d.stroke()

    // draw circular ball
    const targetX = x + longRadius * Math.cos(angle)
    const targetY = y + radius * Math.sin(angle)
    context2d.moveTo(targetX, targetY)
    context2d.fillStyle = 'rgba(100, 200, 189, 0.7)'
    context2d.beginPath()
    context2d.arc(targetX, targetY, 10, 0, Math.PI * 2, false)
    context2d.fill()
  }
}

export default EllipseBall
