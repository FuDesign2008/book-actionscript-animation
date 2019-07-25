/**
 *
 * @author fuyg
 * @date  2019-07-12
 */

class Component {
  protected state: object
  protected prevState: object
  protected props: object

  constructor(props: any) {
    this.props = Object.assign({}, this.getDefaultProps(), props)
    this.prevState = {}
    this.state = {}
  }

  getDefaultProps(): object {
    return {}
  }

  setState(data: object | ((state: object, props: object) => object | null)) {
    const { state, prevState, props } = this
    let dataAsObject: any = null
    if (typeof data === 'function') {
      const thePreState = Object.assign({}, state, prevState)
      dataAsObject = data(thePreState, props)
    } else {
      dataAsObject = data
    }
    if (dataAsObject != null && typeof dataAsObject === 'object') {
      const newState: any = Object.assign({}, state)
      Object.keys(state).forEach((name: string) => {
        const value = dataAsObject[name]
        if (value !== undefined) {
          newState[name] = value
        }
      })
      this.state = newState
    }
  }

  getState(): object {
    const { state } = this
    const clone = Object.assign({}, state)
    return clone
  }

  getProps(): object {
    const { props } = this
    const clone = Object.assign({}, props)
    return clone
  }

  setPrevState(state: object) {
    this.prevState = state
  }

  componentDidMount() {
    // TODO
  }

  componentWillUnmount() {
    // TODO
  }
}

export default Component
