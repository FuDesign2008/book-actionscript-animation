/**
 *
 * @author fuyg
 * @date  2019-07-26
 */

import KeyInteractiveState from '../core/KeyInteractiveState'

interface BouncingBallState extends KeyInteractiveState {
  speedX: number
  speedY: number
  x: number
  y: number
}

export default BouncingBallState
