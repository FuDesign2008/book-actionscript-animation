/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import cloneDeep from 'lodash.clonedeep'

class GraphicComponent {
  protected state: object
  protected prevState: object
  protected props: object
  protected context2d: CanvasRenderingContext2D | null

  constructor(props: any) {
    this.props = Object.assign({}, props)
    this.prevState = {}
    this.state = {}
    this.context2d = null
  }

  setContext2d(context2d: CanvasRenderingContext2D | null) {
    this.context2d = context2d
  }

  setState(data: object | ((state: object, props: object) => object | null)) {
    const { state, prevState, props } = this
    let dataAsObject = null
    if (typeof data === 'function') {
      const thePrevSate = Object.assign({}, state, prevState)
      dataAsObject = data(thePrevSate, props)
    } else {
      dataAsObject = data
    }
    const newState = Object.assign({}, state, dataAsObject)
    this.state = newState
  }

  runDraw() {
    const { context2d, state } = this
    // if (context2d && !isEqual(state, prevState)) {
    if (context2d) {
      const cloneState = cloneDeep(state)
      context2d.save()
      this.draw(context2d, state)
      context2d.restore()
      this.prevState = cloneState
    }
  }

  draw(_context2d: CanvasRenderingContext2D, _state: object) {
    // do draw....
  }

  // life cycle

  onEnterFrame() {
    // should build new state and call setState() method
  }

  componentDidMount() {
    // TODO
  }

  componentWillUnmount() {
    // TODO
  }

  remove() {
    // TODO
  }
}

export { GraphicComponent }
