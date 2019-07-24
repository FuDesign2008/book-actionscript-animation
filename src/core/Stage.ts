/**
 *
 * @author fuyg
 * @date  2019-07-18
 */

import isEqual from 'lodash.isequal'
import { createCanvas } from '../utils/canvas'
import Component from './Component'
import Sprite from './Sprite'
import SpriteManager from './SpriteManager'
import StageProps from './StageProps'

interface StageState {
  width: number
  height: number
}

class Stage extends Component {
  get size() {
    const props: StageProps = this.props as StageProps
    const { canvas } = props
    const { width, height } = canvas

    return {
      width,
      height,
    }
  }

  private spriteManager: SpriteManager | null

  private preRenderContext: CanvasRenderingContext2D | null

  constructor(props: StageProps) {
    super(props)

    const { width, height } = this.size

    const initialState: StageState = {
      width,
      height,
    }
    this.state = initialState

    this.preRenderContext = null
    const theProps: StageProps = this.props as StageProps
    if (theProps.usePreRender) {
      const preRenderCanvas = createCanvas(width, height)
      this.preRenderContext = preRenderCanvas.getContext('2d')
    }

    this.spriteManager = null
    const { canvas } = props
    const context2d = canvas.getContext('2d')
    if (context2d) {
      this.spriteManager = SpriteManager.create(
        this,
        context2d,
        this.preRenderContext,
      )
    }

    this.onEnterFrame = this.onEnterFrame.bind(this)
    window.requestAnimationFrame(this.onEnterFrame)

    this.initializeSpriteConfig()
  }

  checkState() {
    const props: StageProps = this.props as StageProps
    const { canvas } = props
    const { width, height } = canvas

    this.setState({
      width,
      height,
    })
  }

  onEnterFrame() {
    this.checkState()

    const props: StageProps = this.props as StageProps
    const { usePreRender, canvas } = props
    const { spriteManager, preRenderContext } = this
    if (spriteManager) {
      spriteManager.onEnterFrame()

      const { state, prevState } = this
      if (usePreRender) {
        if (!isEqual(state, prevState)) {
          if (preRenderContext && canvas) {
            const preRenderCanvas = preRenderContext.canvas
            preRenderCanvas.width = canvas.width
            preRenderCanvas.height = canvas.height
          }
          spriteManager.onPrerenderContextChange()
        }
      }
      this.clear()
      spriteManager.runDraw()
      this.prevState = Object.assign({}, state)
    }

    window.requestAnimationFrame(this.onEnterFrame)
  }

  updateSize(width: number, height: number) {
    const props: StageProps = this.props as StageProps
    const { canvas } = props
    canvas.width = width
    canvas.height = height

    this.setState({
      width,
      height,
    })
  }

  addSprite(sprite: Sprite) {
    const { spriteManager } = this
    if (spriteManager) {
      spriteManager.add(sprite)
    }
  }

  removeSprite(sprite: Sprite) {
    const { spriteManager } = this
    if (spriteManager) {
      spriteManager.remove(sprite)
    }
  }

  private initializeSpriteConfig() {
    const props: StageProps = this.props as StageProps
    const { spriteConfig } = props
    if (spriteConfig && spriteConfig.forEach) {
      spriteConfig.forEach((config) => {
        const { classConstructor } = config
        const sprite = new classConstructor(config.props)
        this.addSprite(sprite as Sprite)
      })
    }
  }

  private clear() {
    const props: StageProps = this.props as StageProps
    const { canvas } = props
    const context2d: CanvasRenderingContext2D = canvas.getContext(
      '2d',
    ) as CanvasRenderingContext2D
    if (context2d == null) {
      return
    }
    const { width, height } = canvas
    context2d.clearRect(0, 0, width, height)
  }
}

export default Stage
