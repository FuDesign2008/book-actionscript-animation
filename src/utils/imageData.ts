/**
 *
 * @author fuyg
 * @date  2019-07-17
 */
import RGBA from '../types/RGBA'

function getRgba(
  data: Uint8ClampedArray,
  x: number,
  y: number,
  width: number,
  height: number,
  alpha = false,
): RGBA | null {
  if (x < 0 || y < 0 || x > width - 1 || y > height - 1) {
    return null
  }
  const index = (y * width + x) * 4
  if (index + 3 > data.length - 1) {
    return null
  }
  const rgba: RGBA = {
    r: data[index],
    g: data[index + 1],
    b: data[index + 2],
  }
  if (alpha) {
    rgba.a = data[index + 3]
  }
  return rgba
}

function putRgba(
  data: number[],
  x: number,
  y: number,
  width: number,
  height: number,
  rgba: RGBA,
  alpha = false,
) {
  if (x < 0 || y < 0 || x > width - 1 || y > height - 1) {
    return
  }
  const index = (y * width + x) * 4
  data[index] = rgba.r
  data[index + 1] = rgba.g
  data[index + 2] = rgba.b

  if (alpha && rgba.a != null) {
    data[index + 3] = rgba.a
  }
}

export { getRgba, putRgba }
