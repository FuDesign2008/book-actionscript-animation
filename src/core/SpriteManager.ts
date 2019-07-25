/**
 *
 * @author fuyg
 * @date  2019-07-12
 */

import Component from './Component'
import Sprite from './Sprite'
import Stage from './Stage'

interface SpriteManagerProps {
  stage: Stage
  context2d: CanvasRenderingContext2D
  preRenderContext: CanvasRenderingContext2D | null
}

class SpriteManager extends Component {
  static create(
    stage: Stage,
    context2d: CanvasRenderingContext2D,
    preRenderContext: CanvasRenderingContext2D | null = null,
  ) {
    const props: SpriteManagerProps = {
      stage,
      context2d,
      preRenderContext,
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
    const { preRenderContext, stage } = props

    sprite.setStage(stage)
    sprite.setPreRenderCanvas(preRenderContext)
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
      sprite.setPreRenderCanvas(null)
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
    const { preRenderContext } = props

    cloneList.forEach((item: Sprite) => {
      if (preRenderContext) {
        item.preRenderIfNeeded()
      }
      this.renderSprite(item)
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
    const { preRenderContext } = props
    if (preRenderContext) {
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
    const { rect, canvas } = preRendered
    if (rect && canvas) {
      context2d.drawImage(
        canvas,
        0,
        0,
        rect.width,
        rect.height,
        rect.x,
        rect.y,
        rect.width,
        rect.height,
      )
    }
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
