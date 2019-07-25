/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import isEqual from 'lodash.isequal'
import Component from './Component'

class DrawableComponent extends Component {
  // constructor(props: any) {
  // super(props)
  // }

  draw(_context2d: CanvasRenderingContext2D, _state: object, _props?: object) {
    // do draw....
  }

  protected shouldRedraw(): boolean {
    const { state, prevState } = this
    return !isEqual(state, prevState)
  }
}

export default DrawableComponent
