/**
 *
 * @author fuyg
 * @date  2019-07-18
 */
import Rect from './Rect'
import RectImageData from './RectImageData'

function clearCanvas(context2d: CanvasRenderingContext2D | null): boolean {
  if (context2d && context2d.canvas) {
    const canvas: HTMLCanvasElement = context2d.canvas
    const { width, height } = canvas
    context2d.clearRect(0, 0, width, height)
    return true
  }
  return false
}

function getBitmapData(context2d: CanvasRenderingContext2D): RectImageData {
  const canvas: HTMLCanvasElement = context2d.canvas
  const { width, height } = canvas
  const imageData = context2d.getImageData(0, 0, width, height)
  const rect: Rect = {
    x: 0,
    y: 0,
    width,
    height,
  }

  return {
    rect,
    imageData,
  }
}

export { clearCanvas, getBitmapData }
