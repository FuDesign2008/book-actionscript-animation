/**
 *
 * @author fuyg
 * @date  2019-06-20
 */

import React, { Component } from 'react'
import { Base } from '../../graphic/Base'
import EasingGraphic from '../../graphic/Easing'
import { buildGraphic } from '../../graphic/factory'
import Manager from '../../graphic/Manager'

interface EasingProps {
  width: number
  height: number
}

type BaseConstructor = new (props: any) => Base

interface EasingState {
  width: number
  height: number
  lastDrawTime: number
}

interface GraphicConfigItem {
  graphicClass: BaseConstructor
  props: any
}

const graphicConfig: GraphicConfigItem[] = [
  {
    graphicClass: EasingGraphic,
    props: {
      easing: 0.05,
    },
  },
  {
    graphicClass: EasingGraphic,
    props: {
      easing: 0.1,
    },
  },
  {
    graphicClass: EasingGraphic,
    props: {
      easing: 0.2,
    },
  },
]

class Easing extends Component<EasingProps, EasingState> {
  static defaultProps: EasingProps = {
    width: 400,
    height: 400,
  }

  manager: Manager | null

  constructor(props: EasingProps) {
    super(props)
    this.manager = null
    this.state = {
      width: props.width,
      height: props.height,
      lastDrawTime: 0,
    }
    this.onWinResize = this.onWinResize.bind(this)
    this.onEnterFrame = this.onEnterFrame.bind(this)
  }

  // get centerX() {
  // const props: EasingProps = this.props
  // return props.width / 2
  // }

  render() {
    const state: EasingState = this.state
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

    const manager = (this.manager = new Manager(context2d))
    graphicConfig.forEach((config) => {
      const { graphicClass, props } = config
      const graphic = buildGraphic(manager, graphicClass, props)
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

  private logInterval() {
    const now = Date.now()
    const { lastDrawTime } = this.state

    this.setState({
      lastDrawTime: now,
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
    const { manager } = this
    if (manager) {
      this.clearCanvas()
      manager.onEnterFrame()
    }
    window.requestAnimationFrame(this.onEnterFrame)
  }
}

export default Easing
