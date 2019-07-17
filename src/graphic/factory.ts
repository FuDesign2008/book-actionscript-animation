/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import { GraphicComponent } from './GraphicComponent'
import GraphicComponentConstructor from './GraphicComponentConstructor'
import GraphicManager from './GraphicManager'

function buildGraphic(
  manager: GraphicManager,
  graphicClass: GraphicComponentConstructor,
  props: any,
): GraphicComponent {
  const graphic: GraphicComponent = new graphicClass(props)
  manager.add(graphic)
  return graphic
}

export { buildGraphic }
