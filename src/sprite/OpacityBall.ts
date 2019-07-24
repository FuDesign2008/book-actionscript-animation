/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import Sprite from '../core/Sprite'
import SpriteProps from '../core/SpriteProps'
import SpriteState from '../core/SpriteState'

interface OpacityBallProps extends SpriteProps {
  speed: number
  radius: number
  innerRadius: number
  x: number
  y: number
}

interface OpacityBallState extends SpriteState {
  angle: number
}

class OpacityBall extends Sprite {
  constructor(props: OpacityBallProps) {
    super(props)
    const { state } = this
    const initState: OpacityBallState = Object.assign(
      {
        angle: 0,
        x: props.x || 0,
        y: props.y || 0,
      },
      state as SpriteState,
    )
    this.state = initState
  }

  onEnterFrame() {
    this.setState((state: OpacityBallState, props: OpacityBallProps) => {
      const { angle } = state
      const { speed } = props

      return {
        angle: angle + speed,
      }
    })
  }

  draw(
    context2d: CanvasRenderingContext2D,
    state: OpacityBallState,
    props: OpacityBallProps,
  ) {
    const { angle, x, y } = state
    const { radius, innerRadius } = props

    const scaledRadius =
      innerRadius + Math.abs((radius - innerRadius) * Math.sin(angle))
    const alpha = Math.abs(Math.sin(angle))

    context2d.fillStyle = `rgba(77, 74, 100, ${alpha})`
    context2d.beginPath()
    context2d.arc(x, y, scaledRadius, 0, Math.PI * 2, false)
    context2d.fill()
  }
}

export default OpacityBall
