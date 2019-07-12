/**
 *
 * @author fuyg
 * @date  2019-07-12
 */

import { Base } from './Base'

class Manager {
  private context2d: CanvasRenderingContext2D
  private graphicList: Base[]

  constructor(context2d: CanvasRenderingContext2D) {
    this.context2d = context2d
    this.graphicList = []
  }

  add(graphic: Base) {
    const { graphicList, context2d } = this
    if (graphicList.includes(graphic)) {
      return
    }
    graphic.setContext2d(context2d)
    graphicList.push(graphic)
    graphic.componentDidMount()
  }

  remove(graphic: Base) {
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
    graphicList.forEach((item: Base) => {
      item.onEnterFrame()
    })

    graphicList.forEach((item: Base) => {
      item.runDraw()
    })
  }
}

export default Manager
