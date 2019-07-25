// taken from https://gist.github.com/remy/784508

// MIT http://rem.mit-license.org

/**
 *
 * @author fuyg
 * @date  2019-07-25
 */

import { getBitmapData } from './context2d'
import RectCanvas from './RectCanvas'

function trimCanvas(c: HTMLCanvasElement): RectCanvas | null {
  const ctx = c.getContext('2d')
  if (!ctx) {
    return null
  }
  const copyCanvas = document.createElement('canvas')
  const copy = copyCanvas.getContext('2d')
  if (!copy) {
    return null
  }

  const trimed = getBitmapData(ctx)
  if (!trimed) {
    return null
  }
  const { rect, imageData } = trimed

  copyCanvas.width = rect.width
  copyCanvas.height = rect.height
  copy.putImageData(imageData, 0, 0)

  return {
    rect,
    canvas: copyCanvas,
  }
}

export default trimCanvas
