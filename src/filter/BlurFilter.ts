/**
 *
 * @author fuyg
 * @date  2019-07-17
 */
import BlurFilterOptions from './BlurFilterOptions'
import Filter from './Filter'

class BlurFilter extends Filter {
  static NAME = 'BlurFilter'
  constructor(options: BlurFilterOptions) {
    super(options)
    this.name = BlurFilter.NAME
  }
}

export default BlurFilter
