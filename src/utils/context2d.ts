/**
 *
 * @author fuyg
 * @date  2019-07-18
 */
// import LogWithCount from './LogWithCount'
import Point from '../types/Point'
import Rect from '../types/Rect'
import RectImageData from '../types/RectImageData'

// const logWithCount = new LogWithCount(100)

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
): Point | null {
  for (let xIndex = 0; xIndex < width; xIndex++) {
    for (let yIndex = 0; yIndex < height; yIndex++) {
      const alphaIndex = (yIndex * width + xIndex) * 4 + 3
      const alpha = data[alphaIndex]
      if (alpha > 0) {
        return {
          x: xIndex,
          y: yIndex,
        }
      }
    }
  }
  return null
}

function findMinYPoint(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  minXPoint: Point,
): Point {
  const { x } = minXPoint

  for (let yIndex = 0; yIndex < height; yIndex++) {
    for (let xIndex = x; xIndex < width; xIndex++) {
      const alphaIndex = (yIndex * width + xIndex) * 4 + 3
      const alpha = data[alphaIndex]
      if (alpha > 0) {
        return {
          x: xIndex,
          y: yIndex,
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
  minXPoint: Point,
  minYPoint: Point,
): Point {
  const { x } = minXPoint
  const { y } = minYPoint

  for (let xIndex = width - 1; xIndex > x; xIndex--) {
    for (let yIndex = height - 1; yIndex >= y; yIndex--) {
      const alphaIndex = (yIndex * width + xIndex) * 4 + 3
      const alpha = data[alphaIndex]
      if (alpha > 0) {
        return {
          x: xIndex,
          y: yIndex,
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
  minXPoint: Point,
  minYPoint: Point,
): Point {
  const { y } = minYPoint
  const { x } = minXPoint

  for (let yIndex = height - 1; yIndex > y; yIndex--) {
    for (let xIndex = width - 1; xIndex >= x; xIndex--) {
      const alphaIndex = (yIndex * width + xIndex) * 4 + 3
      const alpha = data[alphaIndex]
      if (alpha > 0) {
        return {
          x: xIndex,
          y: yIndex,
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
) {
  const minXPoint = findMinXPoint(data, width, height)
  if (!minXPoint) {
    return null
  }

  const minYPoint = findMinYPoint(data, width, height, minXPoint)

  const maxXPoint = findMaxXPoint(data, width, height, minXPoint, minYPoint)
  const maxYPoint = findMaxYPoint(data, width, height, minXPoint, minYPoint)

  const rect: Rect = {
    x: minXPoint.x,
    y: minYPoint.y,
    width: maxXPoint.x - minXPoint.x + 1,
    height: maxYPoint.y - minYPoint.y + 1,
  }

  // logWithCount.log(
  // 'minXPoint/minYPoint/maxXPoint/maxYPoint',
  // minXPoint,
  // minYPoint,
  // maxXPoint,
  // maxYPoint,
  // )

  return {
    rect,
    minXPoint,
    minYPoint,
    maxXPoint,
    maxYPoint,
  }
}

function getBitmapData(
  context2d: CanvasRenderingContext2D,
): RectImageData | null {
  const canvas: HTMLCanvasElement = context2d.canvas
  const { width, height } = canvas

  const allImageData = context2d.getImageData(0, 0, width, height)
  const rectInfo = findContentRect(allImageData.data, width, height)
  if (rectInfo) {
    const { rect } = rectInfo
    if (!rect) {
      return null
    }

    const imageData = context2d.getImageData(
      rect.x,
      rect.y,
      rect.width,
      rect.height,
    )

    const rectImageData: RectImageData = {
      rect,
      imageData,
    }

    // logWithCount.log('rect', rect)
    // logWithCount.increase()
    // if (logWithCount.isEnable()) {
    // debugGetBitmapData(
    // allImageData,
    // rect,
    // minXPoint,
    // minYPoint,
    // maxXPoint,
    // maxYPoint,
    // imageData,
    // )
    // }

    return rectImageData
  }
  return null
}

// function debugGetBitmapData(
// allImageData: ImageData,
// rect: Rect,
// minXPoint: Point,
// minYPoint: Point,
// maxXPoint: Point,
// maxYPoint: Point,
// imageData: ImageData | null,
// ) {
// const { width, height } = allImageData
// const canvas: HTMLCanvasElement = document.createElement(
// 'canvas',
// ) as HTMLCanvasElement
// canvas.width = width
// canvas.height = height
// canvas.style.border = '1px solid #CCC'
// canvas.style.margin = '5px'
// document.body.appendChild(canvas)
// const context2d = canvas.getContext('2d')
// if (context2d && rect) {
// context2d.putImageData(allImageData, 0, 0)
// context2d.lineWidth = 1
// context2d.strokeRect(rect.x, rect.y, rect.width, rect.height)
// context2d.fillStyle = 'rgba(255, 0, 0, 0.5)'
// context2d.fillRect(minXPoint.x, minXPoint.y, 2, 2)
// context2d.fillRect(minYPoint.x, minYPoint.y, 2, 2)
// context2d.fillRect(maxXPoint.x, maxXPoint.y, 2, 2)
// context2d.fillRect(maxYPoint.x, maxYPoint.y, 2, 2)
// }
// logWithCount.log(imageDataToString(imageData))
// }

// function imageDataToString(imageData: ImageData | null): string {
// if (!imageData) {
// return ''
// }
// const { data, width, height } = imageData
// const arr: any[][] = []
// for (let xIndex = 0; xIndex < width; xIndex++) {
// if (!arr[xIndex]) {
// arr[xIndex] = []
// }
// for (let yIndex = 0; yIndex < height; yIndex++) {
// const index = (xIndex * width + yIndex) * 4

// arr[xIndex][yIndex] = {
// r: data[index],
// g: data[index + 1],
// b: data[index + 2],
// a: data[index + 3],
// }
// }
// }

// const arrAsString = JSON.stringify(arr)
// return arrAsString
// }

export { clearCanvas, getBitmapData }
