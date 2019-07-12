/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import { Base} from './Base'
import Manager from './Manager'

type BaseConstructor = new (props: any) => Base

function buildGraphic(
  manager: Manager,
  graphicClass: BaseConstructor,
  props: any,
): Base {
  const graphic: Base = new graphicClass(props)
  manager.add(graphic)
  return graphic
}

export { buildGraphic }
