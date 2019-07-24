/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import Sprite from '../core/Sprite'
import SpriteProps from '../core/SpriteProps'
import SpriteState from '../core/SpriteState'

interface CircularBallProps extends SpriteProps {
  speed: number
  radius: number
  x: number
  y: number
}

interface CircularBallState extends SpriteState {
  angle: number
}

class CircularBall extends Sprite {
  constructor(props: CircularBallProps) {
    super(props)
    const { state } = this
    const initState: CircularBallState = Object.assign(
      {
        angle: 0,
      },
      state as SpriteState,
    )
    this.state = initState
  }

  onEnterFrame() {
    this.setState((state: CircularBallState, props: CircularBallProps) => {
      const { angle } = state
      const { speed } = props

      return {
        angle: angle + speed,
      }
    })
  }

  draw(context2d: CanvasRenderingContext2D, state: CircularBallState) {
    const { angle } = state
    const { props } = this
    const { radius, x, y } = props as CircularBallProps

    // draw center pointer
    context2d.fillStyle = 'rgb(100, 200, 145)'
    context2d.beginPath()
    context2d.arc(x, y, 1, 0, Math.PI * 2, false)
    context2d.fill()

    // draw path
    context2d.lineWidth = 1
    context2d.strokeStyle = 'rgb(50, 100, 100)'
    context2d.beginPath()
    context2d.arc(x, y, radius, 0, Math.PI * 2, false)
    context2d.stroke()

    // draw circular ball
    const targetX = x + radius * Math.cos(angle)
    const targetY = y + radius * Math.sin(angle)
    context2d.moveTo(targetX, targetY)
    context2d.fillStyle = 'rgb(100, 200, 145)'
    context2d.beginPath()
    context2d.arc(targetX, targetY, 15, 0, Math.PI * 2, false)
    context2d.fill()
  }
}

export default CircularBall
