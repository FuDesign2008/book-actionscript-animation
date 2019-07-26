/**
 *
 * @author fuyg
 * @date  2019-07-25
 */
import Circle from '../types/Circle'

function histTest(a: Circle, b: Circle): boolean {
  if (!a || !b) {
    return false
  }
  const dx = Math.abs(a.x - b.x)
  const dy = Math.abs(a.y - b.y)
  const distance = Math.sqrt(dx * dx + dy * dy)
  return distance <= a.radius + b.radius
}

export { histTest }
