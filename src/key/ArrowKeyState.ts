/**
 *
 * @author fuyg
 * @date  2019-07-16
 */
import ArrowKeyName from './ArrowKeyName'

interface ArrowKeyState {
  [ArrowKeyName.LEFT]?: boolean
  [ArrowKeyName.RIGHT]?: boolean
  [ArrowKeyName.UP]?: boolean
  [ArrowKeyName.DOWN]?: boolean
}
export default ArrowKeyState
