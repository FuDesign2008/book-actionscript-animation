/**
 *
 * @author fuyg
 * @date  2019-06-20
 */

import React, { Component } from 'react'
import { buildGraphic } from '../../graphic/factory'
import GraphicManager from '../../graphic/GraphicManager'

interface GraphicCavansProps {
  width: number
  height: number
  graphicConfig: any[]
}

interface GraphicCanvasState {
  width: number
  height: number
  lastDrawTime: number
}

class GraphicCanvas extends Component<GraphicCavansProps, GraphicCanvasState> {
  static defaultProps: GraphicCavansProps = {
    width: 400,
    height: 400,
    graphicConfig: [],
  }

  graphicManager: GraphicManager | null

  constructor(props: GraphicCavansProps) {
    super(props)
    this.graphicManager = null
    this.state = {
      width: props.width,
      height: props.height,
      lastDrawTime: 0,
    }
    this.onWinResize = this.onWinResize.bind(this)
    this.onEnterFrame = this.onEnterFrame.bind(this)
  }

  render() {
    const state: GraphicCanvasState = this.state
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
    const context2d: CanvasRenderingContext2D = canvas.getContext(
      '2d',
    ) as CanvasRenderingContext2D

    const graphicManager = (this.graphicManager = new GraphicManager(context2d))
    const { graphicConfig } = this.props
    graphicConfig.forEach((config) => {
      const { graphicClass, props } = config
      buildGraphic(graphicManager, graphicClass, props)
    })

    window.addEventListener('resize', this.onWinResize, false)
    window.requestAnimationFrame(this.onEnterFrame)
  }

  private onWinResize() {
    const { innerWidth, innerHeight } = window
    this.setState({
      width: innerWidth,
      height: innerHeight,
    })
  }

  private clearCanvas() {
    const canvas: HTMLCanvasElement = this.refs.canvas as HTMLCanvasElement
    const context2d: CanvasRenderingContext2D = canvas.getContext(
      '2d',
    ) as CanvasRenderingContext2D
    if (context2d == null) {
      return
    }
    const { width, height } = canvas
    context2d.clearRect(0, 0, width, height)
  }

  private onEnterFrame() {
    const { graphicManager } = this
    if (graphicManager) {
      this.clearCanvas()
      graphicManager.onEnterFrame()
    }
    window.requestAnimationFrame(this.onEnterFrame)
  }
}

export default GraphicCanvas
