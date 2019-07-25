// taken from https://gist.github.com/remy/784508

// MIT http://rem.mit-license.org

/**
 *
 * @author fuyg
 * @date  2019-07-25
 */

import PreRenderData from './PreRenderData'
import Rect from './Rect'

function trimCanvas(c: HTMLCanvasElement): PreRenderData | null {
  const ctx = c.getContext('2d')
  if (!ctx) {
    return null
  }
  const copyCanvas = document.createElement('canvas')
  const copy = copyCanvas.getContext('2d')
  if (!copy) {
    return null
  }
  const pixels = ctx.getImageData(0, 0, c.width, c.height)
  const l = pixels.data.length
  const bound = {
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
  }

  for (let i = 0; i < l; i += 4) {
    if (pixels.data[i + 3] !== 0) {
      const x = (i / 4) % c.width
      // tslint:disable-next-line:no-bitwise
      const y = ~~(i / 4 / c.width)

      if (bound.top === -1) {
        bound.top = y
      }

      if (bound.left === -1) {
        bound.left = x
      } else if (x < bound.left) {
        bound.left = x
      }

      if (bound.right === -1) {
        bound.right = x
      } else if (bound.right < x) {
        bound.right = x
      }

      if (bound.bottom === -1) {
        bound.bottom = y
      } else if (bound.bottom < y) {
        bound.bottom = y
      }
    }
  }

  const trimHeight = bound.bottom - bound.top
  const trimWidth = bound.right - bound.left
  const trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight)

  copyCanvas.width = trimWidth
  copyCanvas.height = trimHeight
  copy.putImageData(trimmed, 0, 0)

  const rect: Rect = {
    x: bound.left,
    y: bound.top,
    width: trimWidth,
    height: trimHeight,
  }

  return {
    rect,
    canvas: copyCanvas,
  }
}

export default trimCanvas
