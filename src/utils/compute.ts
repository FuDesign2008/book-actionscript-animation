/**
 *
 * @author fuyg
 * @date  2019-07-18
 */

function recycle(value: number, min: number, max: number): number {
  let newValue = value
  if (value < min) {
    newValue = max
  } else if (value > max) {
    newValue = min
  }
  return newValue
}

function gotoZero(value: number, delta: number): number {
  if (Math.abs(value - 0) > delta) {
    return value > 0 ? value - delta : value + delta
  } else {
    return 0
  }
}

export { recycle, gotoZero }
