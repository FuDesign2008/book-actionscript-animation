/**
 *
 * @author fuyg
 * @date  2019-06-20
 */

import React, { Component } from 'react'
import { createStage } from '../core/factory'
import SpriteConfigItem from '../SpriteConfigItem'

interface CanvasStageProps {
  width: number
  height: number
  spriteConfig: SpriteConfigItem[]
}

interface CanvasStageState {
  width: number
  height: number
}

class CanvasStage extends Component<CanvasStageProps, CanvasStageState> {
  static defaultProps: CanvasStageProps = {
    width: 400,
    height: 400,
    spriteConfig: [],
  }

  constructor(props: CanvasStageProps) {
    super(props)
    this.state = {
      width: props.width,
      height: props.height,
    }
    this.onWinResize = this.onWinResize.bind(this)
  }

  render() {
    const state: CanvasStageState = this.state
    const styles = {
      border: '1px solid #CCC',
    }
    return (
      <div>
        <canvas
          ref="canvas"
          width={state.width}
          height={state.height}
          style={styles}
        />
      </div>
    )
  }

  componentDidMount() {
    this.matchWinSize()

    const canvas: HTMLCanvasElement = this.refs.canvas as HTMLCanvasElement
    const { props } = this

    createStage(canvas, props.spriteConfig, true)

    window.addEventListener('resize', this.onWinResize, false)
  }

  private onWinResize() {
    this.matchWinSize()
  }

  private matchWinSize() {
    const { innerWidth, innerHeight } = window
    if (innerWidth) {
      return
    }
    this.setState({
      width: innerWidth,
      height: innerHeight,
    })
  }
}

export default CanvasStage
