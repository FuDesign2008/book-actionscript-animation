/**
 *
 * @author fuyg
 * @date  2019-07-25
 */

import Rect from '../types/Rect'

function intersectionLineSingle(
  start: number,
  end: number,
  start1: number,
  end1: number,
): number[] | null {
  if (start1 >= start && end1 <= end) {
    return [start1, end1]
  }
  if (end1 >= start && start1 <= start) {
    return [start, end1]
  }
  if (start1 <= end && end1 >= end) {
    return [start1, end]
  }
  return null
}

function intersectionLine(
  start1: number,
  end1: number,
  start2: number,
  end2: number,
) {
  return (
    intersectionLineSingle(start1, end1, start2, end2) ||
    intersectionLineSingle(start2, end2, start1, end1)
  )
}

function intersectionRect(a: Rect, b: Rect): Rect | null {
  if (!a || !b) {
    return null
  }
  const intersectionX = intersectionLine(a.x, a.x + a.width, b.x, b.x + b.width)
  const intersectionY = intersectionLine(
    a.y,
    a.y + a.height,
    b.y,
    b.y + b.height,
  )
  if (!intersectionX || !intersectionY) {
    return null
  }

  const rect: Rect = {
    x: intersectionX[0],
    y: intersectionY[0],
    width: intersectionX[1] - intersectionX[0],
    height: intersectionY[1] - intersectionY[0],
  }
  return rect
}

function rectTranslateWithCanvas(
  dx: number,
  dy: number,
  rect: Rect,
  canvas: HTMLCanvasElement,
): Rect {
  const x = rect.x < dx ? 0 : rect.x - dx
  const y = rect.y < dx ? 0 : rect.y - dy
  const dxReal = rect.x - x
  const dyReal = rect.y - y
  const { width, height } = canvas
  const widthReal = Math.min(width, rect.width + dxReal)
  const heightReal = Math.min(height, rect.height + dyReal)
  return {
    x,
    y,
    width: widthReal,
    height: heightReal,
  }
}

export { intersectionRect, rectTranslateWithCanvas }
