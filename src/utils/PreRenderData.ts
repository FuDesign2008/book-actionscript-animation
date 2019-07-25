/**
 *
 * @author fuyg
 * @date  2019-07-24
 */

import Rect from './Rect'

interface PreRenderData {
  rect: Rect
  canvas: HTMLCanvasElement
  state?: any
}

export default PreRenderData
