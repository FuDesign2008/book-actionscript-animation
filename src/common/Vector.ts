/**
 * Vector for 2D
 * @author fuyg
 * @date  2019-07-18
 */

class Vector {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  get radian(): number {
    const { x, y } = this
    const angle = Math.atan2(y, x)
    return angle
  }

  get degree() {
    const { radian } = this
    return (radian * 180) / Math.PI
  }

  add(v: Vector): Vector {
    const x = this.x + v.x
    const y = this.y + v.y
    const vector = new Vector(x, y)
    return vector
  }

  subtract(v: Vector): Vector {
    const x = this.x - v.x
    const y = this.x - v.y
    const vector = new Vector(x, y)
    return vector
  }

  static vectorFromAngle(
    value: number,
    angle: number,
    isDegree = false,
  ): Vector {
    let radian = angle
    if (isDegree) {
      radian = (angle * Math.PI) / 180
    }
    const x = value * Math.cos(radian)
    const y = value * Math.sin(radian)
    const v = new Vector(x, y)
    return v
  }
}

export default Vector
