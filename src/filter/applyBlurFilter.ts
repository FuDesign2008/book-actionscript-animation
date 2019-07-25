/**
 *
 *
 * @author fuyg
 * @date  2019-07-17
 */
import RGBA from '../types/RGBA'
import { getRgba, putRgba } from '../utils/imageData'
import BlurFilter from './BlurFilter'
import BlurFilterOptions from './BlurFilterOptions'

function mergeRgba(list: RGBA[]): RGBA | null {
  if (!list || !list.length) {
    return null
  }
  let r = 0
  let g = 0
  let b = 0

  list.forEach((item) => {
    r += item.r
    g += item.g
    b += item.b
  })

  const { length } = list

  const rgba: RGBA = {
    r: Math.round(r / length),
    g: Math.round(g / length),
    b: Math.round(b / length),
  }

  return rgba
}

function getSiblingRgbaList(
  data: Uint8ClampedArray,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): RGBA[] | null {
  const positionList = [
    {
      x: x - radius,
      y: y - radius,
    },
    {
      x: x + radius,
      y: y + radius,
    },
    {
      x: x - radius,
      y: y + radius,
    },
    {
      x: x + radius,
      y: y - radius,
    },
  ]

  const rgbaList: RGBA[] = []

  positionList.forEach((position) => {
    const rgba = getRgba(data, position.x, position.y, width, height)
    if (rgba) {
      rgbaList.push(rgba)
    }
  })
  return rgbaList && rgbaList.length ? rgbaList : null
}

function blurImageData(imageData: ImageData, radius: number): ImageData {
  const { width, height, data } = imageData
  const bluredData: number[] = Array.from(data)
  for (let wIndex = 0; wIndex < width; wIndex++) {
    for (let hIndex = 0; hIndex < height; hIndex++) {
      let newRgba = null
      const siblingRgbaList = getSiblingRgbaList(
        data,
        wIndex,
        hIndex,
        width,
        height,
        radius,
      )
      if (siblingRgbaList) {
        newRgba = mergeRgba(siblingRgbaList)
      } else {
        newRgba = getRgba(data, wIndex, hIndex, width, height)
      }
      if (newRgba) {
        putRgba(bluredData, wIndex, hIndex, width, height, newRgba)
      }
    }
  }

  const newImageData: ImageData = new ImageData(
    Uint8ClampedArray.from(bluredData),
    width,
    height,
  )

  return newImageData
}

function applyBlurFilter(
  context2d: CanvasRenderingContext2D,
  blurFilter: BlurFilter,
) {
  const options: BlurFilterOptions = blurFilter.getOptions() as BlurFilterOptions
  const { x, y, radius } = options
  const imageData = context2d.getImageData(x, y, options.width, options.height)

  const newImageData = blurImageData(imageData, radius)

  context2d.putImageData(newImageData, x, y)
}

export { applyBlurFilter }
