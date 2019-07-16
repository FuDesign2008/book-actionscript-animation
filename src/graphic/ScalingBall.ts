/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import { GraphicComponent } from './GraphicComponent'

interface ScalingBallProps {
  speed: number
  radius: number
  innerRadius: number
  x: number
  y: number
}

interface ScalingBallState {
  angle: number
}

class ScalingBall extends GraphicComponent {
  constructor(props: ScalingBallProps) {
    super(props)
    const state: ScalingBallState = {
      angle: 0,
    }
    this.state = state
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
