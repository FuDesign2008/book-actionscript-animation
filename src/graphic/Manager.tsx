/**
 *
 * @author fuyg
 * @date  2019-07-12
 */

import { GraphicComponent } from './GraphicComponent'

class Manager {
  private context2d: CanvasRenderingContext2D
  private graphicList: GraphicComponent[]

  constructor(context2d: CanvasRenderingContext2D) {
    this.context2d = context2d
    this.graphicList = []
  }

  add(graphic: GraphicComponent) {
    const { graphicList, context2d } = this
    if (graphicList.includes(graphic)) {
      return
    }
    graphic.setContext2d(context2d)
    graphicList.push(graphic)
    graphic.componentDidMount()
  }

  remove(graphic: GraphicComponent) {
    const { graphicList, context2d } = this
    if (graphicList.includes(graphic)) {
      const newGraphicList = graphicList.filter((item) => {
        return item !== graphic
      })
      graphic.componentWillUnmount()
      graphic.setContext2d(null)
      this.graphicList = newGraphicList
    }
  }

  onEnterFrame() {
    const { graphicList } = this
    graphicList.forEach((item: GraphicComponent) => {
      item.onEnterFrame()
    })

    graphicList.forEach((item: GraphicComponent) => {
      item.runDraw()
    })
  }
}

export default Manager
