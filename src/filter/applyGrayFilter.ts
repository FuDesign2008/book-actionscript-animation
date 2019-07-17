/**
 *
 *
 * @author fuyg
 * @date  2019-07-17
 */
import { getRgba, putRgba } from '../utils/imageData'
import RGBA from '../utils/RGBA'
import GrayFilter from './GrayFilter'
import GrayFilterAlgorithm from './GrayFilterAlgorithm'
import GrayFilterOptions from './GrayFilterOptions'

// @see https://baike.baidu.com/item/%E7%81%B0%E5%BA%A6%E5%80%BC
// @see https://github.com/aooy/blog/issues/4
function makeGray(rgba: RGBA, algorithm: GrayFilterAlgorithm): number {
  let gray = 0
  const { r, g, b } = rgba
  switch (algorithm) {
    case GrayFilterAlgorithm.AVERAGE:
      gray = Math.round((r + g + b) / 3)
      break
    case GrayFilterAlgorithm.R:
      gray = r
      break
    case GrayFilterAlgorithm.G:
      gray = g
      break
    case GrayFilterAlgorithm.B:
      gray = b
      break
    default:
      gray = Math.round((r * 30 + g * 59 + b * 11 + 50) / 100)
      break
  }
  return gray
}

function grayImageData(
  imageData: ImageData,
  algorithm: GrayFilterAlgorithm,
): ImageData {
  const { width, height, data } = imageData
  const grayedData: number[] = Array.from(data)
  for (let wIndex = 0; wIndex < width; wIndex++) {
    for (let hIndex = 0; hIndex < height; hIndex++) {
      const rgba = getRgba(data, wIndex, hIndex, width, height)
      if (rgba) {
        const gray = makeGray(rgba, algorithm)
        const newRgba = {
          r: gray,
          g: gray,
          b: gray,
        }
        putRgba(grayedData, wIndex, hIndex, width, height, newRgba)
      }
    }
  }

  const newImageData: ImageData = new ImageData(
    Uint8ClampedArray.from(grayedData),
    width,
    height,
  )

  return newImageData
}

function applyGrayFilter(
  context2d: CanvasRenderingContext2D,
  blurFilter: GrayFilter,
) {
  const options: GrayFilterOptions = blurFilter.getOptions() as GrayFilterOptions
  const { x, y, algorithm } = options

  const imageData = context2d.getImageData(x, y, options.width, options.height)
  const newImageData = grayImageData(imageData, algorithm)

  context2d.putImageData(newImageData, x, y)
}

export { applyGrayFilter }
