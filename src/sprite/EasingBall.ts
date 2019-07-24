/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import Sprite from '../core/Sprite'
import SpriteProps from '../core/SpriteProps'
import SpriteState from '../core/SpriteState'

interface EasingBallProps extends SpriteProps {
  easing: number
}

interface EasingBallState extends SpriteState {
  x: number
  y: number
  targetX: number
  targetY: number
}

class EasingBall extends Sprite {
  constructor(props: EasingBallProps) {
    super(props)
    const { state } = this
    const initState: EasingBallState = Object.assign(
      {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
      },
      state as SpriteState,
    )
    this.state = initState
    this.onMouseMove = this.onMouseMove.bind(this)
  }

  onEnterFrame() {
    this.setState((state: EasingBallState, props: EasingBallProps) => {
      const { x, y, targetX, targetY } = state
      const { easing } = props

      return {
        x: x + (targetX - x) * easing,
        y: y + (targetY - y) * easing,
      }
    })
  }

  componentDidMount() {
    this.bindEvnets()
  }

  componentWillUnmount() {
    this.unbindEvents()
  }

  draw(context2d: CanvasRenderingContext2D, state: EasingBallState) {
    const { x, y } = state
    context2d.beginPath()
    context2d.arc(x, y, 2, 0, Math.PI * 2, false)
    context2d.fill()
  }

  private bindEvnets() {
    window.addEventListener('mousemove', this.onMouseMove, false)
  }

  private unbindEvents() {
    window.removeEventListener('mousemove', this.onMouseMove, false)
  }

  private onMouseMove(event: MouseEvent) {
    const { clientX, clientY } = event
    this.setState({
      targetX: clientX,
      targetY: clientY,
    })
  }
}

export default EasingBall
