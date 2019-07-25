/**
 *
 * @author fuyg
 * @date  2019-07-25
 */

import { clearCanvas } from '../utils/context2d'
import { intersectionRect } from '../utils/rectUtil'
import trimCanvas from '../utils/trimCanvas'
import DrawableComponent from './DrawableComponent'
import PreRenderData from './PreRenderData'

class PreRenderBox {
  context2d: CanvasRenderingContext2D | null
  private width: number
  private height: number
  private canvas: HTMLCanvasElement

  constructor(width: number, height: number) {
    this.width = width
    this.height = height

    this.canvas = document.createElement('canvas') as HTMLCanvasElement
    this.context2d = this.canvas.getContext('2d')
    this.updateSize(this.width, this.height)
  }

  updateSize(width: number, height: number) {
    const { canvas } = this
    canvas.width = Math.ceil(width * 1.5)
    canvas.height = Math.ceil(height * 1.5)
    this.width = width
    this.height = height
  }

  renderDrawable(drawable: DrawableComponent): PreRenderData | null {
    const { context2d, width, height, canvas } = this
    if (!drawable || !drawable.draw || !context2d) {
      return null
    }
    const isSuccess = clearCanvas(context2d)
    if (!isSuccess) {
      return null
    }

    const translateX = canvas.width - width
    const translateY = canvas.height - height
    context2d.save()
    context2d.translate(translateX, translateY)
    const state = drawable.getState()
    const props = drawable.getProps()
    drawable.draw(context2d, state, props)
    context2d.restore()

    const trimed = trimCanvas(canvas)
    if (!trimed) {
      return null
    }
    const { rect } = trimed
    const stageRect = {
      x: translateX,
      y: translateY,
      width,
      height,
    }

    const inStageRect = intersectionRect(stageRect, rect)
    if (!inStageRect) {
      return null
    }
    const data: PreRenderData = {
      canvas: trimed.canvas,

      sourceRect: {
        x: inStageRect.x - rect.x,
        y: inStageRect.y - rect.y,
        width: inStageRect.width,
        height: inStageRect.height,
      },
      targetRect: {
        x: inStageRect.x - translateX,
        y: inStageRect.y - translateY,
        width: inStageRect.width,
        height: inStageRect.height,
      },
      state,
      props,
    }

    return data
  }
}

export default PreRenderBox
