/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import { GraphicComponent } from './GraphicComponent'

interface EllipseBallProps {
  speed: number
  radius: number
  longRadius: number
  x: number
  y: number
}

interface EllipseBallState {
  angle: number
}

class EllipseBall extends GraphicComponent {
  constructor(props: EllipseBallProps) {
    super(props)
    const state: EllipseBallState = {
      angle: 0,
    }
    this.state = state
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
