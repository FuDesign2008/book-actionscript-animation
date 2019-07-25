/**
 *
 * @author fuyg
 * @date  2019-07-12
 */

import { rectTranslateWithCanvas } from '../utils/rectUtil'
import Component from './Component'
import PreRenderBox from './PreRenderBox'
import Sprite from './Sprite'
import Stage from './Stage'

interface SpriteManagerProps {
  stage: Stage
  context2d: CanvasRenderingContext2D
  preRenderBox: PreRenderBox | null
}

class SpriteManager extends Component {
  static create(
    stage: Stage,
    context2d: CanvasRenderingContext2D,
    preRenderBox: PreRenderBox | null = null,
  ) {
    const props: SpriteManagerProps = {
      stage,
      context2d,
      preRenderBox,
    }
    const manager: SpriteManager = new SpriteManager(props)
    return manager
  }

  private spriteList: Sprite[]

  constructor(props: SpriteManagerProps) {
    super(props)
    this.spriteList = []
  }

  add(sprite: Sprite) {
    const { spriteList } = this
    if (spriteList.includes(sprite)) {
      return
    }
    const props: SpriteManagerProps = this.props as SpriteManagerProps
    const { preRenderBox, stage } = props

    sprite.setStage(stage)
    sprite.setPreRenderBox(preRenderBox)
    sprite.remove = () => {
      this.remove(sprite)
    }

    spriteList.push(sprite)
    sprite.componentDidMount()
  }

  remove(sprite: Sprite) {
    const { spriteList } = this
    if (spriteList.includes(sprite)) {
      const newSpriteList = spriteList.filter((item) => {
        return item !== sprite
      })
      sprite.componentWillUnmount()

      sprite.setStage(null)
      sprite.setPreRenderBox(null)
      delete sprite.remove

      this.spriteList = newSpriteList
    }
  }

  onEnterFrame() {
    const { spriteList } = this
    spriteList.forEach((item: Sprite) => {
      item.onEnterFrame()
    })
  }

  runDraw() {
    const { spriteList } = this
    const cloneList: Sprite[] = [...spriteList]

    cloneList.sort((a: Sprite, b: Sprite) => {
      const zIndexA = a.zIndex
      const zIndexB = b.zIndex
      if (zIndexA === zIndexB) {
        return 0
      }
      return zIndexA < zIndexB ? -1 : 0
    })

    const props: SpriteManagerProps = this.props as SpriteManagerProps
    const { preRenderBox } = props

    cloneList.forEach((item: Sprite) => {
      const state = item.getState()
      if (preRenderBox) {
        item.preRenderIfNeeded()
      }
      this.renderSprite(item)
      item.setPrevState(state)
    })
  }

  onPrerenderContextChange() {
    const { spriteList } = this

    spriteList.forEach((item: Sprite) => {
      item.onPrerenderContextChange()
    })
  }

  private renderSprite(sprite: Sprite) {
    const props: SpriteManagerProps = this.props as SpriteManagerProps
    const { preRenderBox } = props
    if (preRenderBox) {
      this.renderSpriteWithPreRender(sprite)
    } else {
      this.renderSpriteDirectly(sprite)
    }
  }

  private renderSpriteWithPreRender(sprite: Sprite) {
    const preRendered = sprite.getPreRenderData()
    const props: SpriteManagerProps = this.props as SpriteManagerProps
    const { context2d } = props
    if (!preRendered || !context2d) {
      return
    }
    const { x, y } = sprite
    const { sourceRect, targetRect, canvas, state } = preRendered
    const dx = x - state.x
    const dy = y - state.y
    const sourceRectTranslated = rectTranslateWithCanvas(
      dx,
      dy,
      sourceRect,
      canvas,
    )
    const { width, height } = sourceRectTranslated

    context2d.drawImage(
      canvas,
      sourceRectTranslated.x,
      sourceRectTranslated.y,
      width,
      height,
      targetRect.x + dx,
      targetRect.y + dy,
      width,
      height,
    )
  }

  private renderSpriteDirectly(sprite: Sprite) {
    const props: SpriteManagerProps = this.props as SpriteManagerProps
    const { context2d } = props
    if (sprite && sprite.drawDirectly) {
      context2d.save()
      sprite.drawDirectly(context2d)
      context2d.restore()
    }
  }
}

export default SpriteManager
