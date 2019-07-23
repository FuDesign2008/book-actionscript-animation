/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import { GraphicComponent } from './GraphicComponent'

interface RocationBallProps {
  speed: number
  radius: number
  x: number
  y: number
}

interface RocationBallState {
  angle: number
}

class RocationBall extends GraphicComponent {
  constructor(props: RocationBallProps) {
    super(props)
    const state: RocationBallState = {
      angle: 0,
    }
    this.state = state
  }

  onEnterFrame() {
    this.setState((state: RocationBallState, props: RocationBallProps) => {
      const { angle } = state
      const { speed } = props

      return {
        angle: angle + speed,
      }
    })
  }

  draw(context2d: CanvasRenderingContext2D, state: RocationBallState) {
    const { angle } = state
    const { props } = this
    const { x, y, radius } = props as RocationBallProps

    // draw ball
    context2d.fillStyle = 'rgb(77, 74, 100)'
    context2d.strokeStyle = 'rgb(77, 74, 100)'

    context2d.beginPath()
    context2d.arc(x, y, radius, 0, Math.PI * 2, false)
    context2d.fill()

    const length = radius * 2.5
    const targetX = x + Math.cos(angle) * length
    const targetY = y + Math.sin(angle) * length
    const headlen = radius * 1
    this.drawArrow(context2d, x, y, targetX, targetY, headlen)
  }

  // https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
  private drawArrow(
    context: CanvasRenderingContext2D,
    fromx: number,
    fromy: number,
    tox: number,
    toy: number,
    headlen: number,
  ) {
    const dx = tox - fromx
    const dy = toy - fromy
    const angle = Math.atan2(dy, dx)

    context.beginPath()
    context.moveTo(fromx, fromy)
    context.lineTo(tox, toy)
    context.lineTo(
      tox - headlen * Math.cos(angle - Math.PI / 6),
      toy - headlen * Math.sin(angle - Math.PI / 6),
    )
    context.moveTo(tox, toy)
    context.lineTo(
      tox - headlen * Math.cos(angle + Math.PI / 6),
      toy - headlen * Math.sin(angle + Math.PI / 6),
    )
    context.stroke()
  }
}

export default RocationBall
