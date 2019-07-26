/**
 *
 * @author fuyg
 * @date  2019-07-26
 */

import KeyInteractiveProps from '../core/KeyInteractiveProps'

interface BouncingBallProps extends KeyInteractiveProps {
  accelaration: number
  friction: number
  speedX: number
  speedY: number
  radius: number
}

export default BouncingBallProps
