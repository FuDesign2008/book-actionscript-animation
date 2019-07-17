/**
 *
 * @author fuyg
 * @date  2019-07-17
 */

import Filter from './Filter'
import { getApply } from './filterApplyMap'

class FilterManager {
  private context2d: CanvasRenderingContext2D
  private filterList: Filter[]

  constructor(context2d: CanvasRenderingContext2D) {
    this.context2d = context2d
    this.filterList = []
  }

  add(filter: Filter) {
    const { filterList } = this
    if (filterList.includes(filter)) {
      return
    }
    filter.remove = () => {
      this.remove(filter)
    }
    filterList.push(filter)
    filter.filterDidMount()
  }

  remove(filter: Filter) {
    const { filterList } = this
    if (!filterList.includes(filter)) {
      return
    }
    const newFilterList = filterList.filter((item) => {
      return item !== filter
    })
    filter.filterWillUnmount()
    delete filter.remove
    this.filterList = newFilterList
  }

  onEnterFrame() {
    // console.log('FilterManager onEnterFrame', this.filterList.length)
    const { filterList, context2d } = this
    filterList.forEach((filter) => {
      const applyFn = getApply(filter)
      if (applyFn) {
        applyFn.call(null, context2d, filter)
        filter.filterDidApply()
      }
    })
  }
}

export default FilterManager
