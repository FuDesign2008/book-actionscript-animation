/**
 *
 * @author fuyg
 * @date  2019-07-26
 */
import Sprite from '../core/Sprite'
import SpriteProps from '../core/SpriteProps'
import Circle from '../types/Circle'
import { hitTest } from '../utils/circle'
import BouncingBall from './BouncingBall'
import BouncingBallProps from './BouncingBallProps'
import BouncingBallState from './BouncingBallState'
import hitAudio from '../hit.mp3'

function createBouncingBallProps(): BouncingBallProps {
  const speedX = Math.round(Math.random() * 15) - 5
  const speedY = Math.round(Math.random() * 15) - 5
  const accelaration = Math.random()
  const friction = accelaration * 0.01

  return {
    zIndex: 0,
    accelaration,
    friction,
    x: 1000 * Math.random(),
    y: 500 * Math.random(),
    speedX,
    speedY,
    radius: Math.round(Math.random() * 50) + 5,
  }
}
interface HitTestBallsProps extends SpriteProps {
  count: number
}

class HitTestBalls extends Sprite {
  private audio: HTMLAudioElement | null
  private canPlay: boolean

  constructor(props: HitTestBallsProps) {
    super(props)
    this.audio = null
    this.canPlay = false
    this.initializeChildren()
    this.createAudio()
  }

  initializeChildren() {
    const props = this.props as HitTestBallsProps
    const arr = [...Array(props.count)]
    arr.forEach(() => {
      const ballProps = createBouncingBallProps()
      const ball = new BouncingBall(ballProps)
      this.addChild(ball)
    })
  }

  onEnterFrame() {
    const hasHit = this.hitTestChildren()
    if (hasHit) {
      this.playAudio()
    }
  }

  private hitTestChildren(): boolean {
    const children: BouncingBall[] = this.children as BouncingBall[]
    const len = children.length
    let hasHit = false
    for (let index = 0; index < len; index++) {
      for (let nextIndex = index + 1; nextIndex < len; nextIndex++) {
        const child = children[index]
        const next = children[nextIndex]
        const isHit = hitTest(child as Circle, next as Circle)
        if (isHit) {
          hasHit = true
          this.revertSpeed(child, next)
        }
      }
    }
    return hasHit
  }

  private createAudio() {
    const { audio } = this
    if (!audio) {
      const theAudio = document.createElement('audio')
      theAudio.src = hitAudio
      theAudio.oncanplay = () => {
        this.canPlay = true
      }
      this.audio = theAudio
    }
  }

  private playAudio() {
    const { audio, canPlay } = this
    if (audio && canPlay) {
      try {
        audio.play()
      } catch (ex) {
        // do nothing
      }
    }
  }

  private revertSpeed(a: BouncingBall, b: BouncingBall) {
    const balls = [a, b]
    balls.forEach((item) => {
      item.setState((state: BouncingBallState) => {
        const { speedX, speedY } = state
        return {
          speedX: 0 - speedX + 1,
          speedY: 0 - speedY + 1,
        }
      })
    })
    const dx = a.x - b.x
    const dy = a.y - b.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const delta = a.radius + b.radius - distance
    if (delta <= 0) {
      return
    }
    const angle = Math.atan2(dy, dx)
    const deltaX = delta * Math.sin(angle)
    const deltaY = delta * Math.cos(angle)
    a.setState({
      x: a.x - deltaX / 2,
      y: a.y - deltaY / 2,
    })

    b.setState({
      x: b.x + deltaX / 2,
      y: b.y + deltaY / 2,
    })
  }
}

export default HitTestBalls
