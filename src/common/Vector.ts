/**
 * Vector for 2D
 * @author fuyg
 * @date  2019-07-18
 */

class Vector {
  value: number
  angle: number

  constructor(value: number, angle: number) {
    this.value = value
    this.angle = angle
  }

  get valueX(): number {
    const { value, angle } = this
    return value * Math.cos(angle)
  }

  get valueY(): number {
    const { value, angle } = this
    return value * Math.sin(angle)
  }
}

export default Vector
