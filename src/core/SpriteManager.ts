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
  preRenderContext: CanvasRenderingContext2D
}

class SpriteManager extends Component {
  static create(
    stage: Stage,
    context2d: CanvasRenderingContext2D,
    preRenderContext: CanvasRenderingContext2D,
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
    const cloneList: Sprite[] = [...spriteList]

    cloneList.sort((a: Sprite, b: Sprite) => {
      const zIndexA = a.zIndex
      const zIndexB = b.zIndex
      if (zIndexA === zIndexB) {
        return 0
      }
      return zIndexA < zIndexB ? -1 : 0
    })

    cloneList.forEach((item: Sprite) => {
      // life cycle
      item.onEnterFrame()

      item.preRenderIfNeeded()
      this.renderSprite(item)
    })
  }

  onPrerenderContextChange() {
    const { spriteList } = this

    spriteList.forEach((item: Sprite) => {
      item.onPrerenderContextChange()
      item.preRender()
    })
  }

  private renderSprite(sprite: Sprite) {
    const imageData = sprite.getPreRenderImageData()
    const props: SpriteManagerProps = this.props as SpriteManagerProps
    const { context2d } = props
    if (!imageData || !context2d) {
      return
    }
    const { x, y } = sprite
    context2d.putImageData(imageData, x, y)
  }
}

export default SpriteManager
