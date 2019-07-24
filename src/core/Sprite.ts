/**
 *
 * @author fuyg
 * @date  2019-07-18
 */
import isEqual from 'lodash.isequal'
import { clearCanvas, getBitmapData } from '../utils/context2d'
import RectImageData from '../utils/RectImageData'
import DrawableComponent from './DrawableComponent'
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

  private stage: Stage | null
  private preRenderImage: RectImageData | null
  private preRenderContext: CanvasRenderingContext2D | null

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
    this.preRenderImage = null
    this.preRenderContext = null
    this.stage = null
  }

  getDefaultProps(): SpriteProps | object {
    return {
      zIndex: 0,
      x: 0,
      y: 0,
    }
  }

  setPreRenderCanvas(context: CanvasRenderingContext2D | null) {
    this.preRenderContext = context
  }

  getPreRenderImage() {
    const { preRenderImage } = this
    return preRenderImage
  }

  onPrerenderContextChange() {
    this.preRenderImage = null
  }

  setStage(stage: Stage | null) {
    this.stage = stage
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
    const { preRenderContext, state, props } = this

    const isSuccess = clearCanvas(preRenderContext)
    if (!isSuccess) {
      return false
    }

    if (this.draw && preRenderContext) {
      preRenderContext.save()
      this.draw(preRenderContext, state, props)
      preRenderContext.restore()

      const rectImageData = getBitmapData(preRenderContext)
      this.preRenderImage = rectImageData
      this.prevState = state

      return true
    }
    return false
  }

  remove() {
    // do nothing
  }

  // life cycle
  onEnterFrame() {
    // TODO
  }

  getStageSize() {
    const { stage } = this
    if (stage) {
      const { size } = stage
      return size
    }
  }

  protected getSelfDrawIgnoredStateNames(): string[] {
    const names: string[] = ['rotation', 'x', 'y']
    return names
  }

  protected shouldRedraw(): boolean {
    const { state, prevState } = this
    const cloneState: any = Object.assign({}, state)
    const clonePrevState: any = Object.assign({}, prevState)
    const names = this.getSelfDrawIgnoredStateNames()
    names.forEach((name: string) => {
      delete cloneState[name]
      delete clonePrevState[name]
    })

    return !isEqual(cloneState, clonePrevState)
  }
}

export default Sprite
