/**
 *
 * @author fuyg
 * @date  2019-07-18
 */
import isEqual from 'lodash.isequal'
import { rectTranslateWithCanvas } from '../utils/rectUtil'
import DrawableComponent from './DrawableComponent'
import PreRenderBox from './PreRenderBox'
import PreRenderData from './PreRenderData'
import SpriteProps from './SpriteProps'
import Stage from './Stage'

interface SpriteState extends SpriteProps {
  angle: number
}

class Sprite extends DrawableComponent {
  get zIndex(): number {
    const state: SpriteState = this.state as SpriteState
    const { zIndex } = state
    return zIndex
  }

  set zIndex(zIndex: number) {
    this.setState({
      zIndex,
    })
  }

  get x(): number {
    const state: SpriteState = this.state as SpriteState
    const { x } = state
    return x
  }

  set x(x: number) {
    this.setState({
      x,
    })
  }

  get context2d(): CanvasRenderingContext2D | null {
    const { stage } = this
    if (!stage) {
      return null
    }
    return stage.context2d
  }

  get preRenderBox(): PreRenderBox | null {
    const { stage } = this
    if (!stage) {
      return null
    }
    return stage.preRenderBox
  }

  get y(): number {
    const state: SpriteState = this.state as SpriteState
    const { y } = state
    return y
  }

  set y(y: number) {
    this.setState({
      y,
    })
  }

  get rotation(): number {
    const state: SpriteState = this.state as SpriteState
    return state.angle
  }

  set rotation(degree: number) {
    this.setState({
      angle: degree,
    })
  }

  parent: Sprite | null
  protected children: Sprite[]

  private stage: Stage | null
  private preRenderData: PreRenderData | null

  constructor(props: SpriteProps) {
    super(props)

    const theProps: SpriteProps = this.props as SpriteProps
    const state: SpriteState = {
      zIndex: theProps.zIndex,
      x: theProps.x,
      y: theProps.y,
      angle: 0,
    }
    this.state = state
    this.preRenderData = null
    this.stage = null
    this.parent = null
    this.children = []
  }

  addChild(sprite: Sprite) {
    const { children, stage } = this
    if (children.includes(sprite)) {
      return
    }

    sprite.setStage(stage)

    children.push(sprite)
    sprite.parent = this
    sprite.componentDidMount()
  }

  removeChild(sprite: Sprite) {
    const { children } = this
    if (children.includes(sprite)) {
      const newSpriteList = children.filter((item) => {
        return item !== sprite
      })
      sprite.componentWillUnmount()

      sprite.setStage(null)
      delete sprite.parent

      this.children = newSpriteList
    }
  }

  getDefaultProps(): SpriteProps | object {
    return {
      zIndex: 0,
      x: 0,
      y: 0,
    }
  }

  getPreRenderData() {
    const { preRenderData } = this
    return preRenderData
  }

  onPrerenderContextChange() {
    this.preRenderData = null
  }

  setStage(stage: Stage | null) {
    this.stage = stage
    const { children } = this
    children.forEach((item) => {
      item.setStage(stage)
    })
  }

  // action
  moveTo(x: number, y: number) {
    this.setState({
      x,
      y,
    })
  }

  preRenderIfNeeded(force = false) {
    const shouldRedraw = force || this.shouldRedraw()
    if (shouldRedraw) {
      this.preRender()
    }
  }

  drawDirectly(context2d: CanvasRenderingContext2D) {
    const { props, state } = this
    this.draw(context2d, state, props)
  }

  preRender(): boolean {
    const { preRenderBox } = this
    if (!preRenderBox) {
      return false
    }
    const data = preRenderBox.renderDrawable(this)
    this.preRenderData = data
    return data ? true : false
  }

  render() {
    const { children, preRenderBox } = this
    const cloneList: Sprite[] = [...children]

    cloneList.sort((a: Sprite, b: Sprite) => {
      const zIndexA = a.zIndex
      const zIndexB = b.zIndex
      if (zIndexA === zIndexB) {
        return 0
      }
      return zIndexA < zIndexB ? -1 : 0
    })

    const state = this.getState()

    cloneList.forEach((item: Sprite) => {
      item.render()
    })

    if (preRenderBox) {
      this.preRenderIfNeeded()
    }
    this.renderSprite(this)
    this.setPrevState(state)
  }

  callOnEnterFrame() {
    const { children } = this
    children.forEach((item: Sprite) => {
      item.callOnEnterFrame()
    })

    this.onEnterFrame()
  }

  // life cycle - for sprite itself
  onEnterFrame() {
    // this method should be implemented by subclass
  }

  getStageSize() {
    const { stage } = this
    if (stage) {
      const { size } = stage
      return size
    }
  }

  getSelfDrawIgnoredStateNames(): string[] {
    const names: string[] = ['rotation', 'x', 'y']
    return names
  }

  protected shouldRedraw(): boolean {
    const { state, prevState, preRenderBox, preRenderData } = this
    if (!preRenderBox) {
      return false
    }
    if (!preRenderData) {
      return true
    }
    const cloneState: any = Object.assign({}, state)
    const clonePrevState: any = Object.assign({}, prevState)
    const names = this.getSelfDrawIgnoredStateNames()
    names.forEach((name: string) => {
      delete cloneState[name]
      delete clonePrevState[name]
    })

    return !isEqual(cloneState, clonePrevState)
  }

  private renderSprite(sprite: Sprite) {
    const { preRenderBox } = sprite
    if (preRenderBox) {
      this.renderSpriteWithPreRender(sprite)
    } else {
      this.renderSpriteDirectly(sprite)
    }
  }

  private renderSpriteWithPreRender(sprite: Sprite) {
    const preRendered = sprite.getPreRenderData()
    const { context2d } = sprite
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
    if (!sprite || !sprite.drawDirectly) {
      throw new Error('no sprite or sprite.drawDirectly')
    }
    const { context2d } = sprite
    if (!context2d) {
      throw new Error('no context2d')
    }
    context2d.save()
    sprite.drawDirectly(context2d)
    context2d.restore()
  }
}

export default Sprite
