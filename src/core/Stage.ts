/**
 *
 * @author fuyg
 * @date  2019-07-18
 */

import isEqual from 'lodash.isequal'
import SpriteConfigItem from '../SpriteConfigItem'
import { clearCanvas } from '../utils/context2d'
import Component from './Component'
import PreRenderBox from './PreRenderBox'
import Sprite from './Sprite'
import StageProps from './StageProps'

interface StageState {
  width: number
  height: number
  isPlay: boolean
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

  get context2d(): CanvasRenderingContext2D | null {
    const props: StageProps = this.props as StageProps
    const { canvas } = props
    if (!canvas) {
      return null
    }

    const context2d = canvas.getContext('2d')
    return context2d
  }

  preRenderBox: PreRenderBox | null

  private rootSprite: Sprite | null

  constructor(props: StageProps) {
    super(props)

    const { width, height } = this.size

    const initialState: StageState = {
      width,
      height,
      isPlay: true,
    }
    this.state = initialState

    this.preRenderBox = null
    const theProps: StageProps = this.props as StageProps
    if (theProps.usePreRender) {
      this.preRenderBox = new PreRenderBox(width, height)
    }

    this.rootSprite = null
    const { canvas } = props
    const context2d = canvas.getContext('2d')
    if (context2d) {
      const rootSprite = new Sprite({
        zIndex: 0,
        x: 0,
        y: 0,
      })
      rootSprite.setStage(this)
      this.rootSprite = rootSprite
    }

    this.initializeSpriteConfig()

    this.onEnterFrame = this.onEnterFrame.bind(this)
    window.requestAnimationFrame(this.onEnterFrame)
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
    const state: StageState = this.state as StageState
    const { prevState } = this
    const { isPlay } = state
    if (isPlay) {
      this.checkState()

      const props: StageProps = this.props as StageProps
      const { usePreRender, canvas } = props
      const { rootSprite, preRenderBox } = this
      if (rootSprite) {
        rootSprite.callOnEnterFrame()

        if (usePreRender) {
          if (!isEqual(state, prevState)) {
            if (preRenderBox && canvas) {
              preRenderBox.updateSize(canvas.width, canvas.height)
            }
            rootSprite.onPrerenderContextChange()
          }
        }
        this.clear()
        rootSprite.render()
      }
    }

    this.prevState = Object.assign({}, state)
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
    const { rootSprite } = this
    if (rootSprite) {
      rootSprite.addChild(sprite)
    }
  }

  removeSprite(sprite: Sprite) {
    const { rootSprite } = this
    if (rootSprite) {
      rootSprite.removeChild(sprite)
    }
  }

  togglePlay() {
    this.setState((state: StageState) => {
      const { isPlay } = state
      return {
        isPlay: !isPlay,
      }
    })
  }

  private initializeSpriteConfig() {
    const props: StageProps = this.props as StageProps
    const { spriteConfig } = props
    const { rootSprite } = this
    if (rootSprite && spriteConfig) {
      this.initializeSpriteArray(spriteConfig, rootSprite)
    }
  }

  private initializeSpriteArray(configList: any[], parent: Sprite) {
    if (configList && configList.forEach) {
      configList.forEach((item) => {
        if (Array.isArray(item)) {
          const newSprite = new Sprite({
            x: 0,
            y: 0,
            zIndex: 0,
          })
          parent.addChild(newSprite)
          this.initializeSpriteArray(item as any[], newSprite)
        } else {
          this.initializeSpriteConfigOne(item as SpriteConfigItem, parent)
        }
      })
    }
  }

  private initializeSpriteConfigOne(config: SpriteConfigItem, parent: Sprite) {
    const { classConstructor } = config
    const sprite = new classConstructor(config.props)
    parent.addChild(sprite as Sprite)
  }

  private clear() {
    const props: StageProps = this.props as StageProps
    const { canvas } = props
    const context2d = canvas.getContext('2d')
    clearCanvas(context2d)
  }
}

export default Stage
