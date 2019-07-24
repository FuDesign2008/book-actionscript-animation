/**
 *
 * @author fuyg
 * @date  2019-07-18
 */
import LogWithCount from './LogWithCount'
import Point from './Point'
import Rect from './Rect'
import RectImageData from './RectImageData'

const logWithCount = new LogWithCount(100)

function clearCanvas(context2d: CanvasRenderingContext2D | null): boolean {
  if (context2d && context2d.canvas) {
    const canvas: HTMLCanvasElement = context2d.canvas
    const { width, height } = canvas
    context2d.clearRect(0, 0, width, height)
    return true
  }
  return false
}

function findMinXPoint(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  xBlockCount: number,
  yBlockCount: number,
  blockWidth: number,
  blockHeight: number,
): Point | null {
  for (let xBlockIndex = 0; xBlockIndex < xBlockCount; xBlockIndex++) {
    for (let yBlockIndex = 0; yBlockIndex < yBlockCount; yBlockIndex++) {
      for (let xIndex = 0; xIndex < blockWidth; xIndex++) {
        for (let yIndex = 0; yIndex < blockHeight; yIndex++) {
          const absX = xBlockIndex * blockWidth + xIndex
          const absY = yBlockIndex * blockHeight + yIndex
          if (absX < width && absY < height) {
            const alphaIndex = (absY * width + absX) * 4 + 3
            const alpha = data[alphaIndex]
            if (alpha > 0) {
              return {
                x: absX,
                y: absY,
              }
            }
          }
        }
      }
    }
  }
  return null
}

function findMinYPoint(
  data: Uint8ClampedArray,
  width: number,
  _height: number,
  xBlockCount: number,
  _yBlockCount: number,
  blockWidth: number,
  blockHeight: number,
  minXPoint: Point,
): Point {
  const { y } = minXPoint
  const blockIndexY = Math.ceil(y / blockHeight)

  for (let yBlockIndex = 0; yBlockIndex <= blockIndexY; yBlockIndex++) {
    for (let xBlockIndex = 0; xBlockIndex < xBlockCount; xBlockIndex++) {
      for (let yIndex = 0; yIndex < blockHeight; yIndex++) {
        for (let xIndex = 0; xIndex < blockWidth; xIndex++) {
          const absX = xBlockIndex * blockWidth + xIndex
          const absY = yBlockIndex * blockHeight + yIndex
          if (absY < y) {
            const alphaIndex = (absY * width + absX) * 4 + 3
            const alpha = data[alphaIndex]
            if (alpha > 0) {
              return {
                x: absX,
                y: absY,
              }
            }
          }
        }
      }
    }
  }

  return minXPoint
}

function findMaxXPoint(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  xBlockCount: number,
  yBlockCount: number,
  blockWidth: number,
  blockHeight: number,
  minXPoint: Point,
  minYPoint: Point,
): Point {
  const { x } = minXPoint
  const { y } = minYPoint
  const blockIndexY = Math.floor(y / blockHeight)
  const blockIndexX = Math.floor(x / blockWidth)

  for (
    let xBlockIndex = xBlockCount - 1;
    xBlockIndex >= blockIndexX;
    xBlockIndex--
  ) {
    for (
      let yBlockIndex = yBlockCount - 1;
      yBlockIndex >= blockIndexY;
      yBlockIndex--
    ) {
      for (let xIndex = blockWidth - 1; xIndex >= 0; xIndex--) {
        for (let yIndex = blockHeight - 1; yIndex >= 0; yIndex--) {
          const absX = xBlockIndex * blockWidth + xIndex
          const absY = yBlockIndex * blockHeight + yIndex
          if (absX > x && absX < width && absY < height) {
            const alphaIndex = (absY * width + absX) * 4 + 3
            const alpha = data[alphaIndex]
            if (alpha > 0) {
              return {
                x: absX,
                y: absY,
              }
            }
          }
        }
      }
    }
  }

  return minXPoint
}

function findMaxYPoint(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  xBlockCount: number,
  yBlockCount: number,
  blockWidth: number,
  blockHeight: number,
  minXPoint: Point,
  minYPoint: Point,
): Point {
  const { y } = minYPoint
  const { x } = minXPoint
  const blockIndexY = Math.floor(y / blockHeight)
  const blockIndexX = Math.floor(x / blockWidth)

  for (
    let yBlockIndex = yBlockCount - 1;
    yBlockIndex >= blockIndexY;
    yBlockIndex--
  ) {
    for (
      let xBlockIndex = xBlockCount - 1;
      xBlockIndex >= blockIndexX;
      xBlockIndex--
    ) {
      for (let yIndex = blockHeight - 1; yIndex >= 0; yIndex--) {
        for (let xIndex = blockWidth - 1; xIndex >= 0; xIndex--) {
          const absX = xBlockIndex * blockWidth + xIndex
          const absY = yBlockIndex * blockHeight + yIndex
          if (absY > y && absY < height && absX < width) {
            const alphaIndex = (absY * width + absX) * 4 + 3
            const alpha = data[alphaIndex]
            if (alpha > 0) {
              return {
                x: absX,
                y: absY,
              }
            }
          }
        }
      }
    }
  }

  return minYPoint
}

function findContentRect(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  xBlockCount: number,
  yBlockCount: number,
) {
  const blockWidth = Math.ceil(width / xBlockCount)
  const blockHeight = Math.ceil(height / yBlockCount)

  const minXPoint = findMinXPoint(
    data,
    width,
    height,
    xBlockCount,
    yBlockCount,
    blockWidth,
    blockHeight,
  )
  if (!minXPoint) {
    return null
  }

  const minYPoint = findMinYPoint(
    data,
    width,
    height,
    xBlockCount,
    yBlockCount,
    blockWidth,
    blockHeight,
    minXPoint,
  )

  const maxXPoint = findMaxXPoint(
    data,
    width,
    height,
    xBlockCount,
    yBlockCount,
    blockWidth,
    blockHeight,
    minXPoint,
    minYPoint,
  )
  const maxYPoint = findMaxYPoint(
    data,
    width,
    height,
    xBlockCount,
    yBlockCount,
    blockWidth,
    blockHeight,
    minXPoint,
    minYPoint,
  )

  const rect: Rect = {
    x: minXPoint.x,
    y: minYPoint.y,
    width: maxXPoint.x - minXPoint.x + 1,
    height: maxYPoint.y - minYPoint.y + 1,
  }

  logWithCount.log(
    'minXPoint/minYPoint/maxXPoint/maxYPoint',
    minXPoint,
    minYPoint,
    maxXPoint,
    maxYPoint,
  )

  return {
    rect,
    minXPoint,
    minYPoint,
    maxXPoint,
    maxYPoint,
  }
}

function getBitmapData(context2d: CanvasRenderingContext2D): RectImageData {
  const canvas: HTMLCanvasElement = context2d.canvas
  const { width, height } = canvas

  const allImageData = context2d.getImageData(0, 0, width, height)
  const rectInfo = findContentRect(allImageData.data, width, height, 3, 3)
  if (rectInfo) {
    const { rect, minYPoint, minXPoint, maxXPoint, maxYPoint } = rectInfo

    const imageData = rect
      ? context2d.getImageData(rect.x, rect.y, rect.width, rect.height)
      : null

    const rectImageData: RectImageData = {
      rect,
      imageData,
    }

    logWithCount.log('rect', rect)
    logWithCount.increase()
    if (logWithCount.isEnable()) {
      debugGetBitmapData(
        allImageData,
        rect,
        minXPoint,
        minYPoint,
        maxXPoint,
        maxYPoint,
      )
    }

    return rectImageData
  } else {
    return {
      rect: null,
      imageData: null,
    }
  }
}

function debugGetBitmapData(
  allImageData: ImageData,
  rect: Rect,
  minXPoint: Point,
  minYPoint: Point,
  maxXPoint: Point,
  maxYPoint: Point,
) {
  const { width, height } = allImageData
  const canvas: HTMLCanvasElement = document.createElement(
    'canvas',
  ) as HTMLCanvasElement
  canvas.width = width
  canvas.height = height
  canvas.style.border = '1px solid #CCC'
  canvas.style.margin = '5px'
  document.body.appendChild(canvas)
  const context2d = canvas.getContext('2d')
  if (context2d && rect) {
    context2d.putImageData(allImageData, 0, 0)
    context2d.lineWidth = 1
    context2d.strokeRect(rect.x, rect.y, rect.width, rect.height)
    context2d.fillStyle = 'rgba(255, 0, 0, 0.5)'
    context2d.fillRect(minXPoint.x, minXPoint.y, 2, 2)
    context2d.fillRect(minYPoint.x, minYPoint.y, 2, 2)
    context2d.fillRect(maxXPoint.x, maxXPoint.y, 2, 2)
    context2d.fillRect(maxYPoint.x, maxYPoint.y, 2, 2)
  }
}

export { clearCanvas, getBitmapData }
