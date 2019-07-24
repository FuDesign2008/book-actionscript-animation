/**
 *
 * @author fuyg
 * @date  2019-06-20
 */

import React, { Component } from 'react'
import { createStage } from '../core/factory'
import Stage from '../core/Stage'
import SpriteConfigItem from '../SpriteConfigItem'

interface CanvasStageProps {
  width: number
  height: number
  spriteConfig: SpriteConfigItem[]
}

interface CanvasStageState {
  [key: string]: any
}

class CanvasStage extends Component<CanvasStageProps, CanvasStageState> {
  static defaultProps: CanvasStageProps = {
    width: 400,
    height: 400,
    spriteConfig: [],
  }

  private stage: Stage | null

  constructor(props: CanvasStageProps) {
    super(props)
    this.state = {}
    this.onWinResize = this.onWinResize.bind(this)
    this.stage = null
  }

  render() {
    const props: CanvasStageProps = this.props
    return (
      <div>
        <canvas ref="canvas" width={props.width} height={props.height} />
      </div>
    )
  }

  componentDidMount() {
    const canvas: HTMLCanvasElement = this.refs.canvas as HTMLCanvasElement
    const { props } = this

    this.stage = createStage(canvas, props.spriteConfig, false)

    window.addEventListener('resize', this.onWinResize, false)
    this.matchWinSize()
  }

  private onWinResize() {
    this.matchWinSize()
  }

  private matchWinSize() {
    const { innerWidth, innerHeight } = window
    const { stage } = this
    if (stage) {
      stage.updateSize(innerWidth, innerHeight)
    }
  }
}

export default CanvasStage
