/**
 *
 * @author fuyg
 * @date  2019-07-18
 */

function clearCanvas(context2d: CanvasRenderingContext2D | null): boolean {
  if (context2d && context2d.canvas) {
    const canvas: HTMLCanvasElement = context2d.canvas
    const { width, height } = canvas
    context2d.clearRect(0, 0, width, height)
    return true
  }
  return false
}

function getBitmapData(context2d: CanvasRenderingContext2D): ImageData {
  // TODO
  const canvas: HTMLCanvasElement = context2d.canvas
  const { width, height } = canvas
  return context2d.getImageData(0, 0, width, height)
}

export { clearCanvas, getBitmapData }
