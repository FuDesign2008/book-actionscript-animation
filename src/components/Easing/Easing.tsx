/**
 *
 * @author fuyg
 * @date  2019-06-20
 */

import React, { Component } from 'react'

interface EasingProps {
  width: number
  height: number
  easing: number
}

interface EasingState {
  width: number
  height: number
  ballX: number
  ballY: number
  targetX: number
  targetY: number
  lastDrawTime: number
}

class Easing extends Component<EasingProps, EasingState> {
  static defaultProps: EasingProps = {
    width: 400,
    height: 400,
    easing: 0.05,
  }

  constructor(props: EasingProps) {
    super(props)
    this.state = {
      width: props.width,
      height: props.height,
      ballX: 0,
      ballY: 0,
      targetX: 0,
      targetY: 0,
      lastDrawTime: 0,
    }
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onWinResize = this.onWinResize.bind(this)
    this.onEnterFrame = this.onEnterFrame.bind(this)
  }

  onMouseMove(event: MouseEvent) {
    const { clientX, clientY } = event
    this.setState({
      targetX: clientX,
      targetY: clientY,
    })
  }

  onWinResize() {
    const { innerWidth, innerHeight } = window
    this.setState({
      width: innerWidth,
      height: innerHeight,
    })
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
    window.addEventListener('mousemove', this.onMouseMove, false)
    window.addEventListener('resize', this.onWinResize, false)
    window.requestAnimationFrame(this.onEnterFrame)
  }

  onEnterFrame() {
    this.updateBallPosition()
    this.drawBall()
    window.requestAnimationFrame(this.onEnterFrame)
  }

  updateBallPosition() {
    this.setState((state: EasingState, props: EasingProps) => {
      const { ballX, ballY, targetX, targetY } = state
      const { easing } = props

      return {
        ballX: ballX + (targetX - ballX) * easing,
        ballY: ballY + (targetY - ballY) * easing,
      }
    })
  }

  logInterval() {
    const now = Date.now()
    const { lastDrawTime } = this.state

    this.setState({
      lastDrawTime: now,
    })
  }

  drawBall() {
    const canvas: HTMLCanvasElement = this.refs.canvas as HTMLCanvasElement
    const context2d: CanvasRenderingContext2D = canvas.getContext(
      '2d',
    ) as CanvasRenderingContext2D
    if (context2d == null) {
      return
    }
    const { width, height } = canvas
    const { ballX, ballY } = this.state
    context2d.clearRect(0, 0, width, height)
    context2d.save()
    context2d.beginPath()
    context2d.arc(ballX, ballY, 2, 0, Math.PI * 2, false)
    context2d.fill()
    context2d.restore()
  }
}

export default Easing
