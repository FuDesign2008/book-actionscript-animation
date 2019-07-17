/**
 *
 * @author fuyg
 * @date  2019-07-17
 */
import Filter from './Filter'
import GrayFilterOptions from './GrayFilterOptions'

class GrayFilter extends Filter {
  static NAME = 'GrayFilter'
  constructor(options: GrayFilterOptions) {
    super(options)
    this.name = GrayFilter.NAME
  }
}

export default GrayFilter
