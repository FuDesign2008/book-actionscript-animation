/**
 *
 * @author fuyg
 * @date  2019-07-31
 */
import Sprite from '../core/Sprite'
import SpringBallsProps from './SpringBallsProps'
import Ball from './Ball'
import BallProps from './BallProps'
import BallState from './BallState'

class SpringBalls extends Sprite {
  constructor(props: SpringBallsProps) {
    super(props)
    this.createBalls()
  }

  private createBalls() {
    const props: SpringBallsProps = this.props as SpringBallsProps
    const arr = [...Array(props.ballCount)]
    const size = this.getStageSize()
    const width = size ? size.width : 1000
    const height = size ? size.height : 500

    arr.forEach(() => {
      const item: BallProps = {
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        speedX: Math.random(),
        speedY: Math.random(),
        friction: 0.049,
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 10,
      }
      const ball = new Ball(item)
      this.addChild(ball)
    })
  }

  onEnterFrame() {
    const balls: Ball[] = this.children as Ball[]
    const { length } = balls
    for (let index = 0; index < length; index++) {
      for (let index2 = index + 1; index2 < length; index2++) {
        this.spring(balls[index], balls[index2])
      }
    }
  }

  private spring(a: Ball, b: Ball) {
    const props: SpringBallsProps = this.props as SpringBallsProps
    const { springAmount, distance } = props
    const dx = a.x - b.x
    const dy = a.y - b.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < distance) {
      const ax = dx * springAmount
      const ay = dy * springAmount

      const aState: BallState = a.getState() as BallState
      a.setState({
        x: aState.x + ax,
        y: aState.y + ay,
      })

      const bState: BallState = b.getState() as BallState
      b.setState({
        x: bState.x - ax,
        y: bState.y - ay,
      })
    }
  }

  draw() {
    const balls: Ball[] = this.children as Ball[]
    const { length } = balls
    for (let index = 0; index < length; index++) {
      for (let index2 = index + 1; index2 < length; index2++) {
        this.drawLine(balls[index], balls[index2])
      }
    }
  }

  drawLine(a: Ball, b: Ball) {
    const { context2d } = this
    if (!context2d) {
      return
    }
    const props: SpringBallsProps = this.props as SpringBallsProps
    const { distance } = props
    const dx = a.x - b.x
    const dy = a.y - b.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < distance) {
      context2d.save()
      context2d.beginPath()
      const alpha = (distance - dist) / distance
      context2d.strokeStyle = `rgba(100, 30, 209, ${alpha})`
      context2d.lineWidth = 0.5
      context2d.moveTo(a.x, a.y)
      context2d.lineTo(b.x, b.y)
      context2d.closePath()
      context2d.stroke()
      context2d.restore()
    }
  }
}

export default SpringBalls
