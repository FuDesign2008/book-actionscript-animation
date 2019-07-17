/**
 *
 * @author fuyg
 * @date  2019-07-17
 */
import Filter from './Filter'

type ApplyFunction = (
  context2d: CanvasRenderingContext2D,
  filter: Filter,
) => void

export default ApplyFunction
