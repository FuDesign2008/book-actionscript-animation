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
  isPlay: boolean
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
    this.state = {
      isPlay: true,
    }
    this.onWinResize = this.onWinResize.bind(this)
    this.stage = null
    this.onTogglePlay = this.onTogglePlay.bind(this)
  }

  render() {
    const { state, props } = this
    const buttonStyles = {
      position: 'absolute',
      top: 0,
      right: 0,
    } as React.CSSProperties
    return (
      <div>
        <button onClick={this.onTogglePlay} style={buttonStyles}>
          {state.isPlay ? '暂停' : '播放'}
        </button>
        <canvas ref="canvas" width={props.width} height={props.height} />
      </div>
    )
  }

  componentDidMount() {
    const canvas: HTMLCanvasElement = this.refs.canvas as HTMLCanvasElement
    const { props } = this

    this.stage = createStage(canvas, props.spriteConfig, true)

    window.addEventListener('resize', this.onWinResize, false)
    this.matchWinSize()
  }

  componentWillMount() {
    // TODO destroy this.stage
    // call this.stage.componentWillMount()
    window.removeEventListener('resize', this.onWinResize, false)
  }

  private onTogglePlay() {
    this.setState((state: CanvasStageState) => {
      const { isPlay } = state
      return {
        isPlay: !isPlay,
      }
    })
    const { stage } = this
    if (stage) {
      stage.togglePlay()
    }
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
