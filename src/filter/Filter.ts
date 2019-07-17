/**
 *
 * @author fuyg
 * @date  2019-07-17
 */

class Filter {
  static NAME = 'Filter'
  options: object
  name: string

  constructor(options: object) {
    this.name = Filter.NAME
    this.options = options
  }

  getOptions(): object {
    return this.options
  }

  remove() {
    // TODO
  }

  // life cycle
  filterDidMount() {
    // TODO
  }

  filterWillUnmount() {
    // TODO
  }

  filterDidApply() {
    // TODO
  }
}

export default Filter
