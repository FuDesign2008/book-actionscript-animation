/**
 *
 * @author fuyg
 * @date  2019-07-17
 */
import Filter from './Filter'

interface FilterConstructor {
  NAME: string
  new (options: any): Filter
}

export default FilterConstructor
