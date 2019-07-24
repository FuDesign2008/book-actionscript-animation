/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import Sprite from '../core/Sprite'
import SpriteProps from '../core/SpriteProps'
import SpriteState from '../core/SpriteState'

interface ScalingBallProps extends SpriteProps {
  speed: number
  radius: number
  innerRadius: number
  x: number
  y: number
}

interface ScalingBallState extends SpriteProps {
  angle: number
}

class ScalingBall extends Sprite {
  constructor(props: ScalingBallProps) {
    super(props)
    const { state } = this
    const initState: ScalingBallState = Object.assign(
      {
        angle: 0,
      },
      state as SpriteState,
    )
    this.state = initState
  }

  onEnterFrame() {
    this.setState((state: ScalingBallState, props: ScalingBallProps) => {
      const { angle } = state
      const { speed } = props

      return {
        angle: angle + speed,
      }
    })
  }

  draw(context2d: CanvasRenderingContext2D, state: ScalingBallState) {
    const { angle } = state
    const { props } = this
    const { x, y, radius, innerRadius } = props as ScalingBallProps

    const scaledRadius =
      innerRadius + Math.abs((radius - innerRadius) * Math.sin(angle))

    context2d.fillStyle = 'rgb(245, 198, 174)'
    context2d.beginPath()
    context2d.arc(x, y, scaledRadius, 0, Math.PI * 2, false)
    context2d.fill()
  }
}

export default ScalingBall
