/**
 *
 * @author fuyg
 * @date  2019-07-31
 */

import SpriteState from '../core/SpriteState'

interface BallState extends SpriteState {
  vx: number
  vy: number
  speedX: number
  speedY: number
  x: number
  y: number
}

export default BallState
