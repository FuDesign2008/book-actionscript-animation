/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import { GraphicComponent } from './GraphicComponent'

interface OpacityBallProps {
  speed: number
  radius: number
  innerRadius: number
  x: number
  y: number
}

interface OpacityBallState {
  angle: number
}

class OpacityBall extends GraphicComponent {
  constructor(props: OpacityBallProps) {
    super(props)
    const state: OpacityBallState = {
      angle: 0,
    }
    this.state = state
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

  draw(context2d: CanvasRenderingContext2D, state: OpacityBallState) {
    const { angle } = state
    const { props } = this
    const { x, y, radius, innerRadius } = props as OpacityBallProps

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
