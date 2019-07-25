/**
 *
 * @author fuyg
 * @date  2019-07-24
 */

import Rect from '../utils/Rect'

interface PreRenderData {
  sourceRect: Rect
  targetRect: Rect
  canvas: HTMLCanvasElement
  state: any
  props: any
}

export default PreRenderData
