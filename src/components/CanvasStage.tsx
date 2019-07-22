/**
 *
 * @author fuyg
 * @date  2019-06-20
 */

import React, { Component } from 'react'
import { createStage } from '../core/factory'

interface GraphicCavansProps {
  width: number
  height: number
}

interface CanvasStageState {
  width: number
  height: number
}

class CanvasStage extends Component<GraphicCavansProps, CanvasStageState> {
  static defaultProps: GraphicCavansProps = {
    width: 400,
    height: 400,
  }

  constructor(props: GraphicCavansProps) {
    super(props)
    this.state = {
      width: props.width,
      height: props.height,
    }
    this.onWinResize = this.onWinResize.bind(this)
  }

  render() {
    const state: CanvasStageState = this.state
    return (
      <div>
        <canvas ref="canvas" width={state.width} height={state.height} />
      </div>
    )
  }

  componentDidMount() {
    const { innerWidth, innerHeight } = window
    this.setState({
      width: innerWidth,
      height: innerHeight,
    })

    const canvas: HTMLCanvasElement = this.refs.canvas as HTMLCanvasElement

    createStage(canvas)

    window.addEventListener('resize', this.onWinResize, false)
  }

  private onWinResize() {
    const { innerWidth, innerHeight } = window
    this.setState({
      width: innerWidth,
      height: innerHeight,
    })
  }
}

export default CanvasStage
