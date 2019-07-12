/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import { GraphicComponent } from './GraphicComponent'
import Manager from './Manager'

type BaseConstructor = new (props: any) => GraphicComponent

function buildGraphic(
  manager: Manager,
  graphicClass: BaseConstructor,
  props: any,
): GraphicComponent {
  const graphic: GraphicComponent = new graphicClass(props)
  manager.add(graphic)
  return graphic
}

export { buildGraphic }
